import React, {Component} from 'react'
import {Styles} from "./styles";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {compose} from 'redux'
import {
    Typography,
    AppBar,
    Toolbar,
    LinearProgress
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class AppTopBar extends Component {
    render() {
        const {classes} = this.props;

        return (
            <AppBar position="absolute" className={classes.root}>
                <Toolbar>
                    <img className={classes.navIcon} src="https://kitsu.io/kitsu-256-ed442f7567271af715884ca3080e8240.png" alt=""/>
                    <Typography variant="title" className={classes.flex} color="inherit" noWrap>
                        Anime and Maga Characters
                    </Typography>
                </Toolbar>
                <LinearProgress
                    color="secondary"
                    className={classNames(
                        this.props.loading === 0 ? classes.loading : ''
                    )}
                />
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.systemSettings.countLoadingRequest
    }
};

const app = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {app})
)(AppTopBar);
