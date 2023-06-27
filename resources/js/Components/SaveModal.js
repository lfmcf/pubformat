
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SaveModal = ({ show, handleClose, handleSubmited, name }) => {
    return (
        <div>

            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {name == 'submit' ? 'Do you want to Submit your eForm?' : 'Do you want to Save your eForm?'}

                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button name={name} type={name} onClick={() => handleSubmited(name)}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SaveModal;