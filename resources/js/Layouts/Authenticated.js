import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import React, { useState } from 'react';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Paper, Typography, Breadcrumbs, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Home, Server, PieChart, TrendingUp, BarChart2, Settings, LogOut, User, ChevronDown, Activity } from 'react-feather';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        margin: '0 auto',
        display: 'block',
        clear: 'both',
        float: 'unset',
        right: '0',
        marginLeft: '0',
        minHeight:'100vh',
        backgroundColor: '#e9edf2'
    },
    themeWrapper: {
        flexGrow: 1,
        height: 'inherit',
        padding: '30px',
        marginLeft: '264px',
        // height: '100vh',
        backgroundColor : 'rgb(233, 237, 242)'
    },
    pcodedNavbar: {
        position: 'fixed',
        display: 'block',
        boxShadow: '1px 0 20px 0 #3f4d67',
        width: '264px',
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
        width: '264px',
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
        position: 'relative',
        top: '0',
        background: 'rgb(233, 237, 242)',
        color: '#3f4d67',
        width: 'calc(100% - 264px)',
        marginLeft: '264px',
    },
    navbarNav: {
        paddingLeft: '0',
        listStyle: 'none',
        marginBottom: '0',
        marginTop: '0',
        display: 'inline-block',
        flexDirection : 'row',
        display: 'flex',
        '& li': {
            lineHeight: '70px',
            display: 'inline-block',
            padding: '0 12px'
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
        }
    },
    menu: {
        display: openMenu => openMenu ? 'block': 'none',
        minWidth: '290px',
        position:'absolute',
        left:'-250px',
        top:'50px',
        backgroundColor:'white',
        borderRadius:'0.25rem'
    },
    proHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#3f4d67',
        padding:'0 10px',
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
        display:'flex',
        alignItems:"center",
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
    const classes = useStyles(openMenu);

    const handleClick = () => {
        setOpenMenu(!openMenu)
    };

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
                                    <NavLink href={route('dossiers')} active={route().current('dossiers')}>
                                        <span className={classes.pcodedMicon}>
                                            <Server size="15" />
                                        </span>
                                        <span className={classes.pcodedMtext}> List</span>
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
                    <ul className={classes.navbarNav + ' ' + classes.mrRight}>
                        <li></li>
                    </ul>
                    <ul className={classes.navbarNav + ' ' + classes.mrLeftt}>
                        <li className="navbarlink">
                            <div style={{ position: 'relative' }}>
                                <IconButton className={classes.iconSettings} onClick={handleClick}>
                                    <Settings size="15" />
                                    <ChevronDown size="15" />
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
            </header>
            <div className={classes.themeWrapper}>
                <Breadcrumbs aria-label="breadcrumb">
                    <InertiaLink style={{ textDecoration: "none", color: '#888' }} href="/">
                        <Home size={14} />
                    </InertiaLink>
                    <Typography style={{ color: '#111', fontWeight: '600' }}>{header}</Typography>
                </Breadcrumbs>
                {children}

                <div className={classes.footer}>
                    <Typography style={{ color: 'grey', fontSize: '12px' }}> © GROUPEKEMIA 2022</Typography>
                </div>
            </div>
        </div>
    );
}
