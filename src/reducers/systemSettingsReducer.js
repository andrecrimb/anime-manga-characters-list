import {ACTION_TYPES} from "../constants";

const initial = {
    countLoadingRequest: 0
};

export default (state = initial, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOADING:
            let countLoadingRequest = state.countLoadingRequest;

            if (action.payload) {
                countLoadingRequest++
            } else if (!action.payload && countLoadingRequest > 0) {
                countLoadingRequest--
            }

            return {
                ...state,
                countLoadingRequest: countLoadingRequest
            };
        default:
            return state
    }
}
