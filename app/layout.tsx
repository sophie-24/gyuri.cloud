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

// TODO: 커스텀 도메인을 연결하면 이 URL을 교체하세요.
const SITE_URL = "https://gyuri-cloud-o6yv5bqt1-sophie-24s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "김규리 | Backend Engineer Portfolio",
  description:
    "Spring Boot와 FastAPI로 서비스를 설계하고 배포·운영까지 책임지는 백엔드 엔지니어 김규리의 포트폴리오입니다. 동시성, 성능, 무중단 배포, RAG 기반 AI 서비스 구현 경험을 정리했습니다.",
  keywords: [
    "백엔드 개발자",
    "Backend Engineer",
    "Spring Boot",
    "FastAPI",
    "포트폴리오",
    "김규리",
  ],
  authors: [{ name: "김규리", url: SITE_URL }],
  openGraph: {
    title: "김규리 | Backend Engineer Portfolio",
    description:
      "API 설계, 비동기 처리, 무중단 배포, RAG 기반 서비스 구현 경험을 담은 백엔드 개발자 포트폴리오입니다.",
    url: SITE_URL,
    siteName: "김규리 포트폴리오",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "김규리 | Backend Engineer Portfolio",
    description:
      "Spring Boot · FastAPI 백엔드 엔지니어. 동시성, 성능, 배포와 운영까지 설계합니다.",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "김규리",
  alternateName: "Gyuri Kim",
  jobTitle: "Backend Engineer",
  email: "mailto:sophia.gyuri@gmail.com",
  url: SITE_URL,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "동국대학교",
  },
  knowsAbout: [
    "Spring Boot",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "RAG",
    "Data Pipeline",
  ],
  sameAs: [
    "https://github.com/sophie-24",
    "https://velog.io/@gyuri0504",
  ],
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
