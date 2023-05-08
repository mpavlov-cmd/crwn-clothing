import {createSelector} from "reselect";
import {UserState} from "./user.reducer";
import {RootState} from "../store";


export const selectUser = (state: RootState): UserState => state.user;
export const currentUserSelector = createSelector(
    selectUser,
    (user) => user.currentUser
);