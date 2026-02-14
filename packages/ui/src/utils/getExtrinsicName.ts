export const getExtrinsicName = (section = '', method = '') => {
    if (!section || !method) return '';

    return `${section}.${method}`;
};
