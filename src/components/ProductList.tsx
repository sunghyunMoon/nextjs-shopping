// components/ProductList.tsx
import Link from 'next/link';
import { Product } from '@/lib/api';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              margin: 10,
              border: '1px solid #ccc',
              padding: 10,
              width: 180,
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src={`${product.imageUrl}?random=${product.id}`}
              alt={product.name}
              width="150"
              height="150"
            />
            <h3>{product.name}</h3>
            <p>{product.price} 원</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
