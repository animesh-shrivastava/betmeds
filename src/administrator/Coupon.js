import { React, useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { postDataImage, postData, getData, ServerURL } from "../fetchnodeservices";
import Swal from 'sweetalert2';
import { DropzoneArea } from 'material-ui-dropzone'
import DisplayProductImages from './DisplayProductImages';
import DisplayAllCoupon from "./DisplayAllCoupon";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30

    },
    subdiv: {
        background: '#00cec9',
        padding: 10,
        borderRight: "5px",
        width: "500px",
        borderRadius: "10px"
    },


});

const CssTextField = styled(TextField)({

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: "2px solid white"
        },
        '&:hover fieldset': {
            borderColor: 'lightgrey',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },


    },
});


const Input = styled('input')({
    display: "none"
});


function CouponImages(props) {
    const classes = useStyles();
    
    
    const [couponName, setcouponName] = useState('')

    const [uploadFiles, setFiles] = useState([])



    const handleSubmit = async () => {
        var formData = new FormData();
      
        formData.append('couponname', couponName)

        uploadFiles.map((file, index) => {

            formData.append("couponimage" + index, file)
        })

        var result = await postDataImage('couponimages/savecouponimages', formData)
        if (result.result) {
            Swal.fire({

                position: 'top-middle',
                icon: 'success',
                title: 'Your Coupon Images is Successfully Inserted',
                showConfirmButton: true,
                timer: 5000

            })
        }
        
    }


    // useEffect(() => {
        


    // }, [])




    const handleImage = (files) => {

        setFiles(files);
        // alert(JSON.stringify(files))
    }

const handleDisplayCouponImages=()=>{
        props.setViewContainer(<DisplayAllCoupon/>)
        

}



    return (
        <div className={classes.root} >
            <style jsx>
                {`fieldset.MuiOutlinedInput-notchedOutline{
         border-color:white !important;
     }
     div.MuiOutlinedInput-input.MuiSelect-select{
         color:#FFF !important;
     }
     svg.MuiSvgIcon-root{
         color:white !important;
     }
     `
                }</style>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        Coupon Images
                    </Grid>
                    <Grid item xs={5}>

                        <Button onClick={()=>handleDisplayCouponImages()} style={{ fontSize: "1", fontWeight: "bold", color: "#00cec9", background: "#FFF", width: "220px" }} variant="contained" component="span" fullWidth>
                            List of Coupon Images
                        </Button>
                    </Grid>


                    <Grid item xs={12}>

                        <TextField
                            InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{ style: { color: "white" } }}
                            label="Coupon Name" 
                            onChange={(event) => setcouponName(event.target.value)}
                            fullWidth />

                    </Grid>

                    <Grid item xs={12}>


                        <DropzoneArea

                            onChange={handleImage}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            // showPreviews={true}
                            maxFileSize={9000000}
                            filesLimit={5}

                        />

                    </Grid>

                    <Grid item xs={6}>
                        <label>

                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                variant="contained"
                                onClick={() => handleSubmit()}
                                component="span" fullWidth>
                                Submit Data
                            </Button>
                        </label>

                    </Grid>
                    <Grid item xs={6}>
                        <label>

                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                variant="contained"

                                component="span" fullWidth>
                                Reset
                            </Button>
                        </label>

                    </Grid>

                </Grid>

            </div>
        </div>

    );

}


export default CouponImages