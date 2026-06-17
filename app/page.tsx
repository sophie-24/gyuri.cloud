import Image from "next/image";

const projects = [
  {
    title: "Tubify",
    period: "2026.03 ~",
    role: "개발 리드 · 백엔드 · AI",
    desc: "멀티에이전트 YouTube 개인화 큐레이션 서비스. 5개 AI 에이전트를 오케스트레이션해 광고·협찬 영상을 필터링하고 관심사 기반 뉴스레터를 자동 생성.",
    tags: ["FastAPI", "Gemini API", "asyncio", "Chrome Extension", "APScheduler"],
    scope: [
      "FastAPI 서버 전체 구조 설계 및 라우터 분리",
      "asyncpg + AsyncSessionLocal 3중 비동기 세션 관리",
      "APScheduler 기반 뉴스레터 발송 배치 작업 구현",
      "StreamingResponse(NDJSON) 스트리밍 API 설계",
      "Chrome Extension ↔ 서버 연동 API 설계 및 인증 처리",
      "Gemini API 병렬 호출 오케스트레이션 구조 설계",
    ],
    highlights: [
      "Lost in the Middle 해결 — 단일 프롬프트 → 에이전트 병렬 호출로 응답 6초 → 2초 단축",
      "asyncpg 세션 충돌 원인 분석 → 3중 비동기 구조로 DB 레이어 재설계",
      "StreamingResponse(NDJSON) 도입으로 체감 대기 30초 → 5~10초",
    ],
    badge: "Chrome Web Store 배포",
    badgeColor: "bg-blue-600 text-white",
    notionUrl: "https://www.notion.so/33330ae5956580ee85e6f0c9a2b94f70",
    githubUrl: "https://github.com/sophie-24/SWproject-Team2-m",
  },
  {
    title: "D-Log",
    period: "2026",
    role: "AI 서버 · 데이터 파이프라인",
    desc: "oneM2M 표준 기반 층간소음 객관화 플랫폼. AI 소음 분류 + 법적 기준 자동 리포트 생성.",
    tags: ["FastAPI", "YAMNet", "LSTM", "oneM2M", "Arduino", "ESP32"],
    scope: [
      "FastAPI AI 추론 서버 설계 및 모델 서빙",
      "Arduino(ESP32) → oneM2M 플랫폼 → 서버 데이터 수신 파이프라인",
      "Zero-Padding 전처리 파이프라인 구축 (Arduino RAM 한계 극복)",
      "YAMNet 전이학습 + LSTM 시퀀스 모델 학습 파이프라인",
      "AI 판정 + 진동 센서 Decision Fusion 로직 구현",
      "소음 측정 결과 → 법적 기준 자동 비교 리포트 생성 API",
    ],
    highlights: [
      "YAMNet 범용 모델 확신도 30% → 전이학습 + LSTM → 75% (자체 수집 데이터셋 기준)",
      "Arduino RAM 한계(100샘플) → 서버 Zero-Padding(900샘플)으로 AI 추론 파이프라인 구축",
      "AI 판정 + 진동 센서 Decision Fusion으로 단일 모달 대비 오탐지율 감소",
    ],
    badge: "🏆 SOPKATHON 대상",
    badgeColor: "bg-amber-500 text-white",
    notionUrl: "https://www.notion.so/7e630ae59565829c928e810e1e4b1798",
    githubUrl: "https://github.com/sophie-24/Coss_IOT_2026",
  },
  {
    title: "RePlanet",
    period: "2025.09",
    role: "팀장 · 풀스택 · AI",
    desc: "서울시 에코마일리지 탄소절감 플랫폼. GPS로 교통수단을 자동 감지하고, RAG 기반 AI 챗봇이 맞춤형 탄소 절감 코칭을 제공.",
    tags: ["FastAPI", "AWS Bedrock", "React Native", "MySQL", "Redis", "C++"],
    scope: [
      "FastAPI 서버 아키텍처 설계 및 API 엔드포인트 구현",
      "MySQL 스키마 설계 + Redis 캐싱 레이어 적용",
      "AWS Bedrock 기반 RAG 파이프라인 구축 (정책 문서 임베딩 + 검색)",
      "GPS 데이터 전처리 → 정류장 매칭 + RandomForest 교통수단 분류 모델",
      "교통카드 · 따릉이 · GPS 3개 외부 API ETL 파이프라인 설계",
      "EC2/RDS/S3 배포 및 환경변수·시크릿 관리",
    ],
    highlights: [
      "LLM Hallucination → RAG + Few-shot으로 정책 Q&A 정확도 85% (테스트셋 100건 기준)",
      "GPS 교통수단 분류 60% → 정류장 매칭 + RandomForest → 87%",
      "Redis 캐싱 도입으로 반복 조회 응답 속도 대폭 개선",
    ],
    badge: "서울AI재단 이사장상",
    badgeColor: "bg-sky-500 text-white",
    notionUrl: "https://www.notion.so/26730ae595658052b688f05d0a6b3928",
    githubUrl: "https://github.com/sophie-24/seoul-25-ht-RePlanet",
  },
];

