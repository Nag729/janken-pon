export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

// PV 測定
export const pageview = (url: string): void => {
  if (!NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    return;
  }

  window.gtag("config", NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
