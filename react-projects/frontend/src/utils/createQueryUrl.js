const toUnderScore = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const createQueryUrl = (filterObject) => {
    const params = new URLSearchParams();

    Object.entries(filterObject).forEach(([key, value]) => {
        if (value && value.length !== 0) {
            params.append(toUnderScore(key), value);
        }
    });
    
    return params.toString();
}