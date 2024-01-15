export function groupBy(array: Array<any>, key: string) {
    return array.reduce((result, obj) => {
        const keyValue = obj[key];

        if (!result[keyValue]) {
            result[keyValue] = [];
        }

        result[keyValue].push(obj);

        return result;
    }, {});
}