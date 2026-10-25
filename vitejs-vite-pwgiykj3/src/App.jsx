import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Flame, TrendingUp, ShoppingBag, MessageSquare, Sparkles,
  Play, ExternalLink, Bookmark, RefreshCw, Filter, ChevronRight,
  BarChart2, CheckCircle2, AlertTriangle, Copy, Check, Layers,
  Smartphone, Award, ArrowUpRight, Zap, Users, ShieldCheck,
  Clock, Share2, Eye, ThumbsUp, X, Plus, Terminal, Youtube,
  Instagram, Globe, Video, Compass, Hash, Radio, Menu
} from 'lucide-react';

// --- 4대 산업 카테고리 정의 ---
const CATEGORIES = [
  { id: 'all', name: '전체 산업군', sub: '4대 커머스 통합', badge: 'ALL' },
  { id: 'beauty', name: '뷰티 · 웰니스', sub: '올리브영 랭킹 & 리뷰', badge: 'OliveYoung' },
  { id: 'fashion', name: '패션 · 어패럴', sub: '무신사 · 29CM · 에이블리', badge: 'Musinsa/29CM' },
  { id: 'food', name: '식품 · F&B', sub: '컬리 · 쿠팡 로켓프레시', badge: 'Kurly/Coupang' },
  { id: 'app', name: '모바일 앱 · 디지털', sub: '구글플레이 · 앱스토어 · 센서타워', badge: 'AppStore' }
];

// --- 6대 트래픽 & 숏폼 채널 정의 ---
const CHANNELS = [
  { id: 'all', name: '전체 채널', sub: '전 매체 통합 분석', badge: 'ALL' },
  { id: 'shortform_all', name: '숏폼 통합 (Hot)', sub: '릴스 + 쇼츠 + 틱톡 바이럴', badge: 'Short-form' },
  { id: 'naver', name: '네이버 (Naver)', sub: '데이터랩 · 쇼핑 · 블로그', badge: 'N DataLab' },
  { id: 'instagram', name: '인스타그램', sub: '피드 · 공동구매 · 해시태그', badge: 'Instagram' },
  { id: 'reels', name: '인스타 릴스 (Reels)', sub: '급상승 오디오 · 릴스 밈', badge: 'IG Reels' },
  { id: 'youtube', name: '유튜브 · 쇼츠', sub: '인기 급상승 쇼츠 · 롱폼 리뷰', badge: 'YouTube' },
  { id: 'tiktok', name: '틱톡 (TikTok)', sub: '크리에이티브 센터 · 챌린지', badge: 'TikTok' }
];

// --- 채널별 실시간 급상승 키워드 매트릭스 데이터 ---
const CHANNEL_HOT_MATRIX = [
  {
    channelId: 'naver',
    channelName: 'NAVER 데이터랩 · 쇼핑',
    badgeText: '검색·구매전환 지표',
    keywords: [
      { rank: 1, word: '식물성 멜라토닌 구미', change: '+380%', cat: 'beauty', refId: 'ref-1' },
      { rank: 2, word: '그릭요거트 유청분리기', change: '+295%', cat: 'food', refId: 'ref-5' },
      { rank: 3, word: '스웨이드 호보백', change: '+215%', cat: 'fashion', refId: 'ref-3' }
    ]
  },
  {
    channelId: 'reels',
    channelName: 'Instagram · 릴스',
    badgeText: '저장·DM 공유 급증',
    keywords: [
      { rank: 1, word: '#출근룩코디 (쓰리피스)', change: '+410%', cat: 'fashion', refId: 'ref-4' },
      { rank: 2, word: '#새벽감성운세 (AI 사주)', change: '+340%', cat: 'app', refId: 'ref-6' },
      { rank: 3, word: '#올영추천템 (PDRN)', change: '+260%', cat: 'beauty', refId: 'ref-2' }
    ]
  },
  {
    channelId: 'youtube',
    channelName: 'YouTube · 인기 쇼츠',
    badgeText: '조회수·댓글 폭발',
    keywords: [
      { rank: 1, word: '홈카페 말차라떼 레시피', change: '+320%', cat: 'food', refId: 'ref-8' },
      { rank: 2, word: '가성비 흔들림 보정 앱', change: '+240%', cat: 'app', refId: 'ref-7' },
      { rank: 3, word: '피부과 시술 대신 홈케어', change: '+195%', cat: 'beauty', refId: 'ref-2' }
    ]
  },
  {
    channelId: 'tiktok',
    channelName: 'TikTok 크리에이티브',
    badgeText: '글로벌 밈·챌린지',
    keywords: [
      { rank: 1, word: 'ASMR 쫀득 쿠키 먹방', change: '+520%', cat: 'food', refId: 'ref-5' },
      { rank: 2, word: '나만의 AI 타로 챌린지', change: '+390%', cat: 'app', refId: 'ref-6' },
      { rank: 3, word: '수면 루틴 GRWM', change: '+310%', cat: 'beauty', refId: 'ref-1' }
    ]
  }
];

