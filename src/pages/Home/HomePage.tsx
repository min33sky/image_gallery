import ImageCard from '@components/ImageCard/ImageCard';
import ImageSearch from '@components/ImageSearch';
import axios, { AxiosError } from 'axios';
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

/**
 * 시작 페이지
 * @returns
 */
export default function HomePage() {
  const [term, setTerm] = useState(''); // 검색어
  const { isLoading, data, error, isError, isSuccess } = useQuery<ImageData, AxiosError>(
    ['getImages', term],
    () => getImages(term)
  );

  // const mutation = useMutation(getImages);

  const handleTerm = useCallback((text: string) => {
    setTerm(text);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-6xl animate-spin">
          <FaSpinner />
        </h1>
      </div>
    );
  }

  if (isError) {
    console.log('에러: ', error);
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-6xl animate-spin">에러...{error?.message}</h1>
      </div>
    );
  }

  if (isSuccess && data?.hits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl md:text-5xl">해당하는 이미지가 없습니다... 😂</h1>
        <div>
          <button
            className="px-3 py-2 mt-5 text-2xl font-semibold text-white transition transform bg-purple-500 hover:bg-purple-400 hover:-translate-y-1 focus:ring-purple-300 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-purple-700 "
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
    <div className="container px-6 sm:mx-auto sm:px-2 ">
      <ImageSearch handleTerm={handleTerm} />
      <div className="grid gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.hits.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
