
// 在调用loader时获取loader的options
import loaderUtils from 'loader-utils';

export default function normalizeFallback(fallback, originalOptions) {
  let loader = 'file-loader';
  let options = {};

  // 如果配置了fallback来处理回退情况
  if (typeof fallback === 'string') {
    loader = fallback;

    const index = fallback.indexOf('?');

    // 如果fallback字符串中包含"?"，则说明fallback加载器具有参数
    if (index >= 0) {
      loader = fallback.substr(0, index);
      options = loaderUtils.parseQuery(fallback.substr(index));
    }
  }

  // 如果fallback属性为对象，则解构出该对象的loader和options属性
  if (fallback !== null && typeof fallback === 'object') {
    ({ loader, options } = fallback);
  }

  options = Object.assign({}, originalOptions, options);

  delete options.fallback;

  return { loader, options };
}
