# 뉴스스탠드 디자인 시스템

> 기획서 및 Claude Design Canvas v1 기반 정리

---

## 색상 토큰 (CSS Variables)

```css
:root {
  /* 배경 */
  --color-bg: #f2f4f6;          /* 전체 페이지 배경 */
  --color-surface: #ffffff;      /* 카드/셀 배경 */
  --color-surface-hover: #f8f9fa; /* 호버 배경 */

  /* 테두리 */
  --color-border: #e5e8eb;       /* 기본 보더 */
  --color-border-hover: #d1d5db; /* 호버 보더 */

  /* 브랜드 */
  --color-primary: #0068c8;      /* 주요 액션, 활성 탭 */
  --color-primary-dark: #0050a0; /* 호버 상태 */

  /* 텍스트 */
  --color-text-primary: #1a1a1a;   /* 본문 텍스트 */
  --color-text-secondary: #6b7280; /* 보조 텍스트 */
  --color-text-on-primary: #ffffff; /* 파란 배경 위 텍스트 */

  /* 오버레이 */
  --color-overlay-bg: rgba(255, 255, 255, 0.92); /* pill 버튼 배경 */
  --color-overlay-border: #cccccc;               /* pill 버튼 테두리 */

  /* 티커 */
  --color-ticker-bg: #f9fafb;
  --color-ticker-border: #e5e8eb;
}
```

---

## 타이포그래피

| 용도 | 크기 | 두께 | 비고 |
|---|---|---|---|
| 로고 | 18px | 700 | 헤더 좌측 |
| 날짜 | 13px | 400 | 헤더 우측, secondary 색상 |
| 탭 텍스트 | 14px | 500 | 활성 탭: 흰색 |
| 언론사명 (셀) | 13–15px | 언론사별 다름 | OutletStyle 적용 |
| 기사 제목 | 14px | 700 | 헤드라인 |
| 기사 목록 | 13px | 400 | 불릿 리스트 |
| 편집 시각 | 12px | 400 | secondary 색상 |
| 티커 텍스트 | 13px | 400 | - |

---

## 간격 토큰

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 20px;  /* pill 버튼 */
  --radius-badge: 50%;  /* 원형 배지 */
}
```

---

## 컴포넌트 스펙

### Header

```
height: 56px
padding: 0 24px
border-bottom: 1px solid var(--color-border)
background: var(--color-surface)
display: flex; justify-content: space-between; align-items: center
```

### NewsTicker

```
height: 40px
background: var(--color-ticker-bg)
border-bottom: 1px solid var(--color-ticker-border)
display: grid; grid-template-columns: 1fr 1fr
overflow: hidden
```

### TabBar

```
height: 48px
padding: 0 24px
border-bottom: 1px solid var(--color-border)
display: flex; justify-content: space-between; align-items: center
```

- **탭 버튼**: padding 8px 16px, border-radius 4px
- **활성 탭**: background var(--color-primary), color white
- **배지**: 원형(20px), background var(--color-primary), color white, font-size 11px
- **뷰 토글 버튼**: 28px × 28px, border-radius 4px, border 1px solid var(--color-border)

### OutletCell (그리드 셀)

```
border: 1px solid var(--color-border)
background: var(--color-surface)
display: flex; align-items: center; justify-content: center
aspect-ratio: 3 / 2  (또는 고정 height)
position: relative
cursor: pointer
transition: border-color 0.15s
```

- **Pill 버튼 오버레이**:
  ```
  position: absolute
  background: var(--color-overlay-bg)
  border: 1px solid var(--color-overlay-border)
  border-radius: var(--radius-pill)
  padding: 6px 14px
  font-size: 12px
  opacity: 0 → 1 on hover (transition: opacity 0.15s)
  ```

### GridChevron

```
width: 32px; height: 32px
border-radius: 50%
border: 1px solid var(--color-border)
background: var(--color-surface)
cursor: pointer
disabled: opacity 0.3; cursor: default
hover: background var(--color-surface-hover)
```

### CategoryTabBar (리스트 뷰)

```
height: 44px
border-bottom: 1px solid var(--color-border)
```

- **활성 탭**: background var(--color-primary), color white
- **프로그레스 바**: height 3px, background var(--color-primary), width 0→100% (6000ms linear)
- **카운터**: font-size 12px, secondary 색상, `현재 / 전체` 형식

### ArticleCard

```
display: grid; grid-template-columns: 1fr 1fr
gap: 24px
padding: 20px 24px
background: var(--color-surface)
border: 1px solid var(--color-border)
```

- **헤드라인 이미지**: background #d1d5db (플레이스홀더), border-radius 4px
- **기사 목록**: list-style: disc, padding-left 16px, line-height 1.8

---

## 언론사 고유 스타일 (OutletStyle)

각 언론사는 `color`, `fontStyle`, `fontWeight`, `background` 속성으로 브랜드를 표현합니다.

| 언론사 | color | fontStyle | background |
|---|---|---|---|
| 朝鮮日報 | #1a1a1a | normal | - |
| KBS WORLD | #ffffff | bold | #0068c8 |
| Korea JoongAng Daily | #c00000 | italic | - |
| SBS Biz | #e8003d | normal | - |

> 전체 목록은 `src/data/outlets.ts`에서 관리

---

## 인터랙션 정의

### 뉴스 티커 롤링

```
- 3000~4000ms 간격으로 다음 항목 전환
- 트랜지션: transform translateY(-100%) 0.3s ease-in-out
- overflow: hidden 컨테이너로 클리핑
- 좌우 컬럼 독립 롤링
```

### 프로그레스 타이머 (리스트 뷰)

```
- 6000ms 동안 0 → 100% 선형 진행
- setInterval 100ms 단위 업데이트
- 완료 시 다음 언론사로 전환, 리셋
- 탭 수동 클릭 시 즉시 리셋
```

### 구독/해지 상태 변경

```
- Set<string>으로 구독 ID 관리
- 구독 추가: subscribed.add(id)
- 구독 해지: subscribed.delete(id)
- 탭 배지 카운트 즉시 반영
```

---

## 레이아웃 그리드

```
최대 너비: 1200px (중앙 정렬)
언론사 그리드: repeat(6, 1fr), gap 1px (보더 겹침 효과)
카테고리 탭: repeat(6, auto)
```
