/** Google Analytics 4 measurement ID — one tag for the whole site. */
export const GA_MEASUREMENT_ID = "G-Q09S8Z84WP";

/**
 * Google's gtag snippet as plain script tags so the tag is present in the
 * HTML source (Tag Assistant / Google's detector). Do not use next/script.
 */
export function GoogleTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
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
