import Authenticated from "@/Layouts/Authenticated";
import React, { useState } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        marginTop: '16px'
    },
    formulaire: {
        '& .MuiPaper-root': {
            marginBottom: "15px",
        },
        '& .MuiInputBase-root': {
            fontFamily: '"Open Sans", sans-serif !important',
        }
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
        },
    },

}));

const Publishing = (props) => {
    var params = new URLSearchParams(window.location.search);
    const classes = useStyles();
    const [tnoptions, setTnoptions] = useState();
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('from'),
        region: params.get('region'),
        dossier_contact: '',
        spec: '',
        dossier_name: '',
        dossier_type: '',
        ProductName: '',
        country: '',
        procedure: '',
        sequence: '',
        r_sequence: '',
        document_count: '',
        uuid: '',
        applicant: '',
        agency_code: '',
        inn: '',
        tracking: '',
        deadline: moment(new Date),
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSubmit = (e, formtyp) => {
        e.preventDefault();
        post(route('newrequest'));
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    });

    let porductOptions = props.products.map(function (product) {
        return {
            value : product.name,
            label : product.name,
        }
    });

    const handleSelectChange = (selectedOption, name) => {
        setData(name.name, selectedOption);
        clearErrors(name.name)
    }

    

    React.useEffect(() => {
        if(data.procedure) {
        axios.post('/getmd', {produit :data.ProductName.value, country :data.country.value, procedure:data.procedure.value}).then(res=> {
            let pdata = {...data};
            pdata.applicant = res.data.applicant;
            pdata.inn = res.data.inn;
            pdata.uuid = res.data.uuid;
            pdata.agency_code = res.data.agencyCode;
            let tn = res.data.trackingNumber
            tn = tn.split(/\r?\n/)
            if(tn.length > 1) {
                let tno = tn.map( (val) => {
                    return {label: val, value: val}
                })
                pdata.tracking = ''
                setTnoptions(tno)
            }else {
                let tno = tn.map( (val) => {
                    return {label: val, value: val}
                })
                setTnoptions(tno)
                pdata.tracking = {label: tn[0], value: tn[0]}
            }
            setData(pdata)
        })}
    },[data.procedure])

    return (
        <Authenticated auth={props.auth} header={"Form - Create " + data.form + " " + data.region}>
            <form className={classes.formulaire} onSubmit={handleSubmit}>
                <Card className={classes.cCard}>
                    <CardHeader title="GENERAL INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Contact">
                                    <TextField fullWidth label="Dossier Contact" name="dossier_contact" value={data.dossier_contact} onChange={handleChange} />
                                </Tooltip>
                                
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Spec M1">
                                    <TextField fullWidth label="Spec M1" name="spec" value={data.spec} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Name">
                                    <TextField fullWidth label="Dossier Name" name="dossier_name" value={data.dossier_name} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Type">
                                    <TextField fullWidth label="Dossier Type" name="dossier_type" value={data.dossier_type} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Product Name">
                                    <Select options={porductOptions}
                                        name="ProductName"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Product Name'
                                        isClearable
                                        value={data.ProductName}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                    {/* <TextField fullWidth label="Product Name" name="ProductName" value={data.ProductName} onChange={handleChange} /> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Country">
                                    <Select options={contries}
                                        name="country"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Country'
                                        isClearable
                                        value={data.country}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                    {/* <TextField fullWidth label="Country" name="country" value={data.country} onChange={handleChange} /> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Procedure">
                                    <Select options={[
                                        {value: "Nationale", label: "Nationale"},
                                        {value: "Centralized", label: "Centralized"},
                                        {value: "Decentralized", label: "Decentralized"},
                                        {value: "Mutual Recognition", label: "Mutual Recognition"},
                                    ]} 
                                        name="procedure"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Procedure'
                                        isClearable
                                        value={data.procedure}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                    {/* <TextField fullWidth label="Procedure" name="procedure" value={data.procedure} onChange={handleChange} /> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Sequence">
                                    <TextField fullWidth label="Sequence" name="sequence" value={data.sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Related Sequence">
                                    <TextField fullWidth label="Related Sequence" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Tooltip title="Document Count">
                                    <TextField fullWidth label="Document Count" name="document_count" value={data.document_count} onChange={handleChange} />
                                </Tooltip>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="UUID" name="uuid" value={data.uuid} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Applicant" name="applicant" value={data.applicant} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {/* <TextField fullWidth label="Procedure Tracking N°" name="tracking" value={data.tracking} onChange={handleChange} /> */}
                                <Select options={tnoptions ? tnoptions : ''}
                                    name='tracking'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Procedure Tracking N°'
                                    isClearable
                                    value={data.tracking}
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Agency Code" name="agency_code" value={data.agency_code} onChange={handleChange} />
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Invented Name" name="uuid" value={data.uuid} onChange={handleChange} />
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="INN" name="inn" value={data.inn} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Initial Deadline" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Deadline"
                                        inputFormat="dd-MMM-yyyy"

                                        value={data.deadline}
                                        onChange={(val) => handleDateChange('deadline', val)}
                                        renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Exceptional Deadline" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Deadline"
                                        inputFormat="dd-MMM-yyyy"

                                        value={data.deadline}
                                        onChange={(val) => handleDateChange('deadline', val)}
                                        renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Reason" name="reason" value={data.reason} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Operationel Deadline" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Select options={[
                                    { label: '10h', value: '10h' },
                                    { label: '12h', value: '12h' },
                                    { label: '14h', value: '14h' },
                                    { label: '16h', value: '16h' },

                                ]}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Delivery Time'
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Status & Comments" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Status" name="status" value={data.status} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Attached Document" name="doc" value={data.doc} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextareaAutosize aria-label="Comment" minRows={3} placeholder="Comment" style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </Authenticated>
    )
}

export default Publishing;