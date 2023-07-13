import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import React, { useState, useEffect } from 'react';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Paper, Typography, Breadcrumbs, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home, Server, PieChart, TrendingUp, BarChart2, Settings, LogOut, User, ChevronDown, Activity } from 'react-feather';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupsIcon from '@mui/icons-material/Groups';
import Echo from 'laravel-echo';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import moment from 'moment';
import Divider from '@mui/material/Divider';
// import { router } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        margin: '0 auto',
        display: 'block',
        clear: 'both',
        float: 'unset',
        right: '0',
        marginLeft: '0',
        minHeight: '100vh',
        backgroundColor: '#e9edf2'
    },
    themeWrapper: {
        flexGrow: 1,
        height: 'inherit',
        padding: '25px 20px 0',
        marginLeft: '244px',
        // height: '100vh',
        backgroundColor: 'rgb(233, 237, 242)'
    },
    pcodedNavbar: {
        position: 'fixed',
        display: 'block',
        boxShadow: '1px 0 20px 0 #3f4d67',
        width: '244px',
        height: '100vh',
        top: '0',
        background: '#3f4d67',
        color: '#a9b7d0',
        zIndex: '1064',
    },
    navbarWrapper: {
        width: '100%',
        height: '100%'
    },
    headerLogo: {
        position: 'relative',
        alignItems: 'center',
        display: 'inline-flex',
        float: 'left',
        height: '70px',
        textAlign: 'center',
        marginRight: '0',
        padding: '10px 20px',
        width: '254px',
        boxSizing: 'border-box'
    },
    bBrand: {
        color: '#a9b7d0',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none'
    },
    mobileMenu: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '37px',
        height: '70px',
        position: 'absolute',
        right: '10px',
        top: '0',
        padding: '0 10px',
    },
    bTitle: {
        fontWeight: '100',
        color: '#fff',
        fontSize: '18px',
        marginLeft: '10px'
    },
    navbarContent: {
        height: 'calc(100vh - 70px)',
        display: 'inline-block',
        float: 'left',
        width: '100%'
    },
    pcodedInnerNavbar: {
        paddingLeft: '0',
        listStyle: 'none',
        marginBottom: '0',
        marginTop: '0',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        '& a': {
            textAlign: 'left',
            padding: '7px 15px',
            margin: '5px 0 0',
            display: 'block',
            borderRadius: '0',
            position: 'relative',
            textDecoration: 'none',
            //color: '#1dc4e9'
            color: "#a9b7d0"
        },
        '& a:hover': {
            color: '#1dc4e9'
        },
        '& a.active': {
            color: '#1dc4e9'
        },
    },

    pcodedMenuCaption: {
        fontSize: '10px',
        fontWeight: '600',
        padding: '25px 20px 5px',
        textTransform: 'uppercase',
        position: 'relative',
        color: '#e8edf7',
        boxSizing: 'border-box'
    },
    pcodedMicon: {
        fontSize: '1rem',
        padding: '4px 2px 4px 7px',
        marginRight: '7px',
        borderRadius: '4px',
        width: '30px',
        display: 'inline-flex',
        alignItems: 'center',
        height: '30px',
        textAlign: 'center'
    },
    pcodedMtext: {
        fontSize: '14px',
        position: 'absolute',
        top: '15px'
    },
    header: {
        minHeight: "70px",
        zIndex: '1028',
        display: 'flex',
        padding: '0',
        position: 'sticky',
        top: '0',
        background: 'white',
        color: '#3f4d67',
        width: 'calc(100% - 244px)',
        marginLeft: '244px',
    },
    navbarNav: {
        paddingLeft: '0',
        listStyle: 'none',
        marginBottom: '0',
        marginTop: '0',
        display: 'inline-block',
        flexDirection: 'row',
        display: 'flex',
        '& li': {
            lineHeight: '70px',
            display: 'inline-block',
            padding: '0 6px'
        },
        '& li:first-child': {
            paddingLeft: '25px'
        },
        '& li:last-child': {
            paddingRight: '28px'
        }
    },
    mrRight: {
        marginRight: 'auto'
    },
    mrLeftt: {
        marginLeft: 'auto'
    },
    icon: {

    },
    iconSettings: {
        "&:hover, &.Mui-focusVisible": {
            backgroundColor: "unset",
            color: '#04a9f5'
        },
        padding: '0',
    },
    menu: {
        display: openMenu => openMenu ? 'block' : 'none',
        minWidth: '290px',
        position: 'absolute',
        left: '-250px',
        top: '50px',
        backgroundColor: 'white',
        borderRadius: '0.25rem'
    },
    proHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#3f4d67',
        padding: '0 10px',
        borderRadius: '0.25rem 0.25rem 0 0'
    },
    proBody: {
        '& ul li': {
            display: 'list-item',
            lineHeight: '1.2',
            listStyle: 'none',
            padding: '0 !important',
        }
    },
    proBodyMenu: {
        padding: '20px 0',
        '& a': {
            textDecoration: 'none',
            color: '#888',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px'
        },
        '& a:hover': {
            background: 'rgba(4, 169, 245, 0.1)'
        }
    },
    footer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        padding: '20px 0',
        [theme.breakpoints.down("md")]: {
            marginLeft: "0 !important"
        }
    },
}));

