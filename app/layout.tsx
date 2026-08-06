import type { Metadata } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";
import RouteScrollReset from './components/RouteScrollReset'

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
 icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
  },
  title: "M4 GYM – Run Your Entire Gym From One Place",
  description:
    "M4 GYM is a powerful gym management platform for owners, managers, trainers and members. Replace spreadsheets and paper attendance with one organized system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} h-full antialiased`}
    >
     <head>
  <link rel="icon" href="/favicon.png" sizes="25x25" />
</head>
     
      <body className="min-h-full flex flex-col bg-bg-base text-text-base font-archivo" cz-shortcut-listen="true">
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}

