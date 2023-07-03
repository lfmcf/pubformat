import Authenticated from "@/Layouts/Authenticated";
import React, { useState, useEffect } from "react";
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
import Box from '@mui/material/Box';
import { substanceFormattingList, formattingProduct, formattingDossierType } from '@/Components/MetaDataList'
import { styled } from '@mui/material/styles';
import { Form, Tabs, Tab, Button } from "react-bootstrap";
import SaveModal from "@/Components/SaveModal";


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

    var params = new URLSearchParams(window.location.search)
    const teamId = props.auth.user.current_team_id;
    const [expanded, setExpanded] = useState('panel1');
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });

    const classes = useStyles();

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        coredoc: params.get('coreDoc'),
        dossier_contact: '',
        object: '',
        product_name: '',
        substance_name: '',
        country: '',
        dossier_type: '',
        document_count: '',
        deficiency_letter: '',
        chrono: '',
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

   

    let contries = props.countries.map(function (country) {
        return { value: country, label: country };
    })


    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }


    const handleDateChange = (name, newValue) => {
        setData(name, moment(newValue).format('YYYY-MM-DD HH:mm:ss'));
    };

    const handleSubmit = (name) => {
        post(route('formattingStore', { 'type': name }));
    }

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
                                            <Form.Label className="form_group_label">Product name</Form.Label>
                                            <Select options={formattingProduct}
                                                name="product_name"
                                                onChange={(e) => handleSelectChange(e, 'product_name')}
                                                placeholder=''
                                                isClearable
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Substance name</Form.Label>
                                            <Select options={substanceFormattingList}
                                                name="substance_name"
                                                onChange={(e) => handleSelectChange(e, 'substance_name')}
                                                placeholder=''
                                                isClearable
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Country</Form.Label>
                                            <Select options={contries}
                                                name="country"
                                                onChange={(e) => handleSelectChange(e, 'country')}
                                                placeholder=''
                                                isClearable
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Dossier type</Form.Label>
                                            <Select options={formattingDossierType}
                                                name="dossier_type"
                                                onChange={(e) => handleSelectChange(e, 'dossier_type')}
                                                placeholder=''
                                                isClearable
                                                menuPortalTarget={document.body}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Document Count</Form.Label>
                                            <Form.Control type="text" name="document_count" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Deficiency Letter</Form.Label>
                                            <Form.Control type="text" name="deficiency_letter" onChange={handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-4">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form_group_label">Chrono N°/ Dossier Reference</Form.Label>
                                            <Form.Control type="text" name="chrono" onChange={handleChange} />
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
                    <Tab eventKey={1} title="Documents" style={{ height: 'calc(100vh - 200px)' }}>
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
                                    <Button onClick={() => setActiveStep(0)} style={{ width: '100px', marginRight: '10px' }} variant="outline-primary" size="sm">Previous</Button>
                                    <Button onClick={() => setActiveStep(2)} style={{ width: '100px' }} variant="outline-primary" size="sm">Next</Button>
                                </div>
                            </div>
                        </Box>
                    </Tab>
                    <Tab eventKey={2} title="Delivery details" style={{ height: 'calc(100vh - 200px)' }}>
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
                                    <Button onClick={() => setActiveStep(1)} style={{ width: '100px', marginRight: '10px' }} variant="outlined" size="small">Previous</Button>
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

export default Create;

//Gi.layout = (page) => <Authenticated children={page} auth={page.props.auth} header={"Form - CREARTE"} />