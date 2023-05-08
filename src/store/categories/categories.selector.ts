import {createSelector} from "reselect";
import {CategoriesState} from "./categories.reducer";
import {CategoryMap} from "./categories.types";
import {RootState} from "../store";


const categoriesSelector = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [categoriesSelector],
    (categoriesSlice) => categoriesSlice.docs
);

// Get docs as map
export const categoriesMapSelector = createSelector(
    [selectCategories],
    (docs): CategoryMap => docs.reduce((accum, data) => {
            const {title, items} = data;
            accum[title.toLowerCase()] = items;
            return accum;
        }, {} as CategoryMap
    )
);

export const selectIsCategoriesLoading = createSelector(
    [categoriesSelector],
    (categoriesSlice) => categoriesSlice.isLoading
);