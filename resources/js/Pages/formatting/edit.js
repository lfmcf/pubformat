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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const steps = ['Initiate form', 'Comfirm delivery date', 'Review and remarks'];

const Edit = (props) => {

    const classes = useStyles();
    const { formatting } = props;

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        id: formatting.id,
        // form: params.get('form'),
        region: formatting.region,
        coredoc: formatting.coredoc,
        dossier_contact: formatting.dossier_contact,
        object: formatting.object,
        dossier_type: formatting.dossier_type,
        product_name: formatting.product_name,
        substance_name: formatting.substance_name,
        country: formatting.country,
        deficiency_letter: formatting.deficiency_letter,
        chrono: formatting.chrono,
        document_count: formatting.document_count,
        remarks: formatting.remarks,
        request_date: moment(formatting.request_date),
        deadline: formatting.deadline,
        adjusted_deadline: formatting.adjusted_deadline ? formatting.adjusted_deadline : new Date(),
        delivery_remarks: formatting.delivery_remarks,
        review_request_date: moment(new Date),
        review_deadline: moment(new Date),
        delivery_comment: '',
        delivery_version: '',
        correction_request: '',
        correction_origin: '',
        document: '',
        document_remarks: '',
        status: formatting.status,
    });

    const [activeStep, setActiveStep] = React.useState(data.status === "initiated" ? 1 : data.status == 'submitted' ? 2 : 0);
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
        post(route('updateformatting'));
    }

    const handleReset = () => {
        reset()
        setOpen(true)
    }

    const handleSelectChange = (e, name) => {
        setData(name, e.value)
    }

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

    const handleComfirm = (e) => {
        e.preventDefault()
        post(route('updateformatting'));
    }

    return (
        <Authenticated auth={props.auth} >
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>General information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Dossier contact</label>
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
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Dossier type</label>
                                <Select options={[
                                    { label: 'Briefing documents', value: 'Briefing documents', delai: 2 },
                                    { label: 'CRF (Case Report Forms)', value: 'CRF (Case Report Forms)', delai: 2 },
                                    { label: 'Clinical Study Report', value: 'Clinical Study Report', delai: 2 },
                                    { label: 'Clinical Study Report', value: 'Clinical Study Report', delai: 2 },
                                    { label: 'Clinical Trial Application', value: 'Clinical Trial Application', delai: 2 },
                                    { label: 'APSI Dossier (part C and/or section PM part D)', value: 'APSI Dossier (part C and/or section PM part D)', delai: 2 },
                                    { label: 'CE Marking Dossier', value: 'CE Marking Dossier', delai: 2 },
                                    { label: 'MA or Baseline Dossier (M2 + M3)', value: 'MA or Baseline Dossier (M2 + M3)', delai: 2 },
                                    { label: 'Renewal Dossier (M2 + M3)', value: 'Renewal Dossier (M2 + M3)', delai: 2 },
                                    { label: 'Variation Dossier (Rationale and/or M2, M3)', value: 'Variation Dossier (Rationale and/or M2, M3)', delai: 2 },
                                    { label: 'Responses to Questions Dossier (RTQ and/or M2, M3)', value: 'Responses to Questions Dossier (RTQ and/or M2, M3)', delai: 2 },
                                    { label: 'IMPD', value: 'IMPD', delai: 2 },
                                    { label: 'IND', value: 'IND', delai: 2 },
                                    { label: 'Master file (i.e.: DMF, PSMF …)', value: 'Master file (i.e.: DMF, PSMF …)', delai: 2 },
                                    { label: 'Module 1', value: 'Module 1', delai: 2 },
                                    { label: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)', value: 'Module 2 (sections 2.3, 2.4, 2.5, 2.6 or 2.7)', delai: 2 },
                                    { label: 'Module 3', value: 'Module 3', delai: 2 },
                                    { label: 'Module 4', value: 'Module 4', delai: 2 },
                                    { label: 'Module 5', value: 'Module 5', delai: 2 },
                                    { label: 'Literature references', value: 'Literature references', delai: 2 },
                                    { label: 'Nonclinical study reports', value: 'Nonclinical study reports', delai: 2 },
                                    { label: 'PIP', value: 'PIP', delai: 2 },
                                    { label: 'RMP', value: 'RMP', delai: 2 },
                                    { label: 'PBER, PSUR, Safety reports', value: 'PBER, PSUR, Safety reports', delai: 2 },
                                    { label: 'Variation Rationale document', value: 'Variation Rationale document', delai: 2 },
                                    { label: 'Responses to Questions document', value: 'Responses to Questions document', delai: 2 },
                                ]}
                                    name="dossier_type"
                                    onChange={(e) => handleSelectChange(e, 'dossier_type')}
                                    isClearable
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Product name</label>
                                <Tooltip title="Product name">
                                    <Select
                                        name="product_name"
                                        placeholder='Product name'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Substance name</label>
                                <Tooltip title="Substance name">
                                    <Select
                                        name="substance_name"
                                        placeholder='Substance name'
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
                                        placeholder='Country'
                                        onChange={(e) => handleSelectChange(e, 'country')}
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
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
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Document Count</label>
                                <Tooltip title="Document Count">
                                    <TextField fullWidth variant="outlined" size="small" name="document_count" value={data.document_count} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Remarks</label>
                                <textarea style={{ width: '100%' }} rows={3} name="remarks" onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Deadline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleComfirm}>
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
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Adjusted / Extended deadline"
                                    inputFormat="dd-MMM-yyyy"
                                    value={data.adjusted_deadline}
                                    onChange={(val) => handleDateChange('adjusted_deadline', val)}
                                    renderInput={(params) => <TextField name="adjusted_deadline" fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Remarks</label>
                            <TextField fullWidth variant="outlined" name="delivery_remarks" onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button type="submit">Submit</Button>
                    </form>
                </AccordionDetails>
            </Accordion>
            {data.status === 'submitted' ?
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Ekemia Remarks</Typography>
                    </AccordionSummary>
                </Accordion>
            :""}
        </Authenticated>
    )
}

export default Edit;