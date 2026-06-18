"use client";

import { useState } from "react";
import Image from "next/image";

type Lang = "ko" | "en";

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const projects = [
  {
    id: "tubify",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #93c5fd 100%)",
    emoji: "🎵",
    ko: {
      title: "Tubify",
      period: "2026.03 ~ 진행 중",
      role: "개발 리드 · 백엔드 · AI",
      badge: "Chrome Web Store 배포",
      badgeBg: "#1d4ed8",
      shortDesc: "멀티에이전트 YouTube 개인화 큐레이션 서비스",
      desc: "5개 AI 에이전트를 오케스트레이션해 광고·협찬 영상을 자동 필터링하고, 관심사 기반 뉴스레터를 자동 생성합니다. FastAPI + Chrome Extension으로 실 배포된 공개 소프트웨어 프로젝트입니다.",
      tags: ["FastAPI", "Gemini API", "asyncio", "Chrome Extension", "APScheduler", "PostgreSQL"],
      scopeTitle: "백엔드 담당 범위",
      scope: [
        "FastAPI 서버 전체 구조 설계 및 라우터 분리",
        "asyncpg + AsyncSessionLocal 3중 비동기 세션 관리 구조 설계",
        "APScheduler 기반 뉴스레터 배치 발송 구현",
        "StreamingResponse(NDJSON) 2단계 스트리밍 API 설계",
        "Chrome Extension ↔ 서버 연동 API 및 OAuth 인증 처리",
        "5개 Gemini API 에이전트 병렬 오케스트레이션 구조 설계",
      ],
      highlightsTitle: "기술적 의사결정 & 트러블슈팅",
      highlights: [
        {
          label: "Lost in the Middle 문제 해결",
          detail:
            "단일 대용량 프롬프트로 영상 여러 개를 분석하면 중간 맥락이 무시되는 현상 발생. 영상별 에이전트를 병렬 호출하는 Pipeline A/B 구조로 분산 → 응답 시간 6초 → 2초 단축, 필터링 정확도 개선.",
        },
        {
          label: "asyncpg 비동기 세션 충돌",
          detail:
            "여러 비동기 컨텍스트에서 동일 DB 세션을 재사용해 충돌 발생. 요청마다 AsyncSessionLocal 인스턴스를 독립 생성하는 3중 비동기 구조로 DB 레이어를 재설계 → 충돌 완전 해소.",
        },
        {
          label: "StreamingResponse(NDJSON) 도입으로 UX 개선",
          detail:
            "전체 파이프라인 응답을 한 번에 반환하면 30초 대기. NDJSON 스트리밍 도입으로 에이전트별 결과를 순차 전달 → 체감 대기 5~10초로 단축.",
        },
      ],
    },
    en: {
      title: "Tubify",
      period: "Mar 2026 ~ Present",
      role: "Lead Developer · Backend · AI",
      badge: "Live on Chrome Web Store",
      badgeBg: "#1d4ed8",
      shortDesc: "Multi-agent YouTube personalization & curation service",
      desc: "Orchestrates 5 AI agents to auto-filter sponsored content and generate interest-based newsletters. A publicly deployed open-source project integrating FastAPI with a Chrome Extension.",
      tags: ["FastAPI", "Gemini API", "asyncio", "Chrome Extension", "APScheduler", "PostgreSQL"],
      scopeTitle: "Backend Responsibilities",
      scope: [
        "Full FastAPI server architecture and router separation",
        "Triple async session management with asyncpg + AsyncSessionLocal",
        "Newsletter batch dispatch scheduling with APScheduler",
        "2-phase StreamingResponse(NDJSON) streaming API design",
        "Chrome Extension ↔ server API integration and OAuth auth",
        "Parallel orchestration of 5 Gemini API agents",
      ],
      highlightsTitle: "Technical Decisions & Troubleshooting",
      highlights: [
        {
          label: "Solved Lost-in-the-Middle Problem",
          detail:
            "Single large prompt caused the model to ignore middle-positioned video context. Refactored into Pipeline A/B with per-video parallel agents → response time 6s → 2s, improved filtering accuracy.",
        },
        {
          label: "asyncpg Session Conflicts",
          detail:
            "Session reuse across async contexts caused race conditions. Rebuilt DB layer with per-request independent AsyncSessionLocal instances (triple async structure) → fully resolved.",
        },
        {
          label: "Streaming UX with NDJSON",
          detail:
            "Full pipeline response took 30s blocking. Introduced NDJSON StreamingResponse to incrementally stream per-agent results → perceived wait down to 5–10s.",
        },
      ],
    },
    githubUrl: "https://github.com/sophie-24/SWproject-Team2-m",
    notionUrl: "https://www.notion.so/33330ae5956580ee85e6f0c9a2b94f70",
  },
  {
    id: "replanet",
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 55%, #6ee7b7 100%)",
    emoji: "🌱",
    ko: {
      title: "RePlanet",
      period: "2025.09",
      role: "팀장 · 풀스택 · AI",
      badge: "서울AI재단 이사장상 (122팀 중)",
      badgeBg: "#059669",
      shortDesc: "서울시 에코마일리지 탄소절감 AI 플랫폼",
      desc: "GPS 데이터를 분석해 교통수단을 자동 분류하고, AWS Bedrock 기반 RAG AI 챗봇이 맞춤형 탄소 절감 코칭을 제공합니다. 서울시 에코마일리지 API와 실제 연동한 서비스입니다.",
      tags: ["FastAPI", "AWS Bedrock", "React Native", "MySQL", "Redis", "RandomForest", "RAG"],
      scopeTitle: "백엔드 담당 범위",
      scope: [
        "FastAPI 서버 아키텍처 설계 및 전체 API 엔드포인트 구현",
        "MySQL 스키마 설계 + Redis cache-aside 캐싱 레이어 구축",
        "AWS Bedrock 기반 RAG 파이프라인 (정책 문서 임베딩 + 검색)",
        "GPS 전처리 → 공공 정류장 매칭 + RandomForest 교통수단 분류",
        "교통카드·따릉이·GPS 3개 외부 API ETL 파이프라인 설계",
        "EC2/RDS/S3 배포, 환경변수·시크릿 관리",
      ],
      highlightsTitle: "기술적 의사결정 & 트러블슈팅",
      highlights: [
        {
          label: "LLM 환각 문제 해결",
          detail:
            "정책 문서 기반 Q&A에서 사실과 다른 답변 생성. AWS Bedrock RAG 파이프라인 + Few-shot 프롬프팅 도입 → 정확도 85% (테스트셋 100건 기준).",
        },
        {
          label: "GPS 교통수단 분류 정확도 개선",
          detail:
            "속도 기반 단순 분류 정확도 60%. 공공 API 정류장 데이터를 매칭해 경로 맥락을 추가하고, RandomForest 앙상블 모델 적용 → 87% 달성.",
        },
        {
          label: "Redis 캐싱으로 성능 최적화",
          detail:
            "에코마일리지 데이터를 매 요청마다 외부 API 호출 → 응답 지연 발생. Redis cache-aside 전략으로 TTL 적용 후 반복 조회 응답 속도 대폭 개선.",
        },
      ],
    },
    en: {
      title: "RePlanet",
      period: "Sep 2025",
      role: "Team Lead · Full-Stack · AI",
      badge: "Seoul AI Foundation Director Award (top 20/122)",
      badgeBg: "#059669",
      shortDesc: "Seoul eco-mileage carbon reduction AI platform",
      desc: "Automatically classifies transportation mode from GPS data, with an AWS Bedrock RAG AI chatbot providing personalized carbon coaching. Integrated with Seoul city eco-mileage API.",
      tags: ["FastAPI", "AWS Bedrock", "React Native", "MySQL", "Redis", "RandomForest", "RAG"],
      scopeTitle: "Backend Responsibilities",
      scope: [
        "FastAPI server architecture and full API endpoint implementation",
        "MySQL schema + Redis cache-aside caching layer",
        "AWS Bedrock RAG pipeline (policy doc embedding + retrieval)",
        "GPS preprocessing → stop-matching + RandomForest transport classification",
        "ETL pipeline for 3 external APIs (transit card, bike-share, GPS)",
        "EC2/RDS/S3 deployment and secret management",
      ],
      highlightsTitle: "Technical Decisions & Troubleshooting",
      highlights: [
        {
          label: "Solved LLM Hallucination",
          detail:
            "Policy Q&A produced factually incorrect answers. Introduced AWS Bedrock RAG pipeline + few-shot prompting → Q&A accuracy 85% (100-case test set).",
        },
        {
          label: "GPS Classification Accuracy",
          detail:
            "Speed-only classification: 60% accuracy. Added public transit stop matching for route context, applied RandomForest ensemble → 87% achieved.",
        },
        {
          label: "Redis Caching for Performance",
          detail:
            "Eco-mileage data fetched from external API on every request → latency. Redis cache-aside with TTL dramatically improved repeated-query response time.",
        },
      ],
    },
    githubUrl: "https://github.com/sophie-24/seoul-25-ht-RePlanet",
    notionUrl: "https://www.notion.so/26730ae595658052b688f05d0a6b3928",
  },
  {
    id: "dlog",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 55%, #fde68a 100%)",
    emoji: "🔊",
    ko: {
      title: "D-Log",
      period: "2026",
      role: "AI 서버 · 데이터 파이프라인",
      badge: "SOPKATHON 대상",
      badgeBg: "#b45309",
      shortDesc: "oneM2M 기반 층간소음 객관화 AI 플랫폼",
      desc: "Arduino ESP32 센서로 수집한 소음 데이터를 YAMNet + LSTM 모델로 분류하고, 법적 소음 기준과 자동 비교해 객관적 판정 리포트를 생성합니다.",
      tags: ["FastAPI", "YAMNet", "LSTM", "oneM2M", "Arduino", "ESP32", "Decision Fusion"],
      scopeTitle: "AI 서버 담당 범위",
      scope: [
        "FastAPI AI 추론 서버 설계 및 모델 서빙",
        "Arduino(ESP32) → oneM2M 플랫폼 → 서버 데이터 수신 파이프라인",
        "Zero-Padding 전처리 파이프라인 구축 (Arduino RAM 한계 극복)",
        "YAMNet 전이학습 + LSTM 시퀀스 모델 학습 파이프라인",
        "AI 판정 + 진동 센서 Decision Fusion 로직 구현",
        "소음 측정 결과 → 법적 기준 자동 비교 리포트 생성 API",
      ],
      highlightsTitle: "기술적 의사결정 & 트러블슈팅",
      highlights: [
        {
          label: "YAMNet 분류 정확도 개선",
          detail:
            "범용 사전학습 모델의 층간소음 분류 확신도가 30%에 불과. 직접 수집한 소음 데이터셋으로 YAMNet 전이학습 + LSTM 시퀀스 모델 추가 → 75% 달성.",
        },
        {
          label: "Arduino RAM 한계 극복 (100 → 900 샘플)",
          detail:
            "YAMNet 추론에 900샘플 필요하지만 Arduino는 100샘플만 처리 가능. 100샘플만 서버로 전송 후 서버에서 Zero-Padding(900샘플)을 적용하는 파이프라인으로 해결.",
        },
        {
          label: "Decision Fusion으로 오탐지 감소",
          detail:
            "AI 단독 판정 시 TV·청소기 소리를 층간소음으로 오탐지. 진동 센서 데이터를 AI 판정과 결합하는 Decision Fusion 로직 적용 → 오탐지율 감소.",
        },
      ],
    },
    en: {
      title: "D-Log",
      period: "2026",
      role: "AI Server · Data Pipeline",
      badge: "SOPKATHON Grand Prize",
      badgeBg: "#b45309",
      shortDesc: "oneM2M-based floor noise objectification AI platform",
      desc: "Classifies noise from Arduino ESP32 sensors using YAMNet + LSTM and auto-compares against legal noise standards to generate objective judgment reports.",
      tags: ["FastAPI", "YAMNet", "LSTM", "oneM2M", "Arduino", "ESP32", "Decision Fusion"],
      scopeTitle: "AI Server Responsibilities",
      scope: [
        "FastAPI AI inference server design and model serving",
        "Arduino(ESP32) → oneM2M platform → server data pipeline",
        "Zero-padding preprocessing pipeline (overcoming Arduino RAM limits)",
        "YAMNet transfer learning + LSTM sequence model training pipeline",
        "AI + vibration sensor Decision Fusion logic",
        "Noise measurement → auto legal standard comparison report API",
      ],
      highlightsTitle: "Technical Decisions & Troubleshooting",
      highlights: [
        {
          label: "Improved YAMNet Classification Accuracy",
          detail:
            "Generic pretrained model had only 30% confidence on floor noise. Transfer learning on custom-collected dataset + LSTM sequence model → 75% accuracy.",
        },
        {
          label: "Overcame Arduino RAM Constraint",
          detail:
            "YAMNet requires 900 samples; Arduino can only handle 100. Designed pipeline: transmit 100 samples → server-side Zero-Padding to 900 samples for inference.",
        },
        {
          label: "Decision Fusion Reduced False Positives",
          detail:
            "AI alone misclassified TV and vacuum sounds as floor noise. Combined AI classification with vibration sensor data via Decision Fusion logic → false positive rate reduced.",
        },
      ],
    },
    githubUrl: "https://github.com/sophie-24/Coss_IOT_2026",
    notionUrl: "https://www.notion.so/7e630ae59565829c928e810e1e4b1798",
  },
];

