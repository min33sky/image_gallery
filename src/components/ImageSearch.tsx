import React, { useState, useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

interface ImageSearchProps {
  handleTerm: (term: string) => void;
}

function ImageSearch({ handleTerm }: ImageSearchProps) {
  const [text, setText] = useState('');

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // props로 받은 함수에 text 전달
      handleTerm(text);
    },
    [handleTerm, text]
  );

  return (
    <div className="max-w-sm mx-auto my-10 overflow-hidden rounded">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center pb-[1px] border-b-2 border-purple-300 ">
          <input
            className="w-full px-2 mr-1 text-3xl leading-tight text-gray-600 bg-transparent border-none appearance-none focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search Your Image"
          />
          <button
            className="flex-shrink-0 px-2 py-2 text-white transition transform bg-purple-500 border-4 rounded-lg hover:bg-purple-400 focus:ring-purple-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-0 active:bg-purple-600"
            type="submit"
          >
            <SearchIcon className="h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageSearch;
