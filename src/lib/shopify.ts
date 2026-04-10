// @ts-nocheck
/* eslint-disable */
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Fetches product info from Shopify Storefront API
 * Returns mock data if environment variables are missing
 */
export async function getProducts() {
  if (!domain || !storefrontAccessToken) {
    console.warn("⚠️  Shopify API keys are missing. Returning mock data. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN in your .env.local file.");
    return [
      {
        id: "beandy-dripper",
        title: "BEANDY Dripper",
        priceRange: { minVariantPrice: { amount: "4800", currencyCode: "JPY" } },
        availableForSale: true,
        handle: "beandy",
      },
      {
        id: "oslo-light-roast",
        title: "Oslo Selection (Whole Bean)",
        priceRange: { minVariantPrice: { amount: "2800", currencyCode: "JPY" } },
        availableForSale: false,
        handle: "oslo-selection",
      }
    ];
  }

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products from Shopify");
    }

    const json = await res.json();
    return json.data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Shopify fetch error:", error);
    return [];
  }
}
