import React, {Component} from 'react'
import {withStyles} from "@material-ui/core/styles";
import {Styles} from "./styles";
import FormTextField from "../../components/FormTextField";
import TableFilter from "../../components/TableFilter";
import TablePaginationActions from '../../components/TablePaginationActions'
import {
    fetchCharacters,
    changeCharactersListLimit,
    fetchWithLink,
    filterCharactersList,
} from "../../actions";
import {connect} from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableFooter,
    TablePagination,
} from '@material-ui/core';

const FILTER_FIELDS = {
    nome: {
        type: 'text',
        component: FormTextField,
        label: 'Character Name',
        name: 'name',
        xs: 12,
        sm: 8
    },
};

class Characters extends Component {

    componentWillMount() {
        this.buscar()
    }

    buscar() {
        this.props.fetchCharacters()
    }

    handleChangePage = (pageDirection) => {
        this.props.fetchWithLink(pageDirection)
    };

    handleChangeRowsPerPage = event => {
        this.props.changeCharactersListLimit(event.target.value)
            .then(() => {
                this.buscar()
            })
    };

    renderList() {
        return _.map(this.props.characters.charactersList, charactersItem => {
            return (
                <TableRow
                    key={charactersItem.id}
                    className="tableRow"
                    hover={true}
                >
                    <TableCell> {charactersItem.id} </TableCell>
                    <TableCell> {charactersItem.attributes.name} </TableCell>
                    <TableCell> {charactersItem.type} </TableCell>
                    <TableCell> {moment(charactersItem.attributes.createdAt).format("MM/DD/YYYY h:mm:ss")} </TableCell>
                    <TableCell> {moment(charactersItem.attributes.updatedAt).format("MM/DD/YYYY h:mm:ss")} </TableCell>
                </TableRow>
            )
        });
    }

    render() {
        const {
            classes,
            characters: {paging},
            fetchCharacters,
            filterCharactersList
        } = this.props;

        return (
            <div>
                <TableFilter
                    filterTitle="Filter Characters"
                    fields={FILTER_FIELDS}
                    filterParamsAction={filterCharactersList}
                    submitAction={fetchCharacters}
                />

                <Paper className={classes.root}>
                    <Table aria-labelledby="tableTitle" className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderList()}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={paging.count}
                                    rowsPerPage={paging.limit}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    page={paging.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {characters: state.characters}
};

Characters = connect(mapStateToProps, {
    fetchCharacters,
    changeCharactersListLimit,
    fetchWithLink,
    filterCharactersList,
})(Characters);

export default withStyles(Styles, {withTheme: true})(Characters);


