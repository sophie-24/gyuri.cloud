import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gyuri-cloud-o6yv5bqt1-sophie-24s-projects.vercel.app"),
  title: "김규리 | Backend Engineer Portfolio",
  description:
    "FastAPI, Spring Boot, 데이터 파이프라인을 중심으로 API 설계와 백엔드 문제 해결 경험을 정리한 김규리의 포트폴리오입니다.",
  openGraph: {
    title: "김규리 | Backend Engineer Portfolio",
    description:
      "API 설계, 비동기 처리, 데이터 파이프라인, RAG 기반 서비스 구현 경험을 담은 백엔드 개발자 포트폴리오입니다.",
    url: "https://gyuri-cloud-o6yv5bqt1-sophie-24s-projects.vercel.app",
    siteName: "김규리 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
