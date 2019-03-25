<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# url-loader

针对webpack开发的加载器，用于将部分小尺寸的资源文件转换为base64编码形式，这样可以减少HTTP请求次数

## Getting Started

To begin, you'll need to install `url-loader`:

```console
$ npm install url-loader --save-dev
```

`url-loader` works like
[`file-loader`](https://github.com/webpack-contrib/file-loader), but can return
a DataURL if the file is smaller than a byte limit.


```js
import img from './image.png'
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

And run `webpack` via your preferred method.

## Options

### `fallback`

Type: `String`
Default: `'file-loader'`

Specifies an alternative loader to use when a target file's size exceeds the
limit set in the `limit` option.

```js
// webpack.config.js
{
  loader: 'url-loader',
  options: {
    fallback: 'responsive-loader'
  }
}
```

The fallback loader will receive the same configuration options as url-loader.

For example, to set the quality option of a responsive-loader above use:

```js
{
  loader: 'url-loader',
  options: {
    fallback: 'responsive-loader',
    quality: 85
  }
}
```

### `limit`

Type: `Number`
Default: `undefined`

A `Number` specifying the maximum size of a file in bytes. If the file is
greater than the limit,
[`file-loader`](https://github.com/webpack-contrib/file-loader) is used by
default and all query parameters are passed to it. Using an alternative to
`file-loader` is enabled via the `fallback` option.

The limit can be specified via loader options and defaults to no limit.

```js
// webpack.config.js
{
  loader: 'url-loader',
  options: {
    limit: 8192
  }
}
```

### `文件媒体格式`

Type: `String`
Default: `(file extension)`

针对没有具体后缀的文件处理，默认查询mimetype字段来推断

```js
// webpack.config.js
{
  loader: 'url-loader',
  options: {
    mimetype: 'image/png'
  }
}
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/url-loader.svg
[npm-url]: https://npmjs.com/package/url-loader

[node]: https://img.shields.io/node/v/url-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/url-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/url-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/url-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/url-loader

[cover]: https://codecov.io/gh/webpack-contrib/url-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/url-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[size]: https://packagephobia.now.sh/badge?p=url-loader
[size-url]: https://packagephobia.now.sh/result?p=url-loader
