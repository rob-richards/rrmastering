import { Head, Html, Main, NextScript } from 'next/document';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        {/* <link
          rel="alternate"
          type="application/rss+xml"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
        /> */}

        <SpeedInsights />
        <Analytics />
      </Head>
      <body className="dark:bg-black flex h-full flex-col bg-zinc-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
