import Authenticated from "@/Layouts/Authenticated";
import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react';
import { Form, Tabs, Tab, Button } from "react-bootstrap";
import { CardHeader, Tooltip, Grid, TextField, CardContent, Paper, Box } from '@material-ui/core';
import Select from 'react-select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import SaveModal from "@/Components/SaveModal";
import Speed from "@/Components/Speed";

const Edit = (props) => {

    const { pub } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: pub.form,
        region: pub.region,
        procedure: pub.procedure,
        productName: pub.productName,
        dossier_contact: pub.dossier_contact,
        object: pub.object,
        country: pub.country,
        dossier_type: pub.dossier_type,
        dossier_count: pub.dossier_count,
        remarks: pub.remarks,
        uuid: pub.uuid,
        submission_type: pub.submission_type,
        submission_mode: pub.submission_mode,
        tracking: pub.tracking,
        submission_unit: pub.submission_unit,
        applicant: pub.applicant,
        agency_code: pub.agency_code,
        inn: pub.inn,
        sequence: pub.sequence,
        r_sequence: pub.r_sequence,
        submission_description: pub.submission_description,
        mtremarks: pub.mtremarks,
        indication: pub.indication,
        manufacturer: pub.manufacturer,
        drug_substance: pub.drug_substance,
        drug_substance_manufacturer: pub.drug_substance_manufacturer,
        drug_product: pub.drug_product,
        drug_product_manufacturer: pub.drug_product_manufacturer,
        dosage_form: pub.dosage_form,
        excipient: pub.excipient,
        doc: '',
        docremarks: pub.docremarks,
        request_date: pub.request_date,
        deadline: pub.deadline,
        ajusted_deadline: new Date(),
    });


    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    let handleDateChange = (name, e) => {
        setData(name, e)
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

    const handleSaveModalConfirm = (name) => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        handleSubmit(name);
    }

    const handleSubmit = (name) => {
        post(route('publishingStore', { 'type': name }));
    }

    return (
        <Authenticated auth={props.auth}>
            <form onSubmit={handleSubmit}>
                <Tabs activeKey={activeStep} onSelect={(e) => setActiveStep(e)}>
                    <Tab eventKey={0} title="General information" style={{ border: '1px solid #dee2e6', minHeight: 'calc(100vh - 210px)' }}>
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
                                            <Form.Control type="text" value={data.productName} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission country</Form.Label>
                                            <Form.Control type="text" name="country" value={data.country} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier type</Form.Label>
                                            <Select options={[
                                                { label: 'Variation Dossier', value: 'Variation Dossier', delai: 3 },
                                                { label: 'Responses to questions Dossier', value: 'Responses to questions Dossier', delai: 3 },
                                                { label: 'PSUR/ PSUSA Dossier', value: 'PSUR/ PSUSA Dossier', delai: 3 },
                                                { label: 'Current View (Draft seq)', value: 'Current View (Draft seq)', delai: 1 },
                                            ]}
                                                name='dossier_type'
                                                onChange={(e) => handleSelectChange(e, 'dossier_type')}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.dossier_type}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier count</Form.Label>
                                            <Form.Control type="text" name="dossier_count" onChange={handleChange} />
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
                    <Tab eventKey={1} title="Submission Metadata" style={{ border: '1px solid #dee2e6', minHeight: 'calc(100vh - 210px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px', overflowY: 'scroll' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">UUID</Form.Label>
                                            <Form.Control type="text" name="uuid" value={data.uuid} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission type</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission mode</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Procedure Tracking N°</Form.Label>
                                            <Select options={[]}
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
                                            <Form.Label className="form_group_label">Submission unit</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Applicant</Form.Label>
                                            <Form.Control type="text" name="applicant" value={data.applicant} onChange={handleChange} />
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
                                            <Form.Label className="form_group_label">Invented name</Form.Label>
                                            <Form.Control type="text" name="productName" value={data.productName} onChange={handleChange} />
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
                                            <Form.Label className="form_group_label">Sequence</Form.Label>
                                            <Form.Control type="text" name="sequence" value={data.sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Related Sequence</Form.Label>
                                            <Form.Control type="text" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission description</Form.Label>
                                            <Form.Control type="text" name="submission_description" value={data.submission_description} onChange={handleChange} />
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
                    <Tab eventKey={2} title="Product Metadata" style={{ border: '1px solid #dee2e6', minHeight: 'calc(100vh - 210px)' }}>
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
                    <Tab eventKey={3} title="Documents" style={{ minHeight: 'calc(100vh - 210px)' }}>
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
                    <Tab eventKey={4} title="Delivery details" style={{ minHeight: 'calc(100vh - 210px)' }}>
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
                                    <Button onClick={() => setActiveStep(3)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                    <Button onClick={() => setActiveStep(5)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={5} title="Adjusted delivery" style={{ minHeight: 'calc(100vh - 210px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Adjusted deadline"
                                                inputFormat="dd-MMM-yyyy"
                                                value={data.ajusted_deadline}
                                                onChange={(val) => handleDateChange('ajusted_deadline', val)}
                                                renderInput={(params) => <TextField name="ajusted_deadline" fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button onClick={() => setActiveStep(4)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                </div>
                            </div>

                        </Box>
                    </Tab>
                </Tabs>
                <Speed processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} />
                <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />
            </form>
        </Authenticated>
    )
}

export default Edit;