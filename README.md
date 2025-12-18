# GotIT - IT 용어 학습 플랫폼

> **배포 URL**: [https://www.gotit.cloud](https://www.gotit.cloud)

IT 비전공자와 입문자를 위한 IT 용어 학습 서비스입니다. <br />
용어 사전, 퀴즈, AI 챗봇 기능을 통해 IT 용어를 쉽고 재미있게 학습할 수 있습니다.

## 소개

<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/d5be3ab3-a36b-4435-9238-3b0a9f25d078" />
<img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/b3201118-8f1d-477a-bdf6-f5752edd90f2" />
<img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/6a341485-b0ff-4144-a587-7841059e10fa" />
<img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/7863a7df-8c12-4b43-8a39-34868347f440" />
<img width="1920" height="1080" alt="5" src="https://github.com/user-attachments/assets/abcf3423-88ab-4fdb-aa11-7b656aaec954" />
<img width="1920" height="1080" alt="6" src="https://github.com/user-attachments/assets/e63fa5df-ac06-4a9f-97db-42d1a7020933" />
<img width="1920" height="1080" alt="7" src="https://github.com/user-attachments/assets/27a5b69c-2dac-42a9-9725-be2c7c63e9f5" />
<img width="1920" height="1080" alt="8" src="https://github.com/user-attachments/assets/a637ae6a-975f-47f8-b5e1-f345a332f66f" />
<img width="1920" height="1080" alt="9" src="https://github.com/user-attachments/assets/0c37fe06-cd29-4093-90b5-6232ef3f911f" />
<img width="1920" height="1080" alt="10" src="https://github.com/user-attachments/assets/b821063b-ab82-43db-9671-8c146f781516" />
<img width="1920" height="1080" alt="11" src="https://github.com/user-attachments/assets/84b72dee-d2c4-4e74-a03c-2c43ab883c28" />
<img width="1920" height="1080" alt="12" src="https://github.com/user-attachments/assets/f631da04-e471-47ce-b2b8-fa27da9c5f88" />
<img width="1920" height="1080" alt="13" src="https://github.com/user-attachments/assets/61b2a2df-6314-470e-961f-36e7631d289e" />
<img width="1920" height="1080" alt="14" src="https://github.com/user-attachments/assets/c3f8d11e-864a-4ddb-a1eb-e5a8d169727e" />


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


