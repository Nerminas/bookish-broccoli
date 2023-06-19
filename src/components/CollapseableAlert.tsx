import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {Fade} from '@mui/material';

export default function CollapseableAlert(props: CollapseableAlertProps) {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{position: 'absolute', width: '-webkit-fill-available'}}>
            <Fade in={open}>
                <Collapse in={open}>

                    <Alert
                        severity={props.severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                    props.onCancel();
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        {props.message}
                    </Alert>
                </Collapse>
            </Fade>
        </Box>
    );
}

interface CollapseableAlertProps {
    severity: "error" | "warning" | "info" | "success"
    message: string
    onCancel: () => void
}
