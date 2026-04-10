/* eslint-disable */
// @ts-ignore
import Parser from "rss-parser";
import { NextResponse } from "next/server";

export async function GET() {
  const parser = new Parser({
    customFields: {
      item: [
        ["media:thumbnail", "thumbnail"],
        ["content:encoded", "contentEncoded"],
      ]
    }
  });
  
  try {
    const feed = await parser.parseURL("https://note.com/masakikono_3_0/rss");
    
    const articles = feed.items.slice(0, 3).map((item) => {
      // note.com rss often has images in description or media:thumbnail
      let imageUrl = "/images/kaf-coffee.jpg"; // fallback
      
      const imgMatch = item.contentSnippet?.match(/src="([^"]+)"/) || item.contentEncoded?.match(/src="([^"]+)"/);
      if (imgMatch && imgMatch[1]) {
        imageUrl = imgMatch[1];
      }

      const date = new Date(item.pubDate as string);
      
      return {
        title: item.title,
        link: item.link,
        date: `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`,
        category: "NOTE ARTICLE",
        image: imageUrl,
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching Note RSS:", error);
    return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 500 });
  }
}
