const config = {
    arrowParens: 'always',
    printWidth: 100,
    semi: true,
    singleAttributePerLine: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
    overrides: [
        {
            files: ['*.yml', '*.yaml'],
            options: {
                useTabs: false,
                tabWidth: 2,
            },
        },
    ],
};

export default { ...config };
