import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KandImg from '../assets/Images/pexels-tirachard-kumtanom-1001850.jpg'
import KandImg2 from '../assets/Images/pexels-annam-w-1047442.jpg'
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}



const SelectLoginModel = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {/* Open dialog */}
                Login
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Login Yourself Here!!
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs="auto">
                            <Item>
                                <img src={KandImg} style={{ "maxWidth": "150px" }} />
                            </Item>
                        </Grid>
                        <Grid item xs="auto">
                            <Item>
                                <Button variant="outlined" onClick={() => { navigate("/fan-login"); }}>Login For Fan</Button>
                                {/* <p>Follow your favorite artists, keep a wishlist, <br />
                                    get instant streaming of your purchases</p> */}
                            </Item>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={3}>
                        <Grid item xs="auto">
                            <Item>
                                <img src={KandImg2} style={{ "maxWidth": "150px" }} />
                            </Item>
                        </Grid>
                        <Grid item xs="auto">
                            <Item>
                                <Button variant="outlined" onClick={() => { navigate("/artist-login") }}>Login For Artist</Button>
                                {/* <p>Sell directly to your fans with tota control overl<br />  your music and pricing.</p> */}
                            </Item>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        close
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    )
}

export default SelectLoginModel