const path = require('path');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const postcss = {
    loader: require.resolve('postcss-loader'),
    options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009'
            }),
            // disablt if react native
            pxtorem({
                rootValue: 100 * (750 / 750),
                unitPrecision: 5,
                propList: ['*'],
                selectorBlackList: [/^\.nop2r/],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0
            })
        ]
    }
};

exports.postcss = postcss;

exports.stylus = [
    postcss,
    {
        loader: 'stylus-loader',
        options: {
            import: [path.resolve(__dirname, '../src/styles/_base.styl')]
        }
    }
];

const css = {
    loader: require.resolve('css-loader'),
    options: {
        importLoaders: 1,
        minimize: true,
        sourceMap: shouldUseSourceMap
    }
};

exports.css = css;

const moduleCss = {
    loader: require.resolve('css-loader'),
    options: {
        importLoaders: 1,
        minimize: true,
        modules: true,
        localIdentName: '[folder]-[name]-[local]-[hash:base64:5]',
        sourceMap: shouldUseSourceMap
    }
};

exports.moduleCss = moduleCss;

/**
 * 生成 css extract loader
 * @param {*} tartget
 * @param {*} param1
 */
exports.extract = ({ ExtractTextPlugin, extractTextPluginOptions }) => {
    return (target, modules) => {
        return ExtractTextPlugin.extract(
            Object.assign(
                {
                    fallback: {
                        loader: require.resolve('style-loader'),
                        options: {
                            hmr: false
                        }
                    },
                    use: [modules ? moduleCss : css].concat(target)
                },
                extractTextPluginOptions
            )
        );
    };
};

exports.auotImport = [
    { import: 'React', from: 'react' },
    {
        import: '{ IndexLink, Link }',
        from: 'react-router',
        search: 'IndexLink|Link'
    },
    {
        import: '{ push as navigateTo }',
        from: 'react-router-redux',
        search: 'navigateTo'
    }
];

exports.babel = {
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    plugins: [
        [
            'import',
            {
                libraryName: 'antd-mobile',
                style: 'css'
            }
        ]
    ]
};

exports.uglify = {
    parallel: true,
    cache: false,
    sourceMap: true,
    extractComments: {
        filename: 'LICENSES'
    },
    uglifyOptions: {
        safari10: true,
        ie8: true,
        ecma: 6,
        output: {
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebookincubator/create-react-app/issues/2488
            ascii_only: true,
            beautify: false
        },
        compress: {
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebookincubator/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false
        },
        mangle: { keep_fnames: true },
        keep_fnames: true,
        keep_classnames: true
    }
};

exports.alias = {
    // 'react-easy': path.resolve(__dirname, '../src/lib/react-easy'),
};
