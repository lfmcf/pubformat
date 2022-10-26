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
import { usePage } from '@inertiajs/inertia-react'

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
    
    var params = new URLSearchParams( window.location.search)
    
    const classes = useStyles();

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('from'),
        region: params.get('region'),
        responsable: '',
        eventName: '',
        referenceDeficiencyLetter: '',
        ProductNameFini: '',
        substanceNameActive: '',
        dossierReference: '',
        // documentsNumber: '',
        deadline: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
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

    return(
        
            <form className={classes.formulaire} onSubmit={handleSubmit}>
                <Card className={classes.cCard}>
                    <CardHeader title="GENERAL INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Responsable">
                                    <TextField fullWidth label="Responsable" name="responsable" value={data.responsable} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Product Name">
                                    <TextField fullWidth label="Product Name" name="ProductNameFini" value={data.ProductNameFini} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Event Name">
                                    <TextField fullWidth label="Event Name" name="eventName" value={data.eventName} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Substance Name">
                                    <TextField fullWidth label="Substance Name" name="substanceNameActive" value={data.substanceNameActive} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
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
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Chrono N°/ Dossier Reference">
                                    <TextField fullWidth type="text" label="Chrono N°/ Dossier Reference" value={data.dossierReference} name="dossierReference" onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Reference of Deficiency Letter">
                                    <TextField fullWidth label="Reference of Deficiency Letter" name="referenceDeficiencyLetter" value={data.referenceDeficiencyLetter} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Core doc" labelPlacement="start" />
                            </Grid>
                            
                        </Grid>
                    </CardContent>
                </Card>
                <Speed reset={handleReset} handleSubmit={handleSubmit} />
            </form>
        
    )
}

export default Gi;

Gi.layout = page => <Authenticated children={page} auth={page.props.auth} header="Form - CREARTE" />