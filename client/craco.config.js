module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        net: false,
        http: require.resolve("stream-http"),
        os: require.resolve("os-browserify/browser"),
        util: require.resolve("util/"),
        fs: false,
        crypto: require.resolve("crypto-browserify"),
        url: require.resolve("url/"),
        dns: false,
        child_process: false,
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        tls: false,
        querystring: require.resolve("querystring-es3"),
        buffer: require.resolve("buffer/"),
        assert: require.resolve("assert/")
      };
      return webpackConfig;
    }
  }
};

