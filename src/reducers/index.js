import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import systemSettingsReducer from './systemSettingsReducer'
import charactersReducer from './charactersReducer'
import toastAlertReducer from './toastAlertReducer'

const rootReducer = combineReducers({
    form: formReducer,
    systemSettings: systemSettingsReducer,
    characters: charactersReducer,
    toastAlert: toastAlertReducer,
});

export default rootReducer;