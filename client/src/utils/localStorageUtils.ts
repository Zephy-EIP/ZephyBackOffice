interface ExpiryContainer {
    data: any,
    expiry: number,
}

export function userDataGetWithExpiry<T>(key: string): T | null {
    const str = localStorage.getItem('userData');
    if (str === null)
        return null;

    let allData: any;
    try {
        allData = JSON.parse(str);
        if (allData === null)
            return null;
    } catch(e) {
        return null;
    }

    if (allData[key] === undefined)
        return null;

    const obj = allData[key];

    if (obj.expiry < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
    }
    return obj.data;
}

export function userDataClear() {
    localStorage.removeItem('userData');
}

function createNewUserData(key: string, obj: any): void {
    const allData: any = {};
    allData[key] = obj;
    localStorage.setItem('userData', JSON.stringify(allData));
    return;
}

/**
 * @param {string} key
 * @param {any} item Must be serializable
 * @param {number} lifetime Lifetime in milliseconds
 */
export function userDataSetWithExpiry(key: string, item: any, lifetime: number): void {
    const obj: ExpiryContainer = {
        data: item,
        expiry: new Date().getTime() + lifetime,
    }

    const str = localStorage.getItem('userData');
    if (str === null)
        return createNewUserData(key, obj);
    try {
        const allData = JSON.parse(str);
        allData[key] = obj;
        localStorage.setItem('userData', JSON.stringify(allData));
    } catch(e) {
        return createNewUserData(key, obj);
    }
}
