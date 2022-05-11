import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Card, CardContent, Paper, Typography, TableCell, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Box, Grid, InputLabel, CardHeader } from '@material-ui/core';
import { Calendar } from 'react-feather';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        //marginLeft: aside => aside ? 0 : "264px",
        //flexGrow: 1,
        //padding: "10px 20px 20px",
        [theme.breakpoints.down("md")]: {
            marginLeft: "0 !important"
        }
    },
    paper: {
        height: "300px",
        marginTop: theme.spacing(2),
        paddingTop: '20px'
    },
    actions: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            '& *': {
                paddingBottom: "10px"
            }
        }
    },
    cCard: {
        borderRadius: '0',
        boxShadow: '0 1px 20px 0 rgb(69 90 100 / 8%)'
    },
    cHeader : {
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
        }
    }

}));


export default function Dashboard(props) {
    const classes = useStyles();
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className={classes.wrapper}>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sm={12}>
                        <Paper style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                            <div style={{ display: "flex", width: '100%', justifyContent: "flex-end", padding: "1px" }}>
                                <IconButton aria-label="settings" style={{ padding: '0px 0px 5px 0px', fontSize: '10px' }}>
                                    <Calendar size={15} />
                                </IconButton>
                            </div>
                            <Grid container spacing={3}>
                                <Grid item md={3} xs={12} sm={12}>
                                    <Card style={{ background: 'linear-gradient(-135deg, #899FD4 0%, #A389D4 100%)', position: 'relative' }}>
                                        <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div >
                                                <Typography style={{ color: 'white', fontSize: '16px' }} variant="h6" component="h6">
                                                    {/* {recyear == 0 ? data.length : data.filter(row => moment(row.receptiondate).year() == recyear).length} */}
                                                    12
                                                </Typography>
                                                <Typography style={{ color: 'white', fontSize: '12px' }} variant="h6" component="p">
                                                    Total Dossiers
                                                </Typography>
                                            </div>
                                            <div>
                                                <FolderOpenIcon fontSize='large' color='inherit' style={{ opacity: '0.5' }} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item md={3} xs={12} sm={12}>
                                    <Card style={{ background: 'linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%)', position: 'relative' }}>
                                        <CardContent>
                                            <Typography style={{ color: 'white', fontSize: '16px' }} variant="h6" component="h6">
                                                {/* {recyear == 0 ? data.filter(row => row.status === "Delivred").length : data.filter(row => row.status === "Delivred" && moment(row.receptiondate).year() == recyear).length} */}
                                                23
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '12px' }} variant="h6" component="p">
                                                Delivered
                                            </Typography>
                                            <div style={{ position: 'absolute', top: '30%', right: '10%' }}>
                                                <AssignmentTurnedInIcon fontSize='large' color='inherit' style={{ opacity: '0.5' }} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item md={3} xs={12} sm={12}>
                                    <Card style={{ background: 'linear-gradient(-135deg, #bdc3c7  0%, #2c3e50 100%)', position: 'relative', cursor: 'pointer' }} >
                                        <CardContent>
                                            <Typography style={{ color: 'white', fontSize: '16px' }} variant="h6" component="h6">
                                                {/* {recyear == 0 ? data.filter(row => row.status == "Ongoing").length : data.filter(row => row.status == "Ongoing" && moment(row.receptiondate).year() == recyear).length} */}
                                                1
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '12px' }} variant="h6" component="p">
                                                Ongoing
                                            </Typography>
                                            <div style={{ position: 'absolute', top: '30%', right: '10%' }}>
                                                <BorderColorIcon fontSize='large' color='inherit' style={{ opacity: '0.5' }} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item md={3} xs={12} sm={12}>
                                    <Card style={{ background: 'linear-gradient(-135deg, #f27781  0%, #ed4264 100%)', position: 'relative', cursor: 'pointer' }} >
                                        <CardContent>
                                            <Typography style={{ color: 'white', fontSize: '16px' }} variant="h6" component="h6">
                                                {/* {recyear == 0 ? data.filter(row => row.overrun > 0).length : data.filter(row => row.overrun > 0 && moment(row.receptiondate).year() == recyear).length} */}
                                                10
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '12px' }} variant="h6" component="p">
                                                Overrun
                                            </Typography>
                                            <div style={{ position: 'absolute', top: '30%', right: '10%' }}>
                                                <AssignmentLateIcon fontSize='large' color='inherit' style={{ opacity: '0.5' }} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Authenticated>
    );
}
