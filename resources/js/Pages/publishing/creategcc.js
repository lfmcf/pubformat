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

const CreateGcc = (props) => {
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

    // let contries = props.countries.map(function (country) {
    //     return { value: country, label: country };
    // });

    // let porductOptions = props.products.map(function (product) {
    //     return {
    //         value : product.name,
    //         label : product.name,
    //     }
    // });

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    useEffect(() => {
        let pdata = { ...data };
        let tn = metadata.trackingNumber
        tn = tn.split(/\r?\n/)
        if (tn.length > 1) {
            let tno = tn.map((val) => {
                return { label: val, value: val }
            })
            pdata.tracking = ''
            setTnoptions(tno)
        } else {
            let tno = tn.map((val) => {
                return { label: val, value: val }
            })
            setTnoptions(tno)
            pdata.tracking = { label: tn[0], value: tn[0] }
        }
        setData(pdata)
    }, [])



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
                                <TextField fullWidth variant="outlined" size="small" name="country" value={data.country} disabled />
                                {/* <Tooltip title="Country">
                                <Select options={contries}
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
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Procedure Tracking N°</label>
                                <Select options={tnoptions ? tnoptions : ''}
                                    name='tracking'
                                    onChange={handleSelectChange}
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
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Applicant</label>
                                <TextField fullWidth variant="outlined" size="small" name="applicant" value={data.applicant} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Agency code</label>
                                <TextField fullWidth variant="outlined" size="small" name="agency_code" value={data.agency_code} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">ATC</label>
                                <TextField fullWidth variant="outlined" size="small" name="atc" value={data.atc} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission type</label>
                                <Select options={[
                                    { label: 'Active submission', value: 'Active submission' },
                                    { label: 'Extension submission', value: 'Extension submission' },
                                    { label: 'New Marketing Authorization Application - Generics', value: 'New Marketing Authorization Application - Generics' },
                                    { label: 'New Marketing Authorization Application - New Chemical Entity', value: 'New Marketing Authorization Application - New Chemical Entity' },
                                    { label: 'New Marketing Authorization Application - Biological Products', value: 'New Marketing Authorization Application - Biological Products' },
                                    { label: 'New Marketing Authorization Application - Radiopharmaceuticals', value: 'New Marketing Authorization Application - Radiopharmaceuticals' },
                                    { label: 'None (in the case of reformatting the application)', value: 'None (in the case of reformatting the application)' },
                                    { label: 'Plasma Master File', value: 'Plasma Master File' },
                                    { label: 'Periodic Safety Update Report', value: 'Periodic Safety Update Report' },
                                    { label: 'PSUR single assessment procedure', value: 'PSUR single assessment procedure' },
                                    { label: 'Renewal (Yearly or 5-Yearly)', value: 'Renewal (Yearly or 5-Yearly)' },
                                    { label: 'Risk Management Plan', value: 'Risk Management Plan' },
                                    { label: 'Transfer of Marketing Authorization', value: 'Transfer of Marketing Authorization' },
                                    { label: 'Urgent Safety Restriction', value: 'Urgent Safety Restriction' },
                                    { label: 'Variation Type I', value: 'Variation Type I' },
                                    { label: 'Variation Type II', value: 'Variation Type II' },
                                    { label: 'Withdrawal during assessment or withdrawal of Marketing Authorization', value: 'Withdrawal during assessment or withdrawal of Marketing Authorization' },
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
                                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">Submission unit</label>
                                <Select options={[
                                    { label: 'Initial submission to start any regulatory activity', value: 'Initial submission to start any regulatory activity' },
                                    { label: 'Response to any kind of question, validation issues out-standing information requested by the agency', value: 'Response to any kind of question, validation issues out-standing information requested by the agency' },
                                    { label: 'Othe additional information (should only be used if response is not suitable)', value: 'Othe additional information (should only be used if response is not suitable)' },
                                    { label: 'Closing (provides the final documents in the GCC procedure following the decision of the GCC committee)', value: 'Closing (provides the final documents in the GCC procedure following the decision of the GCC committee)' },
                                    { label: 'Correction of the published annexes in the GCC procedure (usually shortly after approval)', value: 'Correction of the published annexes in the GCC procedure (usually shortly after approval)' },
                                    { label: 'Reformatting of an existing submission application from any format to Ectd', value: 'Reformatting of an existing submission application from any format to Ectd' },
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
                            {/* <Grid item xs={12} md={4}>
                            <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-shrink MuiFormLabel-filled flabel">UUID</label>
                            <TextField fullWidth variant="outlined" size="small" name="uuid" value={data.uuid} onChange={handleChange} />
                        </Grid> */}



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
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" sx={{ mr: 1 }} variant="contained">Submit</Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </Authenticated>
    )
}

export default CreateGcc;