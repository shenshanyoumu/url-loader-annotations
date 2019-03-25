
// 用户获取webpack配置中，加载器的options参数
import { getOptions } from 'loader-utils';

// schema检测工具，用于检测给定的对象结构是否符合schema要求
import validateOptions from 'schema-utils';

// 用于解析出文件的基础信息和格式信息
import mime from 'mime';

// 针对特殊情况下的回退机制
import normalizeFallback from './utils/normalizeFallback';

// 定义url-loader的options schema形态
import schema from './options.json';

// Loader Mode
export const raw = true;

export default function loader(src) {
  // 在webpack中得到url-loader加载器的options对象
  const options = getOptions(this) || {};

  // 验证传递的options是否符合schema要求
  validateOptions(schema, options, 'URL Loader');

  const file = this.resourcePath;
 
  // 根据limit设置来决定是否基于base64编码
  let limit = options.limit;

  if (limit) {
    limit = parseInt(limit, 10);
  }


  // 获得当前加载的文件格式信息
  const mimetype = options.mimetype || mime.getType(file);

  // 如果没有设置limit或者文件字节数小于limit，则将该文件进行缓存处理，并基于base64格式导出
  if (!limit || src.length < limit) {
    if (typeof src === 'string') {
      src = Buffer.from(src);
    }

    return `module.exports = ${JSON.stringify(
      `data:${mimetype || ''};base64,${src.toString('base64')}`
    )}`;
  }

  // 下面表示加载的文件无法通过base64编码，则基于fallback回退机制处理
  const {
    loader: fallbackLoader,
    options: fallbackOptions,
  } = normalizeFallback(options.fallback, options);

  // 加载回退loader
  const fallback = require(fallbackLoader);

  // fallback加载器的options继承了url-loader的options，并覆盖query属性值
  const fallbackLoaderContext = Object.assign({}, this, {
    query: fallbackOptions,
  });

  // 基于fallback加载器处理文件
  return fallback.call(fallbackLoaderContext, src);
}
