'use client';
import { useState, FormEvent } from 'react';

interface SearchInputProps {
  onSearch: (keyword: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">검색</button>
    </form>
  );
}
