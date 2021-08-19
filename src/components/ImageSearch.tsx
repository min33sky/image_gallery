import React, { useCallback, useState } from 'react';

interface ImageSearchProps {
  text: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

function ImageSearch({ text, handleChange, handleSubmit }: ImageSearchProps) {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-purple-700 py-1 ">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-600 text-2xl mr-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="검색할 이미지를 입력하세요."
          />
          <button
            className="flex-shrink-0 bg-purple-500 hover:bg-purple-400 transform transition focus:ring-purple-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-0 active:bg-purple-600 text-sm border-4 text-white py-2 px-3 rounded-lg tracking-widest"
            type="submit"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageSearch;
