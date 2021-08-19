import ImageCard from '@components/ImageCard/ImageCard';
import ImageSearch from '@components/ImageSearch';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { FaSpinner } from 'react-icons/fa';

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
  const [term, setTerm] = useState(''); // 검색어
  const mutation = useMutation(getImages);

  const handleSubmit = useCallback(() => {
    mutation.mutate(term);
  }, [mutation, term]);

  if (mutation.status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="animate-spin text-6xl">
          <FaSpinner />
        </h1>
      </div>
    );
  }

  if (mutation.status === 'success' && mutation.data?.hits.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl md:text-5xl">해당하는 이미지가 없습니다... 😂</h1>
        <div>
          <button
            className="mt-5 px-3 py-2 text-2xl bg-purple-500 hover:bg-purple-400  hover:-translate-y-1 transform transition focus:ring-purple-300 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-purple-700 text-white font-semibold "
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              history.go();
            }}
          >
            메인으로...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <ImageSearch text={term} handleChange={setTerm} handleSubmit={handleSubmit} />
      <div className="grid grid-cols-3 gap-4">
        {mutation.data?.hits.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
