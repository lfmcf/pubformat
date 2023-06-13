import Authenticated from "@/Layouts/Authenticated";
import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent, Paper, Button } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
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

const Create = (props) => {
    var params = new URLSearchParams(window.location.search);
    const classes = useStyles();
    const [tnoptions, setTnoptions] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const { metadata } = props;
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        procedure: params.get('procedure'),
        ProductName: params.get('product'),
        dossier_contact: '',
        spec: '',
        dossier_name: '',
        dossier_type: '',
        country: metadata.country,
        sequence: '',
        r_sequence: '',
        document_count: '',
        uuid: metadata.uuid,
        applicant: metadata.applicant,
        agency_code: metadata.agencyCode,
        inn: metadata.inn,
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

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    // let contries = props.countries.map(function (country) {
    //     return { value: country, label: country };
    // });

    let tn = metadata.trackingNumber
    tn = tn.split(/\r?\n/)
    let tno = [];
    if (tn.length > 1) {
        tno = tn.map((val) => {
            return { label: val, value: val }
        })

    } else {
        tno = tn.map((val) => {
            return { label: val, value: val }
        })
    }

    // useEffect(() => {
    //     let tn = metadata.trackingNumber
    //     tn = tn.split(/\r?\n/)
    //     let pdata = { ...data };
    //     if (tn.length > 1) {
    //         let tno = tn.map((val) => {
    //             return { label: val, value: val }
    //         })
    //         pdata.tracking = ''
    //         setTnoptions(tno)
    //     } else {
    //         let tno = tn.map((val) => {
    //             return { label: val, value: val }
    //         })
    //         setTnoptions(tno)
    //         pdata.tracking = { label: tn[0], value: tn[0] }
    //     }
    //     setData(pdata)
    // }, [])


    // useEffect(() => {
    //     if(data.country && data.ProductName) {
    //         axios.post('/getmd', { produit: data.ProductName, country: data.country.value, procedure: data.procedure }).then(res => {
    //             let pdata = { ...data };
    //             pdata.applicant = res.data.applicant;
    //             pdata.inn = res.data.inn;
    //             pdata.uuid = res.data.uuid;
    //             pdata.agency_code = res.data.agencyCode;
    //             let tn = res.data.trackingNumber
    //             tn = tn.split(/\r?\n/)
    //             if (tn.length > 1) {
    //                 let tno = tn.map((val) => {
    //                     return { label: val, value: val }
    //                 })
    //                 pdata.tracking = ''
    //                 setTnoptions(tno)
    //             } else {
    //                 let tno = tn.map((val) => {
    //                     return { label: val, value: val }
    //                 })
    //                 setTnoptions(tno)
    //                 pdata.tracking = { label: tn[0], value: tn[0] }
    //             }
    //             setData(pdata)
    //         })
    //     }
    // },[ data.country])

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

    const handleChangeac = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Authenticated auth={props.auth} header={"Form - Create " + data.form + " " + data.region}>
            {/* <Paper style={{padding:'10px'}}> */}
            <form  onSubmit={handleSubmit}>
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
                                    <TextField fullWidth variant="outlined" size="small" name="Object" value={data.Object} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Product / Substance</label>
                                <Tooltip title="Product Name">
                                    <TextField fullWidth variant="outlined" size="small" name="ProductName" value={data.ProductName} onChange={handleChange} />
                                    {/* <Select options={porductOptions}
                                    name="ProductName"
                                    onChange={(e) => handleSelectChange(e, 'ProductName')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.ProductName}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                /> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission country</label>
                                <TextField fullWidth variant="outlined" size="small" name="ProductName" value={data.country} disabled />
                                {/* <Tooltip title="Country">
                                <Select options={[{label: data.country, value: data.country}]}
                                    name="country"
                                    onChange={(e) => handleSelectChange(e, 'country')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    
                                    value={data.country}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Tooltip> */}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Dossier type</label>
                                <Tooltip title="Dossier Type">
                                    <Select options={[
                                        { label: 'Baseline Dossier (M1-M2-M3)', value: 'Baseline Dossier (M1-M2-M3)', delai: 5 },
                                        { label: 'Baseline Dossier (M1-M5)', value: 'Baseline Dossier (M1-M5)', delai: 9 },
                                        { label: 'Marketing Authorisation Dossier / BLA (m1-m5)', value: 'Marketing Authorisation Dossier / BLA (m1-m5)', delai: 9 },
                                        { label: 'Renewal Dossier', value: 'Renewal Dossier', delai: 9 },
                                        { label: 'Variation Dossier', value: 'Variation Dossier', delai: 3 },
                                        { label: 'Responses to questions Dossier', value: 'Responses to questions Dossier', delai: 3 },
                                        { label: 'PSUR/ PSUSA Dossier', value: 'PSUR/ PSUSA Dossier' },
                                        { label: 'Current View (Draft seq)', value: 'Current View (Draft seq)', delai: 1 },

                                    ]}
                                        name="dossier_type"
                                        onChange={(e) => handleSelectChange(e, 'dossier_type')}
                                        placeholder=''
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
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
                                <TextareaAutosize aria-label="Comment" minRows={3} style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChangeac('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="pane2d-header">
                        <Typography>Submission Metadata</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">UUID</label>
                                <TextField fullWidth variant="outlined" size="small" name="uuid" value={data.uuid} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission type</label>
                                <Select options={[
                                    { label: 'maa', value: 'maa' },
                                    { label: 'var-type1a', value: 'var-type1a' },
                                    { label: 'var-type1ain', value: 'var-type1ain' },
                                    { label: 'var-type1b', value: 'var-type1b' },
                                    { label: 'var-type2', value: 'var-type2' },
                                    { label: 'var-nat', value: 'var-nat' },
                                    { label: 'extension', value: 'extension' },
                                    { label: 'rup', value: 'rup' },
                                    { label: 'psur', value: 'psur' },
                                    { label: 'psusa', value: 'psusa' },
                                    { label: 'rmp', value: 'rmp' },
                                    { label: 'renewal', value: 'renewal' },
                                    { label: 'pam-sob', value: 'pam-sob' },
                                    { label: 'pam-anx', value: 'pam-anx' },
                                    { label: 'pam-mea', value: 'pam-mea' },
                                    { label: 'pam-leg', value: 'pam-leg' },
                                    { label: 'pam-sda', value: 'pam-sda' },
                                    { label: 'pam-capa', value: 'pam-capa' },
                                    { label: 'pam-p45', value: 'pam-p45' },
                                    { label: 'pam-p46', value: 'pam-p46' },
                                    { label: 'pam-paes', value: 'pam-paes' },
                                    { label: 'pam-rec', value: 'pam-rec' },
                                    { label: 'pass107n', value: 'pass107n' },
                                    { label: 'pass107q', value: 'pass107q' },
                                    { label: 'asmf', value: 'asmf' },
                                    { label: 'pmf', value: 'pmf' },
                                    { label: 'referral-20', value: 'referral-20' },
                                    { label: 'referral-294', value: 'referral-294' },
                                    { label: 'referral-29p', value: 'referral-29p' },
                                    { label: 'referral-30', value: 'referral-30' },
                                    { label: 'referral-31', value: 'referral-31' },
                                    { label: 'referral-35', value: 'referral-35' },
                                    { label: 'referral-5-3', value: 'referral-5-3' },
                                    { label: 'referral-107i', value: 'referral-107i' },
                                    { label: 'referral-16c1c', value: 'referral-16c1c' },
                                    { label: 'referral-16c4', value: 'referral-16c4' },
                                    { label: 'annual-reassessment', value: 'annual-reassessment' },
                                    { label: 'clin-data-pub-rp', value: 'clin-data-pub-rp' },
                                    { label: 'clin-data-pub-fv', value: 'clin-data-pub-fv' },
                                    { label: 'paed-7-8-30', value: 'paed-7-8-30' },
                                    { label: 'paed-29', value: 'paed-29' },
                                    { label: 'paed-45', value: 'paed-45' },
                                    { label: 'paed-46', value: 'paed-46' },
                                    { label: 'articale-58', value: 'articale-58' },
                                    { label: 'notification-61-3', value: 'notification-61-3' },
                                    { label: 'transfer-ma', value: 'transfer-ma' },
                                    { label: 'lifting-suspension', value: 'lifting-suspension' },
                                    { label: 'withdrawal', value: 'withdrawal' },
                                    { label: 'cep', value: 'cep' },
                                    { label: 'none', value: 'none' },
                                ]}
                                    name='submission_type'
                                    onChange={(e) => handleSelectChange(e, 'submission_type')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.submission_type}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission mode</label>
                                <Select options={[
                                    { label: 'Single', value: 'Single' },
                                    { label: 'Grouping', value: 'Grouping' },
                                    { label: 'Worksharing', value: 'Worksharing' },
                                ]}
                                    name='submission_mode'
                                    onChange={(e) => handleSelectChange(e, 'submission_mode')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.submission_mode}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Procedure Tracking N°</label>
                                <Select options={tno}
                                    name='tracking'
                                    onChange={(e) => handleSelectChange(e, 'tracking')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.tracking}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission unit</label>
                                <Select options={[
                                    { label: 'initial', value: 'initial' },
                                    { label: 'validation-response', value: 'validation-response' },
                                    { label: 'response', value: 'response' },
                                    { label: 'additional-info', value: 'additional-info' },
                                    { label: 'closing', value: 'closing' },
                                    { label: 'consolidating', value: 'consolidating' },
                                    { label: 'corrigendum', value: 'corrigendum' },
                                    { label: 'reformat', value: 'reformat' },
                                ]}
                                    name='submission_unit'
                                    onChange={(e) => handleSelectChange(e, 'submission_unit')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.submission_unit}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Applicant</label>
                                <TextField fullWidth variant="outlined" size="small" name="applicant" value={data.applicant} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Agency code</label>
                                <TextField fullWidth variant="outlined" size="small" name="agency_code" value={data.agency_code} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Invented name</label>
                                <TextField fullWidth variant="outlined" size="small" name="Invented name" value={data.ProductName} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">INN</label>
                                <TextField fullWidth variant="outlined" size="small" name="inn" value={data.inn} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Sequence</label>
                                <Tooltip title="Sequence">
                                    <TextField fullWidth variant="outlined" size="small" name="sequence" value={data.sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Related Sequence</label>
                                <Tooltip title="Related Sequence">
                                    <TextField fullWidth variant="outlined" size="small" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission description</label>
                                <TextField fullWidth variant="outlined" size="small" name="submission_description" value={data.submission_description} onChange={handleChange} />
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
                        <Typography>Product Metadata</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Indication</label>
                                <Select
                                    name='indication'
                                    onChange={(e) => handleSelectChange(e, 'indication')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.indication}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Manufacturer</label>
                                <Select
                                    name='manufacturer'
                                    onChange={(e) => handleSelectChange(e, 'manufacturer')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.manufacturer}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Drug substance</label>
                                <TextField fullWidth variant="outlined" size="small" name="drug_substance" value={data.drug_substance} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Drug substance manufacturer</label>
                                <Select
                                    name='drug_substance_manufacturer'
                                    onChange={(e) => handleSelectChange(e, 'drug_substance_manufacturer')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.drug_substance_manufacturer}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Drug product</label>
                                <TextField fullWidth variant="outlined" size="small" name="drug_product" value={data.drug_substance} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Drug product manufacturer</label>
                                <Select
                                    name='drug_product_manufacturer'
                                    onChange={(e) => handleSelectChange(e, 'drug_product_manufacturer')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.drug_product_manufacturer}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Dosage form</label>
                                <Select
                                    name='dosage_form'
                                    onChange={(e) => handleSelectChange(e, 'dosage_form')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.dosage_form}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Excipient</label>
                                <Select
                                    name='excipient'
                                    onChange={(e) => handleSelectChange(e, 'excipient')}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder=''
                                    isClearable
                                    value={data.excipient}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChangeac('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4-header">
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
                <Accordion expanded={expanded === 'panel5'} onChange={handleChangeac('panel5')}>
                    <AccordionSummary aria-controls="panel5d-content" id="pane5d-header">
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
                    </AccordionDetails>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" sx={{ mr: 1 }} variant="contained">Submit</Button>
                    </div>
                </Accordion>
            </form>
            {/* </Paper> */}
        </Authenticated>
    )
}

export default Create;