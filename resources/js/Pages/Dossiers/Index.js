import React, { useEffect, useState } from 'react';
import {Card, Table, TableHead, TableRow, TableCell, Paper, makeStyles, IconButton, TableContainer, TableBody, MuiThemeProvider} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import CreateIcon from '@material-ui/icons/Create';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop:'16px',
        '& .css-1ex1afd-MuiTableCell-root': {
            position: "relative"
        }
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
    const [display,setDisplay] = useState(false);

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
    }

    const options = {
        rowsPerPageOptions: [5,10,15, 50, 100],
        rowsPerPage: 10,
        responsive: 'vertical',
        enableNestedDataAccess: '.',
        downloadOptions: {
            separator: ";",
            filterOptions: {
                useDisplayedColumnsOnly: false,
                useDisplayedRowsOnly: false
            }
        },
        onRowsDelete: (rowsDeleted, dataRows) => {
            const idsToDelete = rowsDeleted.data.map(d => props.list[d.dataIndex]);
            idsToDelete.map(row => {
                console.log(row.formtype)
                if(row.formtype === 'ch') {

                }
        })
            
        },
        customToolbar: () => {
            return(
                <CustomToolbar handleClick={handleNavigate} />
            )
        },
       

    }

    const columns = [
        {
            name: 'id',
            options: {
                filter: false,
                viewColumns: false,
                sort: false,
                display: false,
            }
        },
        {
           
            name: "",
            label: '',
            options: {
                customBodyRender: (value, row) => {
                    //console.log(row)
                    var link;
                    if(row.rowData[2] == "ch"){
                        link = 'ch/'+row.rowData[0]+'/edit';
                    }else if(row.rowData[2] == "eu") {
                        link = 'eu/'+row.rowData[0]+'/edit';
                    }else if(row.rowData[2] == "gcc") {
                        link = 'gcc/'+row.rowData[0]+'/edit';
                    }
                    return (
                        <IconButton onClick={() => Inertia.get(link)} as="button">
                            <EditIcon />
                        </IconButton>
                    );
                },
                download : false,
                filter: false,
                sort: false,
                display: true,
            }
        },
        {
            name: 'formtype',
            options: {
                filter: false,
                viewColumns: false,
                sort: false,
                display: false,
            }
        },
        // {
        //     name: 'formstatus',
        //     label: 'ACTION',
        //     options: {
        //         filter: false,
        //         viewColumns: false,
        //         sort: false,
        //         display: true,
        //         customBodyRender: (value) => {
        //             if(value == "add") {
        //                 return "Submitted"
        //             }else {
        //                 return "Saved"
        //             }
        //         }
        //     }
        // },
        {
            name:"ProductNameFini",
            label: "Product",
            options: {
                filter: true,
                filterType: 'multiselect',
                // sort: false
            }
        },
        {
            name:"concernedCountry",
            label: "Country",
            options: {
                customBodyRender: value => {
                    const region = new Intl.DisplayNames(['en'], {type: 'region'});
                    let title = "";
                    if(value && value.length == 2) {
                        title = region.of(value.toUpperCase());
                    }
                    
                    return(
                        <ReactCountryFlag countryCode={value} svg aria-label={value} title={title} style={{
                            width: '1.8em',
                            height: '1.8em',
                        }} />
                    )
                }
            }
        },
        {
            name:"sequence",
            label: "Sequence",
            options: {
                filter: true,
                filterType: 'multiselect',
                // sort: false
            }
        },
        {
            name:"type",
            label: "Type",
            options: {
                filter: true,
                filterType: 'multiselect',
                // sort: false
            }
        },
        {
            name: "action",
            label: "Action"
        },
        {
            name:"status",
            label: "Status",
            options: {
                customBodyRender: (value ,row) => {
                    let bgc = "";
                    if(value === "Livré") {
                        bgc = "#00e676"
                    }else if(value == "En cours") {
                        bgc = "#2196f3"
                    }else if (value == "En attente"){
                        bgc = "#ffeb3b"
                    }
                    // }else {
                    //     bgc = 'yellow'
                    // }

                    const id = row.rowData[0];

                    return (
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',position:'absolute',top:'0',left:'0',bottom:'0',right:'0',backgroundColor:bgc}}>
                            {display && id === rowid ? (
                                 <TextField  variant='standard' select name="status" value={value} onChange={(e) =>
                                    instantUpdate(row.rowData[0], e)
                                }>
                                    <MenuItem value="Delivred">Delivred</MenuItem>
                                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                                    <MenuItem value="Stand By">Stand By</MenuItem>
                                    <MenuItem value="To Do">To Do</MenuItem>
                                </TextField>
                            ) : (
                                    <div id={row.rowIndex} onClick={() => { handleDisplay(id) }} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                        <div>{value}</div>
                                        {/* <span style={{ height: '9px', width: '9px', backgroundColor: bgc, borderRadius: '50%'}}></span> */}
                                    </div>
                                )}
                        </div>
                    )
                }
                
            }
        },
        {
            name:"demandeDate",
            label: "Sending date",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: value => moment(new Date(value)).format("DD-MM-YYYY"),
                // sort: false
            }
        },
        {
            name:"deadline",
            label: "Dead Line",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: value => moment(new Date(value)).format("DD-MM-YYYY"),
                // sort: false
            }
        },
        {
            name:"created_at",
            label: "created at",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: value => moment(new Date(value)).format("DD-MM-YYYY"),
                // sort: false
            }
        },
    ]

    return (
        <Authenticated auth={props.auth} header="ALL FORMS">
            <div className={classes.wrapper}>
                <Card className={classes.cCard}>
                    <CardHeader title="Requests List" className={classes.cHeader} />
                    <CardContent>
                        <ThemeProvider theme={thememui()}>
                            <MUIDataTable
                                data={Object.values(props.list)}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
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