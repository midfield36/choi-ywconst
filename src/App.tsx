/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

// 5대 핵심 사업 분야 (요구사항 엄격 준수)
interface BusinessArea {
  id: string;
  category: string;
  categoryEn: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const BUSINESS_AREAS: BusinessArea[] = [
  {
    id: 'architecture',
    category: '건축',
    categoryEn: 'ARCHITECTURE',
    title: '첨단 업무·의료·복합시설 건축',
    description: '사람, 정보, 문화가 융화되는 첨단 업무·의료·복합시설 건축을 통해 도시의 랜드마크를 창조합니다.',
    features: ['친환경 스마트 빌딩 솔루션', '초고층 복합문화공간 설계/시공', '엄격한 품질 및 무결점 시공'],
    icon: 'fa-building',
  },
  {
    id: 'housing',
    category: '주택',
    categoryEn: 'HOUSING',
    title: '고품격 주거공간 \'양우 내안愛\'',
    description: '실용적 공간설계와 쾌적함을 담은 고품격 주거공간 브랜드 \'양우 내안愛\'로 생활의 품격을 한 차원 높입니다.',
    features: ['인체공학적 혁신 평면 설계', '친환경 힐링 조경 단지 구현', '첨단 IoT 스마트 홈 네트워크'],
    icon: 'fa-house-chimney',
  },
  {
    id: 'civil',
    category: '토목',
    categoryEn: 'CIVIL WORKS',
    title: '사회 기반시설(SOC) 조성',
    description: '산업발전의 근간이 되는 도로, 하천, 부지 등 국가 핵심 인프라와 국토 균형 발전의 든든한 토대를 완성합니다.',
    features: ['고속도로 및 특수 교량 건설', '생태 하천 정비 및 치수 공학', '대규모 친환경 산업단지 부지조성'],
    icon: 'fa-road',
  },
  {
    id: 'plant',
    category: '플랜트/물류',
    categoryEn: 'PLANT & LOGISTICS',
    title: '대규모 산업시설 구축',
    description: '고도의 기술력과 시공 노하우가 집약된 대규모 첨단 제조시설 및 스마트 물류 인프라를 구축합니다.',
    features: ['초정밀 첨단 제조설비 플랜트', '스마트 자동화 물류 허브 시공', '고효율 에너지 세이빙 인프라'],
    icon: 'fa-industry',
  },
  {
    id: 'overseas',
    category: '해외/레저',
    categoryEn: 'OVERSEAS & LEISURE',
    title: '조화로운 미래 공간 창조',
    description: '용도와 주변 환경을 완벽하게 조화시켜 공간 이용 가치를 극대화하는 글로벌 외교 시설 및 프리미엄 레저 시설을 시공합니다.',
    features: ['국제 표준 외교공관 시공 역량', '자연친화 프리미엄 복합 리조트', '글로벌 엔지니어링 프로젝트 수행'],
    icon: 'fa-globe',
  },
];

// 5대 핵심 프로젝트 실적 (요구사항 엄격 준수)
interface ProjectItem {
  id: string;
  category: string;
  categoryEn: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string;
  location: string;
  highlight: string;
  gradient: string;
  icon: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    category: '건축',
    categoryEn: 'ARCHITECTURE',
    title: '판교창조경제밸리',
    subtitle: '미래 첨단 R&D 산업의 메카이자 랜드마크 복합업무단지',
    summary: '사람과 기술, 문화가 공존하는 최첨단 스마트 오피스 및 연구 인프라를 무결점 시공으로 완성하였습니다.',
    details: '지하 4층~지상 10층 규모의 고효율 친환경 복합업무 시설로, 첨단 정보통신 인프라와 쾌적한 아트리움 공간을 유기적으로 결합하여 대한민국 혁신 기술의 요람으로 자리 잡았습니다.',
    location: '경기 성남시 분당구 판교제2테크노밸리',
    highlight: '친환경 녹색건축 인증 최우수 등급',
    gradient: 'from-slate-800 to-indigo-950',
    icon: 'fa-city',
  },
  {
    id: 'proj-2',
    category: '주택',
    categoryEn: 'HOUSING',
    title: '킨텍스 양우내안애',
    subtitle: '일산 킨텍스 중심에 자리한 고품격 라이프스타일 랜드마크',
    summary: '실용성과 미학이 공존하는 혁신 특화설계와 친환경 테마공원을 도입한 명품 주거 단지입니다.',
    details: '전 세대 남향 위주의 과학적 주거 배치와 양우종합건설만의 브랜드 철학인 \'내안愛\'의 세심한 디테일을 담아, 삶의 여유와 프라이빗한 휴식을 제공하는 프리미엄 주거 공간입니다.',
    location: '경기 고양시 일산서구 킨텍스 역세권',
    highlight: '입주민 만족도 최상위 명품 주거 타운',
    gradient: 'from-blue-950 to-slate-900',
    icon: 'fa-building-user',
  },
  {
    id: 'proj-3',
    category: '토목',
    categoryEn: 'CIVIL WORKS',
    title: '낙동강살리기 33공구',
    subtitle: '생태 하천 복원 및 국가 치수 안전을 확보한 대표 SOC 프로젝트',
    summary: '풍수해 예방과 친수 공간 조성을 동시에 달성하며 영남권 젖줄의 생태계를 지켜낸 토목 공학의 결실입니다.',
    details: '하천 제방 보강, 친환경 생태 하도 정비 및 자연 친화적 수변 공원 조성을 정밀 공정으로 완수하여, 홍수 방어 능력을 획기적으로 향상시키고 지역 주민에게 친수 휴식처를 선사했습니다.',
    location: '경상북도 낙동강 유역 일원',
    highlight: '수자원 공학 기술력 기반 무재해 준공',
    gradient: 'from-cyan-950 to-slate-900',
    icon: 'fa-water',
  },
  {
    id: 'proj-4',
    category: '플랜트',
    categoryEn: 'PLANT',
    title: '대한전선 당진공장',
    subtitle: '글로벌 초고압 전력망을 책임지는 첨단 케이블 생산기지',
    summary: '엄격한 하중 계산과 내진 설계를 적용한 대규모 국가 기간 산업의 핵심 제조 플랜트입니다.',
    details: '초고압(EHV) 전력 케이블 생산을 위한 초대형 VCV(수직연속압출) 타워 및 정밀 크레인 레일 시스템을 완벽한 오차 범위 내에서 정밀 시공하여 대한민국 전력 산업의 수출 경쟁력을 견인했습니다.',
    location: '충남 당진시 아산국가산업단지',
    highlight: '초정밀 제조설비 최적화 하이테크 플랜트',
    gradient: 'from-amber-950/80 to-slate-900',
    icon: 'fa-industry',
  },
  {
    id: 'proj-5',
    category: '해외/레저',
    categoryEn: 'OVERSEAS',
    title: '주몽골대사관 청사',
    subtitle: '대한민국의 품격과 전통 미학을 세계에 알린 명품 외교 시설',
    summary: '혹한의 기후 조건을 극복하고 대한민국의 위상을 높인 재외공관 건축의 쾌거입니다.',
    details: '영하 40도를 밑도는 극한의 몽골 현지 환경 속에서도 고단열 외벽 특수 공법과 고내구성 자재를 적용하여 완벽한 보안과 한국적 조형미를 겸비한 대표적인 국가 외교 랜드마크로 완성되었습니다.',
    location: '몽골 울란바토르 수흐바타르구',
    highlight: '대한민국 재외공관 건축 품질 표창',
    gradient: 'from-emerald-950 to-slate-900',
    icon: 'fa-landmark',
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);

