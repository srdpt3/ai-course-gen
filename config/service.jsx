const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getVideo = async (query, maxResults = 2) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: maxResults,
    key: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  };

  try {
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    const data = response.data;
    return data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};
export default {
  getVideo,
};
