import {ACTION_TYPES} from "../constants";
import _ from 'lodash'

const initial = {
    charactersList: {},
    paging: {
        page: 0,
        count: 0,
        limit: 20,
        first: '',
        prev: '',
        next: '',
        last: '',
    },
    filterParams: {},
};

export default (state = initial, action) => {

    switch (action.type) {
        case ACTION_TYPES.CHARACTERS.INDEX.SUCCESS:

            let {data, meta, links} = action.payload.data;

            return {
                ...state,
                charactersList: _.mapKeys(data, 'id'),
                paging: {
                    ...state.paging,
                    ...links,
                    ...meta,
                },
                filterParams: state.filterParams
            };
        case ACTION_TYPES.CHARACTERS.LIST_LIMIT:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    limit: action.payload,
                }
            };
        case ACTION_TYPES.CHARACTERS.LIST_PAGE:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    page: action.payload,
                }
            };
        case ACTION_TYPES.CHARACTERS.LIST_FILTER:
            return {
                ...state,
                filterParams: action.payload
            };
        default:
            return state
    }
}