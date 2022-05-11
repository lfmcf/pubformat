import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@mui/icons-material/Add';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Inertia } from '@inertiajs/inertia';

const defaultToolbarStyles = {
    iconButton: {
    },
};

function CustomToolbar(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (rt) => {
        if(rt == 'ch') {
            Inertia.get('/ch')
        }else if(rt == 'eu') {
            Inertia.get('/eu')
        }else if(rt == 'gcc') {
            Inertia.get('/gcc')
        }
        setAnchorEl(null);
    };

    const { classes } = props;

    return(
        <>
            <Tooltip title={"Add New Record"}>
                <>
                <IconButton id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <AddIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClose('ch')}>CH</MenuItem>
                    <MenuItem onClick={() =>handleClose('eu')}>EUROPE</MenuItem>
                    <MenuItem onClick={() => handleClose('gcc')}>GCC</MenuItem>
                </Menu>
                </>
            </Tooltip>
        </>
    )
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);