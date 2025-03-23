# Next.js 쇼핑몰 프로젝트

- 이 프로젝트는 Next.js 13와 TypeScript, Tailwind CSS, JSON Server를 활용하여 만든 교육용 쇼핑몰 예제입니다.
- 제품 목록 조회, 제품 상세보기, 검색, 장바구니 기능(수량 관리, 삭제/추가) 등을 구현하였으며, 개발 시 Next.js 서버와 JSON Server를 동시에 실행할 수 있도록 설정했습니다.

## 폴더 구조

```tsx
next-shopping/
└─ src/
   ├─ app/
   │   ├─ layout.tsx           // 전체 페이지에 적용할 공통 레이아웃 (헤더, 푸터 등)
   │   ├─ page.tsx             // 홈 페이지 (제품 목록 초기 렌더링)
   │   ├─ cart/
   │   │   └─ page.tsx         // 장바구니 페이지
   │   └─ products/
   │       └─ [id]/
   │           └─ page.tsx     // 제품 상세 페이지 (동적 라우팅)
   ├─ components/
   │   ├─ ProductPage.tsx      // 홈 페이지 내에서 검색 및 목록 상태 관리를 담당 (클라이언트 컴포넌트)
   │   ├─ ProductList.tsx      // 제품 목록을 카드 형태로 나열하는 UI 컴포넌트
   │   ├─ SearchInput.tsx      // 사용자가 검색어를 입력할 수 있는 폼 컴포넌트
   │   └─ ProductDetail.tsx    // 제품 상세 정보와 장바구니 추가 기능을 제공 (클라이언트 컴포넌트)
   │   └─ CartClient.tsx       // 카트 리스트 
   ├─ lib/
   │   └─ api.ts               // API 호출 및 타입 정의 파일 (Axios 인스턴스를 활용)
   └─ .env.local              // 환경변수 파일 (예: NEXT_PUBLIC_API_BASE_URL)

```

## 설치 및 실행

```tsx
npm install
npm run dev
```

## 컴포넌트 및 API

### 서버 컴포넌트

- 서버 컴포넌트는 페이지에 필요한 데이터를 서버에서 미리 가져와 초기 HTML을 생성하므로 SEO 최적화와 빠른 초기 로딩이 가능합니다.
- **`src/app/page.tsx` (홈 페이지)**
    - `fetchProducts` API를 호출해 전체 제품 목록을 받아오고, 해당 데이터를 클라이언트 컴포넌트인 `ProductPage`에 전달합니다.
- **`src/app/products/[id]/page.tsx` (제품 상세 페이지)**
    - URL 파라미터의 `id` 값을 이용해 `fetchProductById` API로 해당 제품의 상세 정보를 받아와 `ProductDetail` 컴포넌트에 전달합니다.
- `src/app/cart/page.tsx` **(장바구니)**
    - JSON Server에서 장바구니 데이터를 fetch하고, 초기 데이터를 클라이언트 컴포넌트에 props로 전달합니다.

### 클라이언트 컴포넌트

- 클라이언트 컴포넌트는 사용자의 입력 및 상호작용(검색, 버튼 클릭 등)을 처리하며, 동적 UI 업데이트와 상태 관리를 담당합니다.
- **`src/components/ProductPage.tsx`**
    - 홈 페이지에서 검색어 입력을 받고, 그에 따른 제품 목록 업데이트(필터링)를 담당합니다.
- **`src/components/ProductList.tsx`**
    - 받아온 제품 데이터를 카드 형태로 나열합니다. 각 카드 전체를 클릭하면 상세 페이지로 이동하도록 구현되어 있습니다.
- **`src/components/SearchInput.tsx`**
    - 사용자가 검색어를 입력하는 폼을 제공하며, 제출 시 상위 컴포넌트에 이벤트를 전달합니다.
- **`src/components/ProductDetail.tsx`**
    - 제품 상세 정보를 보여주고, "장바구니에 추가" 버튼을 통해 해당 제품을 장바구니에 추가하는 기능을 제공합니다.
- **`src/components/CartClient.tsx`**
    - 전달받은 데이터를 기반으로 UI를 렌더링하고, 사용자의 수량 조절, 삭제 등의 상호작용 이벤트를 처리합니다.

### 라우팅 구조

- Next.js의 파일 기반 라우팅을 활용하여, 폴더와 파일 이름에 따라 URL 경로가 자동으로 생성됩니다.
- **홈 페이지:**
    - 파일: `src/app/page.tsx`
    - URL: `/`
- **제품 상세 페이지 (동적 라우팅):**
    - 파일: `src/app/products/[id]/page.tsx`
    - URL: `/products/{id}`
    - 예를 들어, `/products/3` URL은 제품 ID가 3인 상세 페이지를 렌더링합니다.
- **장바구니 페이지:**
    - 파일: `src/app/cart/page.tsx`
    - URL: `/cart`

### API 호출 및 데이터 관리

**API 모듈 (src/lib/api.ts)**

- **역할:**
    
    Axios를 사용하여 JSON Server와 통신하는 모든 API 함수를 한 곳에서 관리합니다.
    
    또한, 제품 및 장바구니 데이터에 대한 TypeScript 타입을 정의하여 코드의 안정성을 높입니다.
    
- **주요 함수:**
    - `fetchProducts`: 전체 제품 목록 조회
    - `fetchProductById`: 특정 제품 상세 조회
    - `fetchProductsByKeyword`: 검색어에 따른 제품 필터링
    - `createCartItem`: 장바구니에 아이템 추가
        - 제품을 장바구니에 추가할 때 초기 수량(count)을 설정합니다.
    - `fetchCartItems`: 장바구니에 담긴 아이템 전체 조회
    - `updateCartItem`: 장바구니 아이템의 수량을 업데이트 (PATCH 방식)
    - `deleteCartItem`: 장바구니 아이템 삭제
