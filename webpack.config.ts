import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as dotenv from 'dotenv';

const isDevelopment = process.env.NODE_ENV !== 'production';

declare module 'webpack' {
  // eslint-disable-next-line no-unused-vars
  interface Configuration {
    devServer?: WebpackDevServer.Configuration;
  }
}

const config: webpack.Configuration = {
  name: 'typescript-react-boilerplate',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  // ? 빌드할 파일의 상대경로를 절대경로로 변환
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@typings': path.resolve(__dirname, 'src/typings'),
    },
  },
  entry: {
    app: './src/index', // ? 엔트리 포인트 (시작 파일 이름)
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            // @emotion/babel-plugin, react-hot-loading
            // development: {
            //   plugins: ['@emotion', require.resolve('react-refresh/babel')],
            // },
            // production: {
            //   plugins: ['@emotion'],
            // },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // 빌드 과정을 알려줌
    new webpack.ProgressPlugin(),
    // 배너를 정해줌
    new webpack.BannerPlugin({
      banner: `build time : ${new Date().toLocaleTimeString()}`,
    }),
    // ? 타입스크립트 체크와 웹팩이 동시에 돌아가게 설정 (성능 향상)
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),

    new webpack.DefinePlugin({
      YOSHI: '요오오오오오시',
      'process.env': JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
    }),

    // ? process.NODE_ENV를 프론트앤드에서 사용 가능
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
    // 타겟된 템블릿을 빌드될 때 베이스템플릿로 정해줌
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    // 전의 빌드를 삭제함
    new CleanWebpackPlugin(),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true, // ? react-router (서버는 localhost:3090 주소밖에 모르지만 이 설정을 통해 /xxx 와 같은 주소로 라우팅이 가능하다)
    port: 3090,
    publicPath: '/',
    proxy: {
      '/api/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
    },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;
