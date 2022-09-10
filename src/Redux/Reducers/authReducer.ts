/* eslint-disable prettier/prettier */
import ReduxAction from "../../Models/ReduxAction.model";

const INITIAL_STATE = {
    authors: [],
    favAuthorsIDs: [],
};

const auth = (state = INITIAL_STATE, action: ReduxAction) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default auth;
