"use client";

import Image from "next/image";
import { useState } from "react";

type Project = {
  name: string;
  category: string;
  period: string;
  accent: string;
  description: string;
  impact: string;
  stack: string[];
  responsibilities: string[];
  decisions: { title: string; detail: string }[];
  github?: string;
};

const projects: Project[] = [
  {
    name: "HAPHAP",
    category: "PRODUCT · BACKEND",
    period: "2026.06 — Present",
    accent: "violet",
    description:
      "채용 공고부터 전형 일정과 결과까지 관리하는 모바일 서비스. 11인 팀의 2주 앱잼 이후, 실제 출시를 목표로 백엔드 스프린트를 이어가고 있습니다.",
    impact: "17 APIs · Zero-downtime deploy · Observability",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Prometheus"],
    responsibilities: [
      "pg_trgm + GIN 인덱스로 공고 검색·자동완성·인기 검색어 API 구현",
      "Kakao OAuth, JWT, Redis 기반 refresh token·blacklist 인증 흐름 설계",
      "GitHub Actions + Docker + Nginx Blue/Green 무중단 배포 구성",
      "Prometheus·Grafana 지표와 MDC 구조화 로그로 운영 가시성 확보",
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
    ],
  },
  {
    name: "Tubify",
    category: "AI · BACKEND · CHROME EXTENSION",
    period: "2026.03 — Present",
    accent: "blue",
    description:
      "YouTube 시청 흐름에서 광고성 콘텐츠를 거르고 관심사 기반 뉴스레터를 만드는 5-agent AI 서비스. FastAPI와 Chrome Extension을 연결해 공개 배포했습니다.",
    impact: "5 AI agents · 30s → perceived 5–10s · Chrome Web Store",
    stack: ["FastAPI", "Gemini API", "asyncio", "PostgreSQL", "APScheduler"],
    responsibilities: [
      "FastAPI 서버 아키텍처·라우터 분리와 비동기 DB 계층 전반 설계",
      "asyncpg + AsyncSessionLocal로 요청별 독립적인 async session 관리",
      "5개 Gemini agent 병렬 오케스트레이션 및 뉴스레터 배치 스케줄링",
      "NDJSON StreamingResponse로 에이전트 결과를 순차적으로 전달",
    ],
    decisions: [
      {
        title: "Lost-in-the-Middle 문제를 Pipeline A/B로 분리",
        detail:
          "한 번의 큰 프롬프트에서 중간 문맥이 누락되는 문제를 영상별 병렬 agent로 분해했습니다. 응답 시간은 약 6초에서 2초로 단축되고 필터링 품질도 개선됐습니다.",
      },
      {
        title: "기다리는 30초를 보이는 5–10초로",
        detail:
          "전체 파이프라인 완료를 기다리던 UX를 NDJSON 스트리밍으로 전환해, 사용자가 각 agent의 진행 결과를 즉시 확인할 수 있게 했습니다.",
      },
    ],
    github: "https://github.com/sophie-24/SWproject-Team2-m",
  },
  {
    name: "RePlanet",
    category: "AI · DATA · FULL-STACK",
    period: "2025.09",
    accent: "emerald",
    description:
      "GPS 기반 이동수단 분류와 탄소 절감 코칭을 결합한 서울 에코마일리지 AI 플랫폼. 팀장으로서 API, 데이터 파이프라인, RAG를 통합했습니다.",
    impact: "Director Award · accuracy 60% → 87% · RAG Q&A 85%",
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
          "사실과 다른 정책 답변을 발견한 뒤, 근거 문서 검색과 few-shot prompting을 결합했습니다. 100개 테스트 케이스에서 Q&A 정확도 85%를 달성했습니다.",
      },
      {
        title: "속도 기준의 한계를 경로 문맥으로 보완",
        detail:
          "속도만 쓰던 분류 정확도 60%에 정류장 매칭과 RandomForest를 더해 이동수단 분류 정확도를 87%까지 높였습니다.",
      },
    ],
    github: "https://github.com/sophie-24/seoul-25-ht-RePlanet",
  },
];

