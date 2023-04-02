import {createSelector} from "reselect";

const categoriesSelector = (state) => state.categories;

export const selectCategories = createSelector(
    [categoriesSelector],
    (categoriesSlice) => categoriesSlice.docs
);

// Get docs as map
export const categoriesMapSelector = createSelector(
    [selectCategories],
    (docs) => docs.reduce((accum, data) => {
        const {title, items} = data;
        accum[title.toLowerCase()] = items;
        return accum;
    }, {}
));

export const selectIsCategoriesLoading = createSelector(
    [categoriesSelector],
    (categoriesSlice) => categoriesSlice.isLoading
);