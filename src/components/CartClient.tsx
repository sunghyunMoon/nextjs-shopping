// src/components/CartClient.tsx
'use client';
import { useState } from 'react';
import { updateCartItem, deleteCartItem, CartItem, fetchCartItems } from '../lib/api';

interface CartClientProps {
  initialCartItems: CartItem[];
}

export default function CartClient({ initialCartItems }: CartClientProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // 클라이언트에서 새 데이터를 불러오는 함수
  const loadCart = async () => {
    const res = await fetchCartItems();
    const items = res.data.map(item => ({ ...item, count: item.count ?? 1 }));
    setCartItems(items);
  };

  const handleIncrease = async (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    await updateCartItem(id, { count: item.count + 1 });
    loadCart();
  };

  const handleDecrease = async (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    const newCount = item.count > 1 ? item.count - 1 : 1;
    await updateCartItem(id, { count: newCount });
    loadCart();
  };

  const handleDelete = async (id: number) => {
    await deleteCartItem(id);
    loadCart();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 border-b border-gray-200 mb-2"
            >
              <div className="flex items-center">
                <img
                  src={`${item.imageUrl}?random=${item.id}`}
                  alt={item.name}
                  width="50"
                  height="50"
                  className="mr-4"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p>{item.price} 원</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="mx-3">{item.count}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
