const loader = require('./index');

// 基于commonJS模块化机制处理
module.exports = loader.default;
module.exports.raw = loader.raw;
