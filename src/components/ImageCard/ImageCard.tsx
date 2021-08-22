import React from 'react';

interface ImageCardProps {
  image: any;
}

function ImageCard({ image }: ImageCardProps) {
  const tags = image.tags.split(', ');

  return (
    <div className="mb-10 overflow-hidden rounded shadow-lg sm:max-w-sm sm:mx-4">
      <div className="w-full h-64 overflow-hidden">
        <img
          className="object-cover object-center w-full h-64 transition transform cursor-pointer hover:scale-125"
          src={image.webformatURL}
          alt="random_image"
        />
      </div>

      {/* 이미지 설명 */}
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-purple-500">Photo by {image.user}</div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag: string) => (
          <span
            key={tag + image.id}
            className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageCard;
