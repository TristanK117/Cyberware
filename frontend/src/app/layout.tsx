import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import {Navbar, Footer} from "./navigation/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberAware",
  description: "CyberAware is a multi-service full-stack application designed to support cybersecurity education, awareness, and safe digital practices. The system is composed of a frontend client, backend API, supporting infrastructure, and a machine learning service. This repository is structured to support collaborative development, local testing, and containerized deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
