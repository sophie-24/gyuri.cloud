"use client";

import Image from "next/image";
import { useState } from "react";

const LINKS = {
  github: "https://github.com/sophie-24",
  notion: "https://buly.kr/1RGkF2T",
  velog: "https://velog.io/@gyuri0504/posts",
  email: "mailto:sophia.gyuri@gmail.com",
};

/**
 * 이미지는 전부 16:9로 고정 크롭한다(object-cover).
 * 원본 비율이 제각각이어도 카드 높이가 일정하게 유지된다.
 * 파일은 public/projects/ 에 둔다.
 */
type Project = {
  name: string;
  tagline: string;
  category: string;
  period: string;
  org: string;
  role: string;
  description: string;
  impact: string;
  stack: string[];
  responsibilities: string[];
  decisions: { title: string; detail: string }[];
  image?: string;
  github?: string;
  demo?: { label: string; href: string };
};

type MoreProject = {
  name: string;
  category: string;
  period: string;
  metric: string;
  description: string;
  role: string;
  highlights: string[];
  stack: string[];
  thumb: string;
  github?: string;
  demo?: { label: string; href: string };
};

const projects: Project[] = [
  {
    name: "HAPHAP",
    tagline: "채용 전형 일정과 결과를 한곳에서 관리하는 캘린더 서비스",
    category: "PRODUCT · BACKEND",
    period: "2026.06 — Present",
    org: "SOPT APPJAM · 11인 팀",
    role: "Backend (2인 중 1인)",
    description:
      "지원한 공고의 전형 단계와 결과 발표일이 여러 채널에 흩어져 있다는 문제에서 출발했습니다. 2주 앱잼에서 안드로이드 파트 대상을 받은 뒤에도 팀을 유지하며, 2026년 12월~2027년 1월 정식 출시를 목표로 백엔드 스프린트를 이어가고 있습니다.",
    impact: "APPJAM 대상 · 17 APIs 명세 검증 · 무중단 배포 · 관측성",
    stack: ["Java 21", "Spring Boot 3.5", "PostgreSQL", "Redis", "Docker", "Nginx", "Prometheus"],
    responsibilities: [
      "pg_trgm + GIN 인덱스로 공고 검색·자동완성·인기 검색어 API 구현",
      "Kakao OAuth, JWT, Redis 기반 refresh token·blacklist 인증 흐름 설계",
      "GitHub Actions + Docker + Nginx Blue/Green 무중단 배포 구성",
      "Prometheus·Grafana 지표와 MDC 구조화 로그로 운영 가시성 확보",
      "기획 명세서·API 문서·실제 구현을 3중 대조해 17개 API의 스키마 불일치 정리",
    ],
    decisions: [
      {
        title: "동시 로그인 중복 계정 방지",
        detail:
          "사전 조회만으로는 동시성 문제가 해결되지 않는다는 점을 확인했습니다. provider + provider_id DB unique constraint와 conflict 후 재조회로 정합성을 보장했습니다.",
      },
      {
        title: "2주 안에 완성한 검색 설계",
        detail:
          "Elasticsearch 대신 PostgreSQL pg_trgm + GIN을 선택해 운영 복잡도는 낮추고, 추후 교체 가능한 검색 도메인 경계를 유지했습니다.",
      },
      {
        title: "인증 허용과 외부 노출 허용은 다른 문제",
        detail:
          "Prometheus 스크래핑이 401로 막혔을 때 permitAll로 여는 대신, 애플리케이션에서는 경로를 허용하고 외부 차단은 Nginx로 분리했습니다.",
      },
    ],
    image: "/projects/haphap.jpg",
    github: "https://github.com/team-haphap/haphap-server",
  },
  {
    name: "Tubify",
    tagline: "광고성 콘텐츠를 걸러내는 유튜브 교차분석 뉴스레터",
    category: "AI · BACKEND · CHROME EXTENSION",
    period: "2026.03 — Present",
    org: "동국대학교 공개SW프로젝트",
    role: "개발리드 · Backend",
    description:
      "유튜브 알고리즘은 보고 싶은 것이 아니라 계속 보게 만드는 것을 보여 줍니다. 여러 영상의 주장을 교차 검증해 광고를 걸러내고, 핵심만 뉴스레터로 전달하는 멀티에이전트 서비스입니다.",
    impact: "분석 6s → 2s · 토큰 40%↓ · LLM 호출 7회 → 1회",
    stack: ["FastAPI", "Gemini API", "asyncio", "asyncpg", "PostgreSQL", "Redis"],
    responsibilities: [
      "FastAPI 서버 아키텍처·라우터 분리와 비동기 DB 계층 전반 설계",
      "asyncpg + AsyncSessionLocal로 요청별 독립적인 async session 관리",
      "영상별 Gemini agent 병렬 오케스트레이션 및 뉴스레터 배치 스케줄링",
      "NDJSON StreamingResponse로 에이전트 결과를 순차적으로 전달",
    ],
    decisions: [
      {
        title: "Lost-in-the-Middle을 병렬 분해로 해결",
        detail:
          "비용을 아끼려고 영상 5개 자막을 한 프롬프트에 묶었더니 중간 영상 분석이 부실해졌습니다. 1영상 1호출로 쪼개고 asyncio.gather로 병렬화한 뒤, 교차 분석에는 영상당 핵심 주장 3개만 넘겼습니다. 응답은 6초에서 2초로, 토큰은 오히려 40% 줄었습니다.",
      },
      {
        title: "재시도로는 못 고치는 외부 API 차단",
        detail:
          "자막을 병렬로 수집하다 YouTube에 429로 막혔고, 이후 요청들이 타임아웃까지 기다리며 25초씩 쌓였습니다. Semaphore로 동시성을 제한하고 첫 차단을 전역 상태로 기록해 남은 요청은 대체 API로 즉시 우회시켰습니다. 대기 시간이 1.5초로 줄었습니다.",
      },
      {
        title: "6시 발송인데 6시 2분에 도착하던 뉴스레터",
        detail:
          "발송 시각에 AI 파이프라인을 시작한 것이 원인이었습니다. 10분 전에 미리 생성해 DB에 prepared 상태로 두고, 정시에는 발송만 하도록 분리했습니다. 배치의 완료 시각과 사용자가 기대하는 시각은 다릅니다.",
      },
    ],
    image: "/projects/tubify.png",
    github: "https://github.com/sophie-24/SWproject-Team2-m",
  },
  {
    name: "RePlanet",
    tagline: "GPS로 친환경 이동을 자동 인식하는 탄소절감 플랫폼",
    category: "AI · DATA · FULL-STACK",
    period: "2025.09",
    org: "서울 AI 재단 × AWS 해커톤 · 3인 팀",
    role: "팀장 · Backend · AI/데이터 파이프라인",
    description:
      "서울시 에코마일리지는 참여자는 많았지만 수동 기록의 번거로움과 교통 영역 미반영이라는 한계가 있었습니다. 이동 데이터를 자동으로 인식해 탄소 절감량을 계산하고 보상으로 연결했습니다.",
    impact: "이사장상 · 분류 정확도 60% → 87% · RAG Q&A 85%",
    stack: ["FastAPI", "AWS Bedrock", "Redis", "MySQL", "RandomForest"],
    responsibilities: [
      "FastAPI 기반 서버 구조와 API endpoint 전반 구현",
      "외부 교통·따릉이·GPS 데이터 3종을 연결하는 ETL 파이프라인 설계",
      "AWS Bedrock RAG: 정책 문서 임베딩, 검색, few-shot 응답 구성",
      "Redis cache-aside, EC2/RDS/S3 배포와 secret 관리 담당",
    ],
    decisions: [
      {
        title: "정책 Q&A 환각을 RAG로 제어",
        detail:
          "사실과 다른 정책 답변을 발견한 뒤, 근거 문서 검색과 few-shot prompting을 결합했습니다. 문서에 없으면 확인되지 않았다고 답하도록 제약하고 출처를 함께 반환했습니다. 100개 테스트 케이스에서 정확도 85%를 달성했습니다.",
      },
      {
        title: "속도 기준의 한계를 경로 문맥으로 보완",
        detail:
          "신호 대기와 정체 때문에 속도만으로는 버스와 자동차가 구분되지 않았습니다. 정류장 반경 50m 체류 여부를 우선 신호로 쓰고, 라벨링 데이터가 적은 상황을 고려해 RandomForest는 보조로만 썼습니다. 60%였던 분류 정확도가 87%가 됐습니다.",
      },
    ],
    image: "/projects/replanet.jpg",
    github: "https://github.com/sophie-24/seoul-25-ht-RePlanet",
  },
];

