export const toUnderScore = (str) => {
    return str.replace(/([A-Z])/g, letter => letter.toLowerCase()).replace(/[\s-]+/g, '_').toLowerCase();
}