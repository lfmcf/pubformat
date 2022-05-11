import React, { useEffect, useState } from 'react';
import {Card, Table, TableHead, TableRow, TableCell, Paper, makeStyles, IconButton, TableContainer, TableBody, MuiThemeProvider} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { createTheme } from '@material-ui/core/styles'
// import CreateIcon from '@material-ui/icons/Create';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import ReactCountryFlag from "react-country-flag";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import CustomToolbar from '@/Components/Customtoolbar';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop:'16px'
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    cCard: {
        borderRadius: '0',
        boxShadow: '0 1px 20px 0 rgb(69 90 100 / 8%)'
    },
    cHeader : {
        borderBottom: '1px solid #f1f1f1',
        '& .MuiCardHeader-title': {
            fontSize: '17px',
            display: 'inline-block',
            lineHeight: '1.1',
            marginRight: '10px',
            fontFamily: '"Open Sans", sans-serif',
            position: 'relative'
        },
        '& .MuiCardHeader-title:after': {
            content: '""',
            backgroundColor: '#04a9f5',
            position: 'absolute',
            top: '0',
            width: '4px',
            height: '20px',
            left: '-16px'
        }
    }

}));

const Index = (props) => {

    const classes = useStyles();

    const thememui = () => createTheme({
        
        overrides: {
            MUIDataTableHeadCell: {
                data: {
                    fontWeight: '600',
                    fontSize: '13px',
                    color: '#111'
                }
            },
            MuiTableCell: {
                root: {
                    position: "relative",
                    padding: '2px',
                    fontSize: '12px',
                }
            },
            MUIDataTable: {
                paper: {
                    backgroundColor:'transparent',
                    boxShadow:'unset'
                }
            }
        }
    });

    const handleNavigate = () => {
        // props.history.push({pathname: '/add_dossier'})
        Inertia.visit('/gcc', { method: 'get' })
    }

    const options = {
        rowsPerPageOptions: [5,10,15, 50, 100],
        rowsPerPage: 5,
        responsive: 'vertical',
        enableNestedDataAccess: '.',
        downloadOptions: {
            separator: ";",
            filterOptions: {
                useDisplayedColumnsOnly: false,
                useDisplayedRowsOnly: false
            }
        },
        customToolbar: () => {
            return(
                <CustomToolbar handleClick={handleNavigate} />
            )
        },
        expandableRows: true,

    }

    const columns = [
        {
            name: 'id',
            options: {
                display: false,
                filter: false,
                viewColumns: false,
                sort: true,
            }

        },
    ];

    return (
        <Authenticated auth={props.auth} header="GCC">
            <div className={classes.wrapper}>
                <Card className={classes.cCard}>
                    <CardHeader title="Data List" className={classes.cHeader} />
                    <CardContent>
                        <MuiThemeProvider theme={thememui()}>
                            <MUIDataTable
                                // data={dataTable}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider>
                    </CardContent>

                    {/* <Backdrop className={classes.backdrop} open={open} onClick={() => setOpen(false)}>
                        <CircularProgress color="inherit" />
                    </Backdrop> */}
                    {/* <Snackbar open={openalert} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity}>
                            {message}
                        </Alert>
                    </Snackbar> */}
                </Card>
            </div>
        </Authenticated>
    )
}

export default Index;