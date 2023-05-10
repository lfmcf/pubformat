import Authenticated from "@/Layouts/Authenticated";
import React from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Speed from "@/Components/Speed";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { usePage } from '@inertiajs/inertia-react';
import TextareaAutosize from '@mui/base/TextareaAutosize';

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


const Gi = (props) => {

    var params = new URLSearchParams(window.location.search)

    const classes = useStyles();

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        responsable: '',
        eventName: '',
        referenceDeficiencyLetter: '',
        ProductNameFini: '',
        substanceNameActive: '',
        dossierReference: '',
        // documentsNumber: '',
        deadline: moment(new Date),
    })
    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const handleSubmit = (e, formtyp) => {
        e.preventDefault();
        post(route('newrequest'));
    }

    const handleReset = () => {
        reset()
        setOpen(true)
    }

    console.log(data.form)

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
                                <Tooltip title="Object">
                                    <TextField fullWidth label="Object" name="dossier_name" value={data.dossier_name} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Type">
                                    {/* <TextField fullWidth label="Dossier Type" name="dossier_type" value={data.dossier_type} onChange={handleChange} /> */}
                                    <Select options={[
                                        { label: 'Variation Dossier (Rationale and/or M2, M3)', value: 'Variation Dossier (Rationale and/or M2, M3)' },
                                        { label: 'Responses to Questions Dossier (RTQ and/or M2, M3)', value: 'Responses to Questions Dossier (RTQ and/or M2, M3)' },
                                        { label: 'IMPD', value: 'IMPD' },
                                        { label: 'IND', value: 'IND' },
                                        { label: 'Master file (i.e.: DMF, PSMF …)', value: 'Master file (i.e.: DMF, PSMF …)' },
                                        { label: 'Module 1', value: 'Module 1' },
                                        { label: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)', value: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)' },
                                        { label: 'Module 3', value: 'Module 3' },
                                        { label: 'Module 4', value: 'Module 4' },
                                        { label: 'Module 5', value: 'Module 5' },
                                        { label: 'Literature references', value: 'Literature references' },
                                        { label: 'Nonclinical study reports', value: 'Nonclinical study reports' },
                                        { label: 'PIP', value: 'PIP' },
                                        { label: 'RMP', value: 'RMP' },
                                        { label: 'PBER, PSUR, Safety reports', value: 'PBER, PSUR, Safety reports' },
                                        { label: 'Variation Rationale document', value: 'Variation Rationale document' },
                                        { label: 'Responses to Questions document', value: 'Responses to Questions document' },
                                    ]}
                                        name="dossier_type"
                                        onChange={(e) => setData('dossier_type', e.value)}
                                        placeholder='Dossier type'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Product name">
                                    {/* <TextField fullWidth label="Product Name" name="ProductNameFini" value={data.ProductNameFini} onChange={handleChange} /> */}
                                    <Select 
                                        name="ProductNameFini"
                                        placeholder='Product name'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                            <Tooltip title="Event Name">
                                <TextField fullWidth label="Event Name" name="eventName" value={data.eventName} onChange={handleChange} />
                            </Tooltip>
                        </Grid> */}
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Substance name">
                                    {/* <TextField fullWidth label="Substance Name" name="substanceNameActive" value={data.substanceNameActive} onChange={handleChange} /> */}
                                    <Select 
                                        name="substanceNameActive"
                                        placeholder='Substance name'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Country">
                                    {/* <TextField fullWidth label="Country" name="country" value={data.country} onChange={handleChange} /> */}
                                    <Select 
                                        name="country"
                                        placeholder='Country'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Tooltip title="Deficiency Letter">
                                    <TextField fullWidth label="Deficiency Letter" name="deficiency_letter" value={data.deficiency_letter} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Tooltip title="Chrono N°/ Dossier Reference">
                                    <TextField fullWidth type="text" label="Chrono N°/ Dossier Reference" value={data.dossierReference} name="dossierReference" onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Tooltip title="Document Count">
                                    <TextField fullWidth label="Document Count" name="document_count" value={data.document_count} onChange={handleChange} />
                                </Tooltip>
                            </Grid>

                            
                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Type">
                                    <Select options={[
                                        { label: 'Variation', value: 'Variation' },
                                        { label: 'Baseline', value: 'Baseline' },
                                        { label: 'Marquage CE', value: 'Marquage CE' },
                                        { label: 'Module 2', value: 'Module 2' },
                                        { label: 'Module 3', value: 'Module 3' },
                                        { label: 'Clincal documents', value: 'Clincal documents' },
                                        { label: 'Clinical study report', value: 'Clinical study report' },
                                        { label: 'PSUR/Safety report', value: 'PSUR/Safety report' },
                                        { label: 'Rationnel/RtQ', value: 'Rationnel/RtQ' },
                                    ]}
                                        name="type"
                                        onChange={(e) => setData('type', e.value)}
                                        placeholder='Type'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid> */}

                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Reference of Deficiency Letter">
                                    <TextField fullWidth label="Reference of Deficiency Letter" name="referenceDeficiencyLetter" value={data.referenceDeficiencyLetter} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Core doc" labelPlacement="start" />
                            </Grid> */}

                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Delivery details" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Request date"
                                        inputFormat="dd-MMM-yyyy HH:mm"

                                        value={data.deadline}
                                        onChange={(val) => handleDateChange('deadline', val)}
                                        renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Delivery deadline"
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
                {/* <Card className={classes.cCard}>
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
                </Card> */}
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
                <Speed reset={handleReset} handleSubmit={handleSubmit} />
            </form>
        </Authenticated>
    )
}

export default Gi;

//Gi.layout = (page) => <Authenticated children={page} auth={page.props.auth} header={"Form - CREARTE"} />