const skills = [
  ["Backend", "FastAPI", "Spring Boot", "PostgreSQL", "MySQL", "Redis"],
  ["AI / Data", "AWS Bedrock", "Gemini API", "RAG", "Scikit-learn", "Pandas"],
  ["Infra", "Docker", "Nginx", "GitHub Actions", "EC2 / RDS / S3", "Prometheus"],
];

const awards = [
  ["2026", "SOPKATHON 안드로이드 파트 대상", "Blur · Spring Boot 백엔드 · Blue/Green 배포"],
  ["2025", "서울AI재단 이사장상", "서울시 AI 해커톤 · 122팀 중 20팀 본선"],
  ["2025", "데이터안심구역 경진대회 우수상", "데이터 기반 서비스 기획·개발"],
];

export default function Home() {
  const [openProject, setOpenProject] = useState("HAPHAP");

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111827] selection:bg-blue-100">
      <nav className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/70 bg-[#fafafa]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="text-sm font-black tracking-[-0.04em]">GYURI KIM<span className="text-blue-600">.</span></a>
          <div className="hidden gap-7 text-xs font-semibold text-slate-500 md:flex">
            <a href="#work" className="hover:text-slate-950">WORK</a>
            <a href="#approach" className="hover:text-slate-950">APPROACH</a>
            <a href="#credentials" className="hover:text-slate-950">CREDENTIALS</a>
          </div>
          <a href="mailto:sophia.gyuri@gmail.com" className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-600">CONTACT ↗</a>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden pt-16">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-end gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-7 flex items-center gap-2 text-xs font-bold tracking-[0.17em] text-blue-600"><span className="h-2 w-2 rounded-full bg-blue-600" /> AVAILABLE FOR OPPORTUNITIES</p>
            <p className="mb-5 text-sm font-semibold text-slate-500">Backend Engineer · Seoul, Korea</p>
            <h1 className="max-w-4xl text-[clamp(3.25rem,8vw,7.25rem)] font-black leading-[.91] tracking-[-0.075em] text-slate-950">
              From data<br />to <span className="text-blue-600">dependable</span><br />products.
            </h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-slate-600">데이터와 AI를 사용자 가치로 전환하는 백엔드 엔지니어, <strong className="font-bold text-slate-900">김규리</strong>입니다. API 구현을 넘어 동시성, 성능, 배포와 운영까지 제품의 흐름을 설계합니다.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700">대표 프로젝트 보기 ↓</a>
              <a href="https://github.com/sophie-24" target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold transition hover:border-slate-950">GitHub ↗</a>
            </div>
          </div>
          <aside className="border-l border-slate-200 pl-7 lg:mb-1">
            <div className="mb-8 flex items-center gap-4">
              <Image src="/profile.png" alt="김규리 프로필" width={62} height={62} className="h-[62px] w-[62px] rounded-full object-cover grayscale" priority />
              <div><p className="font-bold">김규리 · Gyuri Kim</p><p className="mt-1 text-sm text-slate-500">Builds with evidence.</p></div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-y border-slate-200 py-6">
              {[['5', 'AI agents'], ['17', 'APIs verified'], ['87%', 'classification']].map(([number, label]) => <div key={label}><p className="text-2xl font-black tracking-[-.06em]">{number}</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p></div>)}
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-500">“좋은 백엔드는 API에서 끝나지 않고, 팀이 제품을 완성할 수 있도록 연결하는 일입니다.”</p>
          </aside>
        </div>
      </section>

      <section id="work" className="border-t border-slate-200 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">SELECTED WORK</p><h2 className="section-title">문제를 끝까지<br className="md:hidden" /> 해결한 기록.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">각 프로젝트에서 기술을 선택한 이유와, 사용자 경험에 영향을 준 문제를 어떻게 풀었는지를 담았습니다.</p></div>
          <div className="space-y-4">
            {projects.map((project, index) => {
              const open = openProject === project.name;
              return <article key={project.name} className={`project-card ${project.accent} ${open ? "is-open" : ""}`}>
                <button onClick={() => setOpenProject(open ? "" : project.name)} className="grid w-full gap-5 p-6 text-left md:grid-cols-[100px_1fr_auto] md:items-center md:p-9" aria-expanded={open}>
                  <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
                  <div><p className="mb-2 text-[10px] font-black tracking-[.18em] text-slate-500">{project.category}</p><h3 className="text-3xl font-black tracking-[-.055em] md:text-5xl">{project.name}</h3></div>
                  <div className="flex items-center justify-between gap-6 md:block md:text-right"><p className="text-xs font-semibold text-slate-500">{project.period}</p><span className="mt-3 inline-block text-xl transition-transform duration-300">{open ? "−" : "+"}</span></div>
                </button>
                {open && <div className="project-detail grid gap-10 border-t border-slate-200 px-6 py-8 md:grid-cols-[1.05fr_.95fr] md:px-9 md:py-10">
                  <div><p className="text-lg leading-8 text-slate-700">{project.description}</p><div className="mt-6 rounded-xl bg-slate-950 px-5 py-4 text-sm font-bold text-white">{project.impact}</div><div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">{item}</span>)}</div>{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="mt-7 inline-flex text-sm font-bold text-blue-600 hover:underline">View source on GitHub ↗</a>}</div>
                  <div className="grid gap-7"><div><p className="detail-label">WHAT I OWNED</p><ul className="space-y-3">{project.responsibilities.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />{item}</li>)}</ul></div><div><p className="detail-label">DECISIONS THAT MATTER</p><div className="space-y-3">{project.decisions.map((item) => <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-sm font-bold">{item.title}</p><p className="mt-1.5 text-xs leading-5 text-slate-500">{item.detail}</p></div>)}</div></div></div>
                </div>}
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="approach" className="bg-[#101827] py-24 text-white md:py-32"><div className="mx-auto max-w-7xl px-6"><p className="eyebrow text-blue-300">ENGINEERING APPROACH</p><div className="mt-6 grid gap-12 lg:grid-cols-[.85fr_1.15fr]"><h2 className="text-4xl font-black leading-[.98] tracking-[-.06em] md:text-6xl">기능을 만들고,<br /><span className="text-blue-400">신뢰를 설계합니다.</span></h2><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">{[["01", "Evidence first", "로그와 데이터로 병목을 확인하고, 가설을 검증해 개선합니다."], ["02", "Design for change", "짧은 일정에서도 교체 가능한 경계와 운영 가능한 선택을 만듭니다."], ["03", "Finish together", "명세·문서·코드를 함께 검증하며 다른 직군의 완주를 돕습니다."]].map(([number, title, description]) => <div key={number} className="bg-[#101827] p-6"><p className="text-xs font-bold text-blue-400">{number}</p><h3 className="mt-9 font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p></div>)}</div></div></div></section>

      <section id="credentials" className="border-t border-slate-200 bg-[#fafafa] py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[1.15fr_.85fr]"><div><p className="eyebrow">TECHNICAL RANGE</p><h2 className="section-title">제품의 흐름을<br />연결하는 기술.</h2><div className="mt-12 space-y-6">{skills.map(([group, ...items]) => <div key={group} className="grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-[130px_1fr]"><p className="text-xs font-black uppercase tracking-widest text-slate-400">{group}</p><div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">{item}</span>)}</div></div>)}</div></div><div><p className="eyebrow">RECOGNITION</p><div className="mt-12 border-t border-slate-200">{awards.map(([year, title, description]) => <div key={title} className="grid grid-cols-[54px_1fr] gap-4 border-b border-slate-200 py-6"><p className="text-xs font-black text-blue-600">{year}</p><div><h3 className="font-bold tracking-[-.025em]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div></div>)}</div></div></div></section>

      <section className="bg-blue-600 px-6 py-24 text-center text-white md:py-32"><p className="text-xs font-bold tracking-[.2em] text-blue-200">LET&apos;S BUILD</p><h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[.98] tracking-[-.06em] md:text-6xl">다음 제품의 흐름도<br />함께 설계하겠습니다.</h2><p className="mt-7 text-blue-100">새로운 기회와 협업에 열려 있습니다.</p><a href="mailto:sophia.gyuri@gmail.com" className="mt-9 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5">sophia.gyuri@gmail.com ↗</a></section>
      <footer className="bg-[#101827] px-6 py-6 text-center text-xs font-medium text-slate-500">© {new Date().getFullYear()} Gyuri Kim · Built with Next.js</footer>
    </main>
  );
}
