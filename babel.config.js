const plugins = [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-dynamic-import-node',
    [
        'babel-plugin-import',
        {
            libraryName: '@material-ui/core',
            libraryDirectory: '',
            camel2DashComponentName: false
        },
        'core'
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@material-ui/icons',
            libraryDirectory: '',
            camel2DashComponentName: false
        },
        'icons'
    ]
];

const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            corejs: { version: '3', proposals: true }
        }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
];

if (process.env.NODE_ENV === 'test') {
    const styledComponents = [
        'babel-plugin-styled-components',
        {
            fileName: false
        }
    ];
    plugins.push(styledComponents);
} else {
    plugins.push(['babel-plugin-styled-components', { ssr: true }]);
}

module.exports = {
    presets,
    plugins
};
