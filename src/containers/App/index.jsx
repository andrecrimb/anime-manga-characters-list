import React, {Component} from 'react'
import CharactersPage from "../../pages/Characters";
import {theme} from "../../style/theme";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {SYSTEM_ROUTES} from '../../constants'
import {compose} from 'redux'
import ToastAlert from '../ToastAlert'
import AppTopBar from "../AppTopBar";
import {Styles} from './styles'
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'

class App extends Component {
    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className={classes.root}>
                        <ToastAlert/>
                        <AppTopBar/>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            <Switch>
                                <Route
                                    exact
                                    path={SYSTEM_ROUTES.characters.routeTo}
                                    component={CharactersPage}
                                />
                            </Switch>
                        </main>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.systemSettings.pageTitle
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {})
)(App)