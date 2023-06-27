import Authenticated from "@/Layouts/Authenticated";
import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/inertia-react';
import { Tooltip, TextField, Button, IconButton, Box } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { components } from "react-select";
import MySelect from '@/Components/Myselect';
import makeAnimated from "react-select/animated";
import { Form, Tabs, Tab } from "react-bootstrap";
import { publishingMrpSubmissionType } from '@/Components/MetaDataList';
import { Tabs as Mtabs, Tab as Mtab } from '@mui/material';
import Speed from "@/Components/Speed";
import SaveModal from "@/Components/SaveModal";
import CloseIcon from '@mui/icons-material/Close';

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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const MultiValue = props => (
    <components.MultiValue {...props}>
        <span>{props.data.label}</span>
    </components.MultiValue>
);
const animatedComponents = makeAnimated();

const Createmrp = (props) => {

    var params = new URLSearchParams(window.location.search);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { metadata } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });

    const handleMChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(metadata)

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        procedure: params.get('procedure'),
        product_name: params.get('product'),
        dossier_contact: '',
        object: '',
        country: '',
        dossier_type: '',
        document_count: '',
        remarks: '',
        mt: [],
        indication: '',
        manufacturer: '',
        drug_substance: '',
        drug_product_manufacturer: '',
        dosage_form: '',
        excipient: '',
        doc: '',
        docremarks: '',
        deadline: moment(new Date),
        request_date: moment(new Date),
    });

    const countires = metadata.map((mp) => {
        return { label: mp.country, value: mp.country }
    })
    const handleSubmit = (name) => {
        post(route('publishingStoremrp'));
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    };

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

    const handleSelectChange = (e, name) => {
        setData(name, e)
    }

    const handleMetaSelectChange = (e, name, id) => {
        let prevData = { ...data }
        prevData.mt[id][name] = e
        setData(prevData)
    }

    const handleMetaChange = (e, id) => {
        let prevData = { ...data }
        prevData.mt[id][e.target.name] = e.target.value
        setData(prevData)
    }

    useEffect(() => {
        let arr = { ...data };
        metadata.map((mtd, i) => {
            arr.mt.push({
                id: mtd.id, country: mtd.country, uuid: mtd.uuid, submission_type: '', submission_mode: '', trackingNumber: mtd.trackingNumber,
                submission_unit: '', applicant: mtd.applicant, agencyCode: mtd.agencyCode, inventedName: mtd.Product, inn: mtd.inn, sequence: '',
                r_sequence: '', submission_description: '', remarks: ''
            })
        })
        setData(arr)
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

    return (
        <Authenticated auth={props.auth} header={"Form - Create " + data.form + " " + data.region}>
            <form onSubmit={handleSubmit}>
                <Tabs activeKey={activeStep} fill onSelect={(e) => setActiveStep(e)}>
                    <Tab eventKey={0} title="General information" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 220px)' }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier contact</Form.Label>
                                            <Form.Control type="text" name="dossier_contact" value={data.dossier_contact} onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Object</Form.Label>
                                            <Form.Control type="text" name="Object" value={data.Object} onChange={handleChange} />
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
                                            <Select options={countires}
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
                                        <Form.Label className="form_group_label">Remarks</Form.Label>
                                        <Form.Control as="textarea" style={{ height: '100px' }} name="remarks" onChange={handleChange} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button onClick={() => setActiveStep(1)} style={{ width: '100px' }} variant="outlined" size="small">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={1} title="Submission metadata" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 220px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'end', padding: '10px 10px 0', backgroundColor: 'white' }}>
                            <IconButton size="small" onClick={handleOpen}>
                                <ModeEditIcon />
                            </IconButton>
                        </div>
                        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', padding: '20px', overflow: 'scroll' }}>
                            <Mtabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleMChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                {data.mt.map((md, i) => (
                                    <Mtab key={i} label={md.country} {...a11yProps(i)} />
                                ))}
                            </Mtabs>
                            {data.mt.map((md, i) =>
                                <div key={i} value={value} index={i} className="muitab" style={{ display: value != i ? 'none' : '', width: '100%', marginLeft: '20px' }}>
                                    <div className="row">
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">UUID</Form.Label>
                                                <Form.Control type="text" name="uuid" value={md.uuid} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                        <div className="col-4">
                                            <Form.Label className="form_group_label">Submission type</Form.Label>
                                            <Select options={publishingMrpSubmissionType}
                                                name='submission_type'
                                                onChange={(e) => handleMetaSelectChange(e, 'submission_type', i)}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={md.submission_type}
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
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
                                                    onChange={(e) => handleMetaSelectChange(e, 'submission_mode', i)}
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
                                                <Form.Control type="text" name="tracking" value={md.trackingNumber} onChange={(e) => handleMetaChange(e, i)} />
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
                                                    onChange={(e) => handleMetaSelectChange(e, 'submission_unit', i)}
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
                                                <Form.Control type="text" name="applicant" value={md.applicant} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Agency code</Form.Label>
                                                <Form.Control type="text" name="agency_code" value={md.agencyCode} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Invented name</Form.Label>
                                                <Form.Control type="text" name="inventedName" value={md.inventedName} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">INN</Form.Label>
                                                <Form.Control type="text" name="agency_inncode" value={md.inn} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Sequence</Form.Label>
                                                <Form.Control type="text" name="sequence" value={md.sequence} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Related Sequence</Form.Label>
                                                <Form.Control type="text" name="r_sequence" value={md.r_sequence} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                        <div className="col-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Submission description</Form.Label>
                                                <Form.Control type="text" name="submission_description" value={md.submission_description} onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="form_group_label">Remarks</Form.Label>
                                                <Form.Control as="textarea" style={{ height: '100px' }} name="remarks" onChange={(e) => handleMetaChange(e, i)} />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <Button onClick={() => setActiveStep(0)} style={{ width: '100px', marginRight: '10px' }} variant="outlined" size="small">Previous</Button>
                                        <Button onClick={() => setActiveStep(2)} style={{ width: '100px' }} variant="outlined" size="small">Next</Button>
                                    </div>
                                </div>
                            )}
                            {/* </div> */}

                        </Box>
                    </Tab>
                    <Tab eventKey={2} title="Product Metadata" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 220px)' }}>
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
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button onClick={() => setActiveStep(1)} style={{ width: '100px', marginRight: '10px' }} variant="outlined" size="small">Previous</Button>
                                    <Button onClick={() => setActiveStep(3)} style={{ width: '100px' }} variant="outlined" size="small">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={3} title="Documents" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 220px)' }}>
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
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Button onClick={() => setActiveStep(2)} style={{ width: '100px', marginRight: '10px' }} variant="outlined" size="small">Previous</Button>
                                    <Button onClick={() => setActiveStep(4)} style={{ width: '100px' }} variant="outlined" size="small">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={4} title="Delivery details" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 220px)' }}>
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
            </form >

            <Dialog open={open} onClose={handleClose} fullScreen >
                {/* <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton> */}
                <DialogTitle>Multi update</DialogTitle>
                <DialogContent style={{ padding: '10px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-7">
                                <div className='modal_form'>
                                    <label className='modal_label'>UUID</label>
                                    <TextField variant="outlined" size="small" value={metadata[0].uuid} fullWidth />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Submission type</label>
                                    <Select options={publishingMrpSubmissionType}
                                        name='submission_type'
                                        onChange={(e) => handleSelectChange(e, 'submission_type')}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder=''
                                        isClearable
                                        value={data.submission_type}

                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                                    />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Submission mode</label>
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
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                                    />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Tracking number</label>
                                    <TextField fullWidth variant="outlined" value={metadata[0].trackingNumber} size="small" name="tracking" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Submission unit</label>
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
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                                    />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Applicant</label>
                                    <TextField fullWidth variant="outlined" value={metadata[0].applicant} size="small" name="applicant" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Agency code</label>
                                    <TextField fullWidth variant="outlined" size="small" value={metadata[0].agencyCode} name="agency_code" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Invented Name</label>
                                    <TextField fullWidth variant="outlined" size="small" value={metadata[0].Product} name="invented_name" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>INN</label>
                                    <TextField fullWidth variant="outlined" size="small" value={metadata[0].inn} name="inn" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Sequence</label>
                                    <TextField fullWidth variant="outlined" size="small" name="seqeunce" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Related sequence</label>
                                    <TextField fullWidth variant="outlined" size="small" name="r_seqeunce" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Submission description</label>
                                    <TextField fullWidth variant="outlined" size="small" name="description" />
                                </div>
                                <div className='modal_form'>
                                    <label className='modal_label'>Remarks</label>
                                    <TextField fullWidth variant="outlined" size="small" name="remarks" />
                                </div>
                            </div>
                            <div className="col-5">
                                {metadata.map((mtc) => (
                                    <div key={`default-${mtc.country}`} className="mb-3">
                                        <Form.Check // prettier-ignore
                                            type='checkbox'
                                            id={`default-${mtc.country}`}
                                            label={mtc.country}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <div className='modal_form'>
                        <label className='modal_label'>Countries</label>
                        <MySelect
                            options={metadata.map((mtc) => ({label:mtc.country,value:mtc.country}))}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{ Option, MultiValue, animatedComponents }}
                            allowSelectAll={true}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }), container: base => ({ width: '100%' }) }}
                        />
                    </div> */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button >Next</Button>
                </DialogActions>
            </Dialog>

        </Authenticated >
    )
}

export default Createmrp;