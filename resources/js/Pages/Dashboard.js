import React, { useEffect, useState, useRef } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Card, CardContent, Paper, Typography, TableCell, Table, TableHead, TableRow, TableBody, IconButton, Collapse, Box, Grid, InputLabel, CardHeader, TextField } from '@material-ui/core';
import { Calendar } from 'react-feather';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DownloadIcon from '@mui/icons-material/Download';
import NestedMenuItem from "material-ui-nested-menu-item";
import { Chart, Interval, LineAdvance, Tooltip, Axis, Coordinate, getTheme } from 'bizcharts';
import moment from 'moment';
// import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
import Select from '@material-ui/core/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ReactCountryFlag from "react-country-flag";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const groupBy = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);

function Row(props) {
    const { row } = props;
    const grow = groupBy(row, "country");

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };



    const openpop = Boolean(anchorEl);

    return (
        <React.Fragment>
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row[0].type}</TableCell>
                <TableCell>{row.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', color: "#6B6B6B" }}>Country</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: "#6B6B6B" }}>Nom dossier</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: "#6B6B6B" }}>Sequence</TableCell>
                                        <TableCell style={{ fontWeight: 'bold', color: "#6B6B6B" }}>Nombre</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(grow).map((key, index) => (
                                        <TableRow key={key}>
                                            <TableCell>{<ReactCountryFlag
                                                countryCode={grow[key][0].country}
                                                svg title={grow[key][0].country}
                                                style={{ width: '1.8em', height: '1.8em', }}
                                            />
                                            }
                                            </TableCell>
                                            <TableCell >
                                                <ul>
                                                    {grow[key].map(element => (
                                                        <li key={element.id}>{element.dossierName}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                            <TableCell >
                                                <ul>
                                                    {grow[key].map(element => (
                                                        <li key={element.id}>{element.sequence}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                            <TableCell>{grow[key].length}</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

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
        }
    }

}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = getTheme();
const colors = theme.colors10;

const yearoption = [
    '2019',
    '2020',
    '2021',
    '2022',
]
export default function Dashboard(props) {

    const data = props.allItems;

    const [anchor, setAnchor] = React.useState(null);
    const [menuPosition, setMenuPosition] = React.useState(false);
    const [selectedIndex1, setSelectedIndex1] = React.useState(0);
    const [chartIns, setChartIns] = React.useState(null);
    const [Finaldata, setFinaldata] = React.useState([]);
    const [year, setYear] = React.useState(2022);

    const [action, setAction] = React.useState("Publishing");
    const [tablevalues, setTableValues] = React.useState({});
    var x = new Date();
    const [du, setDu] = React.useState(x.setMonth(x.getMonth() - 1));
    const [au, setAu] = React.useState(new Date());
    var char = [[], [], [], [], [], [], [], [], [], [], [], []];
    const tblref = useRef(null)
    const [openAlert, setOpenAlert] = React.useState(false);

    const classes = useStyles();

    const handleMenuClick = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleItemClick = (event) => {
        setMenuPosition(!menuPosition);
    };

    const handleCloseMenu = () => {
        setAnchor(null)
    }

    const scale = {
        NumberDossier: { min: 0 }
    }

    function handleYearChange(event, index) {
        foldersByDate(event.target.value);
    }

    useEffect(() => {
        foldersByDate(year);
        tableau();
    }, [data]);

    function foldersByDate(year) {
        setFinaldata([])
        data.map((row) => {
            var month = moment(row.demandeDate).format('M');
            var annee = moment(row.demandeDate).format('Y');
            if (annee == year) {
                switch (month) {
                    case "1":
                        char[0].push({ "month": "jan", "type": row.type });
                        break;
                    case "2":
                        char[1].push({ "month": "Feb", "type": row.type });
                        break;
                    case "3":
                        char[2].push({ "month": "Mar", "type": row.type });
                        break;
                    case "4":
                        char[3].push({ "month": "Apr", "type": row.type });
                        break;
                    case "5":
                        char[4].push({ "month": "Mai", "type": row.type });
                        break;
                    case "6":
                        char[5].push({ "month": "Jun", "type": row.type });
                        break;
                    case "7":
                        char[6].push({ "month": "Jul", "type": row.type });
                        break;
                    case "8":
                        char[7].push({ "month": "aout", "type": row.type });
                        break;
                    case "9":
                        char[8].push({ "month": "Sep", "type": row.type });
                        break;
                    case "10":
                        char[9].push({ "month": "Oct", "type": row.type });
                        break;
                    case "11":
                        char[10].push({ "month": "Nov", "type": row.type });
                        break;
                    case "12":
                        char[11].push({ "month": "Dec", "type": row.type });
                        break;
                }
            }

        });
        char.forEach(element => {
            var values = element.reduce((typeSofar, { month, type }) => {
                if (!typeSofar[type]) typeSofar[type] = [];
                typeSofar[type].push(type);
                return typeSofar;
            }, {});

            for (const [key, value] of Object.entries(values)) {
                setFinaldata(Finaldata => [...Finaldata, { "month": element[0].month, "type": key, "NombreDossier": value.length }]);
            }
        });
    }

    function downLoadCsv() {

        var arr = new Array();
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");

        worksheet.columns = [
            { header: 'Type', key: 'type', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 32 },
        ];

        worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };

        Object.keys(tablevalues).map(function (key, index) {

            worksheet.addRow({ type: key, nombre: tablevalues[key].length });
            var rn = worksheet.lastRow.number;

            worksheet.getCell('A' + rn).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: 'FFFF0000' }
            }
            worksheet.getCell('B' + rn).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: 'FFFF0000' }
            }

            // worksheet.lastRow.outlineLevel = tablevalues[key].length;
            tablevalues[key].forEach(val => {
                worksheet.addRow();
                worksheet.lastRow.outlineLevel = tablevalues[key].length;
                var rowNumber = worksheet.lastRow.number;
                worksheet.getCell('A' + rowNumber).value = val.country;
                worksheet.getCell('B' + rowNumber).value = val.dossierName;
                worksheet.getCell('C' + rowNumber).value = val.sequence;

            });

        });

        workbook.xlsx.writeBuffer().then((buf) => {
            saveAs(new Blob([buf]), 'total_action.xlsx');
        });

    }

    const handleDuChange = date => {
        setDu(date)
    }

    function handleAuChange(date) {
        setAu(date)
    }

    function handleActionChange(e) {
        setAction(e.target.value)

    }

    useEffect(() => {
        tableau();
    }, [action, du, au]);

    function tableau() {
        var from = moment(du).toDate(), to = moment(au).toDate()
        if (action != "all") {
            var tempdata = data.filter(row => (
                moment(row.demandeDate).isBetween(from, to)
                && row.action == action
            ));
        } else {
            var tempdata = data.filter(row => (
                moment(row.demandeDate).isBetween(from, to)
            ));
        }

        var res = groupBy(tempdata, "type");

        setTableValues(res);

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    React.useEffect(() => {
        props.flash.message ? setOpenAlert(true) : setOpenAlert(false)
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header='Dashboard'
        >
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.flash.message}
                </Alert>
            </Snackbar>
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
                                                    {props.all}

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
                                                {props.livred}
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
                                                {props.ongoing}
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
                                                {props.waiting}
                                            </Typography>
                                            <Typography style={{ color: 'white', fontSize: '12px' }} variant="h6" component="p">
                                                Waiting
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

                    <Grid item md={12} xs={12} sm={12}>
                        <Card className={classes.cCard}>
                            <CardHeader action={
                                <IconButton onClick={handleMenuClick} aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>

                            } title="Total Dossiers per Type" className={classes.cHeader} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchor}
                                keepMounted
                                open={Boolean(anchor)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => saveImg(chartIns)}>
                                    <DownloadIcon />
                                    <Typography variant="inherit">Telecharger</Typography>
                                </MenuItem>

                                <NestedMenuItem label="Année" parentMenuOpen={menuPosition} onClick={handleItemClick}>
                                    {yearoption.map((option, index) => (
                                        <MenuItem value={option}
                                            key={option}
                                            selected={selectedIndex1 === index}
                                            onClick={(event) => handleYearChange(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </NestedMenuItem>
                            </Menu>
                            <CardContent>
                                <Chart height={300}
                                    padding={[30, 20, 60, 40]}
                                    scale={scale}
                                    data={Finaldata}
                                    autoFit
                                    onGetG2Instance={chartns => {
                                        setChartIns(chartns)
                                    }}
                                >
                                    <Tooltip shared />
                                    <Interval
                                        adjust={[
                                            {
                                                type: 'dodge',
                                                marginRatio: 0,
                                            },
                                        ]}
                                        color={["type", colors]}
                                        position="month*NombreDossier"
                                        size={15}
                                        label="NombreDossier"
                                    />
                                    <Axis name='NombreDossier' position='left' />
                                </Chart>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>

                        <Card className={classes.cCard}>
                            <CardHeader action={
                                <IconButton onClick={downLoadCsv} aria-label="settings">
                                    <DownloadIcon />
                                </IconButton>

                            } title="Total Dossiers per Action" className={classes.cHeader} />
                            <CardContent>
                                {/* <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="fr"> */}
                                <div className={classes.actions}>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Du"
                                                inputFormat="MM/dd/yyyy"
                                                value={du}
                                                onChange={handleDuChange}
                                                renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                label="Au"
                                                inputFormat="MM/dd/yyyy"
                                                value={au}
                                                onChange={handleAuChange}
                                                renderInput={(params) => <TextField name="deadline" fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    {/* <KeyboardDatePicker
                                        disableToolbar
                                        autoOk
                                        variant="inline"
                                        format="DD/MM/yy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Du"
                                        value={du}
                                        onChange={handleDuChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    /> */}
                                    {/* <KeyboardDatePicker
                                        disableToolbar
                                        autoOk
                                        variant="inline"
                                        format="DD/MM/yy"
                                        margin="normal"
                                        id="date-picker2-inline"
                                        label="Au"
                                        value={au}
                                        onChange={handleAuChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    /> */}
                                    <div>
                                        <InputLabel shrink>
                                            Action
                                        </InputLabel>
                                        <Select onChange={handleActionChange} value={action}>
                                            <MenuItem value="Formatting">Formatting</MenuItem>
                                            <MenuItem value="Publishing">Publishing</MenuItem>
                                            <MenuItem value="Submission">Submission</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                {/* </MuiPickersUtilsProvider> */}
                                <Table className="mt-2" ref={tblref}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell style={{ fontWeight: 600 }}>type</TableCell>
                                            <TableCell style={{ fontWeight: 600 }}>Nombres</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(tablevalues).map(function (key, index) {
                                            return (
                                                <Row key={index} row={tablevalues[key]} />
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </Authenticated>
    );
}
