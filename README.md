# Toy_Project_3_team4

> 영상 공유 SNS 플랫폼 (Pli) 개발 프로젝트 </br>

<image alt="pli" width="800" src="./src/assets/images/PLI.png" style="border-radius: 20px" />

플리 (Pli)는 사용자들이 만든 자신만의 유튜브 영상 링크 기반 플레이 리스트를 공유하고, 구독하여 자신만의 타임 라인을 만들고 네트워킹 할 수 있는 SNS 서비스입니다.

<image alt="pli" width="800" src="./src/assets/images/PAGES.png" style="border-radius: 20px" />

## 팀명: 피자사조

### 프로젝트 팀 소개 및 역할분담

| [<img src="https://avatars.githubusercontent.com/u/59277499?v=4" width="150" height="150"/>](https://github.com/nakyeonko3) |                                                                                                                                                                         [<img src="https://avatars.githubusercontent.com/u/108856689?v=4" width="150" height="150"/>](https://github.com/devdeun)                                                                                                                                                                          |                                                    [<img src="https://avatars.githubusercontent.com/u/107895537?v=4" width="150" height="150"/>](https://github.com/HSjjs98)                                                    |                                                               [<img src="https://avatars.githubusercontent.com/u/171234168?v=4" width="150" height="150"/>](https://github.com/wonjichoe)                                                                |
| :-------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                        [@nakyeonko3](https://github.com/nakyeonko3)                                         |                                                                                                                                                                                                                   [@devdeun](https://github.com/devdeun)                                                                                                                                                                                                                   |                                                                                             [@HSjjs98](https://github.com/HSjjs98)                                                                                              |                                                                                                        [@wonjichoe](https://github.com/wonjichoe)                                                                                                        |
|       프로젝트 세팅<br/>공통 컴포넌트 개발 (Modal)<br/>테스트 코드 작성<br/>별도의 서버 구성<br/> 기능 구현: 타임라인       | UI 디자인 및 공통 스타일 설정<br/>공통 컴포넌트 개발: Navbar, Layout, Input, Textarea, Spinner, Loading, Avatar, GradientIcon<br/>라우팅<br/>페이지 퍼블리싱: 플레이리스트 페이지, 플레이리스트 상세 페이지, 포스트 상세 페이지, 서비스 이용약관 및 개인정보처리방침 페이지<br/>페이지 기능 구현 및 퍼블리싱: 로그인 페이지, 검색 페이지, 404 페이지<br/>페이지 기능 구현 및 퍼블리싱: 로그인 페이지, 검색 페이지, 404 페이지<br/>전체 디자인 수정<br/>기타 기능 오류 수정 | 공통 컴포넌트 개발 (Button(FitButton, FullButton, ToggleButton), Toast)<br/>포스트 추가<br/>플레이리스트에 비디오 추가, 삭제<br/>플레이리스트 수정<br/>플레이리스트 구독<br/>데이터베이스 구조 설계<br/>전체적인 기능 오류 수정 | 공통 컴포넌트 개발 : Header, Tab, IconButton<br/>(리액트 기본 CRUD 적응)<br/>페이지 퍼블리싱: 설정 페이지 <br/> 페이지 기능 구현 및 퍼블리싱: 프로필 페이지, 프로필 수정 페이지, 팔로우 페이지 <br/>기타 기능 구현: 포스트 비디오 토스트 알림 추가 <br/> |

## 목차

- [Toy_Project_3_team4](#toy_project_3_team4)
  - [목차](#목차)
  - [개발 일정](#개발-일정)
  - [폴더 구조도](#폴더-구조도)
  - [설치 및 실행 방법](#설치-및-실행-방법)
  - [사용한 기술](#사용한-기술)
  - [핵심 기능](#핵심-기능)

## 🗓 개발 일정

- 총 제작 기간: 8월 19일(월) ~ 9월 9일(월) 3주간 진행
  - 중간 점검: 8/30 (금) 18:00 ~ 20:00
  - **마감일: 2024-09-09 (월) 14:00**
  - 발표회 : 9/9 (월) 17:00 ~ 20:00
  - 리팩토링 기간 : 9/10 (화) ~ 9/12 (목)

## 🗂 폴더 구조도

```bash
├─ 📦src
│  ├─ 📜App.tsx
│  ├─ 📂api
│  │  ├─ 📜algoliaSearch.ts
│  │  ├─ 📜fetchPlaylist.ts
│  │  ├─ 📜fetchPosts.ts
│  │  ├─ 📜fetchUsers.ts
│  │  ├─ 📜fetchYouTubeVideoData.ts
│  │  ├─ 📜firebaseApp.ts
│  │  └─ 📜firebaseAuth.ts
│  ├─ 📂assets
│  ├─ 📂components
│  │  ├─ 📂common
│  │  │  ├─ 📜GradientIcon.tsx
│  │  │  ├─ 📜Modal.tsx
│  │  │  ├─ 📜Toast.tsx
│  │  │  ├─ 📂buttons
│  │  │  ├─ 📂inputs
│  │  │  ├─ 📂loading
│  │  │  └─ 📂tabs
│  │  ├─📂dragAndDrop
│  │  ├─📂onboarding
│  │  ├─📂playlist
│  │  ├─📂playlistDetail
│  │  ├─📂post
│  │  ├─📂profile
│  │  └─📂user
│  ├─📂constants
│  │  └─ 📜path.ts
│  ├─📂hooks
│  ├─ 📜main.tsx
│  ├─📂pages
│  │  ├─ 📜AddPost.tsx
│  │  ├─ 📜Follow.tsx
│  │  ├─ 📜Home.tsx
│  │  ├─ 📜NewPost.tsx
│  │  ├─ 📜Playlist.tsx
│  │  ├─ 📜PlaylistDetail.tsx
│  │  ├─ 📜PrivacyPolicyPage.tsx
│  │  ├─ 📜Profile.tsx
│  │  ├─ 📜ProfileEdit.tsx
│  │  ├─ 📜Search.tsx
│  │  ├─ 📜SelectPli.tsx
│  │  ├─ 📜Settings.tsx
│  │  ├─ 📜SignIn.tsx
│  │  └─ 📜TermsOfServicePage.tsx
│  ├─📂stores
│  │  └─ 📜toastStore.ts
│  ├─📂styles
│  │  ├─ 📜GlobalStyles.tsx
│  │  ├─ 📜input.ts
│  │  ├─ 📜legal.ts
│  │  └─ 📜theme.ts
│  ├─📂types
│  │  ├─ 📜emotion.d.ts
│  │  ├─ 📜global.d.ts
│  │  ├─ 📜playlist.ts
│  │  ├─ 📜post.ts
│  │  ├─ 📜profile.ts
│  │  └─ 📜user.ts
│  ├─📂utils
│  │  ├─ 📜date.ts
│  │  ├─ 📜gradient.ts
│  │  └─ 📜randomId.ts
│  └─ 📜vite-env.d.ts
```

## 설치 및 실행 방법

### 🖥 설치

```bash
npm install
```

### 🖥 실행 방법

```bash
npm run dev
```

## 📌 사용한 기술

### 디자인 및 기획

- **Figma/Figjam**

### 프론트엔드

- **React**: 18.3.1
- **TypeScript**: 5.5.3
- **Vite**: 5.4.1

### 상태관리

- **Zustand**: 4.5.5
- **TanStack Query**: 5.53.3

### 스타일링

- **Emotion**: 11.13.0
- **Radix**
  - **@radix-ui/react-dialog**: 1.1.1
  - **@radix-ui/react-dropdown-menu**: 2.1.2
  - **@radix-ui/react-tooltip**: 1.1.2

### 백엔드 및 데이터베이스

- **firebase**: 10.13.0

### 테스트

- **playwright**: 1.46.1

### 개발 도구

- **ESLint**: 8.57.0
- **Prettier**: 3.3.3

## 핵심 기능

### 🌟 영상 링크 기반 포스트 작성 기능

- 유튜브 플랫폼에서 제공되는 영상 링크를 입력하여 나만의 플레이리스트를 작성

### 🌟 공개 플레이리스트 구독 및 타임라인 생성 기능

- 다른 사용자들이 공개한 플레이리스트를 구독하고 자신의 타임라인을 생성

### 🌟 타임라인 탐색 및 상호작용 기능

- 구독하지 않은 공개된 플레이리스트를 탐색하고 좋아요, 댓글, 팔로잉 같은 상호작용 가능

### 🌟 검색

- 사용자가 검색창을 통해 검색어를 입력하고 입력된 검색어를 기반으로 관련된 포스트와 유저를 검색

### 🌟 프로필 확인 및 편집

- 자신의 프로필 정보를 확인하고 수정할 수 있는 기능
- 다른 사용자의 프로필 페이지에 접속 시 팔로우/언팔로우 할 수 있는 기능
