import React, { useState, useEffect } from "react";
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
import moment from "moment";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Speed from "@/Components/Speed";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

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

const Edit = (props) => {

    const ch = props.ch;

    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const classes = useStyles();

    const [show, setShow] = useState(false);
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        id: ch.id,
        responsable: ch.responsable,
        eventName: ch.eventName,
        referenceDeficiencyLetter: ch.referenceDeficiencyLetter,
        ProductNameFini: ch.ProductNameFini,
        substanceNameActive: ch.substanceNameActive,
        dossierReference: ch.dossierReference,
        documentsNumber: ch.documentsNumber,
        demandeDate: moment(ch.demandeDate).format('YYYY-MM-DD HH:mm:ss'),
        deadline: moment(ch.deadline).format('YYYY-MM-DD HH:mm:ss'),
        status: ch.status,
        type: ch.type,
        action: ch.action,
        submissionCountry: ch.submissionCountry,
        applicationNumber: ch.applicationNumber,
        applicationType: ch.applicationType,
        dmfNumber: ch.dmfNumber,
        pmfNumber: ch.pmfNumber,
        applicant: ch.applicant,
        agencyCode: ch.agencyCode,
        galenic: ch.galenic,
        inventedName: ch.inventedName,
        inn: ch.inn,
        article: ch.article,
        sequence: ch.sequence,
        relatedSequence: ch.relatedSequence,
        submissionDescription: ch.submissionDescription,
        indication: ch.indication,
        drugSubstanceName: JSON.parse(ch.drugSubstanceName),
        substanceManufacturer: JSON.parse(ch.substanceManufacturer),
        drugProduct: JSON.parse(ch.drugProduct),
        dosageForm: ch.dosageForm,
        manufacturer: ch.manufacturer,
        excipient: ch.excipient,
        formtype: 'ch',
        formstatus: ch.status,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handledrugSubstanceNameChange = (tags) => {
        setData('drugSubstanceName', tags)
    }

    const handlesubstanceManufacturerChange = (tags) => {
        setData('substanceManufacturer', tags)
    }

    const handledrugProductChange = (tags) => {
        setData('drugProduct', tags)
    }

    const handleSubmit = (e, formtyp) => {
        e.preventDefault();
        setData("formstatus", formtyp)
        post(route('updatech'));
    }

    function defaultRenderInput({ addTag, ...props }) {
        let { onChange, value, ...other } = props
        return (
            <TextField type='text' fullWidth onChange={onChange} value={value} {...other} />
        )
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        reset()
        setOpen(true)
    }
    
    useEffect (() => {
        if(data.action !== 'Formatting') {
            setShow(true)
        }else {
            setShow(false)
        }
    }, [data.action]);

    const action = (
        <React.Fragment>
           
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className={classes.wrapper}>
             <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
                anchorOrigin={{vertical: 'top', horizontal:'right'}}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Form has been reset successfully
                </Alert>
            </Snackbar>
            <form className={classes.formulaire} onSubmit={handleSubmit}>
                <div>
                    <RadioGroup style={{display:'inline'}} name="action" value={data.action} onChange={handleChange}>
                        <FormControlLabel value="Formatting"  control={<Radio defaultChecked />} label="Formatting" />
                        <FormControlLabel value="Publishing" control={<Radio />} label="Publishing" />
                        <FormControlLabel value="Formatting & Publishing" control={<Radio />} label="Formatting & Publishing" />
                        <FormControlLabel value="Submission PSUR" control={<Radio />} label="Submission PSUR" />
                        <FormControlLabel value="Submission CESP" control={<Radio />} label="Submission CESP" />
                    </RadioGroup>
                </div>
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
                                <Tooltip title="Event Name">
                                    <TextField fullWidth label="Event Name" name="eventName" value={data.eventName} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Pays concerné">
                                    <TextField fullWidth label="Pays concerné" name="concernedCountry" value={data.concernedCountry} onChange={handleChange} />
                                </Tooltip>
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Reference of Deficiency Letter">
                                    <TextField fullWidth label="Reference of Deficiency Letter" name="referenceDeficiencyLetter" value={data.referenceDeficiencyLetter} onChange={handleChange} />
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
                                    <TextField fullWidth type="number" label="Chrono N°/ Dossier Reference" value={data.dossierReference} name="dossierReference" onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Documents Count">
                                    <TextField fullWidth type="number" label="Documents Count" name="documentsNumber" value={data.documentsNumber} onChange={handleChange} />
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
                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Action">
                                    <TextField select fullWidth label="Action" name="action" value={data.action} onChange={handleChange}>
                                        <MenuItem value="Formatting">Formatting</MenuItem>
                                        <MenuItem value="Publishing">Publishing</MenuItem>
                                        <MenuItem value="Submission">Submission</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid> */}
                        </Grid>
                    </CardContent>
                </Card>
                {show ? 
                <Card className={classes.cCard}>
                    <CardHeader title="SEQUENCE INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Country">
                                    <TextField fullWidth label="Submission Country" name="submissionCountry" value={data.submissionCountry} onChange={handleChange} />
                                       
                                    
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Application Number">
                                    <TextField fullWidth label="Application Number" type="number" name="applicationNumber" value={data.applicationNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Application Type">
                                    <TextField select fullWidth label="Application Type" name="applicationType" value={data.applicationType} onChange={handleChange} >
                                        <MenuItem value="Used for meetings">Used for meetings</MenuItem>
                                        <MenuItem value="New Application - New Active Substance (na-nas)">New Application - New Active Substance (na-nas)</MenuItem>
                                        <MenuItem value="New Application - Known Active Substance (na-bws)">New Application - Known Active Substance (na-bws)</MenuItem>
                                        <MenuItem value="New Application - Co-Marketing Medical Product (na-co-marketing)">New Application - Co-Marketing Medical Product (na-co-marketing)</MenuItem>
                                        <MenuItem value="New Application - Parallel Import (na-pi)">New Application - Parallel Import (na-pi)</MenuItem>
                                        <MenuItem value="Variation Type IA">Variation Type IA</MenuItem>
                                        <MenuItem value="Variation Type IA for immediate notification">Variation Type IA for immediate notification</MenuItem>
                                        <MenuItem value="Variation Type IB">Variation Type IB</MenuItem>
                                        <MenuItem value="Variation Type II">Variation Type II</MenuItem>
                                        <MenuItem value="Extension">Extension</MenuItem>
                                        <MenuItem value="Renewal - Prolongation, renouncement of prolongation of Marketing Authorisation">Renewal - Prolongation, renouncement of prolongation of Marketing Authorisation</MenuItem>
                                        <MenuItem value="Follow-up Measure">Follow-up Measure</MenuItem>
                                        <MenuItem value="Submission of PSUR">Submission of PSUR</MenuItem>
                                        <MenuItem value="Withrawal of authorised medicial products ">Withrawal of authorised medicial products </MenuItem>
                                        <MenuItem value="Transfer of a Marketing Authorisation, change of name or address of applicant ">Transfer of a Marketing Authorisation, change of name or address of applicant </MenuItem>
                                        <MenuItem value="Drug Master File">Drug Master File</MenuItem>
                                        <MenuItem value="Plasma Master File">Plasma Master File</MenuItem>
                                        <MenuItem value="Application for recognition of orphan drug status or fast track status">Application for recognition of orphan drug status or fast track status</MenuItem>
                                        <MenuItem value="Reformat: Baseline eCTD submission. No content change, no review">Reformat: Baseline eCTD submission. No content change, no review</MenuItem>
                                        <MenuItem value="Supplemental information (could include, for example, response to content validation issues or answers to question)">Supplemental information (could include, for example, response to content validation issues or answers to question)</MenuItem>
                                        <MenuItem value="Correction of errors detected in a sequence">Correction of errors detected in a sequence</MenuItem>
                                        
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="DMF Number">
                                    <TextField fullWidth label="DMF Number" type="number" name="dmfNumber" value={data.dmfNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="PMF Number">
                                    <TextField fullWidth label="PMF Number" type="number" name="pmfNumber" value={data.pmfNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Applicant">
                                    <TextField fullWidth label="Applicant" name="applicant" value={data.applicant} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Submission Unit">
                                    <TextField select fullWidth label="Submission Unit" name="submissionUnit" value={data.submissionUnit} onChange={handleChange} >
                                        <MenuItem value="Initial submission to start any regulatory activity">Initial submission to start any regulatory activity</MenuItem>
                                        <MenuItem value="Response to any kind of question, validation issues out-standing information requested by the agency ">Response to any kind of question, validation issues out-standing information requested by the agency a</MenuItem>
                                        <MenuItem value="Other additional information (should only be used if response is not suitable)">Other additional information (should only be used if response is not suitable)</MenuItem>
                                        <MenuItem value="Closing (provides the final documents in the GCC procedure following the decision of the GCC committee)">Closing (provides the final documents in the GCC procedure following the decision of the GCC committee)</MenuItem>
                                        <MenuItem value="Correction to the published annexes in the GCC procedure (usually shortly after approval)">Correction to the published annexes in the GCC procedure (usually shortly after approval)</MenuItem>
                                        <MenuItem value="Reformatting of an existing submission application from any format to eCTD, i.e. a baseline eCTD submission">Reformatting of an existing submission application from any format to eCTD, i.e. a baseline eCTD submission</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Agency Code">
                                    <TextField  fullWidth label="Agency Code" name="agencyCode" value={data.agencyCode} onChange={handleChange} />
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
                                <Tooltip title="Galenic Form EN & DE/FR/IT">
                                    <TextField fullWidth label="Galenic Form EN & DE/FR/IT" name="galenic" value={data.galenic} onChange={handleChange} />
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
                                <Tooltip title="Article 13 TPA">
                                    <TextField fullWidth label="Article 13 TPA" name="article" value={data.article} onChange={handleChange} />
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
                </Card> : ''}
                {show ?  
                <Card className={classes.cCard}>
                    <CardHeader title="PRODUCT INFORMATION - METADATA" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Indication">
                                    <TextField fullWidth label="Indication" name="indication" value={data.indication} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Dosage Form">
                                    <TextField fullWidth label="Dosage Form" name="dosageForm" value={data.dosageForm} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Manufacturer">
                                    <TextField fullWidth label="Manufacturer" name="manufacturer" value={data.manufacturer} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Excipient / Compendial Excipient">
                                    <TextField fullWidth label="Excipient / Compendial Excipient" name="excipient" value={data.excipient} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Drug substance Name">
                                    {/* <TextField fullWidth label="Drug substance Name" name="drugSubstanceName" value={data.drugSubstanceName} onChange={handleChange} /> */}
                                    <TagsInput
                                        value={data.drugSubstanceName ? data.drugSubstanceName : []}
                                        inputProps={{ placeholder: 'Add Drug substance Name' }}
                                        onChange={handledrugSubstanceNameChange}
                                        renderInput={defaultRenderInput}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Drug Substance Manufacturer">
                                    <TagsInput
                                        value={data.substanceManufacturer ? data.substanceManufacturer : []}
                                        inputProps={{ placeholder: 'Add Drug substance Manufacturer'}}
                                        onChange={handlesubstanceManufacturerChange}
                                        renderInput={defaultRenderInput}
                                    />
                                    
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Drug Product">
                                    <TagsInput
                                        value={data.drugProduct ? data.drugProduct : []}
                                        inputProps={{ placeholder: 'Add Drug Product'}}
                                        onChange={handledrugProductChange}
                                        renderInput={defaultRenderInput}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card> : '' }
                {/* <Button variant="contained" color="primary" className="mt-3" type="submit" onClick={(e) => handleSubmit(e,"add")}>update</Button>
                <Button variant="contained" style={{marginLeft:'5px',backgroundColor:'green',color:'white'}} type="submit" onClick={(e) => handleSubmit(e,"save")}>Save</Button>
                <Button variant="contained" onClick={() => reset()} color="secondary" style={{marginLeft:'5px'}}>Reset</Button>
                <Button variant="contained" onClick={() => window.history.back()} style={{marginLeft:'5px'}}>Retour</Button> */}
                <Speed reset={handleReset} handleSubmit={handleSubmit} />
            </form>
        </div>
    )
}

export default Edit;

Edit.layout = page => <Authenticated children={page} auth={page.props.auth} header="CH Form - EDIT" />