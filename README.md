# Image Gallary

## Description

- react와 tailwindcss를 활용한 이미지 갤러리

## Install

```
npm i tailwindcss postcss autoprefixer postcss-loader -D
```

## TailwindCSS Setting

- 설정 파일 생성

```
 npx tailwindcss init -p
```

- webpack.config.ts에 로더 추가

```ts
module: {
    rules: [
    ...
      {
        test: /.css?$/,
        exclude: [],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
```

- `tailwind.css`을 생성해 아래 코드를 붙여넣는다. (`파일이름`은 상관없다)

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

- index.tsx에서 css파일을 import하면 끝.

## References

- 랜덤 이미지 얻기 (https://source.unsplash.com/random)
