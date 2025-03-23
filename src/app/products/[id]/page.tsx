import ProductDetail from '@/components/ProductDetail';
import { fetchProductById, Product } from '@/lib/api';

interface Params {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const id = Number(params.id);
  const res = await fetchProductById(id);
  const product: Product = res.data;
  return <ProductDetail product={product} />;
}
