import {createSelector} from "reselect";

const docsSelector = (state) => state.categories;

export const selectCategories = createSelector(
    [docsSelector],
    (categoriesSlice) => categoriesSlice.docs
)

// Get docs as map
export const categoriesMapSelector = createSelector(
    [selectCategories],
    (docs) => docs.reduce((accum, data) => {
        const {title, items} = data;
        accum[title.toLowerCase()] = items;
        return accum;
    }, {}
));

