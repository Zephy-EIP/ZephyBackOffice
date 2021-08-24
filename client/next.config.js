/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

const path = require('path');
const withSass = require('@zeit/next-sass');
module.exports = withSass({
    cssModules: true
});

module.exports = {
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'src/styles')
        ],
    },
};