// ─── AWARDS ──────────────────────────────────────────────────────────────────
const awardsData = {
  ko: [
    { title: "SOPKATHON 대상", org: "SOPT", year: "2026", desc: "AI 추론 서버 및 데이터 파이프라인 담당" },
    { title: "서울AI재단 이사장상", org: "서울시 AI 해커톤 (122팀 → 20팀 본선)", year: "2025", desc: "팀장 · 백엔드·AI 파이프라인 담당" },
    { title: "우수상", org: "데이터안심구역 활용 경진대회 (138팀 → 17팀)", year: "2025", desc: "데이터 파이프라인 및 분석 담당" },
  ],
  en: [
    { title: "SOPKATHON Grand Prize", org: "SOPT", year: "2026", desc: "AI inference server & data pipeline" },
    { title: "Seoul AI Foundation Director Award", org: "Seoul AI Hackathon (top 20/122)", year: "2025", desc: "Team Lead · Backend & AI pipeline" },
    { title: "Excellence Award", org: "Data Safe Zone Competition (top 17/138)", year: "2025", desc: "Data pipeline & analysis" },
  ],
};

const certsData = [
  { title: "Azure AI-900", org: "Microsoft", year: "2026" },
  { title: "ADSP", org: "한국데이터산업진흥원", year: "2025" },
  { title: "AICE Basic", org: "KT · 한국경제신문", year: "2024" },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────
const skillsData = [
  { cat: "Language", items: ["Python", "Java", "JavaScript", "TypeScript", "C++"] },
  { cat: "Backend", items: ["FastAPI", "Spring Boot", "MySQL", "Redis", "PostgreSQL"] },
  { cat: "Data / AI", items: ["Pandas", "NumPy", "Scikit-learn", "YAMNet", "AWS Bedrock"] },
  { cat: "Infra", items: ["AWS EC2 / S3 / RDS", "Docker", "Nginx", "GitHub Actions"] },
  { cat: "Other", items: ["oneM2M", "Arduino", "React Native", "Chrome Extension"] },
];

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
const activitiesData = {
  ko: [
    {
      year: "2024",
      items: [
        { name: "네이버 코칭스터디", role: "데이터 사이언스 트랙" },
        { name: "Farm System", role: "보안·네트워크 트랙" },
        { name: "구름 유니브", role: "프론트엔드 트랙" },
      ],
    },
    {
      year: "2025",
      items: [
        { name: "서울 AI메이커 자치단 2기", role: "AI 프로덕트 기획·개발" },
        { name: "BDA 부트캠프", role: "데이터 분석 실습" },
        { name: "서울AI해커톤 🏅", role: "이사장상 수상" },
        { name: "데이터안심구역 🥈", role: "우수상 수상" },
      ],
    },
    {
      year: "2026",
      items: [
        { name: "SOPT 38기", role: "서버 파트 · Spring Boot API 개발" },
        { name: "SOPKATHON 🏆", role: "대상 수상" },
        { name: "AWS Student Builder", role: "클라우드 인프라 @ 동국대" },
        { name: "108 리더스 20기", role: "리더십 프로그램" },
      ],
    },
  ],
  en: [
    {
      year: "2024",
      items: [
        { name: "Naver Coaching Study", role: "Data Science Track" },
        { name: "Farm System", role: "Security & Network Track" },
        { name: "Goorm Univ", role: "Frontend Track" },
      ],
    },
    {
      year: "2025",
      items: [
        { name: "Seoul AI Maker Community 2nd", role: "AI Product Planning & Dev" },
        { name: "BDA Bootcamp", role: "Data Analysis Practicum" },
        { name: "Seoul AI Hackathon 🏅", role: "Director Award" },
        { name: "Data Safe Zone Competition 🥈", role: "Excellence Award" },
      ],
    },
    {
      year: "2026",
      items: [
        { name: "SOPT 38th", role: "Server Part · Spring Boot API Dev" },
        { name: "SOPKATHON 🏆", role: "Grand Prize" },
        { name: "AWS Student Builder", role: "Cloud Infra @ Dongguk Univ" },
        { name: "108 Leaders 20th", role: "Leadership Program" },
      ],
    },
  ],
};

// ─── COPY ─────────────────────────────────────────────────────────────────────
const copy = {
  ko: {
    name: "김규리",
    role: "Backend Engineer",
    tagline: "데이터와 AI 흐름을\n서비스 API로 연결합니다.",
    bio: "사용자 눈에 보이지 않는 곳에서 데이터 흐름을 설계하고, AI 추론 결과를 실제 서비스로 연결하는 백엔드 개발자입니다. FastAPI 멀티에이전트 파이프라인부터 Spring Boot RESTful API까지, 파이프라인 설계와 서버 최적화에 집중합니다.",
    school: "동국대학교 컴퓨터공학과",
    strengths: [
      {
        title: "Backend API Design",
        desc: "비동기 처리, 스케줄링, 외부 API 연동을 고려한 서비스 흐름 설계. FastAPI 멀티에이전트 구조부터 Spring Boot RESTful API까지.",
      },
      {
        title: "Data / AI Pipeline",
        desc: "센서, GPS, 정책 문서 등 다양한 소스를 전처리하고 AI 추론 결과를 API로 연결. 모델보다 파이프라인 설계에 강점.",
      },
      {
        title: "Deployment & Reliability",
        desc: "AWS EC2/RDS/S3, Redis 캐싱, Blue/Green 배포. 응답 속도와 운영 안정성을 직접 개선한 다수의 경험.",
      },
    ],
    navLinks: ["About", "Projects", "Skills", "Awards", "Activities"],
    sectionIds: ["about", "projects", "skills", "awards", "activities"],
    sectionLabels: {
      about: "01 // ABOUT",
      projects: "02 // PROJECTS",
      skills: "03 // SKILLS",
      awards: "04 // AWARDS",
      activities: "05 // ACTIVITIES",
    },
    expand: "상세 보기",
    collapse: "접기",
    certsLabel: "Certificates",
    contact: "같이 만들어봐요",
    contactDesc: "새로운 기회나 협업에 열려있습니다.",
    emailLabel: "Email",
  },
  en: {
    name: "Gyuri Kim",
    role: "Backend Engineer",
    tagline: "Connecting data & AI\nto production APIs.",
    bio: "Backend engineer who designs data flows and connects AI inference results to real services. Focused on pipeline architecture and server optimization — from FastAPI multi-agent systems to Spring Boot RESTful APIs.",
    school: "Dongguk University, Computer Science",
    strengths: [
      {
        title: "Backend API Design",
        desc: "Service-flow design considering async processing, scheduling, and external API integration. FastAPI multi-agent to Spring Boot.",
      },
      {
        title: "Data / AI Pipeline",
        desc: "Preprocessing diverse sources (sensors, GPS, policy docs) and wiring AI inference to production APIs. Strong on pipeline design.",
      },
      {
        title: "Deployment & Reliability",
        desc: "AWS EC2/RDS/S3, Redis caching, Blue/Green deployment. Multiple hands-on experiences improving response time and stability.",
      },
    ],
    navLinks: ["About", "Projects", "Skills", "Awards", "Activities"],
    sectionIds: ["about", "projects", "skills", "awards", "activities"],
    sectionLabels: {
      about: "01 // ABOUT",
      projects: "02 // PROJECTS",
      skills: "03 // SKILLS",
      awards: "04 // AWARDS",
      activities: "05 // ACTIVITIES",
    },
    expand: "View Details",
    collapse: "Collapse",
    certsLabel: "Certificates",
    contact: "Let's Build Together",
    contactDesc: "Open to new opportunities and collaborations.",
    emailLabel: "Email",
  },
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const t = copy[lang];

  const toggle = (id: string) => setOpenProject(openProject === id ? null : id);

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">

      {/* ── NAV ── */}
      <nav
        style={{ backdropFilter: "blur(12px)" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-slate-100"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-slate-900 tracking-tight text-sm">
            {t.name}
          </span>
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center mr-4">
              {t.navLinks.map((label, i) => (
                <a
                  key={label}
                  href={`#${t.sectionIds[i]}`}
                  className="px-3 py-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all"
            >
              {lang === "ko" ? "EN" : "KO"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-14">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-14">
            <div className="flex-1 max-w-2xl">
              <p className="text-blue-600 text-xs font-bold tracking-[0.25em] uppercase mb-7">
                {t.role}
              </p>
              <h1 className="text-[clamp(3.5rem,10vw,6rem)] font-bold tracking-tight text-slate-900 leading-none mb-7">
                {t.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium whitespace-pre-line mb-10">
                {t.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <a
                  href="https://github.com/sophie-24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://velog.io/@gyuri0504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-full font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  Velog ↗
                </a>
                <a
                  href="mailto:sophia.gyuri@gmail.com"
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-full font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {t.emailLabel} ↗
                </a>
              </div>
            </div>
            <div className="shrink-0 relative">
              <Image
                src="/profile.jpg"
                alt={t.name}
                width={240}
                height={240}
                className="w-44 h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow-xl shadow-slate-200"
              />
              <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                {lang === "ko" ? "동국대 컴공" : "CS @ DGU"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase mb-14">
            {t.sectionLabels.about}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium mb-6">
                {t.bio}
              </p>
              <p className="text-sm text-slate-400 font-medium">{t.school}</p>
            </div>
            <div className="flex flex-col gap-4">
              {t.strengths.map((s) => (
                <div
                  key={s.title}
                  className="border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/40 transition-all group"
                >
                  <p className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {s.title}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase mb-14">
            {t.sectionLabels.projects}
          </p>
          <div className="flex flex-col gap-5">
            {projects.map((project, idx) => {
              const p = project[lang];
              const isOpen = openProject === project.id;
              const reverse = idx % 2 === 1;
              return (
                <article
                  key={project.id}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-blue-200 shadow-lg shadow-blue-50"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {/* ── Card ── */}
                  <div
                    className={`flex flex-col md:flex-row ${
                      reverse ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Visual */}
                    <div
                      className="relative w-full md:w-72 lg:w-80 h-52 md:h-auto shrink-0 flex items-center justify-center"
                      style={{ background: project.gradient }}
                    >
                      <span className="text-7xl select-none" role="img" aria-hidden>
                        {project.emoji}
                      </span>
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-bold text-white/80 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span
                          className="text-xs font-bold text-white px-2.5 py-1 rounded-full inline-block shadow"
                          style={{ background: p.badgeBg }}
                        >
                          {p.badge}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-7 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {p.title}
                          </h3>
                          <div className="flex gap-2 shrink-0 mt-1">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors"
                            >
                              GitHub
                            </a>
                            <a
                              href={project.notionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              Notion
                            </a>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 font-medium mb-4">
                          {p.period} · {p.role}
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-5">{p.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(project.id)}
                        className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors w-fit"
                        aria-expanded={isOpen}
                      >
                        {isOpen ? t.collapse : t.expand}
                        <span
                          className="inline-block transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          ↓
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* ── Expanded Detail ── */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-7 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Scope */}
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-4">
                          {p.scopeTitle}
                        </p>
                        <ul className="space-y-2">
                          {p.scope.map((s) => (
                            <li key={s} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                              <span className="text-blue-400 shrink-0 font-bold mt-0.5">›</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Highlights */}
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-4">
                          {p.highlightsTitle}
                        </p>
                        <div className="space-y-3">
                          {p.highlights.map((h) => (
                            <div
                              key={h.label}
                              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-200 transition-colors"
                            >
                              <p className="font-semibold text-slate-900 text-sm mb-1.5">
                                {h.label}
                              </p>
                              <p className="text-slate-500 text-sm leading-relaxed">{h.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase mb-14">
            {t.sectionLabels.skills}
          </p>
          <div className="flex flex-col gap-5">
            {skillsData.map(({ cat, items }) => (
              <div key={cat} className="flex flex-wrap items-start gap-x-0 gap-y-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-28 shrink-0 mt-1.5">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:border-blue-300 hover:text-blue-700 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section id="awards" className="py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase mb-14">
            {t.sectionLabels.awards}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
                Awards & Hackathons
              </p>
              <div className="flex flex-col gap-0">
                {awardsData[lang].map((a, i) => (
                  <div key={a.title} className="flex gap-6 items-start pb-6 mb-0">
                    <span className="text-sm font-bold text-slate-200 shrink-0 w-10 pt-0.5">
                      {a.year}
                    </span>
                    <div className={`flex-1 ${i < awardsData[lang].length - 1 ? "pb-6 border-b border-slate-100" : ""}`}>
                      <p className="font-bold text-slate-900 mb-0.5">{a.title}</p>
                      <p className="text-xs text-slate-400 mb-2">{a.org}</p>
                      <p className="text-sm text-slate-500">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
                {t.certsLabel}
              </p>
              <div className="flex flex-col gap-0">
                {certsData.map((c, i) => (
                  <div key={c.title} className="flex gap-6 items-start">
                    <span className="text-sm font-bold text-slate-200 shrink-0 w-10 pt-0.5">
                      {c.year}
                    </span>
                    <div className={`flex-1 ${i < certsData.length - 1 ? "pb-6 mb-6 border-b border-slate-100" : ""}`}>
                      <p className="font-bold text-slate-900 mb-0.5">{c.title}</p>
                      <p className="text-xs text-slate-400">{c.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section id="activities" className="py-28 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase mb-14">
            {t.sectionLabels.activities}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {activitiesData[lang].map(({ year, items }) => (
              <div key={year}>
                <p className="text-7xl font-bold text-slate-100 mb-6 leading-none select-none">
                  {year}
                </p>
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-800">{item.name}</span>
                      <span className="text-xs text-slate-400">{item.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-28 bg-blue-600 border-t border-blue-500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.contact}</h2>
          <p className="text-blue-200 mb-10 text-lg">{t.contactDesc}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="mailto:sophia.gyuri@gmail.com"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors text-sm"
            >
              sophia.gyuri@gmail.com
            </a>
            <a
              href="https://github.com/sophie-24"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              GitHub ↗
            </a>
            <a
              href="https://velog.io/@gyuri0504"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Velog ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>© {new Date().getFullYear()} {t.name}</span>
          <span>Built with Next.js + Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
