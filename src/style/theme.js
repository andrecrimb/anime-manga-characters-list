import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#312631',
            main: '#312631',
            dark: '#312631',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ed7259',
            main: '#ed7259',
            dark: '#ed7259',
            contrastText: '#fff',
        },
        third: {
            light: '#3D4A4B',
            main: '#3D4A4B',
            dark: '#3D4A4B',
            contrastText: '#fff',
        },
        background: {
            default: '#f2f2f2'
        },
        danger: {
            default: '#ff654d'
        }
    },
});