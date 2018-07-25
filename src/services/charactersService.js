import axios from 'axios'
import {URLS} from "../constants";

export const fetchCharacters = (params) => {
    return axios.get(URLS.CHARACTERS, {
        params: {
            ...params
        }
    })
};

export const fetchWithLink = (link) => {
    return axios.get(link, {})
};
