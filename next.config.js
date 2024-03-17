/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-12 11:28:40
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
    prependData: `@import "global.scss";`,
  },
};

module.exports = nextConfig;
