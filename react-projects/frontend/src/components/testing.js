

const toUnderScore = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const createQueryUrl = (filterObject) => {
    const params = new URLSearchParams();

    Object.entries(filterObject).forEach(([key, value]) => {
        if (value && value.length !== 0) {
            params.append(toUnderScore(key), value);
            console.log(params)
        }
    });
    
    return params.toString();
}

const filterObject = {
    q: "naruto",
    type: "action",
    minScore: "8",
    maxScore: "10",
    status: "completed",
    rating: "pg13",
    sfw: false, //Filter out Adult entries
    genres: [], //Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    genresExclude: [], //Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
    orderBy: "",
    sort: "",
    letter: "",
    startDate: "",
    endDate: "",
    page: 1
};

console.log(createQueryUrl(filterObject));