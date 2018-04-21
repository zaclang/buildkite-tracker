const withCSS = require('@zeit/next-css');

const webpack = config => Object.assign(config, {
  target: 'electron-renderer'
})

const exportPathMap = () => ({
  '/': { page: '/' }
})

const publicRuntimeConfig = {
  BUILDKITE_TOKEN: process.env.BUILDKITE_TOKEN,
  BUILDKITE_ORG_SLUG: process.env.BUILDKITE_ORG_SLUG,
};

const serverRuntimeConfig = {};

module.exports = withCSS({
  webpack,
  exportPathMap,
  serverRuntimeConfig,
  publicRuntimeConfig,
});
