import Authenticated from "@/Layouts/Authenticated";
import React, { useState } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip, Grid, TextField, CardContent } from '@material-ui/core';
import Select from 'react-select';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from "axios";

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

const Publishing = (props) => {
    var params = new URLSearchParams(window.location.search);
    const classes = useStyles();
    const [tnoptions, setTnoptions] = useState();
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        form: params.get('form'),
        region: params.get('region'),
        dossier_contact: '',
        spec: '',
        dossier_name: '',
        dossier_type: '',
        ProductName: '',
        country: '',
        procedure: params.get('procedure'),
        sequence: '',
        r_sequence: '',
        document_count: '',
        uuid: '',
        applicant: '',
        agency_code: '',
        inn: '',
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

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    });

    let porductOptions = props.products.map(function (product) {
        return {
            value : product.name,
            label : product.name,
        }
    });

    const handleSelectChange = (selectedOption, name) => {
        setData(name.name, selectedOption);
        clearErrors(name.name)
    }

    

    React.useEffect(() => {
        if(data.country && data.ProductName) {
            axios.post('/getmd', { produit: data.ProductName.value, country: data.country.value, procedure: data.procedure }).then(res => {
                let pdata = { ...data };
                pdata.applicant = res.data.applicant;
                pdata.inn = res.data.inn;
                pdata.uuid = res.data.uuid;
                pdata.agency_code = res.data.agencyCode;
                let tn = res.data.trackingNumber
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
            })
        }
    },[ data.country, data.ProductName])

    return (
        <Authenticated auth={props.auth} header={"Form - Create " + data.form + " " + data.region}>
            <form className={classes.formulaire} onSubmit={handleSubmit}>
                <Card className={classes.cCard}>
                    <CardHeader title="GENERAL INFORMATION" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Contact">
                                    <TextField fullWidth label="Dossier Contact" name="dossier_contact" value={data.dossier_contact} onChange={handleChange} />
                                </Tooltip>
                                
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <Tooltip title="Spec M1">
                                    <TextField fullWidth label="Spec M1" name="spec" value={data.spec} onChange={handleChange} />
                                </Tooltip>
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Object">
                                    <TextField fullWidth label="Object" name="dossier_name" value={data.dossier_name} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Dossier Type">
                                    {/* <TextField fullWidth label="Dossier Type" name="dossier_type" value={data.dossier_type} onChange={handleChange} /> */}
                                    <Select options={[
                                        { label: 'Baseline Dossier (M1-M2-M3)', value: 'Baseline Dossier (M1-M2-M3)' },
                                        { label: 'Marketing Authorisation Dossier / BLA (m1-m5)', value: 'Marketing Authorisation Dossier / BLA (m1-m5)' },
                                        { label: 'Renewal Dossier', value: 'Renewal Dossier' },
                                        { label: 'Variation Dossier', value: 'Variation Dossier' },
                                        { label: 'Responses to questions Dossier', value: 'Responses to questions Dossier' },
                                        { label: 'PSUR/ PSUSA Dossier', value: 'PSUR/ PSUSA Dossier' },
                                        { label: 'Current View (Draft seq)', value: 'Current View (Draft seq)' },
                                        
                                    ]}
                                        name="dossier_type"
                                        onChange={(e) => setData('dossier_type', e.value)}
                                        placeholder='Dossier type'
                                        isClearable
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Product Name">
                                    <Select options={porductOptions}
                                        name="ProductName"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Product Name'
                                        isClearable
                                        value={data.ProductName}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                    {/* <TextField fullWidth label="Product Name" name="ProductName" value={data.ProductName} onChange={handleChange} /> */}
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Tooltip title="Country">
                                    <Select options={[
                                        { label: 'Allemagne', value: 'Allemagne' },
                                        { label: 'Autriche', value: 'Autriche' },
                                        { label: 'Belgique', value: 'Belgique' },
                                        { label: 'Bulgarie', value: 'Bulgarie' },
                                        { label: 'Chypre', value: 'Chypre' },
                                        { label: 'Chypre', value: 'Chypre' },
                                        { label: 'Danemark', value: 'Danemark' },
                                        { label: 'Espagne', value: 'Espagne' },
                                        { label: 'Estonie', value: 'Estonie' },
                                        { label: 'Finlande', value: 'Finlande' },
                                        { label: 'France', value: 'France' },
                                        { label: 'Grèce', value: 'Grèce' },
                                        { label: 'Hongrie', value: 'Hongrie' },
                                        { label: 'Irlande', value: 'Irlande' },
                                        { label: 'Italie', value: 'Italie' },
                                        { label: 'Lettonie', value: 'Lettonie' },
                                        { label: 'Lituanie', value: 'Lituanie' },
                                        { label: 'Luxembourg', value: 'Luxembourg' },
                                        { label: 'Malte', value: 'Malte' },
                                        { label: 'Pays-Bas', value: 'Pays-Bas' },
                                        { label: 'Pologne', value: 'Pologne' },
                                        { label: 'Portugal', value: 'Portugal' },
                                        { label: 'République tchèque', value: 'République tchèque' },
                                        { label: 'Roumanie', value: 'Roumanie' },
                                        { label: 'Slovaquie', value: 'Slovaquie' },
                                        { label: 'Slovénie', value: 'Slovénie' },
                                        { label: 'Suède', value: 'Suède' },
                                    ]}
                                        name="country"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Country'
                                        isClearable
                                        value={data.country}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                    {/* <TextField fullWidth label="Country" name="country" value={data.country} onChange={handleChange} /> */}
                                </Tooltip>
                            </Grid>
                            {/* <Grid item xs={12} md={3}>
                                <Tooltip title="Procedure">
                                    <Select options={[
                                        {value: "Nationale", label: "Nationale"},
                                        {value: "Centralized", label: "Centralized"},
                                        {value: "Decentralized", label: "Decentralized"},
                                        {value: "Mutual Recognition", label: "Mutual Recognition"},
                                    ]} 
                                        name="procedure"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Procedure'
                                        isClearable
                                        value={data.procedure}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid> */}
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Substance name">
                                    {/* <TextField fullWidth label="Sequence" name="sequence" value={data.sequence} onChange={handleChange} /> */}
                                    <Select
                                        name="substance"
                                        onChange={handleSelectChange}
                                        className="basic"
                                        classNamePrefix="basic"
                                        placeholder='Substance name'
                                        isClearable
                                        value={data.substance}
                                        menuPortalTarget={document.body} 
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Sequence">
                                    <TextField fullWidth label="Sequence" name="sequence" value={data.sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Tooltip title="Related Sequence">
                                    <TextField fullWidth label="Related Sequence" name="r_sequence" value={data.r_sequence} onChange={handleChange} />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Tooltip title="Document Count">
                                    <TextField fullWidth label="Document Count" name="document_count" value={data.document_count} onChange={handleChange} />
                                </Tooltip>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
                
                <Card className={classes.cCard}>
                    <CardHeader title="Submission metadata" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="UUID" name="uuid" value={data.uuid} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Applicant" name="applicant" value={data.applicant} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {/* <TextField fullWidth label="Procedure Tracking N°" name="tracking" value={data.tracking} onChange={handleChange} /> */}
                                <Select options={tnoptions ? tnoptions : ''}
                                    name='tracking'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Procedure Tracking N°'
                                    isClearable
                                    value={data.tracking}
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Agency Code" name="agency_code" value={data.agency_code} onChange={handleChange} />
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Invented Name" name="uuid" value={data.uuid} onChange={handleChange} />
                            </Grid> */}
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="INN" name="inn" value={data.inn} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Submission type'
                                    isClearable
                                    value={data.submission_type}
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select options={[
                                    { label: 'Single', value: 'Single' },
                                    { label: 'Grouping', value: 'Grouping' },
                                    { label: 'Worksharing', value: 'Worksharing' },
                                ]}
                                    name='submission_mode'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Submission mode'
                                    isClearable
                                    value={data.submission_mode}
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
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
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Submission unit'
                                    isClearable
                                    value={data.submission_unit}
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Submission description" name="submission_description" value={data.submission_description} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField fullWidth label="Remarks" name="submission_description" value={data.submission_description} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Product metadata" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Select
                                    name='indication'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Indication'
                                    isClearable
                                    value={data.indication}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    name='indication'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Drug product manufacturer'
                                    isClearable
                                    // value={data.submission_type}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    name='indication'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Drug substance manufacturer'
                                    isClearable
                                    // value={data.submission_type}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    name='indication'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='dosage form'
                                    isClearable
                                    //={data.submission_type}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    name='indication'
                                    onChange={handleSelectChange}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Excipient'
                                    isClearable
                                    //value={data.submission_type}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className={classes.cCard}>
                    <CardHeader title="Delivery details" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Request date"
                                        inputFormat="dd-MMM-yyyy HH:mm"

                                        value={data.deadline}
                                        onChange={(val) => handleDateChange('deadline', val)}
                                        renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
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
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
                
                {/* <Card className={classes.cCard}>
                    <CardHeader title="Operationel Deadline" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Select options={[
                                    { label: '10h', value: '10h' },
                                    { label: '12h', value: '12h' },
                                    { label: '14h', value: '14h' },
                                    { label: '16h', value: '16h' },

                                ]}
                                    className="basic"
                                    classNamePrefix="basic"
                                    placeholder='Delivery Time'
                                    menuPortalTarget={document.body} 
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card> */}
                <Card className={classes.cCard}>
                    <CardHeader title="Status & Comments" className={classes.cHeader} />
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Status" name="status" value={data.status} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Attached Document" name="doc" value={data.doc} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextareaAutosize aria-label="Comment" minRows={3} placeholder="Comment" style={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </Authenticated>
    )
}

export default Publishing;