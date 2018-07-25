import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import {Styles} from './styles'
import {PAGINATION_LINK} from "../../constants";
import {
    FirstPage,
    LastPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@material-ui/icons';

class TablePaginationActions extends Component {
    render() {
        const {classes, count, page, onChangePage, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={() => onChangePage(PAGINATION_LINK.FIRST)}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
                </IconButton>
                <IconButton
                    onClick={() => onChangePage(PAGINATION_LINK.PREV)}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={() => onChangePage(PAGINATION_LINK.NEXT)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={() => onChangePage(PAGINATION_LINK.LAST)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
                </IconButton>
            </div>
        );
    }
}

export default withStyles(Styles, {withTheme: true})(TablePaginationActions);

