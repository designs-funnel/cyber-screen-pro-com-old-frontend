const google_search = require("google-it");
const { URL } = require("url");

const extractBaseUrl = (url) => {
  const basePattern = /https:\/\/instagram.com\/[^/]+/;
  const match = url.match(basePattern);
  return match ? match[0] : null;
};

const removeDuplicates = (arr) => [...new Set(arr)];

const search_google = async (query) => {
  const results = await google_search({ query });

  results?.map((res) => console.log(res?.link));
  const res = results
    ?.filter((res) => res?.link?.includes("instagram.com"))
    ?.map((res) => {
      const url = new URL(res?.link);
      const profile_url = `https://instagram.com${url.pathname}`;
      return extractBaseUrl(profile_url);
    });

  return removeDuplicates(res).filter(
    (res) =>
      !res?.endsWith("/p") &&
      !res?.endsWith("/reel") &&
      !res?.endsWith("/reels")
  );
};

export default async (req, res) => {
  try {
    const profile_urls = await search_google(req?.body?.text);
    console.log(req?.body?.text, { profile_urls });
    res.status(200).json({ profile_urls });
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error?.message, 0, 2) });
  }
};

// search_google("Instagram of Hadis Moghtader in Houston").then(console.log);
// All Working for Houston, Sobi Sharif, Shayan Music, John Abraham, Hamza Amir, Hadis Moghtader
