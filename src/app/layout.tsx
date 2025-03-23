import Link from 'next/link';
import './globals.css'; // 글로벌 스타일 (옵션)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <title>Moon's 쇼핑몰</title>
      </head>
      <body>
        <header style={{ padding: '1rem', background: '#eee' }}>
          <nav>
            <Link href="/">홈</Link> | <Link href="/cart">장바구니</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '1rem', background: '#eee' }}>
          © 2025 Moon's 쇼핑몰 using Next.js
        </footer>
      </body>
    </html>
  );
}
