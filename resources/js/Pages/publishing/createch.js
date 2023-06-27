import Authenticated from "@/Layouts/Authenticated";
import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent, Paper, Button, Box } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material/styles';
import { Form, Tabs, Tab } from "react-bootstrap";
import SaveModal from "@/Components/SaveModal";
import Speed from "@/Components/Speed";

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

const CreateCh = (props) => {
    var params = new URLSearchParams(window.location.search);
    const classes = useStyles();
    const [tnoptions, setTnoptions] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const [activeStep, setActiveStep] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const { metadata } = props;

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        procedure: params.get('procedure'),
        product_name: params.get('product'),
        dossier_contact: '',
        object: '',
        country: 'Switzerland',
        dossier_type: '',
        document_count: '',
        remarks: '',
        tracking: metadata.trackingNumber,
        submission_description: '',
        invented_name: '',
        galenic_form: metadata.galenic_form,
        swissmedic: metadata.swissmedic,
        galenic_name: metadata.gemran,
        dmf: metadata.dmf_number,
        pmf: '',
        inn: metadata.inn,
        applicant: metadata.applicant,
        dmf_holder: '',
        pmf_holder: '',
        agency_code: metadata.agencyCode,
        tpa: metadata.tpa,
        sequence: '',
        r_sequence: '',
        application_type: '',
        mtremarks: '',
        indication: '',
        manufacturer: '',
        drug_substance: '',
        drug_substance_manufacturer: '',
        drug_product: '',
        drug_product_manufacturer: '',
        dosage_form: '',
        excipient: '',
        doc: '',
        docremarks: '',
        request_date: moment(new Date),
        deadline: moment(new Date),
    });

    const handleSaveModalConfirm = (name) => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        handleSubmit(name);
    }

    const handleSaveModalClose = () => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
    }

    const showsavemodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'submit' }))
    }

    const showdraftmodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'draft' }))
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSubmit = (name) => {
        post(route('publishingStorech'));
    }

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
                <Tabs activeKey={activeStep} fill onSelect={(e) => setActiveStep(e)}>
                    <Tab eventKey={0} title="General information" style={{ height: 'calc(100vh - 220px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier contact</Form.Label>
                                            <Form.Control type="text" name="dossier_contact" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Object</Form.Label>
                                            <Form.Control type="text" name="object" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Product / Substance</Form.Label>
                                            <Form.Control type="text" name="product_name" value={data.product_name} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission country</Form.Label>
                                            <Form.Control type="text" name="country" value={data.country} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier type</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Document Count</Form.Label>
                                            <Form.Control type="text" name="document_count" value={data.document_count} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Remarks</Form.Label>
                                            <Form.Control as="textarea" style={{ height: '100px' }} name="remarks" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => setActiveStep(1)} style={{ width: '100px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={1} title="Submission Metadata" style={{ height: 'calc(100vh - 200px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px', overflowY: 'scroll' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Application number</Form.Label>
                                            <Select options={tnoptions ? tnoptions : ''}
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission description</Form.Label>
                                            <Form.Control type="text" name="submission_description" value={data.submission_description} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Invented name</Form.Label>
                                            <Form.Control type="text" name="invented_name" value={data.invented_name} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Galenic form</Form.Label>
                                            <Select options={[]}
                                                name='galenic_form'
                                                onChange={(e) => handleSelectChange(e, 'galenic_form')}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.galenic_form}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Authorization number (Swissmedic)</Form.Label>
                                            <Form.Control type="text" name="swissmedic" value={data.swissmedic} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Galenic name (German)</Form.Label>
                                            <Form.Control type="text" name="galenic_name" value={data.galenic_name} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">DMF number</Form.Label>
                                            <Form.Control type="text" name="dmf" value={data.dmf} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">PMF number</Form.Label>
                                            <Form.Control type="text" name="pmf" value={data.pmf} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">INN</Form.Label>
                                            <Form.Control type="text" name="inn" value={data.inn} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Applicant</Form.Label>
                                            <Form.Control type="text" name="applicant" value={data.applicant} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">DMF holder</Form.Label>
                                            <Form.Control type="text" name="dmf_holder" value={data.dmf_holder} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">PMF holder</Form.Label>
                                            <Form.Control type="text" name="pmf_holder" value={data.pmf_holder} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Agency code</Form.Label>
                                            <Form.Control type="text" name="agency_code" value={data.agency_code} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Article 13 TPA</Form.Label>
                                            <Form.Control type="text" name="tpa" value={data.tpa} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">eCTD Sequence</Form.Label>
                                            <Form.Control type="text" name="sequence" value={data.sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Related eCTD sequence</Form.Label>
                                            <Form.Control type="text" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Application type</Form.Label>
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
                                                { label: 'Renewal - Prolongation, renouncement of prolongation of Marketing Authorization', value: 'Renewal - Prolongation, renouncement of prolongation of Marketing Authorization' },
                                                { label: 'Follow-up Measure', value: 'Follow-up Measure' },
                                                { label: 'Submission of PSUR', value: 'Submission of PSUR' },
                                                { label: 'Withdrawal of authorised medical products', value: 'Withdrawal of authorised medical products' },
                                                { label: 'Transfer of Marketing Authorization, change of name or address of applicant', value: 'Transfer of Marketing Authorization, change of name or address of applicant' },
                                                { label: 'Drug Master File', value: 'Drug Master File' },
                                                { label: 'Plasma Master File', value: 'Plasma Master File' },
                                                { label: 'Application for recognition of orphan drug status or fast track status', value: 'Application for recognition of orphan drug status or fast track status' },
                                                { label: 'Reformat : Baseline eCTD submission. No content change, no review', value: 'Reformat : Baseline eCTD submission. No content change, no review' },
                                                { label: 'Suupplemental information (could include for example response to content validation issuers or answers to question)', value: 'Suupplemental information (could include for example response to content validation issuers or answers to question)' },
                                                { label: 'Correction of errors detected in a sequence', value: 'Correction of errors detected in a sequence' },
                                            ]}
                                                name='application_type'
                                                onChange={(e) => handleSelectChange(e, 'application_type')}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.application_type}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Remarks</Form.Label>
                                            <Form.Control as="textarea" style={{ height: '100px' }} name="mtremarks" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => setActiveStep(0)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                    <Button onClick={() => setActiveStep(2)} style={{ width: '100px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={2} title="Product Metadata" style={{ height: 'calc(100vh - 220px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Indication</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Manufacturer</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Drug substance</Form.Label>
                                            <Form.Control type="text" name="drug_substance" value={data.drug_substance} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Drug substance manufacturer</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Drug product</Form.Label>
                                            <Form.Control type="text" name="drug_product" value={data.drug_product} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Drug product manufacturer</Form.Label>
                                            <Form.Control type="text" name="drug_product_manufacturer" value={data.drug_product_manufacturer} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dosage form</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Excipient</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => setActiveStep(1)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                    <Button onClick={() => setActiveStep(3)} style={{ width: '100px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={3} title="Documents" style={{ height: 'calc(100vh - 200px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Attached document</Form.Label>
                                            <Form.Control type="file" name="doc" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-12">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Remarks</Form.Label>
                                            <Form.Control as="textarea" style={{ height: '100px' }} name="docremarks" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => setActiveStep(2)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                    <Button onClick={() => setActiveStep(4)} style={{ width: '100px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={4} title="Delivery details" style={{ height: 'calc(100vh - 200px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
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
                                    </div>
                                    <div className="col-6">
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
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button onClick={() => setActiveStep(3)} style={{ width: '100px', marginRight: '10px' }} variant="outlined" size="small">Previous</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                </Tabs>
                <Speed processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} />
                <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />
            </form>
        </Authenticated >
    )
}

export default CreateCh;