export default function Authenticated({ auth, header, children }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [openMenu, setOpenMenu] = useState(false);
    const [notCount, setNotCount] = useState(auth.notCount)
    const [notification, setNotification] = useState(auth.notifications)
    const classes = useStyles(openMenu);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClickp = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = () => {
        setOpenMenu(!openMenu)
    };

    const userId = auth.user.id;

    useEffect(() => {
        window.Echo.private('App.Models.User.' + userId).notification((notification) => {
            setNotCount(
                [...notCount, { ...notification }]
            );
        });
    }, []);

    const readNotification = (id) => {
        Inertia.post('shownotification', { 'id': id })
    }


    // window.Echo.private('App.Models.User.' + auth.user.id).listen('notification', (notification) => {
    //     console.log("notification")
    // });

    return (
        <div className={classes.paper}>
            <nav className={classes.pcodedNavbar}>
                <div className={classes.navbarWrapper}>
                    <div className={classes.headerLogo}>
                        <a href='/' className={classes.bBrand}>
                            <div style={{ background: 'linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%)', width: '35px', height: '35px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TrendingUp />
                            </div>
                            <span className={classes.bTitle}>ATLAS</span>
                        </a>
                        <a href='#!' className={classes.mobileMenu}>
                            <BarChart2 color="#a9b7d0" size={30} style={{ transform: 'rotate(90deg)' }} />
                        </a>
                    </div>
                    <div className={classes.navbarContent}>
                        <div>
                            <ul className={classes.pcodedInnerNavbar}>
                                <li className={classes.pcodedMenuCaption}>
                                    <label>Navigation</label>
                                </li>
                                <li>
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        <span className={classes.pcodedMicon}>
                                            <Home size={15} />
                                        </span>
                                        <span className={classes.pcodedMtext}>Dashboard</span>
                                    </NavLink>
                                </li>
                                <li className={classes.pcodedMenuCaption}>
                                    <label>Requests List</label>
                                </li>
                                <li>
                                    <NavLink href={route('list')} active={route().current('list')}>
                                        <span className={classes.pcodedMicon}>
                                            <Server size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}> List</span>
                                    </NavLink>
                                    <NavLink href={route('tasks')} active={route().current('tasks')}>
                                        <span className={classes.pcodedMicon}>
                                            <PlaylistAddCheckIcon size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}> My tasks</span>
                                    </NavLink>
                                    <NavLink href={route('teams.index')} active={route().current('teams.index')}>
                                        <span className={classes.pcodedMicon}>
                                            <GroupsIcon size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}> Teams</span>
                                    </NavLink>
                                    {/*<NavLink href={route('eu-index')} active={route().current('eu-index')}>
                                         <span className={classes.pcodedMicon}>
                                            <Server size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}>Eu List</span>
                                    </NavLink>
                                    <NavLink href={route('gcc-index')} active={route().current('gcc-index')}>
                                        <span className={classes.pcodedMicon}>
                                            <Server size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}>Gcc List</span>
                                    </NavLink> */}
                                </li>
                                {/*{auth ?
                                    <>
                                        <li className={classes.pcodedMenuCaption}>
                                            <label>Invoice</label>
                                        </li>
                                        <li>
                                            <NavLink href={route('dossierinvoice')} active={route().current('dossierinvoice')} >
                                                <span className={classes.pcodedMicon}>
                                                    <PieChart size="15" />
                                                </span>
                                                <span className={classes.pcodedMtext}>Invoice Status</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink href={route('invoices')} active={route().current('invoices')} >
                                                <span className={classes.pcodedMicon}>
                                                    <Server size="15" />
                                                </span>
                                                <span className={classes.pcodedMtext}>Invoice List</span>
                                            </NavLink>
                                        </li>
                                        <li className={classes.pcodedMenuCaption}>
                                            <label>Users</label>
                                        </li>
                                        <li>
                                            <NavLink href="#" >
                                                <span className={classes.pcodedMicon}>
                                                    <Server size="15" />
                                                </span>
                                                <span className={classes.pcodedMtext}>Users List</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink href="#" >
                                                <span className={classes.pcodedMicon}>
                                                    <Activity size="15" />
                                                </span>
                                                <span className={classes.pcodedMtext}>Users Actions</span>
                                            </NavLink>
                                        </li>
                                    </> : ''} */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <header className={classes.header}>
                <div style={{ display: 'flex', flexGrow: '1', flexBasis: 'auto', alignItems: 'center' }}>
                    <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: '20px' }}>
                        <InertiaLink style={{ textDecoration: "none", color: '#3f4d67' }} href="/">
                            <Home size={14} />
                        </InertiaLink>
                        <Typography style={{ color: '#3f4d67', fontWeight: '500', fontSize: '0.9rem' }}>{header}</Typography>
                    </Breadcrumbs>
                    {/* <ul className={classes.navbarNav + ' ' + classes.mrRight}>
                        <li></li>
                    </ul> */}
                    <ul className={classes.navbarNav + ' ' + classes.mrLeftt}>
                        <li className="navbarlink">
                            <div style={{ position: 'relative' }} >
                                <IconButton className={classes.iconSettings} onClick={handleClickp} >
                                    <Badge badgeContent={notCount.length} color="primary">
                                        <NotificationsIcon style={{ fontSize: '1.2rem' }} />
                                    </Badge>
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    PaperProps={{
                                        style: { width: '25%' },
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>

                                        <List sx={{ bgcolor: 'background.paper' }} disablePadding subheader={
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Notifications
                                            </ListSubheader>
                                        }>
                                            {notification.map((not) => {
                                                if (not && !not.read_at) {
                                                    return (
                                                        <ListItem key={not.id} alignItems="flex-start" disableGutters={true} style={{ padding: '0' }} onClick={() => readNotification(not.id)}>
                                                            <ListItemButton style={{ backgroundColor: '#d3d3d3' }}>
                                                                <ListItemText
                                                                    primary="Formatting form"
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                            >
                                                                                Ali Connors
                                                                            </Typography>
                                                                            {"some message here ..."}
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                                <div style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#04a9f5' }}></div>
                                                            </ListItemButton>

                                                        </ListItem>)
                                                } else {
                                                    return (
                                                        <ListItem key={not.id} alignItems="flex-start" disableGutters={true} style={{ padding: '0' }}>
                                                            <ListItemButton >
                                                                <ListItemText
                                                                    primary="Formatting form"
                                                                    secondary={
                                                                        <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                            >
                                                                                Ali Connors
                                                                            </Typography>
                                                                            {"some message here ..."}
                                                                        </React.Fragment>
                                                                    }
                                                                />
                                                                {/* <div style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: '#04a9f5' }}></div> */}
                                                            </ListItemButton>

                                                        </ListItem>)
                                                }

                                            })}
                                        </List>
                                        <Box sx={{
                                            background: "white",
                                            padding: "8px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            position: 'sticky',
                                            bottom: '0'
                                        }}>
                                            <Typography variant="h6" color="#fff">
                                                Read all
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* <Box sx={{
                                        background: "#666",
                                        padding: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <Typography variant="h6" color="#fff">
                                            Notification
                                        </Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: 'background.paper' }}>
                                        <List sx={{ bgcolor: 'background.paper' }}>
                                            {notCount.map((not) => {
                                                return (
                                                    <ListItem key={not.id} alignItems="flex-start" disableGutters={true} disablePadding>
                                                        <ListItemButton dense>
                                                            <ListItemText
                                                                primary="Formatting form"
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            sx={{ display: 'inline' }}
                                                                            component="span"
                                                                            variant="body2"
                                                                        >
                                                                            Ali Connors
                                                                        </Typography>
                                                                        {"some message here ..."}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>)

                                            })}

                                        </List>
                                    </Box> */}

                                </Popover>
                            </div>
                        </li>

                        <li className="navbarlink">
                            <div style={{ position: 'relative' }}>
                                <IconButton className={classes.iconSettings} onClick={handleClick}>
                                    <Settings size={15} />
                                    <ChevronDown size={16} />
                                </IconButton>

                                <div className={classes.menu}>
                                    <div className={classes.proHead}>
                                        <span style={{ color: 'white', fontSize: '14px' }}>{auth.user ? auth.user.name : ''}</span>
                                    </div>
                                    <div className={classes.proBody}>
                                        <ul className={classes.proBodyMenu}>
                                            <li>
                                                <InertiaLink href="/profil">
                                                    <User size={14} style={{ marginRight: '10px' }} />
                                                    Profile
                                                </InertiaLink>
                                            </li>
                                            <li >
                                                <InertiaLink href={route('logout')} method="post" as="button">
                                                    <LogOut size={14} style={{ marginRight: '10px' }} />
                                                    Sign Out
                                                </InertiaLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </header >
            <div className={classes.themeWrapper}>

                {children}


            </div>
            {/* <div className={classes.footer}>
                <Typography style={{ color: 'grey', fontSize: '12px' }}> © GROUPEKEMIA 2022</Typography>
            </div> */}
        </div >
    );
}
