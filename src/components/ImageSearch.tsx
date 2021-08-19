import React, { useCallback, useState } from 'react';

interface ImageSearchProps {
  onChangeTerms: (e: any) => void;
}

function ImageSearch({ onChangeTerms }: ImageSearchProps) {
  const [text, setText] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onChangeTerms(text);
    },
    [onChangeTerms, text]
  );

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-purple-700 py-1 ">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-600 text-2xl mr-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="검색할 이미지를 입력하세요."
          />
          <button
            className="flex-shrink-0 bg-purple-500 hover:bg-purple-400 transform transition text-sm border-4 text-white py-2 px-3 rounded-lg tracking-widest"
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