const moreProjects: MoreProject[] = [
  {
    name: "VULNERGY",
    category: "DATA ENGINEERING · 1인 개발",
    period: "2025",
    metric: "시뮬레이션 10s → 0.2s",
    description:
      "전력·금융·인구·기후 데이터를 결합해 행정동별 에너지 빈곤 위험을 지수화한 복지 의사결정 시스템입니다.",
    role: "데이터 수집부터 지표 설계, API, 시각화까지 전 과정을 1인 개발했습니다.",
    highlights: [
      "전력 사용량·경제 제약·사회적 취약성 등 7개 지표를 조합한 행정동 단위 EVI 모델 설계",
      "가중치를 바꿀 때마다 424개 행정동을 다시 계산해 10초가 걸리던 시뮬레이션을, 지표를 미리 계산해 두고 가중합만 NumPy로 처리해 0.2초로 단축",
      "고령·장애·1인 가구의 상관계수가 0.89~0.95로 높아 회귀에서 취약성 점수가 0으로 나오던 문제를, PCA로 축소하되 도메인 근거를 반영한 최소 가중치를 별도로 부여해 보정",
      "KEPCO API 응답을 Redis에 1시간 TTL로 캐싱해 조회를 2초에서 0.05초로 개선",
    ],
    stack: ["FastAPI", "MySQL", "Redis", "Scikit-learn", "PCA", "Isolation Forest", "D3.js"],
    thumb: "/projects/vulnergy.jpeg",
    github: "https://github.com/sophie-24/2025data_EVI",
  },
  {
    name: "청심환",
    category: "FINTECH · BACKEND",
    period: "2026.07 — 2026.08",
    metric: "KB AI Challenge · 2주 내 배포",
    description:
      "수출입 중소기업의 환노출 위험을 진단하고 헤지 전략과 금융상품을 추천하는 서비스입니다.",
    role: "서버 아키텍처 전체 설계와 구현, AI 서비스 연동, 배포를 담당했습니다.",
    highlights: [
      "환율 예측 AI가 실패해도 한국은행 ECOS 실데이터 기반 통계로 즉시 전환하고, 결과가 어느 경로에서 나왔는지 data_confidence로 사용자에게 그대로 노출",
      "상품 추천 근거를 LLM이 생성하지 않고 사전 검증된 구조화 데이터에서만 가져오도록 제한 — 금융 서비스에서는 그럴듯한 답보다 설명 가능한 답이 필요하다고 판단",
      "AI·추천·백엔드를 3개 레포로 분리하고 REST 계약을 먼저 고정해, 상대 구현이 없을 때는 Mock으로 3명이 병렬 개발",
      "배포 후 생성 API가 500을 뱉던 문제를 추측 대신 로그로 추적해 async lazy-load 이슈로 특정하고, 같은 패턴을 전수 검사해 미제보 엔드포인트 2건을 추가 수정",
    ],
    stack: ["FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy", "Docker", "Playwright"],
    thumb: "/projects/cheongsimhwan.png",
    github: "https://github.com/dong-k-k/server",
    demo: { label: "배포된 서비스", href: "https://cheongsimhwan.vercel.app/" },
  },
  {
    name: "D-Log",
    category: "AI SERVER · IOT DATA PIPELINE",
    period: "2026",
    metric: "소음 분류 확신도 30% → 75%",
    description:
      "소음·진동 데이터를 AI로 분류하고 법적 기준과 비교해 객관적 판정 리포트를 생성하는 oneM2M 기반 층간소음 플랫폼입니다.",
    role: "AI 추론 서버와 IoT 데이터 파이프라인을 담당했습니다.",
    highlights: [
      "직접 수집한 데이터로 YAMNet 전이학습과 LSTM을 결합해 층간소음 분류 확신도를 30%에서 75%로 개선",
      "Arduino의 100-sample RAM 제약을 서버 측 Zero-Padding으로 해결해 900-sample 추론 파이프라인 구현",
      "진동 센서와 AI 판정을 결합한 Decision Fusion으로 천둥·경적 같은 외부 소음 오탐을 줄임",
      "환경분쟁조정위 기준에 맞춰 Leq·Lmax를 계산하고 주·야간 임계값을 분리 적용한 증거 리포트 생성",
    ],
    stack: ["FastAPI", "YAMNet", "LSTM", "oneM2M", "Arduino", "ESP32"],
    thumb: "/projects/dlog.png",
    github: "https://github.com/sophie-24/Coss_IOT_2026",
  },
  {
    name: "GemPT",
    category: "LLM · RELIABILITY · FASTAPI",
    period: "2025.11",
    metric: "신뢰도 알고리즘 66% → 89%",
    description:
      "GPT와 Gemini가 서로의 응답을 검증하는 듀얼 AI 시스템으로, 단일 모델 답변의 신뢰도 한계를 보완합니다.",
    role: "개발리드로서 신뢰도 점수 알고리즘을 설계하고 FastAPI 서비스로 구현했습니다.",
    highlights: [
      "GPT를 해결자, Gemini를 검증자로 분리해 최대 5라운드까지 교차 검증하는 토론 루프 설계",
      "단순 승패 누적 방식의 정확도가 66%에 그쳐, 최근 성과를 더 반영하는 EMA 기반 점수와 토론 강도별 차등 배점으로 바꿔 89%까지 개선",
      "합의에 실패해도 무한 루프에 빠지지 않도록 5라운드 상한과 종료 조건을 두고, 미합의 사실과 판단 근거를 사용자에게 공개",
    ],
    stack: ["FastAPI", "GPT-4o", "Gemini API", "Pytest"],
    thumb: "/projects/gempt.png",
    github:
      "https://github.com/2025-X-Thon-Team2/2025-X-Thon-Team2_kongjjagkongjjagdugeundugeun",
  },
  {
    name: "Blur",
    category: "PRODUCT · BACKEND",
    period: "2026.05",
    metric: "SOPKATHON 대상 · 1박 2일",
    description:
      "익명 공감 경험을 통해 정서적 고립감을 완화하는 플랫폼으로, 공감을 받은 고민 카드가 자동으로 소각됩니다.",
    role: "고민 카드·리액션 API와 배포 환경을 담당했습니다.",
    highlights: [
      "1박 2일 해커톤에서도 EC2·Nginx·GitHub Actions 기반 Blue/Green 무중단 배포 구축",
      "JPA 양방향 연관관계 대신 ID 기반 느슨한 결합을 택해, 짧은 일정 안에서 도메인 변경 속도를 확보",
      "리액션 직후 카드가 소각되면 화면마다 상태가 어긋나는 문제를 구현 중 먼저 발견해 문서화하고, 기획팀과 소각 정책 수정을 논의",
    ],
    stack: ["Spring Boot", "JPA", "MySQL", "Docker", "Nginx"],
    thumb: "/projects/blur.png",
    github: "https://github.com/SOPT-all/38-SOPKATHON-SERVER-ANDROID3",
  },
  {
    name: "상담 음성데이터 AI POC",
    category: "SPEECH AI · MODEL EVALUATION",
    period: "2026.06 — Present",
    metric: "상담 34만 건 · CER 95% 목표",
    description:
      "한국사회보장정보원 산학협력 과제로, 상담 도메인에 맞는 음성 전사 성능을 검증하는 AI 기술 활용 POC입니다.",
    role: "Whisper STT 모델 파인튜닝과 성능 검증을 수행하고 있습니다.",
    highlights: [
      "상담 음성 데이터 특성을 반영한 Whisper STT 모델 fine-tuning 진행",
      "10만 건으로 학습하고 다른 10만 건으로 검증하는 구조에서 CER·WER 기준 성능 지표 설계",
      "개인정보를 포함한 상담 데이터를 가명처리한 뒤 검증하는 절차 준수",
    ],
    stack: ["Whisper", "STT", "CER / WER", "Model Evaluation"],
    thumb: "/projects/poc.png",
  },
];

