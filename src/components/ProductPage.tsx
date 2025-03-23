'use client';
import { useState } from 'react';
import { Product, fetchProductsByKeyword } from '../lib/api';
import ProductList from './ProductList';
import SearchInput from './SearchInput';

interface ProductPageProps {
  initialProducts: Product[];
}

export default function ProductPage({ initialProducts }: ProductPageProps) {
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  const handleSearch = async (keyword: string) => {
    if (!keyword) {
      setProductList(initialProducts);
      return;
    }
    const res = await fetchProductsByKeyword(keyword);
    setProductList(res.data);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>제품 목록</h1>
      <SearchInput onSearch={handleSearch} />
      <ProductList products={productList} />
    </div>
  );
}
