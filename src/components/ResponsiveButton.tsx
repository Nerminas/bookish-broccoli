import React from 'react';
import {useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";


const StyledButton = styled(Button)(({ theme }) => ({
}));

export default function ResponsiveButton(props: ResponsiveButtonProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    function handleOnClick() {
        props.onClick();
    }

    return (
        <Button
            variant={"text"}
            color="inherit"
            endIcon={isSmallScreen ? props.icon : null}
            onClick={handleOnClick}
        >
            {isSmallScreen ? null : props.text}
        </Button>
    );
}

interface ResponsiveButtonProps {
    text: string
    icon: JSX.Element
    onClick: () => void
}