/** 노션 About Me의 [1][2][3]을 그대로 옮긴 것 */
const principles = [
  {
    no: "01",
    title: "Evidence-Based Development",
    body: "“왜 이 데이터가 이렇게 흐르는가”, “어디에서 시스템이 느려지거나 깨지는가”를 근거로 확인하는 개발을 지향합니다. N+1 문제, 동시성 충돌 가능성, 외부 API 지연처럼 서비스 품질에 영향을 주는 문제를 데이터와 로그를 바탕으로 찾습니다.",
  },
  {
    no: "02",
    title: "Fast Adaptation, Deep Commitment",
    body: "새로운 기술과 낯선 도메인을 빠르게 익혀 실제 결과물로 연결합니다. 단순히 빠르게 끝내는 데 그치지 않고, 팀이 다음 단계에서도 유지·확장할 수 있는 구조를 남기려 합니다.",
  },
  {
    no: "03",
    title: "Collaboration & Ownership",
    body: "요구사항이 불명확하거나 직군 간 인터페이스가 어긋날 때, 문제를 먼저 구조화하고 API 명세·데이터 모델·작업 기준으로 정리해 팀의 실행 속도를 높이는 역할을 해왔습니다.",
  },
];

const skills = [
  ["Backend", "Java 21", "Spring Boot", "FastAPI", "JPA / QueryDSL", "SQLAlchemy"],
  ["Database", "PostgreSQL", "MySQL", "Redis", "pgvector", "pg_trgm"],
  ["Infra", "Docker", "Nginx", "GitHub Actions", "EC2 / RDS / S3", "Blue/Green"],
  ["Observability", "Prometheus", "Grafana", "Micrometer", "MDC Logging"],
  ["AI / Data", "AWS Bedrock", "Gemini API", "RAG", "Scikit-learn", "Pandas"],
];

