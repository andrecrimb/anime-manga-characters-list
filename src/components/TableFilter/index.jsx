import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import FilterListIcon from '@material-ui/icons/FilterList';
import _ from "lodash";
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {Button, FormControl, Grid} from '@material-ui/core';
import WhitePaper from "../WhitePaper";
import {Search} from '@material-ui/icons'

class TableFilter extends Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false };
        this.renderField = this.renderField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.expandedFilter = this.expandedFilter.bind(this)
    }

    componentWillUnmount() {
        if (this.props.filterParamsAction) {
            this.props.filterParamsAction({})
        }
    }

    renderField(field) {
        const {
            input,
            label,
            name,
            xs,
            sm,
            required,
            type,
            component,
            optionsarr,
            onChange,
            mask,
            ...custom
        } = field;

        return (
            <Field
                key={name}
                onChange={onChange}
                required={required}
                label={label}
                name={name}
                xs={xs}
                sm={sm}
                type={type}
                optionsarr={optionsarr}
                {...mask}
                {...input}
                {...custom}
                component={component}
            />
        )
    }

    onSubmit(values) {
        this.props.filterParamsAction(values)
            .then(() => {
                this.props.submitAction(() => {})
            })
    }

    expandedFilter(event,expanded) {
        this.setState({expanded: expanded})
        /*
        if(expanded == false) {
            this.onSubmit({})
            this.props.reset()
        }
         {this.state.expanded ? 'Limpar Filtro' : filterTitle} <~~~ trocar titulo
        */
    }

    render() {
        const {classes, handleSubmit, filterTitle} = this.props;

        return (
            <ExpansionPanel
                classes={{root: classes.ExpansionPanel}}
                onChange={this.expandedFilter}
            >
                <ExpansionPanelSummary
                    classes={{content: classes.ExpansionPanelSummary}}
                    expandIcon={<FilterListIcon/>}
                >
                    <Typography variant="button" classes={{root: classes.heading}}>
                        {filterTitle}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{root: classes.ExpansionPanelDetails}}>
                    <WhitePaper hasPadding >
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <FormControl error fullWidth>
                                <Grid justify="center" alignContent="center" container spacing={24}>
                                    {_.map(this.props.fields, field => this.renderField(field))}

                                    <Button variant="fab" type="submit"
                                            classes={{root: classes.buttonSearch}}>
                                        <Search/>
                                    </Button>

                                </Grid>
                            </FormControl>
                        </form>

                        {this.props.children}

                    </WhitePaper>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default compose(
    withStyles(Styles, {withTheme: true}),
    reduxForm({
        form: 'tableFilter',
    }),
    connect(null, null),
)(TableFilter);