import {ACTION_TYPES, PAGINATION_LINK} from "../constants";
import {
    fetchCharacters as fetchCharactersApi,
    fetchWithLink as fetchWithLinkApi,
} from '../services'
import {openToastAlert} from "./toastActions";

export const fetchWithLink = (linkRef) => {
    return (dispatch, getValues) => {

        const {characters: {paging}} = getValues();
        let fetchLink = '';
        let actualPage = paging.page;

        if (PAGINATION_LINK.FIRST === linkRef) {
            actualPage = 0;
            fetchLink = paging.first;
        }
        else if (PAGINATION_LINK.PREV === linkRef) {
            actualPage = actualPage - 1;
            fetchLink = paging.prev;
        }
        else if (PAGINATION_LINK.NEXT === linkRef) {
            actualPage = actualPage + 1;
            fetchLink = paging.next;
        }
        else if (PAGINATION_LINK.LAST === linkRef) {
            actualPage = Math.ceil(paging.count / paging.limit) - 1;
            fetchLink = paging.last;
        }

        dispatch({
            type: ACTION_TYPES.CHARACTERS.LIST_PAGE,
            payload: actualPage
        });

        dispatch({
            type: ACTION_TYPES.LOADING,
            payload: true
        });

        fetchWithLinkApi(fetchLink)
            .then(result => {
                dispatch({
                    type: ACTION_TYPES.CHARACTERS.INDEX.SUCCESS,
                    payload: result
                });
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
            })
            .catch(() => {
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
                dispatch(openToastAlert('Ops... something went wrong fetching the Characters List'))
            })
    }
};

export const fetchCharacters = () => {
    return (dispatch, getValues) => {

        const {characters: {paging, filterParams}} = getValues();

        const params = {
            sort: 'name',
            'page[limit]': paging.limit,
            'page[offset]': paging.page,
            ...filterParams
        };

        dispatch({
            type: ACTION_TYPES.CHARACTERS.INDEX.REQUEST,
            payload: {}
        });

        dispatch({
            type: ACTION_TYPES.LOADING,
            payload: true
        });

        fetchCharactersApi(params)
            .then(result => {
                dispatch({
                    type: ACTION_TYPES.CHARACTERS.INDEX.SUCCESS,
                    payload: {...result}
                });
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
            })
            .catch(() => {
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
                dispatch(openToastAlert('Ops... something went wrong fetching the Characters List'))
            })
    }
};

export const changeCharactersListLimit = (limit) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.CHARACTERS.LIST_LIMIT,
            payload: limit
        });
        return Promise.resolve()
    }
};

export const filterCharactersList = (params) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.CHARACTERS.LIST_PAGE,
            payload: 0
        });
        dispatch({
            type: ACTION_TYPES.CHARACTERS.LIST_FILTER,
            payload: {
                'filter[name]': params.name
            }
        });
        return Promise.resolve()
    }
};