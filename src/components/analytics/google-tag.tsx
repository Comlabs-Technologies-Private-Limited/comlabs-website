/** Google Analytics 4 measurement ID — one tag for the whole site. */
export const GA_MEASUREMENT_ID = "G-Q09S8Z84WP";

/**
 * Google's gtag snippet stays in the HTML source so Tag Assistant can detect
 * G-Q09S8Z84WP, but the network request is deferred until the page is idle.
 */
export function GoogleTag() {
  return (
    <>
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      {/* Google tag (gtag.js) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  function __loadGtag(){
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
    s.async = true;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  }
  var load = function () {
    setTimeout(__loadGtag, 8000);
  };
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (eventName) {
    window.addEventListener(eventName, __loadGtag, { once: true, passive: true });
  });
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load);
`,
        }}
      />
    </>
  );
}
