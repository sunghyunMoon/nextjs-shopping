// src/app/cart/page.tsx
import CartClient from '@/components/CartClient';
import { fetchCartItems, CartItem } from '../../lib/api';

export default async function CartPage() {
  // 서버 컴포넌트에서 장바구니 데이터를 fetch
  const res = await fetchCartItems();
  // count 필드가 없으면 기본값 1로 설정
  const cartItems: CartItem[] = res.data.map(item => ({
    ...item,
    count: item.count ?? 1,
  }));

  return <CartClient initialCartItems={cartItems} />;
}
