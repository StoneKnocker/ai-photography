export function AdsenseScript({ pubId }: { pubId: string }) {
  if (!pubId) {
    return null;
  }
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pubId}`}
      crossOrigin="anonymous"
    />
  );
}

export function PlausibleAnalytics({ domain }: { domain: string }) {
  if (!domain) {
    return null;
  }
  return (
    <script
      defer
      data-domain={domain}
      src="https://app.pageview.app/js/script.js"
    />
  );
}

export function ClarityAnalytics({ clarityId }: { clarityId: string }) {
  if (!clarityId) {
    return null;
  }
  return (
    <script
      defer
      id="microsoft-clarity"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}

export function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }
  return (
    <>
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
