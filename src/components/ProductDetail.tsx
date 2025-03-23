'use client';
import { Product, createCartItem } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();

  const handleAddToCart = async () => {
    await createCartItem(product);
    alert('장바구니에 추가되었습니다.');
    // 원한다면 router.push('/cart')로 장바구니 페이지로 이동할 수 있음
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} width="300" height="300" />
      <p>가격: {product.price} 원</p>
      <button
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
       onClick={handleAddToCart}>장바구니에 추가</button>
    </div>
  );
}
