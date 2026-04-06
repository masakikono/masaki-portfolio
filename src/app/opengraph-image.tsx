import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Masaki Kono Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0A192F, #02050b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: 100, fontWeight: 200, letterSpacing: '0.1em', marginBottom: 20 }}>
            MASAKI KONO
          </h1>
          <h2 style={{ fontSize: 32, letterSpacing: '0.3em', color: '#daa520', textTransform: 'uppercase' }}>
            Coffee × AI × Traveler
          </h2>
          
          <div style={{
            position: 'absolute',
            bottom: 80,
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 32px',
            borderRadius: '100px'
          }}>
            <div style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#34d399',
              marginRight: 16
            }} />
            <span style={{ fontSize: 24, color: '#34d399', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Available for Remote
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
