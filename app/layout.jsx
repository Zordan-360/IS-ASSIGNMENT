import "./globals.css";

export const metadata = {
  title: "WELCOME ITZ FIZZ — Scroll-Driven Hero Motion Study",
  description:
    "A premium scroll-driven hero section built with Next.js, Tailwind CSS and GSAP ScrollTrigger. The central visual is interpolated entirely from scroll progress.",
  authors: [{ name: "ITZ FIZZ" }],
  keywords: ["GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "scroll animation"],
};

export const viewport = {
  themeColor: "#07080A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    // `suppressHydrationWarning` is required on <html> because the inline
    // script above adds the `js` class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Marks the document as scripted *before* first paint. globals.css uses
          `.js` to hold the hero's pre-intro state (opacity 0), which removes
          the flash of finished layout that would otherwise appear between the
          server HTML painting and GSAP taking over. Without JS the class is
          never added, so the content is always readable.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/*
          Webfont loaded via <link> instead of next/font so the project still
          builds and runs offline — it degrades gracefully to the system stack
          defined in globals.css / tailwind.config.js.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
