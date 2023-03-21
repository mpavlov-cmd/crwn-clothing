export const loadedCategoriesSelector = (state) => state.categories.docs;

// Get docs as map
export const categoriesMapSelector = (state) => state.categories.docs.reduce((accum, data) => {
    const {title, items} = data;
    accum[title.toLowerCase()] = items;
    return accum;
}, {});
