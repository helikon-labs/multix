export const getIntersection = (array1 = [] as string[], array2 = [] as string[]) =>
    array1.filter((v1) => array2.includes(v1));
export const getDifference = (array1 = [] as string[], array2 = [] as string[]) =>
    array1.filter((v1) => !array2.includes(v1));

export const isEmptyArray = (array: any[]) => Array.isArray(array) && array.length === 0;
