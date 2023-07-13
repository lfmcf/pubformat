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

const Editgcc = (props) => {

    const { pub } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: pub.form,
        region: pub.region,
        procedure: pub.procedure,
        product_name: pub.product_name,
        dossier_contact: pub.dossier_contact,
        object: pub.object,
        country: pub.country,
        dossier_type: pub.dossier_type,
        document_count: pub.document_count,
        remarks: pub.remarks,
        tracking: pub.tracking,
        applicant: pub.applicant,
        agency_code: pub.agency_code,
        atc: pub.atc,
        submission_type: pub.submission_type,
        submission_mode: pub.submission_mode,
        invented_name: pub.invented_name,
        inn: pub.inn,
        sequence: pub.sequence,
        r_sequence: pub.r_sequence,
        uuid: pub.uuid,
        submission_description: pub.submission_description,
        mtremarks: pub.mtremarks,
        indication: pub.indication,
        manufacturer: pub.manufacturer,
        drug_substance: pub.drug_substance,
        drug_substance_manufacturer: pub.drug_substance_manufacturer,
        drug_product: pub.drug_product,
        dosage_form: pub.dosage_form,
        excipient: pub.excipient,
        doc: pub.doc,
        docremarks: pub.docremarks,
        request_date: pub.request_date,
        deadline: pub.deadline,
        ajusted_deadline: new Date()
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
                    <Tab eventKey={0} title="General information" style={{ minHeight: 'calc(100vh - 210px)' }}>
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
                                            <Form.Label className="form_group_label">Product name</Form.Label>
                                            <Form.Control type="text" name="product_name" value={data.product_name} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Label className="form_group_label">Submission country</Form.Label>
                                        <Select options={[]}
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
                                    </div>
                                    <div className="col-4">
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
                                    </div>
                                    <div className="col-4">
                                        <Form.Label className="form_group_label">Document Count</Form.Label>
                                        <Form.Control type="text" name="document_count" onChange={handleChange} />
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
                    <Tab eventKey={1} title="Submission Metadata" style={{ minHeight: 'calc(100vh - 210px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px', overflowY: 'scroll' }}>
                            <div className="container">
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
                                            <Form.Label className="form_group_label">Applicant</Form.Label>
                                            <Form.Control type="text" name="applicant" value={data.applicant} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Agency code</Form.Label>
                                            <Form.Control type="text" name="agency_code" value={data.agency_code} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">ATC</Form.Label>
                                            <Form.Control type="text" name="atc" value={data.atc} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission type</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission unit</Form.Label>
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
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Invented name</Form.Label>
                                            <Form.Control type="text" name="invented_name" value={data.invented_name} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">INN</Form.Label>
                                            <Form.Control type="text" name="inn" value={data.inn} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Sequence</Form.Label>
                                            <Form.Control type="text" name="sequence" value={data.sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Related Sequence</Form.Label>
                                            <Form.Control type="text" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">UUID</Form.Label>
                                            <Form.Control type="text" name="uuid" value={data.uuid} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Submission description</Form.Label>
                                            <Form.Control type="text" name="submission_description" value={data.submission_description} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
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
                    <Tab eventKey={2} title="Product Metadata" style={{ minHeight: 'calc(100vh - 210px)' }}>
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
        </Authenticated >
    )
}

export default Editgcc;