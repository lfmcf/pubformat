import React, { useEffect, useState } from 'react';
import { Card, Table, TableHead, TableRow, TableCell, Paper, makeStyles, IconButton, TableContainer, TableBody, MuiThemeProvider } from '@material-ui/core';
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
// import CustomToolbar from '@/Components/Customtoolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { gccproduct, chproduct, eunatproduct, eunatcountry, publishingRegion, formattingRegion, gcccountry } from '@/Components/MetaDataList';
import { components } from "react-select";
import MySelect from '@/Components/Myselect';
import makeAnimated from "react-select/animated";
import { useForm } from '@inertiajs/inertia-react';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: '16px',
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
    cHeader: {
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

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const MultiValue = props => (
    <components.MultiValue {...props}>
        <span>{props.data.label}</span>
    </components.MultiValue>
);
const animatedComponents = makeAnimated();

const List = (props) => {

    const classes = useStyles();
    const [display, setDisplay] = useState(false);
    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState();
    const [coreDoc, setCoreDoc] = useState(false);
    //const [procedure, setProcedure] = useState();
    const [form, setForm] = useState();
    const [product, setProduct] = useState();
    const [productList, setProductList] = useState();
    const [country, setCountry] = useState();
    const [countryList, setCountryList] = useState();
    const [compselect, setCompselect] = useState(false);
    // const [data, setData] = [{  }]
    const { data, setData, get, processing, errors, clearErrors, reset } = useForm({
        form: '',
        region: '',
        coreDoc: false,
        procedure: '',
        product: '',
        country: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset()
    };

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    const handleSelectProductChange = (e, name) => {

        if (data.procedure && data.procedure.value == 'Nationale' && e && !data.country) {
            axios.post('getProductOrCountry', { 'procedure': data.procedure.value, 'product': e.value, }).then(res => {
                var dt = res.data.map(ct => {
                    return { label: ct.country, value: ct.country }
                })
                setCountryList(dt)
                setData({ ...data, 'product': e, country: '' })
                // setData('product', e)
            })

        } else if (e == null) {
            setData({ ...data, 'product': '', 'country': '' })
        } else {
            setData(name, e)
            setProductList(eunatproduct)
            setCountryList(eunatcountry)
        }
    }

    const handleSelectCountryChange = (e, name) => {
        if (data.procedure && data.procedure.value == 'Nationale' && e && !data.product) {
            axios.post('getProductOrCountry', { 'procedure': data.procedure.value, 'country': e.value, }).then(res => {
                var dt = res.data.map(ct => {
                    return { label: ct.Product, value: ct.Product }
                })
                setProductList(dt)
                setData({ ...data, 'country': e, product: '' })
            })
        } else if (e == null) {
            setData({ ...data, 'product': '', 'country': '' })
        } else {
            setData(name, e)
            setProductList(eunatproduct)
            setCountryList(eunatcountry)
        }
    }


    const handleMyselectChange = (selected) => {
        setData('country', selected)
    }

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
                    backgroundColor: 'transparent',
                    boxShadow: 'unset'
                }
            }
        }
    });

    const handleNavigate = () => {
        if (data.form && data.form.value == "Formatting") {
            Inertia.visit('/formatting', {
                method: 'get',
                data: { form: data.form.value, region: data.region.value, coreDoc: data.coreDoc },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }

            })
        } else if (data.form && data.form.value == "Publishing") {
            Inertia.visit('/publishing', {
                method: 'get',
                data: { form: data.form.value, region: data.region.value, procedure: data.procedure.value, product: data.product.value, country: data.country },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        }
    }

    const options = {
        rowsPerPageOptions: [5, 10, 15, 50, 100],
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

                if (row.formtype === 'ch') {

                }
            })

        },
        customToolbar: () => {
            // console.log(props.auth.user.current_team_id)
            if (props.auth.user.current_team_id == 1 || props.auth.user.current_team_id == 2) {
                return (

                    <Tooltip title={"Add New Record"}>
                        <IconButton id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickOpen}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
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
        // {

        //     name: "",
        //     label: '',
        //     options: {
        //         customBodyRender: (value, row) => {
        //             var link;
        //             if(row.rowData[2] == "ch"){
        //                 link = 'ch/'+row.rowData[0]+'/edit';
        //             }else if(row.rowData[2] == "eu") {
        //                 link = 'eu/'+row.rowData[0]+'/edit';
        //             }else if(row.rowData[2] == "gcc") {
        //                 link = 'gcc/'+row.rowData[0]+'/edit';
        //             }
        //             return (
        //                 <IconButton onClick={() => Inertia.get(link)} as="button">
        //                     <EditIcon />
        //                 </IconButton>
        //             );
        //         },
        //         download : false,
        //         filter: false,
        //         sort: false,
        //         display: true,
        //     }
        // },
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
            name: "product_name",
            label: "Product",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: (value) => {
                    if (value) {
                        return value.value
                    }

                }
            }
        },
        {
            name: "country",
            label: "Country",
            options: {
                customBodyRender: (value) => {
                    if (value) {
                        return value.value
                    }
                }
            }
            // options: {
            //     customBodyRender: value => {
            //         const region = new Intl.DisplayNames(['en'], {type: 'region'});
            //         let title = "";
            //         if(value && value.length == 2) {
            //             title = region.of(value.toUpperCase());
            //         }

            //         return(
            //             <ReactCountryFlag countryCode={value} svg aria-label={value} title={title} style={{
            //                 width: '1.8em',
            //                 height: '1.8em',
            //             }} />
            //         )
            //     }
            // }
        },
        {
            name: "sequence",
            label: "Sequence",
            options: {
                filter: true,
                filterType: 'multiselect',
                // sort: false
            }
        },
        // {
        //     name:"type",
        //     label: "Type",
        //     options: {
        //         filter: true,
        //         filterType: 'multiselect',
        //         // sort: false
        //     }
        // },
        // {
        //     name: "action",
        //     label: "Action"
        // },
        {
            name: "status",
            label: "Status",
            options: {
                customBodyRender: (value, row) => {
                    let bgc = "";
                    if (value === "initiated") {
                        bgc = "#00e676"
                    } else if (value == "En cours") {
                        bgc = "#2196f3"
                    } else if (value == "En attente") {
                        bgc = "#ffeb3b"
                    }
                    // }else {
                    //     bgc = 'yellow'
                    // }

                    const id = row.rowData[0];

                    return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', backgroundColor: bgc }}>
                            {display && id === rowid ? (
                                <TextField variant='standard' select name="status" value={value} onChange={(e) =>
                                    instantUpdate(row.rowData[0], e)
                                }>
                                    <MenuItem value="Delivred">Delivred</MenuItem>
                                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                                    <MenuItem value="Stand By">Stand By</MenuItem>
                                    <MenuItem value="To Do">To Do</MenuItem>
                                </TextField>
                            ) : (
                                <div id={row.rowIndex} onClick={() => { handleDisplay(id) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            name: "request_date",
            label: "Request date",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: value => moment(new Date(value)).format("DD-MMM-YYYY"),
                // sort: false
            }
        },
        {
            name: "deadline",
            label: "Dead Line",
            options: {
                filter: true,
                filterType: 'multiselect',
                customBodyRender: value => moment(new Date(value)).format("DD-MMM-YYYY"),
                // sort: false
            }
        },
        // {
        //     name:"created_at",
        //     label: "created at",
        //     options: {
        //         filter: true,
        //         filterType: 'multiselect',
        //         customBodyRender: value => moment(new Date(value)).format("DD-MM-YYYY"),
        //         // sort: false
        //     }
        // },
    ]

    useEffect(() => {
        setData({ ...data, 'procedure': '', 'product': '', 'country': '' })
        if (data.form && data.form.value === 'Publishing') {
            if (data.region && data.region.value == 'GCC') {
                setData('procedure', [{ label: 'Nationale', value: 'Nationale' }]);
                setProductList(gccproduct);
                setCountryList(gcccountry);
            } else if (data.region && data.region.value == 'CH') {
                setData('procedure', { label: 'Nationale', value: 'Nationale' });
                setProductList(chproduct);
                setCountryList([{ label: 'Switzerland', value: 'Switzerland' }])
                setCountry({ label: 'Switzerland', value: 'Switzerland' })
            }
        }

    }, [data.region])

    useEffect(() => {
        setData({ ...data, product: '', country: '' })
        if (data.form && data.form.value === 'Publishing') {
            if (data.region && data.region.value == 'EU' && data.procedure && data.procedure.value == 'Decentralized') {
                setProductList([{ label: 'ACTAIR', value: 'ACTAIR' }])
                setCountryList(eunatcountry)
                setCompselect(true)
            } else if (data.region && data.region.value == 'EU' && data.procedure && data.procedure.value == 'Mutual Recognition') {
                setProductList([{ label: 'ORALAIR', value: 'ORALAIR' }])
                setCountryList(eunatcountry)
                setCompselect(true)
            } else if (data.region && data.region.value == 'EU' && data.procedure && data.procedure.value == 'Nationale' || data.procedure && data.procedure.value == 'Centralized') {
                setProductList(eunatproduct)
                setCountryList(eunatcountry)
                setCompselect(false)
            }
        }
    }, [data.procedure])


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
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
                <DialogTitle>New Request</DialogTitle>
                <DialogContent>
                    <div className='modal_form'>
                        <label className='modal_label'>New request</label>
                        <Select options={[
                            { label: 'Formatting', value: 'Formatting' },
                            { label: 'Publishing', value: 'Publishing' },
                            { label: 'Submission', value: 'Submission' },
                            // { label: 'Formatting & Publishing', value: 'Formatting & Publishing' },
                            // { label: 'Submission PSUR', value: 'Submission PSUR' },
                            // { label: 'Submission CESP', value: 'Submission CESP' },
                        ]}
                            name="form"
                            onChange={(e) => handleSelectChange(e, 'form')}
                            placeholder='Form'
                            isClearable
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: base => ({ ...base, zIndex: 9999, }),
                                container: base => ({ width: '100%' })
                            }}

                        />
                    </div>
                    <div className='modal_form'>
                        <label className='modal_label'>Region</label>
                        <Select options={data.form && data.form.value == 'Publishing' ? publishingRegion : formattingRegion}
                            name="region"
                            onChange={(e) => handleSelectChange(e, 'region')}
                            placeholder='Region'
                            isClearable
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                        />
                    </div>
                    <div className='modal_form' style={{ display: data.form && data.form.value == 'Publishing' ? 'flex' : 'none' }}>
                        <label className='modal_label'>Procedure type</label>
                        <Select options={[
                            { label: 'Nationale', value: 'Nationale' },
                            { label: 'Centralized', value: 'Centralized' },
                            { label: 'Decentralized', value: 'Decentralized' },
                            { label: 'Mutual Recognition', value: 'Mutual Recognition' },
                        ]}
                            name="procedure"
                            onChange={(e) => handleSelectChange(e, 'procedure')}
                            placeholder='Procedure type'
                            isClearable
                            value={data.procedure}
                            isDisabled={data.region && data.region.value == 'GCC' || data.region && data.region.value == 'CH' ? true : false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                        />
                    </div>
                    <div className='modal_form' style={{ display: data.form && data.form.value == 'Publishing' ? 'flex' : 'none' }}>
                        <label className='modal_label'>Product</label>
                        <Select options={productList}
                            name="product"
                            onChange={(e) => handleSelectProductChange(e, 'product')}
                            placeholder='Product'
                            value={data.product}
                            isClearable
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                        />
                    </div>
                    <div className='modal_form' style={{ display: data.form && data.form.value == 'Publishing' ? 'flex' : 'none' }}>
                        <label className='modal_label'>Country (ies)</label>
                        {compselect ?
                            <MySelect
                                options={countryList ? [...countryList] : ''}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{ Option, MultiValue, animatedComponents }}
                                onChange={handleMyselectChange}
                                value={data.country}
                                allowSelectAll={true}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                            />
                            : <Select options={countryList}
                                onChange={(e) => handleSelectCountryChange(e, 'country')}
                                value={data.country}
                                menuPortalTarget={document.body}
                                isClearable
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                            />}
                    </div>
                    <div className='modal_form' style={{ display: data.form && data.form.value == 'Formatting' ? 'flex' : 'none' }}>
                        <label className='modal_label'>Core doc</label>
                        {/* <FormControlLabel control={} label="Core doc" labelPlacement="start" /> */}
                        <Checkbox onChange={(e) => setCoreDoc(e.target.checked)} />
                    </div>
                    <div style={{ display: data.form && data.form.value == 'Submission' ? 'flex' : 'none', alignItems: 'center' }}>
                        <label className='modal_label'>Type</label>
                        <Select options={[
                            { label: 'PSUR', value: 'PSUR' },
                            { label: 'CESP', value: 'CESP' },
                            { label: 'EMA', value: 'EMA' },
                            { label: 'FDA', value: 'FDA' },
                        ]}
                            name="Type"
                            onChange={(e) => setType(e)}
                            placeholder='Type'
                            isClearable
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleNavigate}>Valider</Button>
                </DialogActions>
            </Dialog>
        </Authenticated>
    )
}

export default List;