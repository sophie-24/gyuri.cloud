import Image from "next/image";

const projects = [
  {
    title: "Tubify",
    period: "2026.03 - Present",
    role: "Backend Lead · AI Agent · Chrome Extension",
    summary:
      "YouTube 시청 데이터를 기반으로 광고성 영상을 걸러내고 관심사 뉴스레터를 자동 생성하는 개인화 큐레이션 서비스입니다.",
    problem:
      "긴 영상 목록을 단일 프롬프트로 처리하면서 응답 지연, 컨텍스트 손실, DB 세션 충돌이 함께 발생했습니다.",
    solution:
      "AI 에이전트를 역할별로 분리하고 asyncio 기반 병렬 호출 구조로 재설계했습니다. StreamingResponse(NDJSON)를 적용해 전체 처리 완료 전에도 결과를 순차적으로 전달하도록 개선했습니다.",
    impact: [
      "LLM 응답 시간 6초에서 2초로 단축",
      "체감 대기 시간 30초에서 5-10초로 개선",
      "Chrome Web Store 배포",
    ],
    backend: [
      "FastAPI 서버 구조 설계",
      "비동기 API 및 DB 세션 관리",
      "APScheduler 기반 뉴스레터 배치 작업",
      "Gemini API 병렬 호출 오케스트레이션",
      "Chrome Extension 연동 API 설계",
    ],
    tags: ["FastAPI", "Gemini API", "asyncio", "APScheduler", "PostgreSQL"],
    links: [
      { label: "GitHub", href: "https://github.com/sophie-24/SWproject-Team2-m" },
      { label: "Case Study", href: "https://www.notion.so/33330ae5956580ee85e6f0c9a2b94f70" },
    ],
    badge: "Chrome Web Store 배포",
  },
  {
    title: "D-Log",
    period: "2026",
    role: "AI Server · Data Pipeline",
    summary:
      "oneM2M 기반 센서 데이터를 수집하고 AI 소음 분류 결과를 법적 기준 리포트로 변환하는 층간소음 분석 플랫폼입니다.",
    problem:
      "Arduino 메모리 한계로 AI 모델 입력에 필요한 길이의 센서 데이터를 기기에서 직접 처리하기 어려웠습니다.",
    solution:
      "서버에서 Zero-Padding 기반 전처리 파이프라인을 구성하고, AI 소음 분류 결과와 진동 센서 데이터를 결합하는 Decision Fusion 로직을 설계했습니다.",
    impact: [
      "YAMNet 확신도 30%에서 전이학습 + LSTM 75%로 개선",
      "기기 100 samples 제한을 서버 900 samples 처리 구조로 보완",
      "SOPKATHON 대상 수상",
    ],
    backend: [
      "FastAPI AI 추론 서버 설계",
      "센서 데이터 수집 및 전처리 파이프라인",
      "YAMNet/LSTM 모델 서빙 흐름 구성",
      "Decision Fusion 기반 오탐 감소 로직",
      "소음 판정 리포트 생성 API",
    ],
    tags: ["FastAPI", "YAMNet", "LSTM", "oneM2M", "Arduino", "ESP32"],
    links: [
      { label: "GitHub", href: "https://github.com/sophie-24/Coss_IOT_2026" },
      { label: "Case Study", href: "https://www.notion.so/7e630ae59565829c928e810e1e4b1798" },
    ],
    badge: "SOPKATHON 대상",
  },
  {
    title: "RePlanet",
    period: "2025.09",
    role: "Team Lead · Backend · Data/AI",
    summary:
      "GPS 이동 데이터를 기반으로 교통수단을 분류하고 RAG 챗봇으로 탄소 절감 행동을 제안하는 서울시 에코마일리지 플랫폼입니다.",
    problem:
      "GPS 좌표만으로는 버스, 지하철, 도보 등 교통수단을 안정적으로 구분하기 어렵고, 정책 Q&A에서는 LLM 환각 가능성이 있었습니다.",
    solution:
      "정류장 위치 데이터와 GPS를 매칭한 뒤 RandomForest 분류 모델을 적용했습니다. 정책 Q&A는 AWS Bedrock 기반 RAG 구조로 구성해 근거 문서 중심으로 답변하도록 설계했습니다.",
    impact: [
      "GPS 교통수단 분류 정확도 60%에서 87%로 개선",
      "정책 Q&A 정확도 85% 달성",
      "서울AI재단 이사장상 수상",
    ],
    backend: [
      "FastAPI API 설계 및 구현",
      "MySQL 스키마 설계와 Redis 캐싱",
      "교통카드, 따릉이, GPS 외부 API ETL",
      "AWS Bedrock 기반 RAG 파이프라인",
      "EC2/RDS/S3 배포 환경 구성",
    ],
    tags: ["FastAPI", "AWS Bedrock", "MySQL", "Redis", "React Native", "C++"],
    links: [
      { label: "GitHub", href: "https://github.com/sophie-24/seoul-25-ht-RePlanet" },
      { label: "Case Study", href: "https://www.notion.so/26730ae595658052b688f05d0a6b3928" },
    ],
    badge: "서울AI재단 이사장상",
  },
];

const awards = [
  { title: "SOPKATHON 대상", org: "SOPT", year: "2026" },
  { title: "서울AI재단 이사장상", org: "서울시 AI 해커톤", year: "2025" },
  { title: "우수상", org: "데이터안심구역 활용 경진대회", year: "2025" },
];

const certs = [
  { title: "Azure AI-900", org: "Microsoft", year: "2026" },
  { title: "ADSP", org: "한국데이터산업진흥원", year: "2025" },
  { title: "AICE Basic", org: "KT · 한국경제신문", year: "2024" },
];

