import type { MetadataRoute } from "next";

const BASE_URL = "https://masaki-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/journey", "/coffee-tools", "/bench", "/roast-timer", "/portfolio", "/products", "/insights", "/contact"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
