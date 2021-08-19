import ImageCard from '@components/ImageCard/ImageCard';
import ImageSearch from '@components/ImageSearch';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

interface ImageData {
  total: number;
  totalHits: number;
  hits: any[];
}

export async function getImages(term: string) {
  const { data } = await axios.get<ImageData>(
    `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${term}&image_type=photo`
  );

  return data;
}

export default function HomePage() {
  const [term, setTerm] = useState('yellow+flower'); // 검색어
  const { status, data } = useQuery(['getImages', term], () => getImages(term));

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-6xl">Loading.......</h1>
      </div>
    );
  }

  if (status === 'success') {
    console.log(data);
  }

  return (
    <div className="container mx-auto">
      <ImageSearch onChangeTerms={setTerm} />
      <div className="grid grid-cols-3 gap-4">
        {data?.hits.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
