import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const rssUrl = 'https://note.com/masaki_19931015/rss';
    const res = await fetch(rssUrl, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const xmlText = await res.text();
    
    // Simple regex parser for RSS items
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      if (items.length >= 6) break; // Limit to 6 items

      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemContent.match(/<title>(.*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
      const mediaMatch = itemContent.match(/<media:thumbnail>(.*?)<\/media:thumbnail>/);
      
      if (titleMatch && linkMatch) {
        // Format date
        let formattedDate = pubDateMatch ? pubDateMatch[1] : '';
        if (formattedDate) {
          const date = new Date(formattedDate);
          formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        }

        items.push({
          title: titleMatch[1].trim(),
          link: linkMatch[1].trim(),
          date: formattedDate,
          category: 'Note',
          image: mediaMatch ? mediaMatch[1].trim() : '/images/kaf-coffee.jpg'
        });
      }
    }

    return NextResponse.json({ articles: items });
  } catch (error) {
    console.error('Note RSS Error:', error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}