const awards = [
  { title: "SOPKATHON 대상", org: "SOPT", year: "2026" },
  { title: "서울AI재단 이사장상", org: "서울시 AI 해커톤 (122팀 중 20팀 본선)", year: "2025" },
  { title: "우수상", org: "데이터안심구역 활용 경진대회 (138팀 중 17팀)", year: "2025" },
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
    items: ["네이버 코칭스터디 (데이터 사이언스)", "Farm System 보안·네트워크 트랙", "에이닷 얼리어닷터 1기", "구름 유니브 프론트엔드"],
  },
  {
    year: "2025",
    items: ["서울 AI메이커 자치단 2기", "BDA 부트캠프", "서울AI해커톤 이사장상 🏅", "데이터안심구역 우수상 🥈", "ADSP 취득"],
  },
  {
    year: "2026",
    items: ["SOPT 38기 서버 파트", "SOPKATHON 대상 🏆", "AWS Student Builder @ DGU", "108 리더스 20기", "Azure AI-900 취득"],
  },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-900 font-sans">

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 max-w-5xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
          <div className="flex-1">
            <p className="text-blue-600 text-sm font-semibold tracking-widest mb-5 uppercase">Backend Engineer</p>
            <h1 className="text-7xl font-bold tracking-tight mb-5 leading-none">김규리</h1>
            <p className="text-xl text-slate-600 mb-2 font-medium">FastAPI · Spring Boot · Data Pipeline</p>
            <p className="text-slate-500 mb-10">동국대학교 컴퓨터공학과</p>
            <div className="flex gap-6 text-sm">
              {[
                { label: "GitHub ↗", href: "https://github.com/sophie-24" },
                { label: "Velog ↗", href: "https://velog.io/@gyuri0504" },
                { label: "Email ↗", href: "mailto:sophia.gyuri@gmail.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-slate-500 hover:text-blue-600 font-medium transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/profile.jpg"
              alt="김규리"
              width={200}
              height={200}
              className="rounded-2xl object-cover w-44 h-44 md:w-52 md:h-52"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            사용자 눈에 보이지 않는 곳에서<br />
            데이터 흐름을 설계하고,<br />
            시스템이 안정적으로 동작하도록<br />
            <span className="text-blue-600 font-bold">백엔드와 데이터를 함께</span> 만듭니다.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "3+", label: "프로젝트" },
              { n: "3개", label: "수상" },
              { n: "87%", label: "GPS 분류 정확도" },
              { n: "40×", label: "Redis 캐시 속도" },
            ].map(({ n, label }) => (
              <div key={label} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <p className="text-3xl font-bold text-blue-600 mb-1">{n}</p>
                <p className="text-sm text-slate-600 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">Projects</h2>
        <div className="flex flex-col gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{p.period} · {p.role}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${p.badgeColor}`}>{p.badge}</span>
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors">
                    GitHub →
                  </a>
                  <a href={p.notionUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    상세 보기 →
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-6 leading-relaxed text-base">{p.desc}</p>

              {/* Backend Scope */}
              <div className="mb-6 bg-slate-50 rounded-xl p-5">
                <p className="text-sm font-bold text-slate-700 mb-3">백엔드 담당 범위</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {p.scope.map((s) => (
                    <li key={s} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-blue-500 shrink-0 font-bold">·</span>{s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <p className="text-sm font-bold text-slate-700 mb-3">핵심 문제 해결</p>
                <ul className="space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-blue-500 mt-0.5 shrink-0 font-bold">›</span>{h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Certificates */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Awards</h2>
            <div className="flex flex-col gap-4">
              {awards.map((a) => (
                <div key={a.title} className="flex items-start justify-between gap-4 bg-white rounded-xl border border-slate-200 px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900">{a.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{a.org}</p>
                  </div>
                  <span className="text-sm text-slate-500 shrink-0 mt-0.5 font-medium">{a.year}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Certificates</h2>
            <div className="flex flex-col gap-4">
              {certs.map((c) => (
                <div key={c.title} className="flex items-start justify-between gap-4 bg-white rounded-xl border border-slate-200 px-5 py-4">
                  <div>
                    <p className="font-bold text-slate-900">{c.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{c.org}</p>
                  </div>
                  <span className="text-sm text-slate-500 shrink-0 mt-0.5 font-medium">{c.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">Skills</h2>
        <div className="flex flex-col gap-6">
          {skills.map(({ cat, items }) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-slate-700 w-24 shrink-0">{cat}</span>
              {items.map((item) => (
                <span key={item} className="text-sm px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timeline.map(({ year, items }) => (
            <div key={year}>
              <p className="text-4xl font-bold text-slate-200 mb-4">{year}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-blue-500 shrink-0 font-bold">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 max-w-5xl mx-auto border-t border-slate-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <p className="font-bold text-lg text-slate-900">김규리</p>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="https://github.com/sophie-24" className="hover:text-blue-600 transition-colors">GitHub</a>
            <a href="https://velog.io/@gyuri0504" className="hover:text-blue-600 transition-colors">Velog</a>
            <a href="mailto:sophia.gyuri@gmail.com" className="hover:text-blue-600 transition-colors">sophia.gyuri@gmail.com</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
