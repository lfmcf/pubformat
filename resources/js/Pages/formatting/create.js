import Authenticated from "@/Layouts/Authenticated";
import React, { useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent, Paper } from '@material-ui/core';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { substanceFormattingList } from '@/Components/MetaDataList'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const steps = ['Initiate form', 'Comfirm delivery date', 'Review and remarks'];

const Create = (props) => {

    var params = new URLSearchParams(window.location.search)
    const teamId = props.auth.user.current_team_id;
    const [expanded, setExpanded] = React.useState('panel1');

    const classes = useStyles();

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        coredoc: params.get('coreDoc'),
        dossier_contact: '',
        object: '',
        dossier_type: '',
        product_name: '',
        substance_name: '',
        country: '',
        deficiency_letter: '',
        chrono: '',
        document_count: '',
        remarks: '',
        request_date: moment(new Date),
        deadline: moment(new Date),
        adjusted_deadline: moment(new Date),
        delivery_remarks: '',
        review_request_date: moment(new Date),
        review_deadline: moment(new Date),
        delivery_comment: '',
        delivery_version: '',
        correction_request: '',
        correction_origin: '',
        document: '',
        document_remarks: '',
        status: '',
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    let contries = props.countries.map(function (country) {
        return { value: country, label: country };
    })


    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }


    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const handleSubmit = (e, formtyp) => {
        e.preventDefault();
        post(route('formattingStore'));
    }

    const handleReset = () => {
        reset()
        setOpen(true)
    }

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    const handleChangeac = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        let date = new Date();
        let hour = date.getHours();
        let delai = data.dossier_type.delai;
        let deadline;

        if (delai) {
            if (hour < 12) {
                deadline = date.setDate(date.getDate() + delai)
            } else {
                deadline = date.setDate(date.getDate() + delai + 1)
            }
            setData('deadline', moment(deadline).format('YYYY-MM-DD HH:mm:ss'));
        }

    }, [data.dossier_type]);

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    return (
        <Authenticated auth={props.auth} header={"Form - Create " + data.form + " " + data.region}>

            <form onSubmit={handleSubmit}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChangeac('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>General information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root  MuiInputLabel-shrink MuiFormLabel-filled flabel">Dossier contact</label>
                                <Tooltip title="Dossier Contact">
                                    <TextField fullWidth variant="outlined" size="small" name="dossier_contact" value={data.dossier_contact} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Object</label>
                                <Tooltip title="Object">
                                    <TextField fullWidth variant="outlined" size="small" name="object" value={data.object} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Product name</label>
                                <Tooltip title="Product name">
                                    <Select options={[
                                        { label: 'ALBEY VENOMS', value: 'ALBEY VENOMS' },
                                        { label: 'ALBEY VENOMS APIS', value: 'ALBEY VENOMS APIS' },
                                        { label: 'ALBEY VENOMS POLISTES', value: 'ALBEY VENOMS POLISTES' },
                                        { label: 'ALBEY VENOMS VESPULA', value: 'ALBEY VENOMS VESPULA' },
                                        { label: 'ALL RANGE', value: 'ALL RANGE' },
                                        { label: 'ALUSTAL', value: 'ALUSTAL' },
                                        { label: 'ALYOSTAL IDR', value: 'ALYOSTAL IDR' },
                                        { label: 'ALYOSTAL PRICK', value: 'ALYOSTAL PRICK' },
                                        { label: 'ALYOSTAL PRICK  allergen ', value: 'ALYOSTAL PRICK  allergen ' },
                                        { label: 'ALYOSTAL PRICK negative control', value: 'ALYOSTAL PRICK negative control' },
                                        { label: 'ALYOSTAL PRICK positive control', value: 'ALYOSTAL PRICK positive control' },
                                        { label: 'ALYOSTAL TPB- TPN-TPC', value: 'ALYOSTAL TPB- TPN-TPC' },
                                        { label: 'ALYOSTAL VENOMS', value: 'ALYOSTAL VENOMS' },
                                        { label: 'ALYOSTAL VENOMS APIS ', value: 'ALYOSTAL VENOMS APIS' },
                                        { label: 'ALYOSTAL VENOMS POLISTES ', value: 'ALYOSTAL VENOMS POLISTES' },
                                        { label: 'ALYOSTAL VENOMS VESPULA', value: 'ALYOSTAL VENOMS VESPULA' },
                                        { label: 'APSI', value: 'APSI' },
                                        { label: 'DILUANT PHYSIOLOGIQUE PHENOLE', value: 'DILUANT PHYSIOLOGIQUE PHENOLE' },
                                        { label: 'DILUANT SERUM ALBUMINE HUMAINE', value: 'DILUANT SERUM ALBUMINE HUMAINE' },
                                        { label: 'DOM HOUSE', value: 'DOM HOUSE' },
                                        { label: 'PRICK Lancet', value: 'PRICK Lancet' },
                                        { label: 'STALLERPOINT', value: 'STALLERPOINT' },
                                        { label: 'TPC dropper', value: 'TPC dropper' },
                                        { label: 'TPN Pump', value: 'TPN Pump' },
                                        { label: 'AITGRYS', value: 'AITGRYS' },
                                        { label: 'ORALAIR', value: 'ORALAIR' },
                                        { label: 'PHOSTAL', value: 'PHOSTAL' },
                                        { label: 'STALORAL Pump', value: 'STALORAL Pump' },
                                        { label: 'STALORAL, sublingual solution', value: 'STALORAL, sublingual solution' },
                                        { label: 'STALORAL 300, sublingual solution', value: 'STALORAL 300, sublingual solution' },
                                        { label: 'ACTAIR', value: 'ACTAIR' },
                                        { label: 'AITMYTE', value: 'AITMYTE' },
                                        { label: 'ORYLMYTE', value: 'ORYLMYTE' },
                                    ]}
                                        name="product_name"
                                        placeholder=''
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Substance name</label>
                                <Tooltip title="Substance name">
                                    <Select options={substanceFormattingList}
                                        name="substance_name"
                                        placeholder=''
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Country</label>
                                <Tooltip title="Country">
                                    <Select options={contries}
                                        name="country"
                                        placeholder=''
                                        onChange={(e) => handleSelectChange(e, 'country')}
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Dossier type</label>
                                <Select options={[
                                    { label: 'Briefing documents', value: 'Briefing documents', delai: 4 },
                                    { label: 'CRF (Case Report Forms)', value: 'CRF (Case Report Forms)', delai: 2 },
                                    { label: 'Clinical Study Report', value: 'Clinical Study Report', delai: 16 },
                                    // { label: 'Clinical Study Report', value: 'Clinical Study Report', delai: 6 },
                                    { label: 'Clinical Trial Application', value: 'Clinical Trial Application', delai: 6 },
                                    { label: 'APSI Dossier (part C and/or section PM part D)', value: 'APSI Dossier (part C and/or section PM part D)', delai: 4 },
                                    { label: 'CE Marking Dossier', value: 'CE Marking Dossier', delai: 2 },
                                    { label: 'MA or Baseline Dossier (M2 + M3)', value: 'MA or Baseline Dossier (M2 + M3)', delai: 6 },
                                    { label: 'Renewal Dossier (M2 + M3)', value: 'Renewal Dossier (M2 + M3)', delai: 6 },
                                    { label: 'Variation Dossier (Rationale and/or M2, M3)', value: 'Variation Dossier (Rationale and/or M2, M3)', delai: 4 },
                                    { label: 'Responses to Questions Dossier (RTQ and/or M2, M3)', value: 'Responses to Questions Dossier (RTQ and/or M2, M3)', delai: 4 },
                                    { label: 'IMPD', value: 'IMPD', delai: 4 },
                                    { label: 'IND', value: 'IND', delai: 4 },
                                    { label: 'Master file (i.e.: DMF, PSMF …)', value: 'Master file (i.e.: DMF, PSMF …)', delai: 4 },
                                    { label: 'Module 1', value: 'Module 1', delai: 5 },
                                    { label: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)', value: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)', delai: 5 },
                                    { label: 'Module 3', value: 'Module 3', delai: 5 },
                                    { label: 'Module 4', value: 'Module 4', delai: 5 },
                                    { label: 'Module 5', value: 'Module 5', delai: 5 },
                                    { label: 'Literature references', value: 'Literature references', delai: 2 },
                                    { label: 'Nonclinical study reports', value: 'Nonclinical study reports', delai: 5 },
                                    { label: 'PIP', value: 'PIP', delai: 6 },
                                    { label: 'RMP', value: 'RMP', delai: 4 },
                                    { label: 'PBER, PSUR, Safety reports', value: 'PBER, PSUR, Safety reports', delai: 4 },
                                    { label: 'Variation Rationale document', value: 'Variation Rationale document', delai: 2 },
                                    { label: 'Responses to Questions document', value: 'Responses to Questions document', delai: 2 },
                                ]}
                                    name="dossier_type"
                                    onChange={(e) => handleSelectChange(e, 'dossier_type')}
                                    isClearable
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    placeholder=''
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Document Count</label>
                                <Tooltip title="Document Count">
                                    <TextField fullWidth variant="outlined" size="small" name="document_count" value={data.document_count} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Deficiency Letter</label>
                                <Tooltip title="Deficiency Letter">
                                    <TextField fullWidth variant="outlined" size="small" name="deficiency_letter" value={data.deficiency_letter} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Chrono N°/ Dossier Reference</label>
                                <Tooltip title="Chrono N°/ Dossier Reference">
                                    <TextField fullWidth type="text" variant="outlined" size="small" value={data.chrono} name="chrono" onChange={handleChange} />
                                </Tooltip>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Remarks</label>
                                <textarea style={{ width: '100%' }} rows={3} name="remarks" onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeac('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="pane2d-header">
                        <Typography>Documents</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Attached document</label>
                                <TextField fullWidth type="file" size="small" variant="outlined" name="doc" value={data.doc} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Remarks</label>
                                <TextareaAutosize aria-label="Comment" minRows={3} style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChangeac('panel3')}>
                    <AccordionSummary aria-controls="panel3d-content" id="pane3d-header">
                        <Typography>Delivery Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Request date"
                                        inputFormat="dd-MMM-yyyy"
                                        value={data.request_date}
                                        onChange={(val) => handleDateChange('request_date', val)}
                                        renderInput={(params) => <TextField name="request_date" fullWidth {...params} />}
                                        disabled
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
                                        disabled
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" sx={{ mr: 1 }} variant="contained">Submit</Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>

        </Authenticated>
    )
}

export default Create;

//Gi.layout = (page) => <Authenticated children={page} auth={page.props.auth} header={"Form - CREARTE"} />