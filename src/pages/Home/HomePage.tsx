import ImageCard from '@components/ImageCard/ImageCard';
import ImageSearch from '@components/ImageSearch';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useState, MutableRefObject, useRef } from 'react';
import { useQuery } from 'react-query';
import { FaSpinner } from 'react-icons/fa';

interface ImageData {
  total: number;
  totalHits: number;
  hits: any[];
}

export async function getImages(term: string, page: number) {
  const { data } = await axios.get<ImageData>(
    `https://pixabay.com/api/?key=${process.env.API_KEY}&q=${term}&image_type=photo&page=${
      page || 1
    }`
  );

  return data;
}

/**
 * 시작 페이지
 * @returns
 */
export default function HomePage() {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [term, setTerm] = useState(''); // 검색어
  const [page, setPage] = useState(1); // 페이지
  const [moreButtonFlag, setMoreButtonFlag] = useState(false);
  const [imageData, setImageData] = useState<any[]>([]);

  const { isLoading, data, error, isError, isSuccess } = useQuery<ImageData, AxiosError>(
    ['getImages', term, page],
    () => getImages(term, page),
    {
      onSuccess: (value: ImageData) => {
        setImageData((prev) => [...prev, ...value.hits]);
        setEnabled(false);
        setMoreButtonFlag(true);
        if (value.hits.length < 20) {
          // 더보기 버튼 안보이게
          setMoreButtonFlag(false);
        }
      },
      enabled,
    }
  );

  const handleSubmit = useCallback(() => {
    if (inputRef.current) {
      setTerm(inputRef.current.value);
      setEnabled(true);
    }
  }, []);

  const getMoreImage = useCallback(() => {
    setPage((prev) => prev + 1);
    setEnabled(true);
  }, []);

  if (isLoading && !imageData) {
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

  if (isSuccess && imageData.length === 0 && data?.hits.length === 0) {
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
      <ImageSearch ref={inputRef} handleSubmit={handleSubmit} />
      <div className="grid gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {imageData.map((image) => (
          <ImageCard key={image?.id} image={image} />
        ))}
      </div>

      {moreButtonFlag && (
        <button type="button" onClick={getMoreImage} className="text-lg bg-purple-400">
          더 보기
        </button>
      )}
    </div>
  );
}
