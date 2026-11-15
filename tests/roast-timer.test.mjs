import test from 'node:test';
import assert from 'node:assert/strict';
import { newRoast, roastMetrics, targetTime, formatTime, parseTime, readRoastStore, updateRoast, roastsCsv } from '../src/lib/roast-timer.ts';

const batch = { ...newRoast(), id: 'example', start: 1000, crack: 481000, end: 601000 };

test('8-minute first crack and 10-minute finish produce 20% DTR', () => {
  assert.deepEqual(roastMetrics(batch, 999999), { total: 600000, development: 120000, ratio: 20 });
  assert.equal(targetTime(batch), 601000);
});

test('elapsed time is recovered from timestamps after suspension/reload', () => {
  const saved = JSON.stringify({ current: { ...batch, end: null }, history: [] });
  const { current } = readRoastStore(saved);
  assert.equal(roastMetrics(current, 601000).ratio, 20);
  assert.equal(roastMetrics(current, 901000).total, 900000);
});

test('missing first crack stays unknown instead of being reported as zero', () => {
  assert.equal(roastMetrics({ ...batch, crack: null }, 0).ratio, null);
  assert.equal(roastMetrics(newRoast(), 5000).total, 0);
  assert.equal(targetTime(newRoast()), null);
});

test('manual corrections reject malformed seconds', () => {
  assert.equal(parseTime('08:30'), 510000);
  assert.equal(parseTime('08:60'), null);
  assert.equal(parseTime('-1:10'), null);
  assert.equal(formatTime(600000), '10:00');
});

test('finish and corrections upsert the same record; next roast keeps it', () => {
  let store = updateRoast({ current: newRoast(), history: [] }, batch);
  store = updateRoast(store, { ...batch, crack: 421000, notes: 'Earlier crack' });
  assert.equal(store.history.length, 1);
  assert.equal(roastMetrics(store.history[0], 0).ratio, 30);
  store = updateRoast(store, newRoast());
  assert.equal(store.history.length, 1);
  assert.equal(store.current.start, null);
});

test('storage validation rejects invalid or inverted timestamps', () => {
  assert.throws(() => readRoastStore('{bad json'));
  assert.throws(() => readRoastStore(JSON.stringify({ current: { ...batch, crack: 701000 }, history: [] })));
  assert.throws(() => readRoastStore(JSON.stringify({ current: { ...batch, target: 100 }, history: [] })));
});

test('journal caps records at 50, keeping the newest roast', () => {
  let store = { current: newRoast(), history: [] };
  for(let i = 0; i < 55; i++) store = updateRoast(store, { ...batch, id: String(i) });
  assert.equal(store.history.length, 50);
  assert.equal(store.history[0].id, '54');
});

test('CSV handles Japanese, newlines, quotes and spreadsheet formula prefixes', () => {
  const csv = roastsCsv([{ ...batch, bean: '=SUM(1,2)', notes: '香り,"甘い"\nfinish' }]);
  assert.ok(csv.startsWith('\ufeff'));
  assert.ok(csv.includes('"\'=SUM(1,2)"'));
  assert.ok(csv.includes('"香り,""甘い""\nfinish"'));
  assert.ok(csv.includes('"20.00"'));
});
