export const Styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'fixed', //relative
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '#f2f2f2',
        padding: theme.spacing.unit * 3,
        overflowX: 'auto',
        maxWidth: '920px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});