import React from 'react'
import Paper from '@material-ui/core/Paper';
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles/index";


const component = (props) => {
    const {classes, children, hasPadding} = props;
    return (
        <Paper className={classes.root}>
            <div className={hasPadding ? classes.whitePaperDiv : ''}>
                {children}
            </div>
        </Paper>
    )
};

export default withStyles(Styles, {withTheme: true})(component);