const awards = [
  [
    "2026",
    "SOPT APPJAM 안드로이드 파트 대상",
    "HAPHAP · 11인 팀 2주 합숙 · 서버 담당 · 2026.12~2027.01 정식 출시 예정",
  ],
  [
    "2026",
    "SOPKATHON 안드로이드 파트 대상",
    "Blur · 1박 2일 안에 Spring Boot 백엔드와 Blue/Green 배포까지 구축",
  ],
  [
    "2025",
    "서울AI재단 이사장상",
    "RePlanet · 서울시 AI 해커톤 122팀 중 20팀 본선 진출 후 수상",
  ],
  [
    "2025",
    "데이터안심구역 경진대회 우수상",
    "VULNERGY · 138팀 중 17팀 선정, 그중 유일한 1인 개발 프로젝트",
  ],
];

const certificates = ["ADsP (2025)", "Microsoft Azure AI-900 (2026)", "AICE Basic (2024)"];

const navItems = [
  ["#about", "About"],
  ["#awards", "Awards"],
  ["#work", "Projects"],
  ["#skills", "Skills"],
];

function MoreButton({
  open,
  onClick,
  label = "더 보기",
  controls,
}: {
  open: boolean;
  onClick: () => void;
  label?: string;
  controls?: string;
}) {
  return (
    <button type="button" onClick={onClick} aria-expanded={open} aria-controls={controls} className="btn-more">
      {open ? "접기" : label}
      <span aria-hidden>{open ? "↑" : "↓"}</span>
    </button>
  );
}

