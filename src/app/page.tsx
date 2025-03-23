import ProductPage from '@/components/ProductPage';
import { fetchProducts, Product } from '@/lib/api';

export default async function Home() {
  const res = await fetchProducts();
  const products: Product[] = res.data;
  return <ProductPage initialProducts={products} />;
}
