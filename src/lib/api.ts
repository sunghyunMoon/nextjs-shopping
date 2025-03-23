import axios, { AxiosResponse } from 'axios';

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  count: number;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 제품 전체 조회
export const fetchProducts = (): Promise<AxiosResponse<Product[]>> =>
  instance.get('/products');

// 제품 ID로 조회
export const fetchProductById = (id: number): Promise<AxiosResponse<Product>> =>
  instance.get(`/products/${id}`);

// 검색어에 따른 제품 조회
export const fetchProductsByKeyword = (
  keyword: string
): Promise<AxiosResponse<Product[]>> =>
  instance.get('/products', { params: { name_like: keyword } });

// 장바구니에 아이템 추가
export const createCartItem = (cartItem: CartItem): Promise<AxiosResponse<CartItem>> =>
  instance.post('/carts', cartItem);

// 장바구니 아이템 전체 조회
export const fetchCartItems = (): Promise<AxiosResponse<CartItem[]>> =>
  instance.get('/carts');
// 장바구니 아이템 수량 업데이트 (PATCH 사용)

export const updateCartItem = (
  id: number,
  updatedFields: Partial<CartItem>
): Promise<AxiosResponse<CartItem>> =>
  instance.patch(`/carts/${id}`, updatedFields);

// 장바구니 아이템 삭제
export const deleteCartItem = (id: number): Promise<AxiosResponse<void>> =>
  instance.delete(`/carts/${id}`);