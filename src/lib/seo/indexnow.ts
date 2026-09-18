const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "www.comlabstechnologies.com";

export async function notifyIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) return;

  try {
    await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/indexnow-key.txt/`,
        urlList: urls,
      }),
    });
  } catch (error) {
    console.error("[IndexNow] notification failed:", error);
  }
}
