const path = require('path');
const utils = require('../utlis/utils');

const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'));
const NODE_MODULES_DIR = path.join(ABSOLUTE_BASE, 'node_modules');
const DIST_DIR = path.join(ABSOLUTE_BASE, 'dist');
const SRC_DIR = path.join(ABSOLUTE_BASE, 'src');
const COM_DIR = path.join(ABSOLUTE_BASE, 'src/components'); // 公用组件
const ASSETS_DIR = path.join(ABSOLUTE_BASE, 'src/assets');
const PORT = process.env.PORT || 7044;
// WDS
//const PROJECT_ID = 31; // RAP上的 project id
const HOST = utils.getIP();
// 检测是否输入生产环境代码运行，process.env.NODE_ENV 返回 true 是生产环境，否则是 development
const ISDEVELOPMENT = (process.env.NODE_ENV || "development") === "development";

module.exports = {
  ABSOLUTE_BASE: ABSOLUTE_BASE,
  NODE_MODULES_DIR: NODE_MODULES_DIR,
  DIST_DIR: DIST_DIR,
  SRC_DIR: SRC_DIR,
  COM_DIR: COM_DIR,
  ASSETS_DIR: ASSETS_DIR,
  PORT: PORT,
  HOST: HOST,
  //PROJECT_ID: PROJECT_ID,
  ISDEVELOPMENT: ISDEVELOPMENT,
};
