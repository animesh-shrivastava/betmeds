import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-number-input/style.css'
import { getData, postDataImage, postData } from '../fetchnodeservices';
import Link from '@mui/material/Link';
import PhoneInput from 'react-phone-number-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';


const theme = createTheme();
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ecf0f1',
    height: "100%"

  },
  subdiv: {
    background: 'white',
    padding: 20,
    width: "60%",
    margin: 50,
    boxShadow: "5px 5px 15px 15px grey",
    borderRadius: "15px"



  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #000',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#000',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',

    },

  },
});
const Input = styled('input')({
  display: 'none',
});
export default function CustomerSignin() {
  var navigate = useNavigate()
  var dispatch=useDispatch();
  var classes = useStyles()
  const [phone, setPhone] = useState(' ')
  const [OTP, setOTP] = useState(' ');
  const [btn, setBtn] = useState(true)
  const [gotp, setGOtp] = useState('')

  
  var theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));// media query for responsiveness




////////////////////////////////////////////// GENERATE OTP FUNCTION /////////////////////////////////////////////////////////////
const generateOtp=()=>{
  var otp=parseInt(Math.random()*8999)+1000;
  return(otp)
}



////////////////////////////////////Check User In DataBase Function///////////////////////////////////////////////////////////////
  const checkuser = async () => {
    
    if (phone === " ") {
      Swal.fire({
        position: 'top-middle',
        icon: 'error',
        title: 'Please Enter A Phone Number ',
        showConfirmButton: true,
        timer: 5000
      })
    } else {
      var result = await postData("users/checkuser", { mobileno: phone })
   alert(JSON.stringify(result.data[0]))
     

      if (result.data) {
        setBtn(false)
        var t= generateOtp();//generate otp function call
        alert(t)
        setGOtp(t)
        
    dispatch({type:"ADD_USER",payload:[result.data[0].mobileno,result.data[0]]})
      navigate('/clogin',{state: { mobileno: phone,gopt:gotp }})

        Swal.fire({
          position: 'top-middle',
          icon: 'success',
          title: 'OTP Successfully Sent on +91' + phone,
          showConfirmButton: false,
          timer: 2000
        })
        
        

      } else {

        navigate("/csignup", { state: { mobileno: phone,gopt:gotp } })
        Swal.fire({
          position: 'top-middle',
          icon: 'error',
          title: 'You Are not Register Please Register First',
          showConfirmButton: true,
          timer: 5000
        })

      }
    }
  }
///////////////////////////////////////////Check User In Data Base function Ends/////////////////////////////////////////////







////////////////////////check OTP FUnction///////////////////////////////////
  const checkOtp = async () => {
    if(OTP===" "){

       Swal.fire({
        position: 'top-middle',
        icon: 'error',
        title: 'Please Enter OTP ',
        showConfirmButton: true,
        timer: 5000
      })
    
    }
    else{
      if(OTP==gotp){


     Swal.fire({
      position: 'top-middle',
      icon: 'success',
      title: 'OTP is Verified Successfully',
      showConfirmButton: true,
      timer: 5000
    })
    navigate('/showcartreview')
  }
  else{
    Swal.fire({
      position: 'top-middle',
      icon: 'error',
      title: 'Invalid OTP ',
      showConfirmButton: true,
      timer: 5000
    })
  }
  }

  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






  return ([
    <div style={{ width: "100%" }}> <Header /></div>,
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {matches ? <Grid item xs={12} >
              <img src='/signinimage.png' width="100%" />
            </Grid> : <></>}

            <Grid item xs={6} md={10} lg={12}>
              <Grid style={{ fontFamily: 'Poppins', textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20 }}>
                Sign In/Sign Up
              </Grid>
              <Grid style={{ fontFamily: 'Poppins', fontWeight: "300", fontSize: 20, paddingTop: 10 }}>
                Sign up or Sign in to access your orders,special offers,health tips or more!!
              </Grid>


              <Grid style={{ paddingTop: 10, margin: 10 }}>
                <CssTextField variant="standard" type="number" label="Phone No." onChange={(event) => setPhone(event.target.value)} fullWidth />

              </Grid>
              <Grid style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, paddingTop: 5 }}>
                {btn ?
                  <Button fullWidth variant="contained" style={{ borderRadius: 5, color: '#fff', background: '#000' }} onClick={() => checkuser()}>Verify Number</Button>
                  :
                  <><OTPInput value={OTP} onChange={setOTP}  OTPLength={4} otpType="number" disabled={false} secure />
                    <ResendOTP 
                      onResendClick={() => Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: 'OTP Resend Successfully Sent on +91' + phone,
                        showConfirmButton: false,
                        timer: 3000
                      })} />
                    <Button fullWidth variant="contained" style={{ borderRadius: 5, color: '#fff', background: '#000', marginTop: 20 }} onClick={() => checkOtp()}>Verify OTP</Button>
                  </>}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>,
    <Footer />


  ])
}