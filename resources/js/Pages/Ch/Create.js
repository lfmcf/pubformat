import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
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
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select from 'react-select';

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

const Create = (props) => {

    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const [show, setShow] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [editorState, setEditorState] = useState(() => 
        EditorState.createEmpty()
    );

    const onEditorStateChange = async (editorState) => {
        await setEditorState(editorState);
        setData('comments', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    const selectStyles = () => ({
        control: (styles) => ({
            ...styles,
            borderColor: 'red',
        }),
    });

    const classes = useStyles();
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        responsable: '',
        eventName: '',
        referenceDeficiencyLetter: '',
        ProductNameFini: '',
        substanceNameActive: '',
        dossierReference: '',
        documentsNumber: '',
        demandeDate: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        deadline: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        status: '',
        type: '',
        action: 'Publishing',
        submissionCountry: 'CH',
        applicationNumber: '',
        applicationType: '',
        dmfNumber: '',
        pmfNumber: '',
        applicant: '',
        agencyCode: '',
        galenic: '',
        inventedName: '',
        inn: '',
        article: '',
        sequence: '',
        relatedSequence: '',
        submissionDescription: '',
        indication: '',
        drugSubstanceName: [],
        substanceManufacturer: [],
        drugProduct: [],
        dosageForm: '',
        manufacturer: '',
        excipient: '',
        formtype: 'ch',
        formstatus: '',
        comments: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSelectChange = (e) => {
        return false
        // e.preventDefault()
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
        post(route('addch', { 'formstatus': formtyp }));
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        reset()
        setOpen(true)
    }

    function defaultRenderInput({ addTag, ...props }) {
        let { onChange, value, ...other } = props
        return (
            <TextField type='text' fullWidth onChange={onChange} value={value} {...other} />
        )
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
                                    <TextField fullWidth type="text" label="Chrono N°/ Dossier Reference" value={data.dossierReference} name="dossierReference" onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Documents Count">
                                    <TextField fullWidth type="text" label="Documents Count" name="documentsNumber" value={data.documentsNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {/* <Tooltip title="Date de la demande"> */}
                                    {/* <TextField fullWidth label="Date de la demande" name="demandeDate" /> */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Sending date"
                                            inputFormat="dd-MMM-yyyy"
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
                                            inputFormat="dd-MMM-yyyy"
                                            value={data.deadline}
                                            onChange={(val) => handleDateChange('deadline', val)}
                                            renderInput={(params) => <TextField  name="deadline" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                {/* </Tooltip> */}
                               
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Status">
                                    {/* <TextField select fullWidth label="Status" name="status" value={data.status} onChange={handleChange} >
                                        <MenuItem value="En cours">En cours</MenuItem>
                                        <MenuItem value="Livré">Livré</MenuItem>
                                        <MenuItem value="En attente">En attente</MenuItem>
                                    </TextField> */}
                                    <Select options={[
                                        { label: 'En cours', value: 'En cours' },
                                        { label: 'Livré', value: 'Livré' },
                                        { label: 'En attente', value: 'En attente' },
                                    ]}
                                        name="status"
                                        onChange={handleSelectChange}
                                        placeholder='Status'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
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
                                        onChange={handleChange}
                                        placeholder='Type'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
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
                                    <TextField fullWidth label="Application Number" type="text" name="applicationNumber" value={data.applicationNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Application Type">
                                    {/* <TextField select fullWidth label="Application Type" name="applicationType" value={data.applicationType} onChange={handleChange} >
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
                                        
                                    </TextField> */}
                                    <Select options={[
                                        { label: 'Used for meetings', value: 'Used for meetings' },
                                        { label: 'New Application - New Active Substance (na-nas)', value: 'New Application - New Active Substance (na-nas)' },
                                        { label: 'New Application - Known Active Substance (na-bws)', value: 'New Application - Known Active Substance (na-bws)' },
                                        { label: 'New Application - Co-Marketing Medical Product (na-co-marketing)', value: 'New Application - Co-Marketing Medical Product (na-co-marketing)' },
                                        { label: 'New Application - Parallel Import (na-pi)', value: 'New Application - Parallel Import (na-pi)' },
                                        { label: 'Variation Type IA', value: 'Variation Type IA' },
                                        { label: 'Variation Type IA for immediate notification', value: 'Variation Type IA for immediate notification' },
                                        { label: 'Variation Type IB', value: 'Variation Type IB' },
                                        { label: 'Variation Type II', value: 'Variation Type II' },
                                        { label: 'Extension', value: 'Extension' },
                                        { label: 'Renewal - Prolongation, renouncement of prolongation of Marketing Authorisation', value: 'Renewal - Prolongation, renouncement of prolongation of Marketing Authorisation' },
                                        { label: 'Follow-up Measure', value: 'Follow-up Measure' },
                                        { label: 'Submission of PSUR', value: 'Submission of PSUR' },
                                        { label: 'Withrawal of authorised medicial products', value: 'Withrawal of authorised medicial products' },
                                        { label: 'Transfer of a Marketing Authorisation, change of name or address of applicant', value: 'Transfer of a Marketing Authorisation, change of name or address of applicant' },
                                        { label: 'Drug Master File', value: 'Drug Master File' },
                                        { label: 'Plasma Master File', value: 'Plasma Master File' },
                                        { label: 'Application for recognition of orphan drug status or fast track status', value: 'Application for recognition of orphan drug status or fast track status' },
                                        { label: 'Reformat: Baseline eCTD submission. No content change, no review', value: 'Reformat: Baseline eCTD submission. No content change, no review' },
                                        { label: 'Supplemental information (could include, for example, response to content validation issues or answers to question)', value: 'Supplemental information (could include, for example, response to content validation issues or answers to question)' },
                                        { label: 'Correction of errors detected in a sequence', value: 'Correction of errors detected in a sequence' },
                                    ]}
                                        name="applicationType"
                                        onChange={handleChange}
                                        placeholder=''
                                        isClearable
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="DMF Number">
                                    <TextField fullWidth label="DMF Number" type="text" name="dmfNumber" value={data.dmfNumber} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="PMF Number">
                                    <TextField fullWidth label="PMF Number" type="text" name="pmfNumber" value={data.pmfNumber} onChange={handleChange} />
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
                                        value={data.drugSubstanceName}
                                        inputProps={{ placeholder: 'Add Drug substance Name'}}
                                        onChange={handledrugSubstanceNameChange}
                                        renderInput={defaultRenderInput}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Drug Substance Manufacturer">
                                    <TagsInput
                                        value={data.substanceManufacturer}
                                        inputProps={{ placeholder: 'Add Drug substance Manufacturer'}}
                                        onChange={handlesubstanceManufacturerChange}
                                        renderInput={defaultRenderInput}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Tooltip title="Drug Product">
                                    {/* <TextField fullWidth label="Drug Product" name="drugProduct" value={data.drugProduct} onChange={handleChange} /> */}
                                    <TagsInput
                                        value={data.drugProduct}
                                        inputProps={{ placeholder: 'Add Drug Product'}}
                                        onChange={handledrugProductChange}
                                        renderInput={defaultRenderInput}
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
               : ''}
                <Card className={classes.cCard}>
                    <CardHeader title="Commentaires" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={11}>
                                <Editor
                                   wrapperClassName="wrapper-class"
                                   editorClassName="editor-class"
                                   toolbarClassName="toolbar-class"
                                   editorState={editorState}
                                   onEditorStateChange={onEditorStateChange}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Speed reset={handleReset} handleSubmit={handleSubmit} />
            </form>
        </div>
    )
}

export default Create;

Create.layout = page => <Authenticated children={page} auth={page.props.auth} header="CH Form - CREARTE" />