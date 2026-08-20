import Script from "next/script";

/** Google Analytics 4 measurement ID — one tag for the whole site. */
export const GA_MEASUREMENT_ID = "G-Q09S8Z84WP";

/**
 * Loads the Google tag once from the root layout so every page is measured
 * without duplicating the snippet.
 */
export function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="beforeInteractive"
      />
      <Script
        id="google-gtag"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`,
        }}
      />
    </>
  );
}
