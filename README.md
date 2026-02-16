# Node.js Shopping Mall API

Backend API for the Node.js ShoppingMall project  
(쇼핑몰 애플리케이션 백엔드 API)

🔗 Frontend Repository: [nodejs-shoppingmall-ts-fe](https://github.com/hey-anna/nodejs-shoppingmall-ts-fe)
🔗 Backend Repository: [nodejs-shoppingmall-ts-be](https://github.com/hey-anna/nodejs-shoppingmall-ts-be)

Node.js와 Express 기반의 쇼핑몰 백엔드 API를 구현하는 학습용 프로젝트입니다.  
회원 인증, 상품 관리, 주문 처리 등 RESTful API 설계를 목표로 합니다.

---

## 📆 Version Info

- First created on: **2026.02**
- Node.js & Express 기반 학습 프로젝트
- MongoDB 연결 구성 완료
- JWT 인증 시스템 구현 예정

---

## 🚧 현재 미구현 / 예정 기능

- [ ] 회원가입 및 로그인 인증 시스템
- [ ] 상품 등록 및 조회 API
- [ ] 장바구니 기능
- [ ] 주문 처리 API
- [ ] 관리자 기능

---

## ⚙️ 프로젝트 초기화 및 설정

본 프로젝트는 Node.js 환경에서 Express 서버를 구성하여 REST API 서버를 구축합니다.

### 🔧 초기 설정 내역

- Express 서버 기본 설정
- 환경변수 관리 설정 (dotenv)
- CORS 설정
- MongoDB 연결 준비
- JWT 인증 구조 설계 예정

---

## 📌 기술 스택

### ⚙️ 서버 환경

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Environment Config**: dotenv

### 🛠️ 주요 라이브러리

| 라이브러리     | 설명                               |
| -------------- | ---------------------------------- |
| `express`      | Node.js 웹 애플리케이션 프레임워크 |
| `mongoose`     | MongoDB ODM                        |
| `jsonwebtoken` | JWT 인증 토큰 생성 및 검증         |
| `bcryptjs`     | 비밀번호 해싱                      |
| `cors`         | Cross-Origin 요청 허용             |
| `dotenv`       | 환경변수 관리                      |

### 🧰 개발 도구

| 도구          | 설명                                       |
| ------------- | ------------------------------------------ |
| `ts-node-dev` | TypeScript 실행 + 서버 변경 시 자동 재시작 |

---

## 📁 Project Structure

```txt
src/
├─ app.ts                      # Express 설정 및 라우트 마운트
├─ server.ts                   # 서버 시작점
├─ config/
│  ├─ env.ts                   # 환경 변수 설정
│  ├─ db.ts                    # MongoDB 연결
│  └─ cors.ts                  # CORS 설정
├─ domain/                     # 도메인(업무) 단위 구조
│  ├─ auth/                    # 인증 관련 기능
│  ├─ user/                    # 사용자 관리
│  ├─ product/                 # 상품 관리
│  ├─ cart/                    # 장바구니 기능
│  └─ order/                   # 주문 및 결제 처리
├─ middlewares/                # 인증 및 권한 미들웨어
├─ utils/                      # 공통 유틸 함수
├─ constants/                  # 상수 정의
└─ types/                      # TypeScript 타입 정의
```

---

## 🔗 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | `/api/auth/signup` | 회원가입    |
| POST   | `/api/auth/login`  | 로그인      |
| POST   | `/api/auth/logout` | 로그아웃    |

---

### 👤 User

| Method | Endpoint         | Description    | Auth       |
| ------ | ---------------- | -------------- | ---------- |
| GET    | `/api/users/me`  | 내 정보 조회   | ✅         |
| PATCH  | `/api/users/me`  | 내 정보 수정   | ✅         |
| GET    | `/api/users`     | 유저 목록 조회 | ✅ (Admin) |
| GET    | `/api/users/:id` | 특정 유저 조회 | ✅ (Admin) |

---

> 모든 보호된 API는 `Authorization: Bearer <token>` 헤더가 필요합니다.

## 📜 설치 및 실행 명령어

```bash
# 프로젝트 초기화
npm init -y

# 의존성 설치
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

# TypeScript 개발 환경 설치
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken
```

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

```bash
# 개발 모드 실행 (TypeScript + 자동 재시작)
npm run dev

# 빌드
npm run build

# 일반 실행 (빌드된 JS 실행)
npm start
```
