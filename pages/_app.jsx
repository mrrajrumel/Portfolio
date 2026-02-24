import React from 'react';
import Head from 'next/head';

/**
 * Next.js Pages Router standard _app.jsx file.
 * Compilation error "Could not resolve globals.css" fix korar jonno 
 * ami CSS import-er bodole inline style injection use korchhi.
 * Ete design thikvabe kaaj korbe ebong build failed hobe na.
 */
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Tailwind CSS CDN fallback jate design kokhono break na kore */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Fonts load kora hoyechhe typography maintain korar jonno */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Global CSS content ekhane inject kora hoyechhe */}
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: 'Hind Siliguri', sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 0;
          }

          /* Premium scrollbar styles */
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          ::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 10px;
          }

          /* Graphics Engine optimizations */
          .capture-area {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            font-family: 'Hind Siliguri', sans-serif;
          }

          /* Custom range slider appearance */
          input[type=range] {
            accent-color: #10b981;
          }

          /* Utility classes */
          .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: #10b981 transparent;
          }
        `}} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;