const skills = [
  { cat: "Language", items: ["Python", "Java", "JavaScript", "TypeScript", "C++"] },
  { cat: "Backend", items: ["FastAPI", "Spring Boot", "MySQL", "Redis"] },
  { cat: "Data / AI", items: ["Pandas", "NumPy", "Scikit-learn", "YAMNet", "AWS Bedrock"] },
  { cat: "Infra", items: ["AWS EC2/S3/RDS", "Docker", "Vercel", "Cloudtype"] },
  { cat: "Other", items: ["oneM2M", "Arduino", "React Native", "Vue.js"] },
];

const timeline = [
  {
    year: "2024",
    items: ["네이버 코칭스터디 데이터 사이언스", "Farm System 보안·네트워크 트랙", "에이닷 얼리어닷터 1기", "구름 유니브 프론트엔드"],
  },
  {
    year: "2025",
    items: ["서울 AI메이커 자치단 2기", "BDA 부트캠프", "서울AI해커톤 이사장상", "데이터안심구역 우수상", "ADSP 취득"],
  },
  {
    year: "2026",
    items: ["SOPT 38기 서버 파트", "SOPKATHON 대상", "AWS Student Builder @ DGU", "108 리더스 20기", "Azure AI-900 취득"],
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#fbfbf8] text-slate-900 font-sans">
      <section className="min-h-[92vh] flex flex-col justify-center px-6 py-20 max-w-5xl mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_220px]">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Backend Engineer</p>
            <h1 className="mb-5 text-6xl font-bold leading-none tracking-tight text-slate-950 md:text-7xl">김규리</h1>
            <p className="mb-3 text-2xl font-semibold text-slate-800">API와 데이터 흐름을 설계하는 백엔드 개발자</p>
            <p className="mb-9 max-w-2xl text-base leading-7 text-slate-600">
              FastAPI, Spring Boot, 데이터 파이프라인을 중심으로 보이지 않는 시스템의 안정성과 응답 경험을 개선합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: "https://github.com/sophie-24" },
                { label: "Velog", href: "https://velog.io/@gyuri0504" },
                { label: "Email", href: "mailto:sophia.gyuri@gmail.com" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <Image
            src="/profile.jpg"
            alt="김규리 프로필 사진"
            width={220}
            height={220}
            priority
            className="mx-auto rounded-lg object-cover md:mx-0"
          />
        </div>
      </section>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <SectionTitle eyebrow="About" title="문제를 구조로 풀고, 결과를 수치로 확인합니다." />
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
          <p className="text-xl font-medium leading-9 text-slate-800">
            사용자에게 직접 보이지 않는 서버, 데이터, 외부 API 연동 구간에서 병목과 불안정성을 찾고 개선하는 일을 좋아합니다.
            프로젝트마다 문제 상황, 선택한 해결 방식, 성능 개선 결과를 남기며 백엔드 역량을 쌓고 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "3+", label: "주요 프로젝트" },
              { n: "3", label: "수상 경험" },
              { n: "87%", label: "GPS 분류 정확도" },
              { n: "5-10s", label: "스트리밍 후 체감 대기" },
            ].map(({ n, label }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="mb-1 text-3xl font-bold text-blue-600">{n}</p>
                <p className="text-sm font-medium text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <SectionTitle eyebrow="Projects" title="백엔드 문제 해결 중심의 프로젝트" />
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <article key={project.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-950">{project.title}</h3>
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{project.badge}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    {project.period} · {project.role}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <p className="mb-6 max-w-3xl text-base leading-7 text-slate-700">{project.summary}</p>

              <div className="grid gap-6 border-y border-slate-200 py-6 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Problem</p>
                  <p className="text-sm leading-6 text-slate-700">{project.problem}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Solution</p>
                  <p className="text-sm leading-6 text-slate-700">{project.solution}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Impact</p>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li key={item} className="text-sm leading-6 text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.9fr]">
                <div>
                  <p className="mb-3 text-sm font-bold text-slate-900">Backend Scope</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.backend.map((item) => (
                      <li key={item} className="text-sm leading-6 text-slate-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 text-sm font-bold text-slate-900">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Awards" title="수상" />
            <div className="space-y-3">
              {awards.map((award) => (
                <div key={award.title} className="flex items-start justify-between gap-4 border-b border-slate-200 py-4">
                  <div>
                    <p className="font-bold text-slate-950">{award.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{award.org}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{award.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Certificates" title="자격" />
            <div className="space-y-3">
              {certs.map((cert) => (
                <div key={cert.title} className="flex items-start justify-between gap-4 border-b border-slate-200 py-4">
                  <div>
                    <p className="font-bold text-slate-950">{cert.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{cert.org}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <SectionTitle eyebrow="Skills" title="기술 스택" />
        <div className="space-y-5">
          {skills.map(({ cat, items }) => (
            <div key={cat} className="grid gap-3 border-b border-slate-200 pb-5 sm:grid-cols-[120px_1fr]">
              <p className="text-sm font-bold text-slate-950">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 max-w-5xl mx-auto">
        <SectionTitle eyebrow="Activities" title="활동" />
        <div className="grid gap-8 md:grid-cols-3">
          {timeline.map(({ year, items }) => (
            <div key={year}>
              <p className="mb-4 text-3xl font-bold text-slate-300">{year}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="text-sm leading-6 text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-14 max-w-5xl mx-auto border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-bold text-slate-950">김규리</p>
          <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-500">
            <a href="https://github.com/sophie-24" className="hover:text-blue-600">GitHub</a>
            <a href="https://velog.io/@gyuri0504" className="hover:text-blue-600">Velog</a>
            <a href="mailto:sophia.gyuri@gmail.com" className="hover:text-blue-600">sophia.gyuri@gmail.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
