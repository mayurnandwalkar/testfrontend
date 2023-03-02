import { styled } from "@mui/material/styles";
import {Button,Box} from "@mui/material"

export const ColorInput = styled(Button)(({ theme ,textcolor}) => ({
    color: textcolor,
    background:"white",
    height: "60px",
    width:"100%",
    border:'1px solid #D8DDE1',
    borderRadius:'10px',
    '&:hover': {
        background: '#fff',
        borderColor:textcolor,
    }
}));

export const ColorPickerWrapper = styled(Box)(({theme})=>({
    position:'relative'
}))

export const ColorWrapper = styled(Box)(({theme})=>({
    marginTop:".8rem",
    position:'absolute',
    zIndex:'1000'
}))