// --- 풍부한 초기 레퍼런스 & 멀티채널 시장조사 통합 데이터 ---
const INITIAL_REFERENCES = [
  {
    id: 'ref-1',
    category: 'beauty',
    categoryLabel: '뷰티 · 웰니스',
    primaryChannel: 'reels',
    activeChannels: ['naver', 'instagram', 'reels', 'tiktok'],
    memeTag: '#수면루틴GRWM #약국품절템',
    keyword: '식물성 멜라토닌 슬립 구미',
    growth: '+340%',
    blueOceanScore: 91,
    competitionLevel: '블루오션 (수요 폭증 · 초기 시장)',
    format: '인스타 릴스 · 메타 장기집행 (38일 연속)',
    platformSource: '올리브영 건강식품 실시간 2위',
    thumbnailTitle: '“새벽 3시까지 못 자던 내가 15분 만에 기절한 이유”',
    thumbnailSub: '해외 직구 대신 올영에서 쓸어담는 무설탕 식물성 멜라토닌',
    duration: '0:24',
    views: '184만',
    saves: '4.2만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '시계 03:12 AM 클로즈업 + 피곤한 눈 비비는 릴스 공감 밈' },
      { step: '중반 12초 (Body)', desc: '합성 수면유도제 부작용 언급 → 피스타치오 추출 식물성 원료 & 젤리 제형 강조' },
      { step: '후반 9초 (CTA)', desc: '“댓글에 [꿀잠] 남기면 최저가 링크 DM 발송” (인스타 자동화 연동)' }
    ],
    channelMetrics: {
      naver: { label: '네이버 월간 검색량', value: '148,500회', growth: '+340%', sub: '블로그 리뷰 4,200건 돌파' },
      instagram: { label: '인스타 해시태그·저장', value: '저장 4.2만', growth: '+290%', sub: '공구 셀러 45명 동시 진행 중' },
      reels: { label: '릴스 평균 조회수', value: '62만 회', growth: '+410%', sub: '댓글 DM 자동발송 전환율 14.2%' },
      youtube: { label: '유튜브 쇼츠 언급', value: '95만 회', growth: '+180%', sub: '약사 유튜버 성분 분석 영상 급상승' },
      tiktok: { label: '틱톡 크리에이티브', value: '120만 회', growth: '+310%', sub: '#나이트루틴 챌린지 음원 결합' }
    },
    searchVolumeTrend: [22, 28, 35, 48, 62, 79, 91, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 78, male: 22, coreAge: '25-34세 직장인 (64%)' },
    platformRankingTitle: '올리브영 · 네이버 쇼핑 매칭 TOP 3',
    rankings: [
      { rank: 1, name: '퓨어슬립 식물성 멜라토닌 타트체리 구미 60구', price: '28,900원', rating: '4.8', reviews: '4,820개', badge: '올영 1위' },
      { rank: 2, name: '나이트랩 피스타치오 멜라토닌 정 30일분', price: '32,000원', rating: '4.6', reviews: '2,150개', badge: '네이버 급상승' },
      { rank: 3, name: '닥터웰니스 딥슬립 마그네슘+멜라토닌 젤리', price: '24,500원', rating: '4.7', reviews: '1,490개', badge: '릴스 바이럴' }
    ],
    vocPainPoints: [
      { issue: '구미(젤리) 표면에 설탕 코팅이 많아 자기 전 양치 후 먹기 찝찝함', ratio: 44 },
      { issue: '알약 형태는 목넘김이 불편하고 특유의 허브 냄새가 올라옴', ratio: 31 },
      { issue: '1통(1개월분) 가격이 3만 원 이상으로 장기 복용 시 부담스러움', ratio: 25 }
    ],
    aiStrategies: [
      '“양치 후에도 그대로 씹어 드세요. 충치 걱정 없는 100% 자일리톨 무설탕 슬립 구미”',
      '“직구 배송 2주 기다리지 마세요. 오늘 주문하면 내일 밤 바로 꿀잠 자는 국내 정식 식약처 인증”',
      '“아침에 머리 무거운 수면유도제 그만! 개운하게 눈 떠지는 식물성 피스타치오 추출물”'
    ],
    channelScripts: {
      naver: '• [파워링크/쇼핑검색 제목]: 무설탕 식물성 멜라토닌 구미 | 양치 후 먹는 꿀잠젤리\n• [상세페이지 최상단 배너]: 올리브영 리뷰 4,800개가 증명한 15분 컷 수면 루틴 (식약처 인증 완료)',
      reels: '• [0~3초 화면 자막]: “자기 전 핸드폰 보느라 또 새벽 3시 넘긴 사람?”\n• [오디오]: 잔잔한 오르골 트렌드 음원 + 젤리 씹는 ASMR\n• [매니챗 유도]: “댓글에 [꿀잠] 치면 100원 체험딜 시크릿 링크 바로 보내드려요!”',
      youtube: '• [쇼츠 내레이션]: “현직 약사가 수면유도제 대신 자기 전에 딱 1알 챙겨 먹는 젤리가 있습니다. 핵심은 설탕 대신 자일리톨을 썼다는 건데요...”',
      tiktok: '• [챌린지 포맷]: #기절젤리챌린지 — 먹고 침대에 눕는 순간 화면이 바로 아침 해 뜨는 장면으로 전환되는 컷 편집'
    },
    crossChannelFunnel: '틱톡·릴스에서 #수면루틴GRWM 영상으로 호기심 유발 → 댓글 DM으로 자사몰/올리브영 유입 → 이탈자는 네이버에서 브랜드명 재검색 시 블로그 내돈내산 리뷰로 최종 구매 전환'
  },
  {
    id: 'ref-2',
    category: 'beauty',
    categoryLabel: '뷰티 · 웰니스',
    primaryChannel: 'youtube',
    activeChannels: ['naver', 'youtube', 'reels', 'instagram'],
    memeTag: '#피부과시술대체 #연어주사앰플',
    keyword: '고농축 식물성 PDRN 모공 앰플',
    growth: '+260%',
    blueOceanScore: 76,
    competitionLevel: '성장기 (메가 트렌드 진입)',
    format: '유튜브 쇼츠 · 인스타 릴스 비교 실험 (52일 집행)',
    platformSource: '올리브영 스킨케어 랭킹 1위',
    thumbnailTitle: '“피부과 리쥬란 30만 원 아끼는 홈케어 종결 조합”',
    thumbnailSub: '비린내 0% 저분자 장미 PDRN으로 모공 쫀쫀하게 조이는 법',
    duration: '0:19',
    views: '245만',
    saves: '5.8만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '현미경으로 확대한 늘어지고 패인 모공 비포/애프터 직관적 대조' },
      { step: '중반 10초 (Body)', desc: '기존 연어 유래 성분의 특유 비린내와 끈적임을 잡은 저분자 장미 PDRN 흡수력 테스트' },
      { step: '후반 6초 (CTA)', desc: '올리브영 오늘드림 1+1 더블 기획세트 마감 임박 카운트다운' }
    ],
    channelMetrics: {
      naver: { label: '네이버 월간 검색량', value: '215,000회', growth: '+260%', sub: '성분 키워드 검색 1위' },
      instagram: { label: '인스타 카드뉴스 저장', value: '저장 6.1만', growth: '+220%', sub: '뷰티 큐레이션 계정 집중 업로드' },
      reels: { label: '릴스 모공 비교 조회수', value: '110만 회', growth: '+280%', sub: '메이크업 전 꿀조합 릴스 흥행' },
      youtube: { label: '유튜브 쇼츠 조회수', value: '245만 회', growth: '+350%', sub: '피부과 전문의/디렉터파이급 분석 쇼츠 폭발' },
      tiktok: { label: '틱톡 글로벌 해시태그', value: '380만 회', growth: '+410%', sub: '#GlassSkin K-뷰티 트렌드 견인' }
    },
    searchVolumeTrend: [40, 48, 52, 61, 70, 82, 94, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 89, male: 11, coreAge: '25-44세 여성 (81%)' },
    platformRankingTitle: '올리브영 스킨케어 랭킹 TOP 3',
    rankings: [
      { rank: 1, name: '메디글로우 로즈 PDRN 모공 타이트닝 세럼 50ml', price: '26,400원', rating: '4.9', reviews: '9,410개', badge: '전체 1위' },
      { rank: 2, name: '바이오힐보 프로바이오덤 PDRN 리프팅 앰플', price: '31,200원', rating: '4.8', reviews: '5,320개', badge: '오늘드림 픽' },
      { rank: 3, name: '더마팩토리 연어 PDRN 10000ppm 샷 앰플', price: '18,900원', rating: '4.7', reviews: '3,890개', badge: '가성비 1위' }
    ],
    vocPainPoints: [
      { issue: '기존 연어 유래 PDRN 제품들은 은근한 비린내가 나서 손이 안 감', ratio: 48 },
      { issue: '고농축 제형이라 화장 전에 바르면 선크림이나 파운데이션이 밀림', ratio: 34 },
      { issue: '스포이드 용기가 끝까지 안 빨아들여져서 마지막에 쓰기 불편함', ratio: 18 }
    ],
    aiStrategies: [
      '“연어 비린내 0%! 무향·저분자 식물성 로즈 PDRN으로 아침 화장 전에도 밀림 없이 착붙”',
      '“마지막 한 방울까지 깔끔하게 쓰는 에어리스 펌프 용기 채택! 모공 속까지 꽉 채우는 탄력”',
      '“아프고 비싼 피부과 주사 대신, 매일 밤 바르는 무통증 모공 코르셋 앰플”'
    ],
    channelScripts: {
      naver: '• [스마트스토어/블로그 키워드]: 화장 안 밀리는 PDRN 앰플 / 식물성 로즈 PDRN 모공 세럼\n• [체험단 가이드]: 연어 성분 특유의 냄새가 전혀 없다는 점과 파운데이션 궁합 움짤 필수 삽입',
      reels: '• [0~3초 화면]: 끈적이는 앰플 바르고 파데 밀리는 끔찍한 상황 연출 → 우리 제품 바르고 쫀쫀하게 먹는 피부 비교',
      youtube: '• [쇼츠 기획]: “피부과에 100만 원 쓰고 깨달은 모공 줄이는 진짜 원리 (feat. 분자 크기의 비밀)”',
      tiktok: '• [비주얼 후킹]: 모공 카메라로 코 옆 나비존 1일 차 vs 7일 차 초근접 촬영 타임랩스'
    },
    crossChannelFunnel: '유튜브 쇼츠에서 성분 팩트체크로 신뢰도 확보 → 네이버에 “PDRN 앰플 추천” 검색 유도 → 올리브영 기획전 및 스마트스토어 더블 구성으로 객단가 상승'
  },
  {
    id: 'ref-3',
    category: 'fashion',
    categoryLabel: '패션 · 어패럴',
    primaryChannel: 'instagram',
    activeChannels: ['instagram', 'reels', 'naver'],
    memeTag: '#보부상가방 #출근룩코디',
    keyword: '비건 스웨이드 빅 호보백',
    growth: '+215%',
    blueOceanScore: 84,
    competitionLevel: '블루오션 (검색량 대비 브랜드 부족)',
    format: '인스타 감성 카루셀 · 릴스 코디북 (29일 집행)',
    platformSource: '29CM · 무신사 가방 주간 1위',
    thumbnailTitle: '“맥북 16인치 넣어도 쉐입 안 무너지는 출근 가방”',
    thumbnailSub: '비 오는 날에도 이염 걱정 없는 생활방수 워셔블 비건 스웨이드',
    duration: '0:15',
    views: '92만',
    saves: '3.9만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '가방에서 맥북, 텀블러, 파우치, 우산이 끝도 없이 나오는 마술 같은 수납력 연출' },
      { step: '중반 8초 (Body)', desc: '스웨이드 가방 위에 커피/물을 쏟아도 툭툭 털어내는 발수 코팅 시연 (이염 불안 해소)' },
      { step: '후반 4초 (CTA)', desc: '29CM 단독 20% 쿠폰 + 오늘 자정 마감 알림' }
    ],
    channelMetrics: {
      naver: { label: '네이버 쇼핑 검색량', value: '89,400회', growth: '+215%', sub: '여자 보부상 출근가방 연관검색 1위' },
      instagram: { label: '인스타 피드 저장수', value: '저장 3.9만', growth: '+340%', sub: '패션 매거진 계정 큐레이션 다수 노출' },
      reels: { label: '릴스 코디 조회수', value: '92만 회', growth: '+275%', sub: '#WhatIsInMyBag 포맷과 결합' },
      youtube: { label: '유튜브 룩북 언급', value: '41만 회', growth: '+140%', sub: '직장인 브이로그 왓츠인마이백 단골 등장' },
      tiktok: { label: '틱톡 코디 챌린지', value: '54만 회', growth: '+190%', sub: '#OfficeSiren 룩 트렌드와 매칭' }
    },
    searchVolumeTrend: [15, 22, 30, 42, 58, 73, 88, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 91, male: 9, coreAge: '20-34세 대학생·직장인 (84%)' },
    platformRankingTitle: '29CM · 무신사 가방 랭킹 TOP 3',
    rankings: [
      { rank: 1, name: '아틀리에드무드 워셔블 스웨이드 숄더 호보백 (3 Color)', price: '89,000원', rating: '4.9', reviews: '3,120개', badge: '29CM 1위' },
      { rank: 2, name: '르메종 비건 스웨이드 버클 빅백 브라운', price: '118,000원', rating: '4.7', reviews: '1,840개', badge: '무신사 급상승' },
      { rank: 3, name: '모노크롬 데일리 소프트 스웨이드 보부상백', price: '64,000원', rating: '4.6', reviews: '2,490개', badge: '에이블리 픽' }
    ],
    vocPainPoints: [
      { issue: '천연/일반 스웨이드는 밝은색 코트나 청바지에 갈색 이염이 묻어남', ratio: 52 },
      { issue: '노트북을 넣으면 바닥이 축 처져서 가방 핏이 안 예뻐짐', ratio: 29 },
      { issue: '어깨 끈이 얇아서 무거운 걸 넣으면 어깨가 배기고 흘러내림', ratio: 19 }
    ],
    aiStrategies: [
      '“흰 코트에 메도 이염 0%! 비·눈까지 튕겨내는 특수 발수 비건 스웨이드”',
      '“16인치 맥북을 넣어도 자연스러운 반달 쉐입 그대로! 탈부착 탄탄 바닥 패드 기본 내장”',
      '“어깨 흘러내림 없는 5cm 광폭 논슬립 숄더 스트랩으로 출퇴근길 피로도 제로”'
    ],
    channelScripts: {
      naver: '• [쇼핑검색 키워드]: 이염없는 스웨이드 가방 / 16인치 맥북 여자 출근가방 / 29CM 보부상 호보백\n• [상세페이지 GIF]: 밝은 아이보리 자켓에 문질러도 묻어나지 않는 테스트 움짤 최상단 배치',
      reels: '• [0~3초]: 스웨이드 가방에 물 쏟는 충격 장면 → 휴지로 쓱 닦아내며 멀쩡한 모습 공개\n• [캡션]: “보부상들 소리 질러! 맥북 넣고도 핏 안 무너지는 인생 호보백 찾음”',
      youtube: '• [쇼츠 기획]: “보부상 대장 직장인이 3달 동안 매일 들고 다닌 출근 가방 찐리뷰”',
      tiktok: '• [사운드 밈]: 가방 안에 물건 하나씩 던져 넣을 때마다 박자 맞춰 컷 전환되는 리듬 편집'
    },
    crossChannelFunnel: '인스타 감성 화보 및 릴스 수납력 시연으로 ‘저장’ 유도 → 29CM/무신사 입점 랭킹 배지로 신뢰 확보 → 네이버 브랜드 검색 광고로 자사몰 단독 쿠폰 제공'
  },
  {
    id: 'ref-4',
    category: 'fashion',
    categoryLabel: '패션 · 어패럴',
    primaryChannel: 'reels',
    activeChannels: ['reels', 'instagram', 'tiktok'],
    memeTag: '#체형커버슬랙스 #투웨이핏',
    keyword: '사이드 스냅 투웨이 와이드 데님/슬랙스',
    growth: '+185%',
    blueOceanScore: 79,
    competitionLevel: '블루오션 (숏폼 전환율 최상위)',
    format: '인스타 릴스 · 틱톡 체형별 피팅 비교 (21일 집행)',
    platformSource: '에이블리 · 무신사 팬츠 랭킹 1위',
    thumbnailTitle: '“허리는 한 줌, 골반은 볼륨 있게! 단추 하나로 끝내는 마법”',
    thumbnailSub: '수선 필요 없는 키작녀·키큰녀 기장별 맞춤 투웨이 스냅 팬츠',
    duration: '0:17',
    views: '156만',
    saves: '4.7만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '들뜨는 허리 뒷부분을 사이드 스냅 버튼으로 ‘딸깍’ 줄이는 쾌감 클로즈업' },
      { step: '중반 9초 (Body)', desc: '155cm / 163cm / 170cm 세 명의 모델이 나란히 서서 운동화에도 안 끌리는 기장 핏 비교' },
      { step: '후반 5초 (CTA)', desc: '1+1 교차 선택 시 무배 & 1만 원 즉시 할인' }
    ],
    channelMetrics: {
      naver: { label: '네이버 쇼핑 검색량', value: '64,200회', growth: '+170%', sub: '허리조절 와이드팬츠 검색 급증' },
      instagram: { label: '인스타 공구/코디', value: '저장 4.7만', growth: '+290%', sub: '체형별 비교 릴스 공유 폭발' },
      reels: { label: '릴스 조회수', value: '156만 회', growth: '+380%', sub: '딸깍 스냅 버튼 ASMR 후킹 적중' },
      youtube: { label: '유튜브 하울 언급', value: '52만 회', growth: '+160%', sub: '하체비만 코디 추천 영상 상위 노출' },
      tiktok: { label: '틱톡 트랜지션', value: '112만 회', growth: '+310%', sub: '스냅 잠그며 코디 바뀌는 컷 전환 유행' }
    },
    searchVolumeTrend: [28, 34, 41, 49, 63, 74, 86, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 86, male: 14, coreAge: '18-29세 여성 (79%)' },
    platformRankingTitle: '에이블리 · 무신사 팬츠 TOP 3',
    rankings: [
      { rank: 1, name: '핏메이커 사이드 투웨이 스냅 핀턱 와이드 슬랙스 (숏/미들/롱)', price: '34,900원', rating: '4.8', reviews: '7,840개', badge: '에이블리 1위' },
      { rank: 2, name: '데님스튜디오 벨티드 투웨이 커브드 진', price: '45,000원', rating: '4.8', reviews: '4,120개', badge: '무신사 2위' },
      { rank: 3, name: '무드온 히든밴딩 찰랑 롱 와이드 팬츠', price: '29,800원', rating: '4.7', reviews: '5,630개', badge: '재구매 1위' }
    ],
    vocPainPoints: [
      { issue: '골반/허벅지에 맞추면 허리가 남아서 벨트 없이는 못 입음', ratio: 49 },
      { issue: '총장이 너무 길어서 수선 맡기면 원래의 예쁜 와이드 핏이 망가짐', ratio: 33 },
      { issue: '스냅 단추가 헐거워서 앉았다 일어날 때 툭 풀리는 경우가 있음', ratio: 18 }
    ],
    aiStrategies: [
      '“골반에 맞추면 허리가 남던 하비 유목민 종결! 1초 스냅으로 허리 2인치 즉시 감소”',
      '“수선비 0원! 153cm 키작녀부터 172cm 키큰녀까지 운동화에 딱 떨어지는 3단 기장 세분화”',
      '“앉아도 절대 안 풀리는 고강도 이중 락(Lock) 스냅 버튼 업그레이드 적용”'
    ],
    channelScripts: {
      naver: '• [검색 키워드]: 하체비만 허리들뜸 없는 바지 / 키작녀 무수선 와이드 슬랙스\n• [상세페이지]: 체형별/키별 실제 착용 스펙 표와 앉았을 때 단추 고정력 테스트 영상 배치',
      reels: '• [0~3초]: 헐렁한 바지 허리춤 잡고 한숨 → 양옆 스냅 ‘딸깍’ 채우자마자 잘록해지는 허리 라인',
      youtube: '• [쇼츠 기획]: “허벅지 굵은 사람이 와이드 팬츠 잘못 입으면 더 부해 보이는 이유”',
      tiktok: '• [챌린지]: #딸깍팬츠 — 단추 채우는 소리에 맞춰 스트릿 댄스/워킹으로 이어지는 숏폼'
    },
    crossChannelFunnel: '릴스·틱톡의 1초 비포/애프터 핏 변화로 충동구매 자극 → 에이블리/무신사 무료교환 프로모션으로 사이즈 고민 제거'
  },
  {
    id: 'ref-5',
    category: 'food',
    categoryLabel: '식품 · F&B',
    primaryChannel: 'tiktok',
    activeChannels: ['tiktok', 'youtube', 'reels', 'naver'],
    memeTag: '#꾸덕그릭요거트 #유청분리기대란',
    keyword: '초고밀도 수제 그릭요거트 & 유청분리기 세트',
    growth: '+295%',
    blueOceanScore: 88,
    competitionLevel: '블루오션 (홈카페 밈 + 완제품 동반 폭증)',
    format: '틱톡 · 유튜브 쇼츠 ASMR 레시피 (33일 집행)',
    platformSource: '컬리 · 쿠팡 로켓프레시 유제품 1위',
    thumbnailTitle: '“숟가락이 안 빠지는 크림치즈급 꾸덕함 실화?”',
    thumbnailSub: '사먹는 값 1/4로 줄이는 대용량 그릭요거트 & 스프링 유청분리기',
    duration: '0:22',
    views: '312만',
    saves: '7.4만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '요거트 스쿱을 뒤집어도 전혀 안 떨어지는 극강의 꾸덕함 + 칼로 썰리는 ASMR' },
      { step: '중반 12초 (Body)', desc: '일반 요거트 1통 가격으로 일주일 내내 퍼먹는 가성비 비교 + 알룰로스/그래놀라 토핑 조합' },
      { step: '후반 7초 (CTA)', desc: '컬리/로켓프레시 새벽배송 내일 아침 7시 문 앞 도착 강조' }
    ],
    channelMetrics: {
      naver: { label: '네이버 검색량', value: '172,000회', growth: '+295%', sub: '그릭요거트 유청분리기 쇼핑 1위' },
      instagram: { label: '인스타 홈카페 태그', value: '저장 7.4만', growth: '+260%', sub: '#식단일기 #그릭요거트볼 인기' },
      reels: { label: '릴스 레시피 조회수', value: '185만 회', growth: '+330%', sub: '초간단 다이어트 디저트 레시피 공유' },
      youtube: { label: '유튜브 쇼츠 조회수', value: '290만 회', growth: '+370%', sub: '먹방 유튜버 대용량 토핑 쇼츠 유행' },
      tiktok: { label: '틱톡 ASMR 조회수', value: '312만 회', growth: '+520%', sub: '유청 짜내는 스프링 소리 ASMR 대유행' }
    },
    searchVolumeTrend: [18, 25, 33, 47, 64, 78, 92, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 82, male: 18, coreAge: '20-39세 식단관리·홈카페족 (76%)' },
    platformRankingTitle: '컬리 · 쿠팡 로켓프레시 TOP 3',
    rankings: [
      { rank: 1, name: '그릭데이 시그니처 꾸덕 그릭요거트 대용량 800g', price: '16,900원', rating: '4.9', reviews: '24,100개', badge: '컬리 1위' },
      { rank: 2, name: '홈카페랩 초미세 스텐 망 스프링 유청분리기 2L', price: '19,800원', rating: '4.8', reviews: '11,400개', badge: '쿠팡 1위' },
      { rank: 3, name: '요즘(YOZM) 플레인 그릭요거트 500g', price: '13,500원', rating: '4.9', reviews: '18,200개', badge: '재구매율 1위' }
    ],
    vocPainPoints: [
      { issue: '너무 꾸덕해서 퍽퍽하고 목이 막히며 신맛이 강해 그냥 먹기 힘듦', ratio: 41 },
      { issue: '대용량 통 제품은 개봉 후 일주일만 지나도 가장자리에 곰팡이가 핌', ratio: 36 },
      { issue: '유청분리기 거름망 틈새에 낀 요거트 찌꺼기 설거지가 너무 번거로움', ratio: 23 }
    ],
    aiStrategies: [
      '“신맛 0%, 우유 본연의 고소한 크림치즈 맛! 꿀 안 뿌려도 맛있는 특허 유산균 배합”',
      '“대용량 곰팡이 걱정 끝! 끝까지 신선하게 하나씩 뜯어 먹는 100g 개별 진공 소포장”',
      '“식기세척기 열탕 소독 OK! 요거트 끼임 없는 분리형 304 통스텐 메쉬 필터”'
    ],
    channelScripts: {
      naver: '• [쇼핑검색 키워드]: 신맛없는 꾸덕 그릭요거트 소포장 / 식기세척기 가능한 스텐 유청분리기\n• [블로그 바이럴]: 유명 브랜드 4종 꾸덕함 & 산미 비교표 포스팅으로 검색 유입 선점',
      reels: '• [0~3초]: 아이스크림 스쿱으로 묵직하게 떠서 뒤집어도 안 떨어지는 시각적 쾌감',
      youtube: '• [쇼츠 기획]: “우유 1통으로 3만 원어치 크림치즈 그릭요거트 연성하는 법”',
      tiktok: '• [ASMR]: 유청분리기 스프링 누를 때 맑은 유청 쏟아지는 소리 + 바삭한 그래놀라 부수는 소리'
    },
    crossChannelFunnel: '틱톡·쇼츠 ASMR 영상으로 시각/청각 자극 → 네이버에서 “신맛 없는 그릭요거트” 검색 → 컬리/쿠팡 로켓프레시 새벽배송 및 정기구독 유도'
  },
  {
    id: 'ref-6',
    category: 'app',
    categoryLabel: '모바일 앱 · 디지털',
    primaryChannel: 'reels',
    activeChannels: ['reels', 'instagram', 'tiktok', 'naver'],
    memeTag: '#새벽감성운세 #AI사주멘탈케어',
    keyword: '프리미엄 AI 사주 · 웰니스 멘탈케어 앱',
    growth: '+390%',
    blueOceanScore: 95,
    competitionLevel: '초특급 블루오션 (2030 여성 바이럴 1위)',
    format: '인스타 릴스 · 틱톡 스토리텔링 UA 소재 (44일 집행)',
    platformSource: '앱스토어 라이프스타일 급상승 1위',
    thumbnailTitle: '“내 불안함의 이유를 명리학으로 가장 다정하게 안아주는 AI”',
    thumbnailSub: '자극적인 흉살 겁주기 대신, 오늘 내 마음을 지키는 럭셔리 웰니스 운세',
    duration: '0:27',
    views: '210만',
    saves: '6.8만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '“요즘 왜 이렇게 마음이 조급할까?” 밤하늘 감성 일러스트와 내레이션으로 깊은 공감 유도' },
      { step: '중반 15초 (Body)', desc: '생년월일시 입력 즉시 내 기질과 현재 대운의 흐름을 분석하고 따뜻한 처방전을 건네는 채팅 UI 시연' },
      { step: '후반 9초 (CTA)', desc: '“지금 무료로 내 올해 감정 날씨와 귀인 시기 확인하기” 앱 설치 연결' }
    ],
    channelMetrics: {
      naver: { label: '네이버 검색량', value: '112,000회', growth: '+280%', sub: 'AI 사주 / 신년·이직운 검색 급증' },
      instagram: { label: '인스타 스토리 공유', value: '공유 6.8만', growth: '+450%', sub: '운세 결과 카드 인스타 스토리 인증 열풍' },
      reels: { label: '릴스 광고 전환율', value: '210만 회', growth: '+390%', sub: '새벽 11시~2시 감성 타깃 CPI 효율 최고점' },
      youtube: { label: '유튜브 쇼츠 언급', value: '78만 회', growth: '+210%', sub: 'MBTI vs 사주 기질 비교 쇼츠 흥행' },
      tiktok: { label: '틱톡 필터·챌린지', value: '165만 회', growth: '+390%', sub: '#내올해귀인찾기 결과 공유 밈 확산' }
    },
    searchVolumeTrend: [12, 19, 28, 41, 56, 74, 89, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 81, male: 19, coreAge: '20-34세 MZ세대 (83%)' },
    platformRankingTitle: '앱스토어 · 구글플레이 라이프스타일 TOP 3',
    rankings: [
      { rank: 1, name: '안도(Ando) - 마음을 읽는 프리미엄 웰니스 사주 AI', price: '무료 (인앱결제)', rating: '4.9', reviews: '14,200개', badge: '급상승 1위' },
      { rank: 2, name: '포스텔러 - 운세, 사주, 타로, 궁합 대표 앱', price: '무료 (인앱결제)', rating: '4.8', reviews: '92,400개', badge: '카테고리 1위' },
      { rank: 3, name: '점신 - 2026 운세 & 실시간 상담', price: '무료 (광고포함)', rating: '4.5', reviews: '68,100개', badge: '누적다운 1위' }
    ],
    vocPainPoints: [
      { issue: '기존 운세 앱들은 팝업 광고가 너무 덕지덕지 붙어 있어 몰입감이 깨짐', ratio: 46 },
      { issue: '“삼재다, 이별수다” 등 불안을 자극해 고액 결제를 유도하는 공포 마케팅에 피로감', ratio: 35 },
      { issue: '누구에게나 해당될 법한 뻔하고 추상적인 복붙 결과지만 나옴', ratio: 19 }
    ],
    aiStrategies: [
      '“겁주고 불안하게 만드는 사주는 그만. 흔들리는 새벽, 당신의 마음을 다독이는 웰니스 사주 테라피”',
      '“전면 배너 광고 0%! 오직 나만의 호흡으로 읽어나가는 프라이빗 럭셔리 저널 UI”',
      '“‘오늘 오후 3시, 어떤 대화를 조심해야 할까?’ 내 구체적인 고민에 실시간으로 답하는 AI 명리학 메이트”'
    ],
    channelScripts: {
      naver: '• [브랜드검색/블로그]: 소름 돋는데 마음은 편안해지는 AI 사주 후기 / 광고 없는 감성 운세 앱\n• [카페 바이럴]: 이직·연애 고민 게시판에 실제 위로받은 AI 상담 캡처본 자연스럽게 확산',
      reels: '• [0~3초]: “유독 나만 뒤처지는 것 같은 밤이라면, 지금 당신의 계절이 잠시 겨울일 뿐이에요.”\n• [비주얼]: 고급스러운 미니멀 타이포그래피와 따뜻한 웜톤 배경으로 기존 운세 광고와 완전히 차별화',
      youtube: '• [쇼츠 기획]: “MBTI보다 10배 정확하다는 내 타고난 기질과 번아웃 극복법 테스트”',
      tiktok: '• [바이럴 루프]: 친구/연인과 내 사주 오행 궁합 결과 카드를 틱톡 스토리에 공유하면 프리미엄 질문권 1회 무료 지급'
    },
    crossChannelFunnel: '인스타 릴스·틱톡의 감성 위로 카피로 앱 설치(CPI) 유도 → 앱 내 감각적인 ‘오늘의 안도 카드’를 인스타 스토리에 공유하게 만들어 오가닉 바이럴 루프 완성'
  },
  {
    id: 'ref-7',
    category: 'app',
    categoryLabel: '모바일 앱 · 디지털',
    primaryChannel: 'youtube',
    activeChannels: ['youtube', 'tiktok', 'reels'],
    memeTag: '#아이폰감성캠코더 #자동자막편집',
    keyword: '원클릭 빈티지 색감 & 숏폼 자동 자막 카메라 앱',
    growth: '+240%',
    blueOceanScore: 83,
    competitionLevel: '블루오션 (크리에이터 툴 수요 급증)',
    format: '유튜브 쇼츠 · 틱톡 비포/애프터 필터 시연 (27일 집행)',
    platformSource: '앱스토어 사진 및 비디오 2위',
    thumbnailTitle: '“그냥 찍기만 했는데 일본 영화 예고편 되는 필터 앱”',
    thumbnailSub: '찍는 동시에 말자막+예쁜 폰트까지 3초 만에 입혀주는 브이로그 치트키',
    duration: '0:16',
    views: '175만',
    saves: '5.1만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '칙칙한 지하철 출근길 기본 카메라 화면 → 필터 ON 순간 청량한 필름 영화 톤으로 반전' },
      { step: '중반 9초 (Body)', desc: '별도 편집 앱 없이 찍자마자 감성 말자막이 자동으로 달리는 과정 3초 컷 시연' },
      { step: '후반 4초 (CTA)', desc: '이번 주 다운로드 시 시그니처 필름 프리셋 5종 평생 무료 해금' }
    ],
    channelMetrics: {
      naver: { label: '네이버 검색량', value: '58,900회', growth: '+190%', sub: '아이폰 빈티지 캠코더 앱 검색 증가' },
      instagram: { label: '인스타 릴스 템플릿', value: '저장 5.1만', growth: '+280%', sub: '여행 브이로거 필수 앱 리스트 등극' },
      reels: { label: '릴스 필터 사용량', value: '130만 회', growth: '+260%', sub: '색감 정보 묻는 댓글 폭발' },
      youtube: { label: '유튜브 쇼츠 조회수', value: '175만 회', growth: '+240%', sub: '1분 만에 쇼츠 만드는 법 꿀팁 영상 흥행' },
      tiktok: { label: '틱톡 해시태그', value: '210만 회', growth: '+330%', sub: '#DigitalCamcorder2000s 트렌드 견인' }
    },
    searchVolumeTrend: [25, 31, 39, 48, 60, 72, 85, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 74, male: 26, coreAge: '18-29세 크리에이터·대학생 (80%)' },
    platformRankingTitle: '앱스토어 · 구글플레이 사진/비디오 TOP 3',
    rankings: [
      { rank: 1, name: '필름로그(FilmLog) - 빈티지 캠코더 & AI 감성 자막', price: '무료 (구독제)', rating: '4.8', reviews: '8,920개', badge: '급상승 1위' },
      { rank: 2, name: '다즈캠 (Dazz Cam) - 빈티지 카메라', price: '무료 (인앱결제)', rating: '4.9', reviews: '45,100개', badge: '스테디 1위' },
      { rank: 3, name: '캡컷 (CapCut) - 올인원 영상 편집', price: '무료 (구독제)', rating: '4.6', reviews: '120,000개', badge: '점유율 1위' }
    ],
    vocPainPoints: [
      { issue: '무료 체험 3일 후 사전 알림 없이 1년 치 연간 구독료가 한 번에 결제됨', ratio: 51 },
      { issue: '4K 영상 렌더링 시 발열이 심하고 저장 속도가 너무 느림', ratio: 28 },
      { issue: '한국어 감성 폰트가 부족하고 외래어 음성 인식 오타가 자주 남', ratio: 21 }
    ],
    aiStrategies: [
      '“연간 결제 낚시 0%! 내가 필요할 때만 부담 없이 쓰는 월 2,900원 커피 한 잔 값 패스”',
      '“다즈캠 색감에 캡컷 자막을 하나로! 앱 두 개 왔다 갔다 할 필요 없는 3초 원스톱 촬영”',
      '“한국 크리에이터가 가장 사랑하는 눈누/산돌 감성 한글 폰트 30종 기본 탑재”'
    ],
    channelScripts: {
      naver: '• [블로그/검색 키워드]: 다즈캠 대용 무료 필터 앱 / 릴스 자막 자동생성 앱 추천',
      reels: '• [0~3초]: “아직도 다즈캠으로 찍고 캡컷으로 옮겨서 자막 다세요? 이거 하나로 3초 컷입니다”',
      youtube: '• [쇼츠 기획]: “똥손도 찍기만 하면 조회수 10만 나오는 일본 영화 색감 세팅값 공개”',
      tiktok: '• [바이럴]: 영상 우측 하단에 세련된 날짜 스탬프(워터마크)를 기본 제공해 시청자가 앱 이름을 자연스럽게 검색하도록 유도'
    },
    crossChannelFunnel: '쇼츠·릴스 영상 자체에 감각적인 타임스탬프 워터마크 노출 → 댓글에 “무슨 카메라예요?” 질문 폭주 → 프로필 링크로 앱스토어 직행'
  },
  {
    id: 'ref-8',
    category: 'food',
    categoryLabel: '식품 · F&B',
    primaryChannel: 'naver',
    activeChannels: ['naver', 'youtube', 'instagram'],
    memeTag: '#저속노화식단 #혈당스파이크방지',
    keyword: '유기농 제주 첫물 말차 & 무설탕 라떼 파우더',
    growth: '+320%',
    blueOceanScore: 86,
    competitionLevel: '블루오션 (커피 대체재 디카페인/항산화 열풍)',
    format: '유튜브 쇼츠 · 네이버 브랜드스토어 기획전 (31일 집행)',
    platformSource: '네이버 쇼핑 차/음료 1위 · 컬리 베스트',
    thumbnailTitle: '“오후 2시 커피 대신 바꿨더니 오후 기절 현상 사라짐”',
    thumbnailSub: '설탕 0g! 에리트리톨·스테비아로 잡은 스타벅스급 진한 제주 말차라떼',
    duration: '0:20',
    views: '142만',
    saves: '3.6만',
    hookStructure: [
      { step: '초반 3초 (Hook)', desc: '점심 식사 후 커피 마시고 심장 두근거리며 피곤해하는 직장인 공감 장면' },
      { step: '중반 11초 (Body)', desc: '찬물/우유에도 전동 거품기 없이 3초 만에 뭉침 없이 녹는 쨍한 에메랄드빛 말차 시연' },
      { step: '후반 6초 (CTA)', desc: '네이버 도착보장 + 전용 미니 차선(거품기) 사은품 증정' }
    ],
    channelMetrics: {
      naver: { label: '네이버 검색량', value: '198,000회', growth: '+320%', sub: '무설탕 말차라떼 파우더 쇼핑 1위' },
      instagram: { label: '인스타 홈카페 피드', value: '저장 3.6만', growth: '+250%', sub: '초록색 감성 홈카페 유리컵 영상 인기' },
      reels: { label: '릴스 레시피 조회수', value: '88만 회', growth: '+230%', sub: '오트밀크+말차 조합 다이어트 레시피' },
      youtube: { label: '유튜브 쇼츠 조회수', value: '142만 회', growth: '+320%', sub: '저속노화·항산화 음료 추천 쇼츠 급등' },
      tiktok: { label: '틱톡 글로벌 말차', value: '450만 회', growth: '+480%', sub: '#MatchaMorning 루틴 전 세계 유행' }
    },
    searchVolumeTrend: [20, 27, 36, 48, 62, 77, 90, 100],
    weeklyLabels: ['8주전', '7주전', '6주전', '5주전', '4주전', '3주전', '2주전', '이번주'],
    demographics: { female: 79, male: 21, coreAge: '25-44세 직장인·웰니스족 (77%)' },
    platformRankingTitle: '네이버 쇼핑 · 컬리 음료 TOP 3',
    rankings: [
      { rank: 1, name: '제주그린 유기농 제로슈거 말차라떼 스틱 30포', price: '21,900원', rating: '4.9', reviews: '8,450개', badge: '네이버 1위' },
      { rank: 2, name: '오설록 프리미엄 말차 파우더 150g (무가당)', price: '18,000원', rating: '4.8', reviews: '6,120개', badge: '컬리 베스트' },
      { rank: 3, name: '슈퍼말차 클린 에너지 스틱 20개입', price: '24,000원', rating: '4.7', reviews: '3,290개', badge: '29CM 푸드 1위' }
    ],
    vocPainPoints: [
      { issue: '차가운 우유에 타면 가루가 안 녹고 덩어리져서 목에 걸림', ratio: 47 },
      { issue: '시중 말차라떼 파우더는 설탕이 80%라 마시고 나면 혈당이 확 오름', ratio: 34 },
      { issue: '저렴한 녹차가루를 섞어 써서 색이 탁하고 떫은 풀냄새가 심함', ratio: 19 }
    ],
    aiStrategies: [
      '“차선(거품기) 없어도 찬 우유에 3초 만에 사르르 녹는 초미세 나노 분쇄 공법”',
      '“당류 0g! 혈당 스파이크 걱정 없이 즐기는 100% 제주 첫물 유기농 차광재배 말차”',
      '“커피 마시면 손 떨리고 잠 못 자는 분들을 위한 L-테아닌 슬로우 카페인 루틴”'
    ],
    channelScripts: {
      naver: '• [검색광고/스마트스토어]: 찬물에 잘 녹는 무설탕 제주 말차라떼 스틱 / 당류 0g 저속노화 음료\n• [상세페이지]: 얼음 우유에 붓고 숟가락으로 3번만 저어도 완전히 녹는 무편집 원테이크 GIF',
      reels: '• [0~3초]: 투명한 유리컵에 얼음+오트밀크 붓고 진한 에메랄드빛 말차 샷이 그라데이션되며 퍼지는 비주얼',
      youtube: '• [쇼츠 기획]: “커피 끊고 아침마다 말차 마신 지 2주, 피부와 수면에 생긴 변화”',
      tiktok: '• [글로벌 포맷]: #MatchaTok — 사무실 책상 위에서 10초 만에 카페 퀄리티 아이스 말차라떼 제조하는 ASMR'
    },
    crossChannelFunnel: '유튜브 쇼츠에서 저속노화/커피 대체재 효능 어필 → 인스타 릴스에서 비주얼 레시피 확산 → 네이버 도착보장 및 선물하기 세트로 전환'
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState(['ref-1', 'ref-6']);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [activeRef, setActiveRef] = useState(null);
  const [activeTab, setActiveTab] = useState('market'); // 'market' | 'voc' | 'ai' | 'funnel'
  const [scriptChannelTab, setScriptChannelTab] = useState('reels');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('오늘 06:00 AM (자동 수집 완료)');
  const [references, setReferences] = useState(INITIAL_REFERENCES);
  const [sortBy, setSortBy] = useState('growth'); // 'growth' | 'blueOcean'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 단축키 Ctrl+K 지원
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
      if (e.key === 'Escape' && activeRef) {
        setActiveRef(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRef]);

  // 산업 카테고리 + 6대 채널 + 검색어 통합 필터링
  const filteredReferences = useMemo(() => {
    return references
      .filter((item) => {
        const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
        const matchChannel =
          selectedChannel === 'all'
            ? true
            : selectedChannel === 'shortform_all'
            ? item.activeChannels.some((c) => ['reels', 'youtube', 'tiktok'].includes(c))
            : item.activeChannels.includes(selectedChannel) || item.primaryChannel === selectedChannel;
        const matchSaved = !showSavedOnly || savedIds.includes(item.id);
        const q = searchQuery.trim().toLowerCase();
        const matchQuery =
          !q ||
          item.keyword.toLowerCase().includes(q) ||
          item.memeTag.toLowerCase().includes(q) ||
          item.thumbnailTitle.toLowerCase().includes(q) ||
          item.platformSource.toLowerCase().includes(q);
        return matchCat && matchChannel && matchSaved && matchQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'blueOcean') return b.blueOceanScore - a.blueOceanScore;
        const gA = parseInt(a.growth.replace(/[^0-9]/g, ''), 10);
        const gB = parseInt(b.growth.replace(/[^0-9]/g, ''), 10);
        return gB - gA;
      });
  }, [references, selectedCategory, selectedChannel, showSavedOnly, savedIds, searchQuery, sortBy]);

  // 저장함 토글
  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 크롤러 + 제미나이 API 실시간 동기화 시뮬레이션
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      setLastSyncTime(`방금 전 (${timeStr} 실시간 크롤링 & Gemini 분석 완료)`);
    }, 1200);
  };

  // AI 카피 복사
  const handleCopyStrategy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  // AI 추가 카피 생성
  const handleGenerateMoreStrategy = () => {
    if (!activeRef) return;
    const newCopy = `“[Gemini 실시간 생성] ${activeRef.keyword} — 지금 가장 반응 좋은 '${
      activeRef.vocPainPoints[0].issue.split(' ')[0]
    }' 완벽 해결 에디션 (오늘 자정 혜택 마감)”`;
    const updated = references.map((r) => {
      if (r.id === activeRef.id) {
        const nextRef = { ...r, aiStrategies: [...r.aiStrategies, newCopy] };
        setActiveRef(nextRef);
        return nextRef;
      }
      return r;
    });
    setReferences(updated);
  };

  // 채널 배지 스타일 헬퍼 (웜 톤앤매너 통일)
  const getChannelBadgeInfo = (chId) => {
    switch (chId) {
      case 'naver':
        return { label: 'NAVER', color: 'bg-[#E3DDD3] text-[#292824] border-[#D5CFC4]' };
      case 'instagram':
        return { label: 'IG 피드', color: 'bg-[#EAE6DF] text-[#866143] border-[#D5CFC4]' };
      case 'reels':
        return { label: '릴스', color: 'bg-[#866143] text-[#F2F1ED] border-[#866143]' };
      case 'youtube':
        return { label: '유튜브·쇼츠', color: 'bg-[#292824] text-[#F2F1ED] border-[#292824]' };
      case 'tiktok':
        return { label: 'TikTok', color: 'bg-[#E3DDD3] text-[#866143] border-[#866143]/40' };
      default:
        return { label: '멀티채널', color: 'bg-[#EAE6DF] text-[#292824] border-[#D5CFC4]' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F1ED] text-[#292824] flex flex-col lg:flex-row font-sans selection:bg-[#866143] selection:text-[#F2F1ED] pb-16 lg:pb-0">
      {/* --- 모바일 상단 고정 헤더 --- */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#F2F1ED]/95 backdrop-blur-md border-b border-[#DEDAD2] px-4 py-3 flex items-center justify-between">
        <div
          onClick={() => {
            setSelectedCategory('all');
            setSelectedChannel('all');
            setShowSavedOnly(false);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#866143] flex items-center justify-center font-bold text-[#F2F1ED] text-sm shadow-sm">
            a.
          </div>
          <span className="text-lg font-extrabold tracking-tight text-[#292824]">
            ando<span className="text-[#866143]">roshi</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleManualSync}
            className="px-2.5 py-1.5 rounded-lg bg-[#EAE6DF] border border-[#D5CFC4] text-[11px] font-bold text-[#866143] flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            동기화
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#EAE6DF] border border-[#D5CFC4] text-[#292824]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* --- 좌측 사이드바 (PC 고정 / 모바일 드로어) --- */}
      <aside
        className={`${
          mobileMenuOpen ? 'fixed inset-0 top-14 z-40 block' : 'hidden'
        } lg:sticky lg:top-0 lg:h-screen lg:w-72 bg-[#EAE6DF] border-r border-[#DEDAD2] flex-col justify-between shrink-0 overflow-y-auto lg:flex`}
      >
        <div className="p-5">
          {/* 브랜드 로고 (PC) */}
          <div className="hidden lg:flex items-center justify-between mb-5">
            <div
              onClick={() => {
                setSelectedCategory('all');
                setSelectedChannel('all');
                setShowSavedOnly(false);
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#866143] flex items-center justify-center font-black text-[#F2F1ED] text-lg shadow-sm">
                a.
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-[#292824]">
                  ando<span className="text-[#866143]">roshi</span>
                </span>
                <span className="block text-[10px] text-[#866143] font-semibold tracking-wider uppercase">
                  Trend & Market Intelligence
                </span>
              </div>
            </div>
          </div>

          {/* 홈 / 저장함 스위처 */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#E2DDD4] rounded-xl mb-5 border border-[#D5CFC4]">
            <button
              onClick={() => {
                setShowSavedOnly(false);
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                !showSavedOnly
                  ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                  : 'text-[#292824]/70 hover:text-[#292824]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              실시간 트렌드
            </button>
            <button
              onClick={() => {
                setShowSavedOnly(true);
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                showSavedOnly
                  ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                  : 'text-[#292824]/70 hover:text-[#292824]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              저장함 ({savedIds.length})
            </button>
          </div>

          {/* 섹션 1: 6대 트래픽 & 숏폼 채널 필터 */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#866143]">
                6대 바이럴 · 검색 채널
              </span>
              <span className="text-[10px] text-[#866143] font-semibold">실시간 연동</span>
            </div>
            <nav className="space-y-1">
              {CHANNELS.map((ch) => {
                const isActive = selectedChannel === ch.id && !showSavedOnly;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChannel(ch.id);
                      setShowSavedOnly(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                        : 'hover:bg-[#E2DDD4] text-[#292824]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Radio
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-[#F2F1ED]' : 'text-[#866143]'
                        }`}
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight truncate">{ch.name}</div>
                        <div
                          className={`text-[10px] truncate mt-0.5 ${
                            isActive ? 'text-[#F2F1ED]/80' : 'text-[#292824]/60'
                          }`}
                        >
                          {ch.sub}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isActive
                          ? 'bg-[#292824]/25 text-[#F2F1ED]'
                          : 'bg-[#F2F1ED] text-[#866143] border border-[#D5CFC4]'
                      }`}
                    >
                      {ch.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 섹션 2: 4대 산업군 & 커머스 랭킹 소스 */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#866143]">
                4대 커머스 · 앱 시장조사
              </span>
              <span className="text-[10px] text-[#292824]/60 font-medium">랭킹·리뷰 매칭</span>
            </div>
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id && !showSavedOnly;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowSavedOnly(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#292824] text-[#F2F1ED] shadow-sm'
                        : 'hover:bg-[#E2DDD4] text-[#292824]/80'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">{cat.name}</div>
                      <div
                        className={`text-[10px] mt-0.5 truncate ${
                          isActive ? 'text-[#F2F1ED]/75' : 'text-[#292824]/60'
                        }`}
                      >
                        {cat.sub}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isActive
                          ? 'text-[#F2F1ED] translate-x-0.5'
                          : 'text-[#866143] group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 좌측 하단 무인 자동화 파이프라인 상태창 */}
        <div className="p-4 m-4 rounded-2xl bg-[#F2F1ED] border border-[#D5CFC4]">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#866143]">
              <span className="w-2 h-2 rounded-full bg-[#866143] animate-ping" />
              무인 파이프라인 가동 중
            </span>
            <span className="text-[10px] text-[#292824]/60 font-mono">10개 소스</span>
          </div>
          <p className="text-[11px] text-[#292824]/75 leading-relaxed mb-2.5">
            네이버·인스타·릴스·유튜브·틱톡 + 올영·무신사·컬리·앱스토어 자동 동기화
          </p>
          <div className="text-[10px] text-[#866143] mb-3 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{lastSyncTime}</span>
          </div>
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full py-2 px-3 rounded-xl bg-[#866143] hover:bg-[#725137] text-xs font-bold text-[#F2F1ED] flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? '크롤러 & Gemini 동기화 중...' : '즉시 수동 동기화 테스트'}
          </button>
        </div>
      </aside>

      {/* --- 우측 메인 워크스페이스 --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 상단 고정 검색 & 빠른 채널 칩 헤더 */}
        <header className="sticky top-14 lg:top-0 z-20 bg-[#F2F1ED]/95 backdrop-blur-md border-b border-[#DEDAD2] px-4 lg:px-6 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* 검색창 */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-[#866143] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="키워드, 밈(#출근룩), 채널(릴스, 네이버), 플랫폼(올리브영) 검색..."
                className="w-full bg-[#EAE6DF] border border-[#D5CFC4] focus:border-[#866143] rounded-xl pl-10 pr-20 py-2 text-sm text-[#292824] placeholder-[#292824]/50 focus:outline-none transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#866143] hover:text-[#292824] font-bold"
                >
                  초기화
                </button>
              ) : (
                <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-mono bg-[#F2F1ED] text-[#866143] rounded border border-[#D5CFC4]">
                  Ctrl K
                </kbd>
              )}
            </div>

            {/* 우측 정렬 옵션 */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex items-center bg-[#EAE6DF] p-1 rounded-xl border border-[#D5CFC4]">
                <button
                  onClick={() => setSortBy('growth')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sortBy === 'growth'
                      ? 'bg-[#866143] text-[#F2F1ED]'
                      : 'text-[#292824]/70 hover:text-[#292824]'
                  }`}
                >
                  🔥 급상승순
                </button>
                <button
                  onClick={() => setSortBy('blueOcean')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sortBy === 'blueOcean'
                      ? 'bg-[#292824] text-[#F2F1ED]'
                      : 'text-[#292824]/70 hover:text-[#292824]'
                  }`}
                >
                  💎 블루오션 지수순
                </button>
              </div>
            </div>
          </div>

          {/* 상단 원클릭 6대 채널 빠른 필터 바 */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 mt-3 border-t border-[#DEDAD2]">
            <span className="text-[11px] font-bold text-[#866143] mr-1 shrink-0">채널 필터:</span>
            {CHANNELS.map((ch) => {
              const active = selectedChannel === ch.id && !showSavedOnly;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChannel(ch.id);
                    setShowSavedOnly(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#866143] text-[#F2F1ED] border-[#866143] shadow-sm'
                      : 'bg-[#EAE6DF] text-[#292824]/80 border-[#D5CFC4] hover:border-[#866143]'
                  }`}
                >
                  {ch.name}
                </button>
              );
            })}
          </div>
        </header>

        {/* --- 채널별 실시간 급상승 키워드 매트릭스 (4열 요약 보드) --- */}
        <section className="px-4 lg:px-6 pt-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#866143] text-[#F2F1ED] text-[11px] font-extrabold tracking-wide">
                LIVE RADAR
              </span>
              <h2 className="text-sm font-extrabold text-[#292824]">
                채널별 실시간 급상승 트렌드 매트릭스 (클릭 시 시장조사 즉시 오픈)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {CHANNEL_HOT_MATRIX.map((box) => (
              <div
                key={box.channelId}
                className="p-3.5 rounded-2xl border border-[#D5CFC4] bg-[#EAE6DF]/80"
              >
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#D5CFC4]">
                  <span className="text-xs font-extrabold text-[#292824]">{box.channelName}</span>
                  <span className="text-[10px] font-bold text-[#866143]">{box.badgeText}</span>
                </div>
                <div className="space-y-1.5">
                  {box.keywords.map((kw) => (
                    <button
                      key={kw.rank}
                      onClick={() => {
                        const target = references.find((r) => r.id === kw.refId);
                        if (target) {
                          setActiveRef(target);
                          setActiveTab('market');
                        }
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#F2F1ED] transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded bg-[#866143] text-[10px] font-extrabold text-[#F2F1ED] flex items-center justify-center shrink-0">
                          {kw.rank}
                        </span>
                        <span className="text-xs font-bold text-[#292824] group-hover:text-[#866143] truncate">
                          {kw.word}
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-[#866143] shrink-0 ml-2">
                        {kw.change} ▲
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 메인 레퍼런스 + 시장조사 카드 그리드 --- */}
        <main className="p-4 lg:p-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h1 className="text-lg font-extrabold text-[#292824] flex items-center gap-2">
                {showSavedOnly
                  ? '📌 저장한 레퍼런스 & 시장조사 보드'
                  : `${CATEGORIES.find((c) => c.id === selectedCategory)?.name} × ${
                      CHANNELS.find((ch) => ch.id === selectedChannel)?.name
                    }`}
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAE6DF] text-[#866143] border border-[#D5CFC4]">
                  {filteredReferences.length}개 포착
                </span>
              </h1>
              <p className="text-xs text-[#292824]/70 mt-0.5">
                카드를 클릭하면 우측에서 <b>[네이버·릴스·쇼츠·틱톡 파급력 + 플랫폼 랭킹 + 리뷰 불만 빈틈 + 채널별 AI 대본]</b>이 열립니다.
              </p>
            </div>
          </div>

          {filteredReferences.length === 0 ? (
            <div className="border border-[#D5CFC4] rounded-3xl p-12 text-center bg-[#EAE6DF]/50">
              <Search className="w-10 h-10 text-[#866143] mx-auto mb-3" />
              <p className="text-base font-bold text-[#292824] mb-1">
                조건에 맞는 트렌드 레퍼런스가 없습니다.
              </p>
              <p className="text-xs text-[#292824]/70 mb-4">
                다른 채널이나 산업 카테고리를 선택해 보세요.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedChannel('all');
                  setSearchQuery('');
                  setShowSavedOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#866143] text-xs font-bold text-[#F2F1ED] hover:bg-[#725137]"
              >
                전체 필터 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filteredReferences.map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <article
                    key={item.id}
                    onClick={() => {
                      setActiveRef(item);
                      setActiveTab('market');
                      setScriptChannelTab(
                        item.primaryChannel === 'instagram' ? 'reels' : item.primaryChannel
                      );
                    }}
                    className="group bg-[#EAE6DF] border border-[#D5CFC4] hover:border-[#866143] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                  >
                    <div>
                      {/* 숏폼/소재 썸네일 프리뷰 영역 (웜 에디토리얼 톤) */}
                      <div className="relative h-52 p-4 bg-[#E2DDD4] flex flex-col justify-between overflow-hidden border-b border-[#D5CFC4]">
                        {/* 상단 배지 */}
                        <div className="relative z-10 flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2.5 py-1 rounded-lg bg-[#F2F1ED] text-[11px] font-bold text-[#292824] border border-[#D5CFC4]">
                              {item.categoryLabel}
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-[#866143] text-[#F2F1ED] text-[11px] font-extrabold flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {item.growth}
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleSave(e, item.id)}
                            className={`p-2 rounded-xl border transition-all ${
                              isSaved
                                ? 'bg-[#866143] border-[#866143] text-[#F2F1ED]'
                                : 'bg-[#F2F1ED] border-[#D5CFC4] text-[#292824] hover:text-[#866143]'
                            }`}
                            title="저장함에 보관"
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        {/* 중앙 플레이 버튼 & 후킹 카피 미리보기 */}
                        <div className="relative z-10 my-auto">
                          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                            <span className="text-[11px] font-extrabold text-[#866143]">
                              {item.memeTag}
                            </span>
                          </div>
                          <h3 className="text-sm font-extrabold text-[#292824] leading-snug line-clamp-2 group-hover:text-[#866143] transition-colors">
                            {item.thumbnailTitle}
                          </h3>
                        </div>

                        {/* 하단 활성 채널 배지들 & 재생시간 */}
                        <div className="relative z-10 flex items-center justify-between text-[11px] text-[#292824]/80 pt-2 border-t border-[#D5CFC4]">
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.activeChannels.map((chKey) => {
                              const badge = getChannelBadgeInfo(chKey);
                              return (
                                <span
                                  key={chKey}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${badge.color}`}
                                >
                                  {badge.label}
                                </span>
                              );
                            })}
                          </div>
                          <span className="font-mono bg-[#F2F1ED] px-1.5 py-0.5 rounded text-[10px] text-[#866143] font-bold shrink-0 border border-[#D5CFC4]">
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      {/* 카드 본문: 매칭된 시장조사 핵심 지표 */}
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] text-[#866143] mb-1 font-semibold">
                          <span>급상승 시장 키워드</span>
                          <span className="font-bold text-[#292824]">
                            블루오션 {item.blueOceanScore}점
                          </span>
                        </div>
                        <div className="text-base font-extrabold text-[#292824] mb-3 flex items-center justify-between">
                          <span className="truncate">{item.keyword}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#866143] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>

                        {/* 5대 채널 미니 바이럴 바 */}
                        <div className="grid grid-cols-5 gap-1 mb-3 p-2 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4] text-center">
                          <div>
                            <div className="text-[9px] text-[#866143] font-bold">NAVER</div>
                            <div className="text-[10px] font-extrabold text-[#292824] mt-0.5">
                              {item.channelMetrics.naver.growth}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] text-[#866143] font-bold">IG피드</div>
                            <div className="text-[10px] font-extrabold text-[#292824] mt-0.5">
                              {item.channelMetrics.instagram.growth}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] text-[#866143] font-bold">릴스</div>
                            <div className="text-[10px] font-extrabold text-[#292824] mt-0.5">
                              {item.channelMetrics.reels.growth}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] text-[#866143] font-bold">유튜브</div>
                            <div className="text-[10px] font-extrabold text-[#292824] mt-0.5">
                              {item.channelMetrics.youtube.growth}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] text-[#866143] font-bold">틱톡</div>
                            <div className="text-[10px] font-extrabold text-[#292824] mt-0.5">
                              {item.channelMetrics.tiktok.growth}
                            </div>
                          </div>
                        </div>

                        {/* 실시간 플랫폼 랭킹 & 리뷰 빈틈 요약 박스 */}
                        <div className="space-y-2 p-3 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#866143] flex items-center gap-1 font-bold">
                              <Award className="w-3.5 h-3.5 text-[#866143]" />
                              매칭 성과
                            </span>
                            <span className="font-bold text-[#292824] truncate max-w-[160px]">
                              {item.platformSource}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-[#DEDAD2]">
                            <div className="text-[10px] font-bold text-[#866143] mb-0.5 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              소비자 불만 1위 (우리의 빈틈 기회)
                            </div>
                            <p className="text-xs text-[#292824] line-clamp-1 font-medium">
                              “{item.vocPainPoints[0].issue}”
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 카드 푸터 */}
                    <div className="px-4 py-3 bg-[#E2DDD4]/60 border-t border-[#D5CFC4] flex items-center justify-between">
                      <span className="text-[11px] text-[#292824]/80 font-medium truncate max-w-[170px]">
                        {item.format}
                      </span>
                      <span className="text-xs font-extrabold text-[#866143] flex items-center gap-1">
                        시장조사 열기
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* --- 모바일 전용 하단 고정 탭바 --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#EAE6DF] border-t border-[#D5CFC4] px-2 py-1.5 grid grid-cols-5 gap-1">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id && !showSavedOnly;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowSavedOnly(false);
              }}
              className={`py-1.5 rounded-lg text-[10px] font-extrabold text-center transition-all ${
                active ? 'bg-[#866143] text-[#F2F1ED]' : 'text-[#292824]/70'
              }`}
            >
              {cat.name.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* --- 상세 모달: 원클릭 멀티채널 시장조사 & 제미나이 기획 리포트 --- */}
      {activeRef && (
        <div
          onClick={() => setActiveRef(null)}
          className="fixed inset-0 z-50 bg-[#292824]/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F2F1ED] border border-[#D5CFC4] rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* 모달 상단 헤더 */}
            <div className="px-5 py-4 bg-[#EAE6DF] border-b border-[#D5CFC4] flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2.5 py-1 rounded-lg bg-[#F2F1ED] text-xs font-bold text-[#292824] border border-[#D5CFC4] shrink-0">
                  {activeRef.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#866143] text-[#F2F1ED] text-xs font-extrabold shrink-0">
                  검색·바이럴 {activeRef.growth} ▲
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-[#292824] truncate">
                  {activeRef.keyword} — 멀티채널 & 커머스 통합 리포트
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => toggleSave(e, activeRef.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                    savedIds.includes(activeRef.id)
                      ? 'bg-[#866143] border-[#866143] text-[#F2F1ED]'
                      : 'bg-[#F2F1ED] border-[#D5CFC4] text-[#292824]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  {savedIds.includes(activeRef.id) ? '저장됨' : '보관하기'}
                </button>
                <button
                  onClick={() => setActiveRef(null)}
                  className="p-2 rounded-xl bg-[#F2F1ED] hover:bg-[#E2DDD4] text-[#292824] border border-[#D5CFC4] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 모달 본문: 좌측(숏폼 레퍼런스 해부) + 우측(멀티채널 시장조사 & AI 대본) */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              {/* 좌측 5칸: 숏폼/광고 레퍼런스 플레이어 & 후킹 해부 */}
              <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#DEDAD2] bg-[#EAE6DF]/60 flex flex-col justify-between">
                <div>
                  {/* 가상 숏폼 플레이어 프레임 */}
                  <div className="relative rounded-2xl p-5 bg-[#E2DDD4] border border-[#D5CFC4] mb-5">
                    <div className="flex items-center justify-between text-xs text-[#292824] mb-6">
                      <span className="font-mono bg-[#F2F1ED] px-2.5 py-1 rounded-md border border-[#D5CFC4] font-bold">
                        {activeRef.format}
                      </span>
                      <span className="font-bold text-[#866143]">{activeRef.memeTag}</span>
                    </div>

                    <div className="my-6 text-center px-2">
                      <div className="w-12 h-12 rounded-full bg-[#866143] text-[#F2F1ED] mx-auto mb-3 flex items-center justify-center shadow-md">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#292824] mb-1.5 leading-snug">
                        {activeRef.thumbnailTitle}
                      </h3>
                      <p className="text-xs text-[#292824]/80">{activeRef.thumbnailSub}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#292824] pt-3 border-t border-[#D5CFC4] font-semibold">
                      <span>조회수 {activeRef.views}회</span>
                      <span>저장·공유 {activeRef.saves}건</span>
                      <span>길이 {activeRef.duration}</span>
                    </div>
                  </div>

                  {/* AI 후킹 구조 3단계 해부 */}
                  <div className="mb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#866143] mb-3 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Gemini 숏폼·광고 후킹 타임라인 해부
                    </h4>
                    <div className="space-y-2.5">
                      {activeRef.hookStructure.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4]"
                        >
                          <div className="text-xs font-bold text-[#866143] mb-0.5">{h.step}</div>
                          <p className="text-xs text-[#292824] leading-relaxed">{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 타깃 데모그래픽 요약 */}
                <div className="p-3.5 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#866143] font-bold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#866143]" />
                      반응 타깃 데모그래픽
                    </span>
                    <span className="font-bold text-[#292824]">
                      {activeRef.demographics.coreAge}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#E2DDD4] overflow-hidden flex">
                    <div
                      style={{ width: `${activeRef.demographics.female}%` }}
                      className="bg-[#866143] h-full"
                    />
                    <div
                      style={{ width: `${activeRef.demographics.male}%` }}
                      className="bg-[#292824] h-full"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#292824]/80 mt-1.5 font-semibold">
                    <span>여성 {activeRef.demographics.female}%</span>
                    <span>남성 {activeRef.demographics.male}%</span>
                  </div>
                </div>
              </div>

              {/* 우측 7칸: 실시간 시장조사 & 멀티채널 대시보드 */}
              <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-[#F2F1ED]">
                <div>
                  {/* 우측 상단 4대 분석 탭 스위처 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#EAE6DF] rounded-2xl border border-[#D5CFC4] mb-5">
                    <button
                      onClick={() => setActiveTab('market')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeTab === 'market'
                          ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                          : 'text-[#292824]/70 hover:text-[#292824]'
                      }`}
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      채널 지표 & 랭킹
                    </button>
                    <button
                      onClick={() => setActiveTab('voc')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeTab === 'voc'
                          ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                          : 'text-[#292824]/70 hover:text-[#292824]'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      리뷰·댓글 빈틈
                    </button>
                    <button
                      onClick={() => setActiveTab('ai')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeTab === 'ai'
                          ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                          : 'text-[#292824]/70 hover:text-[#292824]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      채널별 AI 대본
                    </button>
                    <button
                      onClick={() => setActiveTab('funnel')}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        activeTab === 'funnel'
                          ? 'bg-[#866143] text-[#F2F1ED] shadow-sm'
                          : 'text-[#292824]/70 hover:text-[#292824]'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      크로스 퍼널
                    </button>
                  </div>

                  {/* 탭 1: 5대 채널 지표 & 커머스 플랫폼 랭킹 */}
                  {activeTab === 'market' && (
                    <div className="space-y-4">
                      {/* 5대 채널 실시간 파급력 카드 */}
                      <div>
                        <h4 className="text-xs font-extrabold text-[#292824] mb-2.5 flex items-center gap-1.5">
                          <Radio className="w-4 h-4 text-[#866143]" />
                          네이버 · 인스타 · 릴스 · 유튜브 · 틱톡 실시간 파급력
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {Object.entries(activeRef.channelMetrics).map(([chKey, data]) => {
                            const badge = getChannelBadgeInfo(chKey);
                            return (
                              <div
                                key={chKey}
                                className="p-3 rounded-xl bg-[#EAE6DF] border border-[#D5CFC4] flex items-center justify-between"
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badge.color}`}
                                    >
                                      {badge.label}
                                    </span>
                                    <span className="text-xs font-bold text-[#292824] truncate">
                                      {data.label}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#292824]/75 truncate">
                                    {data.sub}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-sm font-extrabold text-[#292824]">
                                    {data.value}
                                  </div>
                                  <div className="text-[11px] font-bold text-[#866143]">
                                    {data.growth} ▲
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 최근 8주 검색량 & 쇼츠 조회 추이 차트 */}
                      <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#292824]">
                            최근 8주 통합 검색·바이럴 추이 ({activeRef.competitionLevel})
                          </span>
                          <span className="text-xs font-extrabold text-[#866143]">
                            블루오션 {activeRef.blueOceanScore}점
                          </span>
                        </div>
                        <div className="h-24 flex items-end gap-2 pt-2 px-1">
                          {activeRef.searchVolumeTrend.map((val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                            >
                              <div
                                style={{ height: `${val}%` }}
                                className={`w-full rounded-t-md transition-all ${
                                  idx === activeRef.searchVolumeTrend.length - 1
                                    ? 'bg-[#866143]'
                                    : 'bg-[#292824]/30'
                                }`}
                              />
                              <span className="text-[10px] text-[#292824]/70 font-mono">
                                {activeRef.weeklyLabels[idx]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 매칭된 실제 커머스/앱스토어 랭킹 TOP 3 */}
                      <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-extrabold text-[#292824] flex items-center gap-1.5">
                            <ShoppingBag className="w-4 h-4 text-[#866143]" />
                            {activeRef.platformRankingTitle}
                          </h4>
                          <span className="text-[11px] text-[#866143] font-semibold">
                            실시간 랭킹 매칭
                          </span>
                        </div>
                        <div className="space-y-2">
                          {activeRef.rankings.map((prod) => (
                            <div
                              key={prod.rank}
                              className="p-3 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4] flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-6 h-6 rounded-lg bg-[#866143] text-[#F2F1ED] font-extrabold text-xs flex items-center justify-center shrink-0">
                                  {prod.rank}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-[#292824] truncate">
                                    {prod.name}
                                  </div>
                                  <div className="text-[11px] text-[#292824]/70 flex items-center gap-2 mt-0.5">
                                    <span className="text-[#866143] font-bold">★ {prod.rating}</span>
                                    <span>리뷰 {prod.reviews}</span>
                                    <span className="px-1.5 py-0.5 rounded bg-[#EAE6DF] text-[#866143] text-[10px] font-bold border border-[#D5CFC4]">
                                      {prod.badge}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs font-extrabold text-[#292824] shrink-0">
                                {prod.price}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 탭 2: VOC 리뷰 빈틈 레이더 */}
                  {activeTab === 'voc' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#866143]">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-[#866143] mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          커머스 1~3위 상품 리뷰 & 숏폼 댓글 불만 분석 (시장 진입 기회)
                        </div>
                        <p className="text-xs text-[#292824]/80 leading-relaxed">
                          올리브영·무신사·컬리·앱스토어 구매 리뷰와 유튜브·릴스·틱톡 댓글에서 AI가 추출한 <b>소비자 페인포인트 TOP 3</b>입니다.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {activeRef.vocPainPoints.map((voc, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]"
                          >
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="font-extrabold text-[#292824]">
                                불만 요인 #{idx + 1}
                              </span>
                              <span className="font-mono font-bold text-[#866143]">
                                불만 언급 비중 {voc.ratio}%
                              </span>
                            </div>
                            <p className="text-sm font-bold text-[#292824] mb-3">“{voc.issue}”</p>
                            <div className="w-full h-2 rounded-full bg-[#F2F1ED] overflow-hidden">
                              <div
                                style={{ width: `${voc.ratio}%` }}
                                className="h-full bg-[#866143] rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 탭 3: 채널별 AI 맞춤 대본 & 카피라이팅 */}
                  {activeTab === 'ai' && (
                    <div className="space-y-4">
                      {/* 채널별 특화 스크립트 스위처 */}
                      <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-extrabold text-[#866143] flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            매체별 맞춤 바이럴 대본 & 검색광고 세팅
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 mb-3">
                          {[
                            { id: 'naver', label: 'NAVER 검색·쇼핑' },
                            { id: 'reels', label: '인스타·릴스' },
                            { id: 'youtube', label: '유튜브 쇼츠' },
                            { id: 'tiktok', label: 'TikTok 챌린지' }
                          ].map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setScriptChannelTab(t.id)}
                              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                                scriptChannelTab === t.id
                                  ? 'bg-[#866143] text-[#F2F1ED] border-[#866143]'
                                  : 'bg-[#F2F1ED] text-[#292824]/80 border-[#D5CFC4]'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#F2F1ED] border border-[#D5CFC4] whitespace-pre-line text-xs text-[#292824] leading-relaxed font-medium">
                          {activeRef.channelScripts[scriptChannelTab]}
                        </div>
                      </div>

                      {/* 경쟁사 빈틈 역공략 후킹 카피 리스트 */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-extrabold text-[#292824]">
                          리뷰 불만 역공략 원클릭 후킹 카피
                        </div>
                        {activeRef.aiStrategies.map((strategy, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4] hover:border-[#866143] transition-all flex items-start justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <span className="inline-block px-2 py-0.5 rounded bg-[#866143] text-[#F2F1ED] text-[10px] font-extrabold">
                                추천 소구점 #{idx + 1}
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-[#292824] leading-relaxed">
                                {strategy}
                              </p>
                            </div>
                            <button
                              onClick={() => handleCopyStrategy(strategy, idx)}
                              className="px-2.5 py-1.5 rounded-xl bg-[#F2F1ED] hover:bg-[#E2DDD4] text-xs font-bold text-[#292824] border border-[#D5CFC4] flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                              {copiedIndex === idx ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#866143]" />
                                  복사됨
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  복사
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleGenerateMoreStrategy}
                        className="w-full py-2.5 rounded-2xl border border-dashed border-[#866143] hover:bg-[#EAE6DF] text-xs font-extrabold text-[#866143] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Gemini API로 새로운 빈틈 공략 카피 1개 더 생성하기
                      </button>
                    </div>
                  )}

                  {/* 탭 4: 크로스 채널 마케팅 퍼널 설계 */}
                  {activeTab === 'funnel' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#866143]">
                        <div className="text-xs font-extrabold text-[#866143] mb-1">
                          숏폼 바이럴 → 네이버 검색 → 커머스 구매 전환 설계도
                        </div>
                        <p className="text-xs text-[#292824] leading-relaxed font-medium">
                          {activeRef.crossChannelFunnel}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                          <div className="text-xs font-extrabold text-[#866143] mb-1">
                            STEP 1. 인지 & 후킹 (TikTok · 인스타 릴스 · 유튜브 쇼츠)
                          </div>
                          <p className="text-xs text-[#292824]/90 leading-relaxed">
                            초반 3초 시각적 비포/애프터 또는 ASMR 밈으로 스크롤을 멈추게 하고, 댓글 자동화(ManyChat 등)로 첫 유입 트래픽을 만듭니다.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                          <div className="text-xs font-extrabold text-[#866143] mb-1">
                            STEP 2. 검증 & 검색 방어 (NAVER 데이터랩 · 블로그 · 쇼핑검색)
                          </div>
                          <p className="text-xs text-[#292824]/90 leading-relaxed">
                            숏폼을 보고 호기심이 생긴 유저의 68%는 네이버에서 브랜드명이나 키워드를 재검색합니다. 경쟁사 리뷰 불만(#1 {activeRef.vocPainPoints[0].issue.slice(0, 18)}...)을 해결했다는 비교 블로그와 파워링크를 최상단에 배치합니다.
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#EAE6DF] border border-[#D5CFC4]">
                          <div className="text-xs font-extrabold text-[#866143] mb-1">
                            STEP 3. 최종 전환 & 랭킹 부스팅 ({activeRef.platformSource})
                          </div>
                          <p className="text-xs text-[#292824]/90 leading-relaxed">
                            상세페이지 최상단 GIF에 숏폼 후킹 장면을 동일하게 배치해 이탈률을 줄이고, 플랫폼 랭킹 진입 배지를 다시 숏폼 소재에 재활용합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 모달 우측 하단 요약 바 */}
                <div className="mt-6 pt-4 border-t border-[#DEDAD2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#292824]/75">
                  <span>데이터: 네이버·인스타·릴스·유튜브·틱톡 + 4대 커머스</span>
                  <span className="text-[#866143] font-bold">
                    ✓ andoroshi 무인 스케줄러 매일 06:00 자동 갱신
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}