export default function Home() {
  const [openDecisions, setOpenDecisions] = useState<string | null>("HAPHAP");
  const [openMoreProject, setOpenMoreProject] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111827] selection:bg-blue-100">
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-[#fafafa]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="text-sm font-black tracking-[-0.04em]">
            GYURI KIM<span className="text-blue-600">.</span>
          </a>
          <div className="hidden gap-8 text-xs font-bold text-slate-500 md:flex">
            {navItems.map(([href, label]) => (
              <a key={href} href={href} className="transition hover:text-blue-600">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={LINKS.email}
              className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
            >
              Contact ↗
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 md:hidden"
            >
              <span className="text-base leading-none">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-slate-200 bg-[#fafafa] px-6 py-3 md:hidden"
          >
            {navItems.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-bold text-slate-700"
              >
                {label}
              </a>
            ))}
            <a
              href={LINKS.notion}
              target="_blank"
              rel="noreferrer"
              className="block py-2.5 text-sm font-bold text-blue-600"
            >
              상세 포트폴리오 ↗
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden pt-16">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              Backend Engineer · Seoul, Korea
            </p>
            <h1 className="font-display max-w-3xl text-[clamp(2.75rem,6.5vw,5.75rem)] font-black leading-[.95] tracking-[-0.07em] text-slate-950">
              From data<br />to <span className="text-blue-600">dependable</span><br />products.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-slate-600">
              수면 위의 기능뿐 아니라, 그 아래의 데이터 흐름과 시스템이 안정적으로 작동하는 방식을
              설계하는 백엔드 엔지니어{" "}
              <strong className="font-bold text-slate-950">김규리</strong>입니다. Spring Boot와
              FastAPI로 서비스를 구현·배포하며, 데이터가 생성되고 저장되어 사용자 가치로 전달되는
              과정을 End-to-End로 경험해 왔습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Spring Boot", "FastAPI", "PostgreSQL", "Redis", "AWS", "Blue/Green", "RAG"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
                  >
                    {s}
                  </span>
                ),
              )}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                프로젝트 보기 ↓
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold transition hover:border-slate-950"
              >
                GitHub ↗
              </a>
              <a
                href={LINKS.notion}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold transition hover:border-slate-950"
              >
                상세 포트폴리오 ↗
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-100 to-transparent" />
              <Image
                src="/profile.png"
                alt="김규리 프로필 사진"
                width={340}
                height={420}
                priority
                className="relative h-[420px] w-[340px] rounded-[1.5rem] border border-slate-200 object-cover shadow-xl shadow-slate-200/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT (dark) ────────────────────────────────────────────────── */}
      <section id="about" className="bg-[#101827] py-24 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="eyebrow on-dark">ABOUT</h2>
          <p className="section-title on-dark">About Me</p>
          <p className="section-lead on-dark">
            좋은 백엔드는 API를 만드는 데서 끝나지 않고, 다른 직군이 제품을 완성할 수 있도록
            연결하는 일이라고 생각합니다.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.no}
                className="rounded-2xl border border-white/10 bg-white/[.04] p-7 transition hover:border-blue-400/40 hover:bg-white/[.07]"
              >
                <p className="text-xs font-black text-blue-300">{p.no}</p>
                <h3 className="mt-5 text-base font-bold leading-6 text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS (dark) ───────────────────────────────────────────────── */}
      <section id="awards" className="border-t border-white/10 bg-[#101827] py-24 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="eyebrow on-dark">RECOGNITION</h2>
          <p className="section-title on-dark">Awards</p>
          <div className="mt-12 border-t border-white/15">
            {awards.map(([year, title, description]) => (
              <div
                key={title}
                className="grid grid-cols-[64px_1fr] gap-5 border-b border-white/15 py-7"
              >
                <p className="text-xs font-black text-blue-300">{year}</p>
                <div>
                  <h3 className="text-lg font-bold tracking-[-.025em]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black tracking-[.14em] text-slate-400">CERTIFICATES</span>
            {certificates.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-xs font-semibold text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section id="work" className="bg-[#fafafa] py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="eyebrow">SELECTED WORK</h2>
          <p className="section-title">Projects</p>
          <p className="section-lead">
            대표 3개 프로젝트에는 의사결정의 맥락을, 아래 프로젝트에는 경험의 폭을 담았습니다.
          </p>

          <div className="mt-14 space-y-8">
            {projects.map((project, index) => {
              const open = openDecisions === project.name;
              const imageFirst = index % 2 === 1;
              const panelId = `decisions-${project.name}`;
              return (
                <article key={project.name} className="project-card">
                  <div className="grid gap-8 p-6 md:p-9 lg:grid-cols-2 lg:items-start lg:gap-10">
                    <div className={imageFirst ? "lg:order-2" : ""}>
                      <p className="text-[10px] font-black tracking-[.18em] text-slate-500">
                        {project.category}
                      </p>
                      <h3 className="mt-3 text-3xl font-black tracking-[-.05em] text-slate-950">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-base font-semibold text-blue-600">
                        {project.tagline}
                      </p>

                      <div className="meta-card mt-6">
                        <dl className="grid gap-y-2.5 text-xs">
                          <div className="flex gap-2.5">
                            <dt>소속</dt>
                            <dd>{project.org}</dd>
                          </div>
                          <div className="flex gap-2.5">
                            <dt>역할</dt>
                            <dd>{project.role}</dd>
                          </div>
                          <div className="flex gap-2.5">
                            <dt>기간</dt>
                            <dd>{project.period}</dd>
                          </div>
                        </dl>
                        <p className="meta-summary text-sm leading-8">{project.description}</p>
                      </div>

                      <p className="metric-pill mt-6">{project.impact}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
                          >
                            GitHub →
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-950"
                          >
                            {project.demo.label} ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <div className={imageFirst ? "lg:order-1" : ""}>
                      {project.image && (
                        <div className="relative mb-7 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          <Image
                            src={project.image}
                            alt={`${project.name} — ${project.tagline}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 46vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="detail-label">WHAT I OWNED</p>
                        <ul className="space-y-2.5">
                          {project.responsibilities.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-6 text-slate-600"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-blue-100 bg-blue-50/40 px-6 md:px-9">
                    <div className="flex flex-wrap items-center justify-between gap-4 py-5">
                      <span className="text-xs font-black tracking-[.16em] text-slate-600">
                        DECISIONS &amp; TROUBLESHOOTING ({project.decisions.length})
                      </span>
                      <MoreButton
                        open={open}
                        controls={panelId}
                        onClick={() => setOpenDecisions(open ? null : project.name)}
                      />
                    </div>
                    {open && (
                      <div id={panelId} className="reveal grid gap-3 pb-7 md:grid-cols-3">
                        {project.decisions.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-blue-100 bg-white p-4"
                          >
                            <p className="text-sm font-bold text-slate-950">{item.title}</p>
                            <p className="mt-2 text-xs leading-6 text-slate-600">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section id="skills" className="border-t border-slate-200 bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="eyebrow">TECHNICAL RANGE</h2>
          <p className="section-title">Skills</p>
          <p className="section-lead">프로젝트에서 직접 사용하고 배포까지 해본 기술만 적었습니다.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(([group, ...items]) => (
              <div key={group} className="rounded-2xl border border-slate-200 bg-[#fafafa] p-6">
                <p className="text-xs font-black uppercase tracking-[.14em] text-slate-950">
                  {group}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200"
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

      {/* ── MORE PROJECTS ───────────────────────────────────────────────── */}
      <section id="more" className="border-t border-slate-200 bg-[#fafafa] py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="eyebrow">MORE PROJECTS</h2>
          <p className="section-title">그 밖의 프로젝트</p>
          <p className="section-lead">
            대표작 외에 데이터·AI·IoT·금융 도메인에서 풀어온 문제들입니다.
          </p>

          <div className="mt-12 space-y-5">
            {moreProjects.map((project) => {
              const open = openMoreProject === project.name;
              const panelId = `more-${project.name}`;
              return (
                <article key={project.name} className="more-project-card p-6 md:p-7">
                  <div className="grid gap-6 md:grid-cols-[1fr_260px] md:items-start">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="text-[10px] font-black tracking-[.16em] text-blue-600">
                          {project.category}
                        </p>
                        <p className="text-xs font-semibold text-slate-400">{project.period}</p>
                      </div>
                      <h3 className="mt-2.5 text-2xl font-black tracking-[-.05em] text-slate-950">
                        {project.name}
                      </h3>
                      <p className="metric-pill mt-4">{project.metric}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {project.description}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                        <MoreButton
                          open={open}
                          controls={panelId}
                          onClick={() => setOpenMoreProject(open ? null : project.name)}
                        />
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-slate-500 transition hover:text-blue-600"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-slate-500 transition hover:text-blue-600"
                          >
                            {project.demo.label} ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <Image
                        src={project.thumb}
                        alt={`${project.name} 대표 이미지`}
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {open && (
                    <div id={panelId} className="reveal mt-6 border-t border-blue-100 pt-6">
                      <p className="text-sm font-bold text-slate-950">{project.role}</p>
                      <ul className="mt-4 space-y-2.5">
                        {project.highlights.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm leading-7 text-slate-600">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section className="bg-blue-600 px-6 py-20 text-center text-white md:py-24">
        {/* blue-100(#dbeafe)은 blue-600 위에서 4.24:1로 AA 미달 → blue-50은 4.75:1 */}
        <p className="text-xs font-bold tracking-[.2em] text-blue-50">LET&apos;S BUILD</p>
        <p className="mt-6 text-lg font-semibold text-white">
          새로운 기회와 협업에 열려 있습니다.
        </p>
        <a
          href={LINKS.email}
          className="mt-8 inline-block rounded-full bg-white px-9 py-4 text-base font-bold text-blue-700 transition hover:-translate-y-0.5"
        >
          sophia.gyuri@gmail.com ↗
        </a>
      </section>

      <footer className="bg-[#101827] px-6 py-8 text-center text-xs font-medium text-slate-400">
        <div className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={LINKS.notion} target="_blank" rel="noreferrer" className="hover:text-white">
            상세 포트폴리오
          </a>
          <a href={LINKS.velog} target="_blank" rel="noreferrer" className="hover:text-white">
            velog
          </a>
          <a href={LINKS.email} className="hover:text-white">
            Email
          </a>
        </div>
        © {new Date().getFullYear()} Gyuri Kim · Built with Next.js
      </footer>
    </main>
  );
}