  // 문의 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    type: '사업 및 발주 문의',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('경기 의왕시 이미로 40, 인덕원IT밸리 B동 308호~312호');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        contact: '',
        email: '',
        type: '사업 및 발주 문의',
        message: '',
      });
    }, 4000);
  };

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(selectedFilter) || p.categoryEn.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#002C5F] selection:text-white">
      {/* 1. Header & Navigation (스크롤 시 고정되는 깔끔한 네비게이션) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#001f43]/95 backdrop-blur-md shadow-lg shadow-black/10 py-3.5 border-b border-white/10'
            : 'bg-gradient-to-b from-[#001733]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single clean element) */}
            <a href="#" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
              <div className="w-9 h-9 rounded-md bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:bg-blue-600 transition-colors">
                <i className="fa-solid fa-shapes text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  양우종합건설<span className="text-xs font-normal opacity-80 ml-0.5">(주)</span>
                </span>
                <span className="text-[10px] text-blue-200/70 tracking-widest -mt-0.5 font-medium">
                  YANGWOO CONST. 1958
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Single-line, quiet hover) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
              <a href="#about" className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-blue-400 whitespace-nowrap">
                회사소개
              </a>
              <a href="#business" className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-blue-400 whitespace-nowrap">
                사업분야
              </a>
              <a href="#projects" className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-blue-400 whitespace-nowrap">
                주요실적
              </a>
              <a href="#stability" className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-blue-400 whitespace-nowrap">
                재무건전성
              </a>
              <a href="#contact" className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-blue-400 whitespace-nowrap">
                오시는 길
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#002C5F] hover:bg-blue-700 border border-blue-400/30 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95"
              >
                <i className="fa-solid fa-phone text-[11px] text-blue-300"></i>
                <span>02-2021-0400</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-blue-300 p-2 focus:outline-none"
              aria-label="메뉴 열기"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#001733] border-b border-white/10 px-4 pt-3 pb-5 space-y-2 animate-fade-in text-sm font-medium">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-white/10 hover:text-white"
            >
              회사소개
            </a>
            <a
              href="#business"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-white/10 hover:text-white"
            >
              사업분야 (5대 핵심사업)
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-white/10 hover:text-white"
            >
              주요실적 (대표 프로젝트)
            </a>
            <a
              href="#stability"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-white/10 hover:text-white"
            >
              재무건전성 (부채비율 55.62%)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-slate-200 hover:bg-white/10 hover:text-white"
            >
              오시는 길 / 연락처
            </a>
            <div className="pt-2">
              <a
                href="tel:02-2021-0400"
                className="w-full text-center flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold"
              >
                <i className="fa-solid fa-phone"></i>
                대표전화 연결 (02-2021-0400)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (메인 비주얼 & 웅장한 신뢰감 표현) */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#001838] text-white pt-24 pb-16 overflow-hidden">
        {/* Background Architectural Canvas & Dynamic Blueprint Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Architectural Structural Grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          ></div>

          {/* Deep Navy Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001838] via-[#002450]/90 to-[#001838]"></div>

          {/* Ambient Architectural Light Beams */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-[#002C5F]/30 blur-3xl pointer-events-none"></div>

          {/* Majestic Architectural Silhouette SVG Graphic */}
          <svg
            className="absolute bottom-0 right-0 w-full max-w-4xl h-auto opacity-10 pointer-events-none"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 600V300L250 180V600H100Z" fill="white" />
            <path d="M250 600V180L400 90V600H250Z" fill="white" />
            <path d="M400 600V90L580 40V600H400Z" fill="white" />
            <path d="M580 600V40L720 130V600H580Z" fill="white" />
            <path d="M720 600V130L880 240V600H720Z" fill="white" />
            <path d="M880 600V240L1000 350V600H880Z" fill="white" />
            <line x1="0" y1="595" x2="1000" y2="595" stroke="white" strokeWidth="4" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="max-w-3xl space-y-6">
            {/* Unboxed Quiet Metadata Header (No pills) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-300 font-medium tracking-wider">
              <span>SINCE 1958</span>
              <span aria-hidden="true" className="opacity-50">·</span>
              <span>신뢰와 상생의 60여 년</span>
              <span aria-hidden="true" className="opacity-50">·</span>
              <span>부채비율 55.62% 최상위 재무건전성</span>
            </div>

            {/* Core Slogans as Dominant Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              기술과 열정으로 이룩하는 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
                공간문화의 새로운 지평
              </span>
            </h1>

            {/* Sub-headline with secondary official slogan */}
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
              "세상을 더 아름답게 만드는 양우종합건설" <br className="hidden sm:inline" />
              1958년 창립 이래 반세기를 뛰어넘는 기술 헤리티지와 탄탄한 재무구조로 대한민국 건축과 삶의 터전을 굳건히 지켜갑니다.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#business"
                className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2.5 active:scale-95"
              >
                <span>5대 핵심 사업분야</span>
                <i className="fa-solid fa-arrow-down text-xs"></i>
              </a>
              <a
                href="#projects"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <span>대표 시공 프로젝트</span>
                <i className="fa-solid fa-arrow-right text-xs text-blue-300"></i>
              </a>
            </div>
          </div>

          {/* Quantitative Rigor: Key Proof Metrics Strip */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">창립 연도</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                1958<span className="text-base font-normal text-blue-300 ml-1">년</span>
              </div>
              <p className="text-xs text-slate-300">60여 년 지속 경영의 역사</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">부채비율 (재무건전성)</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight tabular-nums">
                55.62<span className="text-base font-normal text-sky-200 ml-1">%</span>
              </div>
              <p className="text-xs text-slate-300">업계 최저 수준의 부채비율</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">신용평가등급</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 tracking-tight">
                A ~ A+
              </div>
              <p className="text-xs text-slate-300">건설공제조합 신용 최고 수준</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">대표 주거 브랜드</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                양우 내안愛
              </div>
              <p className="text-xs text-slate-300">품격 있는 고품질 명품 주택</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us (회사 소개: 1958년 역사, 고애림 대표이사, 탄탄한 내실) */}
      <section id="about" className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider text-[#002C5F] uppercase">
                  ABOUT YANGWOO GENERAL CONSTRUCTION
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  1958년부터 굳건히 지켜온 <br />
                  <span className="text-[#002C5F]">무결점 시공과 신뢰의 약속</span>
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-normal">
                양우종합건설(주)은 1958년 창립 이래 반세기가 넘는 시간 동안 국가 기간 인프라부터 최첨단 오피스, 고품격 주거공간에 이르기까지 대한민국 국토 개발과 도시 발전의 역사와 함께 숨 쉬어 왔습니다.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                건설 경기의 급격한 부침 속에서도 <strong>부채비율 55.62%</strong>라는 업계 최저 수준의 압도적인 재무안전성을 확립하고, 공인 신용평가기관 및 건설공제조합으로부터 <strong>A~A+ 등급</strong>의 신뢰를 공인받았습니다. 화려한 외형 확장보다 <strong>'내실 있는 정도경영'</strong>과 <strong>'철저한 책임시공'</strong>을 경영철학의 제1원칙으로 삼고 있습니다.
              </p>

              {/* CEO Message & Identity */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#002C5F] font-bold text-lg">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">양우종합건설(주) 대표이사</span>
                    <div className="text-lg font-bold text-slate-900 tracking-tight">
                      고 애 림
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg">
                  <span className="font-semibold text-slate-700">공식 웹사이트:</span> www.ywconst.com
                </div>
              </div>
            </div>

            {/* Right Card Column: 3대 핵심 경쟁력 */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-[#002C5F]"></i>
                <span>양우종합건설의 3대 핵심 경쟁력</span>
              </h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-bold text-xs">01</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">독보적인 재무 건전성</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        건설업계 평균을 크게 밑도는 부채비율 55.62%로 안정적인 자금 흐름과 흔들림 없는 책임 준공을 보증합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-bold text-xs">02</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">공인된 최우수 신용도</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        신용평가등급 A~A+ 및 건설공제조합 보증 역량을 바탕으로 발주처와 수분양자 모두에게 무결점 신뢰를 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-bold text-xs">03</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">반세기를 넘는 기술력</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        1958년 설립 이래 축적된 건축·토목·플랜트·주택 시공 경험으로 고난도 프로젝트를 완벽히 수행합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business Areas (5대 주요 사업 분야 - 요구사항 엄격 준수) */}
      <section id="business" className="py-20 sm:py-28 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-wider text-[#002C5F] uppercase">
              BUSINESS DOMAINS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              공간의 미래를 열어가는 <span className="text-[#002C5F]">5대 핵심 사업 분야</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              양우종합건설은 삶의 터전을 짓는 주택부터 첨단 산업시설, 국가 기간망까지 균형 잡힌 포트폴리오를 전개합니다.
            </p>
          </div>

          {/* 5대 사업 그리드 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_AREAS.map((area, idx) => (
              <div
                key={area.id}
                className={`group bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-2 bg-gradient-to-br from-white via-slate-50 to-blue-50/30' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#002C5F] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <i className={`fa-solid ${area.icon} text-lg`}></i>
                    </div>
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      0{idx + 1} · {area.categoryEn}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-600">[{area.category}]</span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#002C5F] transition-colors">
                      {area.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {area.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-blue-600 text-[10px]"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Projects (선별된 5대 대표 프로젝트 실적 - 요구사항 엄격 준수) */}
      <section id="projects" className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-[#002C5F] uppercase">
                KEY PROJECTS & PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                신뢰의 역사로 세워 올린 <span className="text-[#002C5F]">5대 대표 프로젝트</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                각 분야별 최고의 시공 기술력과 철저한 공정 관리가 응축된 상징적인 대표 실적입니다.
              </p>
            </div>

            {/* Filter Tabs (Interactive Filter Control) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedFilter === 'all'
                    ? 'bg-[#002C5F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체보기
              </button>
              {['건축', '주택', '토목', '플랜트', '해외'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedFilter === cat
                      ? 'bg-[#002C5F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 5대 프로젝트 카드형 갤러리 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Top Showcase Frame */}
                  <div className={`relative h-48 sm:h-52 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between text-white overflow-hidden`}>
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                        backgroundSize: '16px 16px',
                      }}
                    ></div>

                    {/* Category Label (Quiet unboxed) */}
                    <div className="relative z-10 flex items-center justify-between text-xs text-blue-200 font-medium">
                      <span>[{project.category}] {project.categoryEn}</span>
                      <i className={`fa-solid ${project.icon} text-lg opacity-60`}></i>
                    </div>

                    {/* Project Title inside Visual Frame */}
                    <div className="relative z-10 space-y-1">
                      <span className="text-[11px] font-medium text-slate-300 block">대표 시공 실적</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-200/90 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                      <i className="fa-solid fa-location-dot text-slate-400"></i>
                      <span className="truncate">{project.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                      <i className="fa-solid fa-medal text-blue-600"></i>
                      <span>{project.highlight}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action: Modal Details */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-[#002C5F] text-slate-700 hover:text-white font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>프로젝트 상세정보 확인</span>
                    <i className="fa-solid fa-arrow-right text-[11px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Financial Stability & Trust Section (부채비율 55.62% 및 신용등급 A~A+ 집중 조명) */}
      <section id="stability" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
                FINANCIAL HEALTH & TRUST
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
                건설업계 최저 수준 부채비율 55.62%, <br />
                <span className="text-sky-400">흔들림 없는 재무 신뢰</span>로 시공합니다
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                최근 건설 경기 불확실성과 고금리 환경 속에서도 양우종합건설은 무차입 경영에 준하는 탄탄한 유동성과 업계 최저 수준의 부채비율을 지속적으로 유지해 왔습니다.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                건설공제조합 신용등급 A~A+ 및 엄격한 신용관리 체계는 금융권, 공공 발주처, 협력사 및 수분양자 모두에게 완벽한 공기 준수와 품질 책임을 보증하는 가장 강력한 약속입니다.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-200 tracking-wide">
                건설업종 대비 재무 안정성 비교 지표
              </h3>

              {/* Debt Ratio Visual Comparison */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                    <span className="text-sky-300 font-bold">양우종합건설(주) 부채비율</span>
                    <span className="font-extrabold text-sky-300 tabular-nums">55.62%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 rounded-full transition-all duration-500" style={{ width: '37%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-400 mb-1.5">
                    <span>건설업계 평균 부채비율 (일반)</span>
                    <span className="tabular-nums">약 140~160%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-xs text-slate-400">신용평가등급</div>
                  <div className="text-xl font-bold text-white mt-0.5">A ~ A+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">최상위 신인도</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <div className="text-xs text-slate-400">책임시공 보증</div>
                  <div className="text-xl font-bold text-white mt-0.5">100%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">공기 지연 0건 원칙</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact & Location (오시는 길 & 연락처: 사옥 이전 멘트 절대 금지, 공식 주소 정확 표기) */}
      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold tracking-wider text-[#002C5F] uppercase">
              LOCATION & CONTACT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              고객 및 파트너와 함께하는 <span className="text-[#002C5F]">양우종합건설</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              신뢰와 기술로 보답하겠습니다. 본사 방문 및 프로젝트 문의는 언제든 편안하게 연락 주십시오.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Official Company Info & Map Area */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-building-columns text-[#002C5F]"></i>
                  <span>양우종합건설(주) 공식 본사 정보</span>
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#002C5F] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="fa-solid fa-location-dot text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-slate-500 font-medium">본사 주소</span>
                      <p className="font-semibold text-slate-900 mt-0.5">
                        경기 의왕시 이미로 40, 인덕원IT밸리 B동 308호~312호
                      </p>
                      <button
                        onClick={handleCopyAddress}
                        className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors"
                      >
                        <i className={`fa-solid ${copied ? 'fa-check text-green-600' : 'fa-copy'}`}></i>
                        <span>{copied ? '주소가 복사되었습니다' : '주소 복사하기'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#002C5F] flex items-center justify-center shrink-0 mt-0.5">
                      <i className="fa-solid fa-phone text-sm"></i>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium">대표전화</span>
                      <p className="font-bold text-slate-900 text-base mt-0.5">
                        <a href="tel:02-2021-0400" className="hover:text-blue-600 transition-colors">
                          02-2021-0400
                        </a>
                      </p>
                      <span className="text-xs text-slate-500">평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</span>
                    </div>
                  </div>

                  {/* Representative & Homepage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">대표이사</span>
                      <p className="font-semibold text-slate-900 mt-0.5">고애림</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium">공식 웹사이트</span>
                      <p className="font-semibold text-blue-600 mt-0.5">
                        <a href="http://www.ywconst.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          www.ywconst.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Interactive Frame Placeholder */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-200 relative h-64 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#002C5F] mb-3">
                    <i className="fa-solid fa-map-location-dot text-xl"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">경기 의왕시 이미로 40, 인덕원IT밸리</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm">
                    4호선 인덕원역 인근 / 포일숲속마을 입구 인덕원IT밸리 B동 308호~312호
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href="https://map.kakao.com/?q=경기 의왕시 이미로 40"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>카카오맵에서 보기</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                    <a
                      href="https://map.naver.com/v5/search/경기 의왕시 이미로 40"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>네이버지도에서 보기</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2">온라인 비즈니스 문의</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                시공 견적, 사업 제안, 협력업체 등록 등 제반 문의를 남겨주시면 담당 부서에서 신속히 안내해 드립니다.
              </p>

              {formSubmitted ? (
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">문의가 정상 접수되었습니다</h4>
                  <p className="text-xs text-slate-600">
                    남겨주신 연락처로 담당자가 신속히 연락드리겠습니다. 감사합니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      회사명 / 담당자 성명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: (주)한국파트너 / 홍길동 팀장"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="예: 010-1234-5678 또는 02-000-0000"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      문의 유형
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="사업 및 발주 문의">건축/주택/토목 사업 및 발주 문의</option>
                      <option value="플랜트 시공 견적">플랜트/물류 시공 견적 문의</option>
                      <option value="협력사 및 파트너십">협력업체 등록 및 제휴 문의</option>
                      <option value="기타 일반 문의">기타 일반 문의</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      문의 내용
                    </label>
                    <textarea
                      rows={4}
                      placeholder="프로젝트 개요, 사업 위치, 요청 일정 등을 자유롭게 기재해 주세요."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#002C5F] hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>온라인 문의 발송하기</span>
                    <i className="fa-solid fa-paper-plane text-[10px]"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer (법적 고지, 주소, 공식 정보 일체) */}
      <footer className="bg-[#001733] text-slate-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-lg font-bold text-white tracking-tight">양우종합건설(주)</span>
              <p className="text-slate-400 text-xs mt-1">
                기술과 열정으로 이룩하는 공간문화 · 세상을 더 아름답게 만드는 양우종합건설
              </p>
            </div>

            <div className="flex items-center gap-6 text-slate-300">
              <a href="#about" className="hover:text-white transition-colors">회사소개</a>
              <a href="#business" className="hover:text-white transition-colors">사업분야</a>
              <a href="#projects" className="hover:text-white transition-colors">주요실적</a>
              <a href="#contact" className="hover:text-white transition-colors">오시는 길</a>
              <a href="http://www.ywconst.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                웹사이트 바로가기
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 leading-relaxed">
            <div>
              <p><strong>상호명:</strong> 양우종합건설(주) | <strong>대표이사:</strong> 고애림 | <strong>설립연도:</strong> 1958년</p>
              <p className="mt-1"><strong>본사 주소:</strong> 경기 의왕시 이미로 40, 인덕원IT밸리 B동 308호~312호</p>
              <p className="mt-1"><strong>대표전화:</strong> 02-2021-0400 | <strong>공식 도메인:</strong> www.ywconst.com</p>
            </div>
            <div className="md:text-right space-y-1">
              <p>건설공제조합 신용평가 A~A+ 등급 | 부채비율 55.62% 최상위 재무건전성</p>
              <p className="text-slate-500">
                Copyright © 1958-2026 YANGWOO GENERAL CONSTRUCTION CO., LTD. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className={`p-6 bg-gradient-to-r ${activeModalProject.gradient} text-white flex justify-between items-start`}>
              <div>
                <span className="text-xs text-blue-200 font-semibold tracking-wider uppercase">
                  [{activeModalProject.category}] {activeModalProject.categoryEn}
                </span>
                <h3 className="text-2xl font-bold mt-1">{activeModalProject.title}</h3>
                <p className="text-xs text-slate-200 mt-0.5">{activeModalProject.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="text-white/80 hover:text-white p-1"
                aria-label="닫기"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">시공 위치</span>
                <p className="font-medium text-slate-900">{activeModalProject.location}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">핵심 시공 특장점</span>
                <p className="font-semibold text-blue-700">{activeModalProject.highlight}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">프로젝트 상세 개요</span>
                <p className="text-slate-600 leading-relaxed">{activeModalProject.details}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
