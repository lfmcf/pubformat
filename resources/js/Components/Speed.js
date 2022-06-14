import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PublishIcon from '@mui/icons-material/Publish';

const actions = [
    { icon: <ArrowBackIcon />, name: 'Back' },
    { icon: <SettingsBackupRestoreIcon />, name: 'Reset' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PublishIcon />, name: 'Submit' },
];

export default function Speed(props) {
    return (
        <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {/* {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))} */}
                <SpeedDialAction
                    key="Back"
                    icon={<ArrowBackIcon onClick={() => window.history.back()} />}
                    tooltipTitle="Back"
                />
                <SpeedDialAction
                    key="Reset"
                    icon={<SettingsBackupRestoreIcon onClick={() => props.reset()} />}
                    tooltipTitle="Reset"
                />
                <SpeedDialAction
                    key="Save"
                    icon={<SaveIcon onClick={(e) => props.handleSubmit(e, "save")} />}
                    tooltipTitle="Save"
                />
                <SpeedDialAction
                    key="Submit"
                    icon={<PublishIcon onClick={(e) => props.handleSubmit(e, "add")} />}
                    tooltipTitle="Submit"
                />
            </SpeedDial>
        </Box>
    );
}