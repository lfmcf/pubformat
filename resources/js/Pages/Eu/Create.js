import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';

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
    }
}));

const Create = (props) => {

    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const classes = useStyles();
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        responsable: '',
        eventName: '',
        concernedCountry: '',
        referenceDeficiencyLetter: '',
        ProductNameFini: '',
        substanceNameActive: '',
        dossierReference: '',
        documentsNumber: '',
        demandeDate: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        deadline: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        status: '',
        type: '',
        action: '',
        submissionCountry: '',
        uuid: '',
        submissionType: '',
        submissionMode: '',
        trackingNumber: '',
        submissionUnit: '',
        applicant: '',
        agencyCode: '',
        procedureType: '',
        inventedName: '',
        inn: '',
        sequence: '',
        relatedSequence: '',
        submissionDescription: '',
        indication: '',
        drugSubstanceName: '',
        substanceManufacturer: '',
        drugProduct: '',
        dosageForm: '',
        manufacturer: '',
        excipient: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addeu'));
    }


    return (
        <div className={classes.wrapper}>
            <form className={classes.formulaire} onSubmit={handleSubmit}>
                <Card className={classes.cCard}>
                    <CardHeader title="GENERAL INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Responsible">
                                    <TextField fullWidth label="Responsible" name="responsable" value={data.responsable} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Event Name">
                                    <TextField fullWidth label="Event Name" name="eventName" value={data.eventName} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Concerned Country">
                                    <TextField fullWidth label="Concerned Country" name="concernedCountry" value={data.concernedCountry} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Reference of deficiency letter">
                                    <TextField fullWidth label="Reference of deficiency letter" name="referenceDeficiencyLetter" value={data.referenceDeficiencyLetter} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Product Name">
                                    <TextField fullWidth label="Product Name" name="ProductNameFini" value={data.ProductNameFini} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Substance Name">
                                    <TextField fullWidth label="Substance Name" name="substanceNameActive" value={data.substanceNameActive} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Chrono N°/ Dossier Reference">
                                    <TextField fullWidth label="Chrono N°/ Dossier Reference" value={data.dossierReference} name="dossierReference" onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Documents Count">
                                    <TextField fullWidth label="Documents Count" type="number" name="documentsNumber" value={data.documentsNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {/* <Tooltip title="Date de la demande"> */}
                                    {/* <TextField fullWidth label="Date de la demande" name="demandeDate" /> */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Sending date"
                                            inputFormat="MM/dd/yyyy"
                                            value={data.demandeDate}
                                            onChange={(val) => handleDateChange('demandeDate', val)}
                                            renderInput={(params) => <TextField name="demandeDate" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                {/* </Tooltip> */}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {/* <Tooltip title="Deadline"> */}
                                    {/* <TextField fullWidth label="Deadline" name="deadline" /> */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Deadline"
                                            inputFormat="MM/dd/yyyy"
                                            value={data.deadline}
                                            onChange={(val) => handleDateChange('deadline', val)}
                                            renderInput={(params) => <TextField  name="deadline" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                {/* </Tooltip> */}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Status">
                                    <TextField select fullWidth label="Status" name="status" value={data.status} onChange={handleChange} >
                                        <MenuItem value="En cours">En cours</MenuItem>
                                        <MenuItem value="Livré">Livré</MenuItem>
                                        <MenuItem value="En attente">En attente</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Type">
                                    <TextField select fullWidth label="Type" name="type" value={data.type} onChange={handleChange} >
                                        <MenuItem value="Variation">Variation</MenuItem>
                                        <MenuItem value="Baseline">Baseline</MenuItem>
                                        <MenuItem value="Marquage CE">Marquage CE</MenuItem>
                                        <MenuItem value="Module 2">Module 2</MenuItem>
                                        <MenuItem value="Module 3">Module 3</MenuItem>
                                        <MenuItem value="Clincal documents">Clincal documents</MenuItem>
                                        <MenuItem value="Clinical study report">Clinical study report</MenuItem>
                                        <MenuItem value="PSUR/Safety report">PSUR/Safety report</MenuItem>
                                        <MenuItem value="Rationnel/RtQ">Rationnel/RtQ</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Action">
                                    <TextField select fullWidth label="Action" name="action" value={data.action} onChange={handleChange}>
                                        <MenuItem value="Formatting">Formatting</MenuItem>
                                        <MenuItem value="Publishing">Publishing</MenuItem>
                                        <MenuItem value="Submission">Submission</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="SEQUENCE INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Country">
                                    <TextField select fullWidth label="Submission Country" name="submissionCountry" value={data.submissionCountry} onChange={handleChange} >
                                        <MenuItem value="Bahrain">Bahrain</MenuItem>
                                        <MenuItem value="Kingdom of Saudi Arabia">Kingdom of Saudi Arabia</MenuItem>
                                        <MenuItem value="Kuwait">Kuwait</MenuItem>
                                        <MenuItem value="Qatar">Qatar</MenuItem>
                                        <MenuItem value="Sultanate of Oman">Sultanate of Oman</MenuItem>
                                        <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="UUID">
                                    <TextField fullWidth label="UUID" name="uuid" value={data.uuid} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Type">
                                    <TextField select fullWidth label="Submission Type" name="submissionType" value={data.submissionType} onChange={handleChange} >
                                        <MenuItem value="maa">maa</MenuItem>
                                        <MenuItem value="var-type1a">var-type1a</MenuItem>
                                        <MenuItem value="var-type1ain">var-type1ain</MenuItem>
                                        <MenuItem value="var-type1b">var-type1b</MenuItem>
                                        <MenuItem value="var-type2">var-type2</MenuItem>
                                        <MenuItem value="var-nat">var-nat</MenuItem>
                                        <MenuItem value="extension">extension</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Mode">
                                    <TextField select fullWidth label="Submission Mode" name="submissionMode" value={data.submissionMode} onChange={handleChange}>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Grouping">Grouping</MenuItem>
                                        <MenuItem value="Worksharing">Worksharing</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Procedure Tracking Number">
                                    <TextField fullWidth label="Procedure Tracking Number" type="number" name="trackingNumber" value={data.trackingNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Unit">
                                    <TextField select fullWidth label="Submission Unit" name="submissionUnit" value={data.submissionUnit} onChange={handleChange} >
                                        <MenuItem value="initial">initial</MenuItem>
                                        <MenuItem value="validation-response">validation-response</MenuItem>
                                        <MenuItem value="response">response</MenuItem>
                                        <MenuItem value="additional-info">additional-info</MenuItem>
                                        <MenuItem value="closing">closing</MenuItem>
                                        <MenuItem value="consolidating">consolidating</MenuItem>
                                        <MenuItem value="corrigendum">corrigendum</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Applicant">
                                    <TextField fullWidth label="Applicant" name="applicant" value={data.applicant} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Agency Code">
                                    <TextField fullWidth label="Agency Code" name="agencyCode" value={data.agencyCode} onChange={handleChange} />
                                        {/* <MenuItem value="KFDC - Kuwait">KFDC - Kuwait</MenuItem>
                                        <MenuItem value="MOH - Sultanate of Oman">MOH - Sultanate of Oman</MenuItem>
                                        <MenuItem value="MOHAP - United Arab Emirates">MOHAP - United Arab Emirates</MenuItem>
                                        <MenuItem value="MOPH - Qatar">MOPH - Qatar</MenuItem>
                                        <MenuItem value="NHRA - Bahrain">NHRA - Bahrain</MenuItem>
                                        <MenuItem value="SFDA - Kingdom of Saudi Arabia">SFDA - Kingdom of Saudi Arabia</MenuItem>
                                    </TextField> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Procedure Type">
                                    <TextField select fullWidth label="Procedure Type" name="procedureType" value={data.procedureType} onChange={handleChange} >
                                        <MenuItem value="Centralised">Centralised</MenuItem>
                                        <MenuItem value="National">National</MenuItem>
                                        <MenuItem value="Mutual recognition">Mutual recognition</MenuItem>
                                        <MenuItem value="Decentralised">Decentralised</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Invented Name">
                                    <TextField fullWidth label="Invented Name" name="inventedName" value={data.inventedName} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="INN">
                                    <TextField fullWidth label="INN" name="inn" value={data.inn} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Sequence">
                                    <TextField fullWidth label="Sequence" name="sequence" value={data.sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Related Sequence">
                                    <TextField fullWidth label="Related Sequence" name="relatedSequence" value={data.relatedSequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Description">
                                    <TextField fullWidth label="Submission Description" name="submissionDescription" value={data.submissionDescription} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="PRODUCT INFORMATION - METADATA" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Indication">
                                    <TextField fullWidth label="Indication" name="indication" value={data.indication} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Drug substance Name">
                                    <TextField fullWidth label="Drug substance Name" name="drugSubstanceName" value={data.drugSubstanceName} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Drug Substance Manufacturer">
                                    {/* <TextField fullWidth label="Drug Substance Manufacturer" name="substanceManufacturer" value={data.substanceManufacturer} onChange={handleChange} /> */}
                                    <Select value={[]} multiple input={<OutlinedInput fullWidth label="Drug Substance Manufacturer" />}>
                                        <MenuItem value="Option 1">Option 1</MenuItem>
                                        <MenuItem value="Option 2">Option 2</MenuItem>
                                        <MenuItem value="Option 3">Option 3</MenuItem>
                                    </Select>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Drug Product">
                                    <TextField fullWidth label="Drug Product" name="drugProduct" value={data.drugProduct} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dosage Form">
                                    <TextField fullWidth label="Dosage Form" name="dosageForm" value={data.dosageForm} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Manufacturer">
                                    <TextField fullWidth label="Manufacturer" name="manufacturer" value={data.manufacturer} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Excipient / Compendial Excipient">
                                    <TextField fullWidth label="Excipient / Compendial Excipient" name="excipient" value={data.excipient} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Button variant="contained" color="primary" className="mt-3" type="submit">Add</Button>
                <Button variant="contained" onClick={() => reset()} color="secondary" style={{marginLeft:'5px'}}>Reset</Button>
                <Button variant="contained" onClick={() => window.history.back()} style={{marginLeft:'5px'}}>Retour</Button>
            </form>
        </div>
    )
}

export default Create;

Create.layout = page => <Authenticated children={page} auth={page.props.auth} header="EU From" />