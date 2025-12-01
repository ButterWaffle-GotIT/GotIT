# GotIT - IT 용어 학습 플랫폼

> **배포 URL**: [https://www.gotit.cloud](https://www.gotit.cloud)

IT 비전공자와 입문자를 위한 IT 용어 학습 서비스입니다.
용어 사전, 퀴즈, AI 챗봇 기능을 통해 IT 용어를 쉽고 재미있게 학습할 수 있습니다.

## 주요 기능

- **AI 챗봇**: Google Gemini AI 기반 IT 용어 질의응답
- **용어 사전**: IT 용어 검색 및 상세 설명 제공
- **퀴즈**: 학습한 용어를 테스트할 수 있는 퀴즈 기능
- **스크랩**: 관심 있는 용어 저장 기능

## 실행 환경

- **Node.js**: v20.0.0 이상
- **npm**: v9.0.0 이상
- **운영체제**: Windows, macOS, Linux

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 프로덕션 빌드 및 실행

```bash
npm run build
npm start
```

빌드 완료 후 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

### 개발 모드 실행

개발 중에는 아래 명령어로 개발 서버를 실행할 수 있습니다.

```bash
npm run dev
```

## 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase
- **AI**: Google Gemini AI

## 프로젝트 구조

```text
src/
├── app/                      
│   ├── (home)/               # 메인(랜딩) 페이지
│   ├── chatbot/              # AI 챗봇 페이지
│   ├── dashboard/            # 대시보드 페이지
│   ├── login/                # 로그인 페이지
│   ├── onboarding/           # 온보딩 페이지
│   ├── quiz/                 # 퀴즈 페이지
│   ├── search/               # 검색 페이지
│   └── terms/                # 용어 상세 페이지
│       └── [slug]/           # 동적 라우팅
├── components/               # 공통 컴포넌트
│   ├── icons/                # 아이콘 컴포넌트
│   ├── layout/               # 레이아웃 컴포넌트
│   ├── providers/            # Provider 컴포넌트
│   └── ui/                   # UI 컴포넌트
│       ├── buttons/          # 버튼 컴포넌트
│       ├── category/         # 카테고리 컴포넌트
│       └── dropdowns/        # 드롭다운 컴포넌트
├── config/                   # 설정 파일
├── constants/                # 상수 정의
├── contexts/                 # React Context
│   └── auth/                 # 인증 관련 Context
├── hooks/                    # 커스텀 훅
├── lib/                      # 라이브러리 설정
├── styles/                   # 전역 스타일
├── types/                    # TypeScript 타입 정의
└── utils/                    # 유틸리티 함수
```


