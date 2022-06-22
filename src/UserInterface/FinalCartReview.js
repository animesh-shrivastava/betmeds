import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Divider, MenuItem, InputLabel, Select, Box, } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate,useLocation } from "react-router-dom";
import AddToCart from "./AddToCart";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { postData, getData, ServerURL, postDataImage } from "../fetchnodeservices";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";


const theme = createTheme();
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subdiv: {
    padding: 20,
    width: 1200,
    marginTop: 50,
  },
  one: {
    padding: 20,
    width: "95%",
    marginTop: 10,
    background: "#fff",
    borderRadius: "8px",
    fontFamily: "Poppins",
  },
  two: {
    padding: 20,
    width: "100%",
    background: "#fff",
    height: 100,
    borderRadius: "20px",
    fontFamily: "Poppins",
    marginLeft: 20,
    marginTop: "50px",
  },
  three: {
    borderRadius: "20px",
    padding: 20,
    marginTop: 20,
    width: "95%",
    background: "#fff",
    paddingLeft: 50,
    // height:200,
    fontFamily: "Poppins",
    fontSize: "20px",
    marginLeft: 20,
  },
  four: {
    textAlign: "left",
    paddingLeft: 20,
    fontFamily: "Poppins",
    marginLeft: 20,
  },
  homediv: {
    background: "#ecf0f1",
    height: "220vh",
  },
});

var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #000",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});
const Input = styled("input")({
  display: "none",
});







export default function FinalCartReview(props) {
  var products = useSelector((state) => state.product);
  var keys = Object.keys(products).length;
  var listproducts = Object.values(products);// gives values of all product that will added in cart
  var u = useSelector(state => state.user)
  var user=Object.values(u)
  // alert(user)


  var month = [
    "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var date = new Date();
  var newdate = new Date();
  newdate.setDate(date.getDate() + 3);

  var navigate = useNavigate();
  var location=useLocation();
  var classes = useStyles();
  var dispatch = useDispatch();
  const [age, setAge] = React.useState("");
  const [banner, setBanner] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const [state, setState] = React.useState({ top: false, left: false, bottom: false, right: false });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandMark] = useState("");
  const [deliveryMobile, setDeliveryMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [AddressState, setAddressState] = useState("");
  const [usersaddress, setusersAddress] = useState([]);

  


  var totalamount = listproducts.reduce(calculatetotal, 0);

  var offeramount = listproducts.reduce(calculateoffer, 0);

  function calculatetotal(p, n) {
    return p + n.price * n.qty;
  }

  function calculateoffer(p, n) {
    return p + n.offerprice * n.qty;
  }


  

  const fetchbannerimages = async () => {
    var result = await getData("bannerimages/displaybanners");
    setBanner(result.result);
  };


  const fetchAllAddress=async()=>{
    var result=await postData("usersaddress/getaddress",{mobileno:8602116552})
    setusersAddress(result.result)
  
    setPincode(result.result[0].pincode)
    setCity(result.result[0].city)
    setAddressState(result.result[0].state)
    setCity(result.result[0].city)
    setAddress(result.result[0].address)
    setLandMark(result.result[0].landmark)
    setFirstName(result.result[0].firstname)
    setLastName(result.result[0].lastname)
    setEmailId(result.result[0].emailid)
    setMobile(result.result[0].mobileno)
    setDeliveryMobile(result.result[0].dmobileno)
    
    // alert(JSON.stringify(result.result))
    
  }


  ////////////////////////////////////////////////////////////////////////// UseEffect //////////////////////////////////////////////////////////////////////////


  useEffect(function () {
    
    fetchAllAddress();
    fetchbannerimages();
    

  },[]);

  ////////////////////////////////////////////////////////////////////////// UseEffect Ends//////////////////////////////////////////////////////////////////////////



  const userDetails=()=>{
    return usersaddress.map((item)=>{
      return(
        <div>
          <span style={{marginRight:5}}>{item.address},</span>
          <span style={{marginRight:5}}>({item.state}),</span>
          <span style={{marginRight:8,fontWeight:"bold"}}>{item.pincode}</span>
          
        </div>
      )
    })
  }


 

  /////////////////////////////////// Save Delivery Address ////////////////////////////////////////////////

  const handleSubmitAddress = async(firstName, lastName, emailId, mobile, city, AddressState, landmark, address, pincode, deliveryMobile) => {
    var result=await postData("usersaddress/saveaddress",{firstname:firstName,lastname: lastName,emailid: emailId,mobileno: mobile,city: city,state: AddressState,landmark: landmark,address: address,pincode: pincode,dmobileno: deliveryMobile})

if(result.result==true){
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'Address Successfully Saved',
    showConfirmButton: false,
    timer: 2000
  })
}else
{
  Swal.fire({
    position: 'top-middle',
    icon: 'error',
    title: 'Address is Not Saved Error',
    showConfirmButton: false,
    timer: 2000
  })

}


  }

  /////////////////////////////////// Save Delivery Address Ends ////////////////////////////////////////////////





  /////////////////////////////////// Address Change Side Toggle Drawer////////////////////////////////////////////////
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ padding: "20px" }}>
        <h2>Add Address</h2>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="Pincode"
          value={pincode}
          onChange={(event) =>setPincode(event.target.value)}  fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}>

        </TextField>

        <TextField
          style={{ margin: "20px 0px 0px 20px" }}
          variant="standard"
          label="State"
          value={AddressState}
          onChange={(event) => setAddressState(event.target.value)}>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="Email Id"
          value={emailId}
          InputProps={{
            readOnly: true,
          }}
          onChange={(event) => setEmailId(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard" label="landmark"
          value={landmark}
          onChange={(event) => setLandMark(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard" label="Phone Number"
          value={mobile}
          type="number"
          InputProps={{
            readOnly: true,
          }}
          onChange={(event) => setMobile(event.target.value)} fullWidth>

        </TextField>
        <TextField
          style={{ marginTop: 20 }}
          variant="standard"
          label="Delivery Phone Number"
          value={deliveryMobile}
          onChange={(event) => setDeliveryMobile(event.target.value)} fullWidth>

        </TextField>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <Button
            style={{ color: "white", background: "black", }}
            onClick={(event) => handleSubmitAddress(firstName, lastName, emailId, mobile, city, AddressState, landmark, address, pincode, deliveryMobile)}> Save Address </Button>
        </div>
      </div>
    </Box>
  );
  /////////////////////////////////// Address Change Side Toggle Drawer Ends////////////////////////////////////////////////




///////////////////////////////////////////////////////// showMainBanner function////////////////////////////////////////////////////////////////////////////
  const showMainBanner = () => {
    return banner.map((item) => {
      return (
        <div>
          <img
            src={`${ServerURL}/images/${item.bannerimage}`}
            style={{
              width: "100%",
              height: "60%",
              marginTop: "20px",
              borderRadius: "20px",
            }}
          />
        </div>
      );
    });
  };
///////////////////////////////////////////////////////// showMainBanner////////////////////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////// Show Cart items Function //////////////////////////////////////////////////////////////////


  const showCartItems = () => {
    return listproducts.map((item, index) => {
      return (
        <div>
          <div style={{ display: "flex", justifyContent: "left", padding: 20 }}>
            <img
              src={`${ServerURL}/images/${item.icon}`}
              style={{ width: 100, height: 100 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "right",
                fontFamily: "Poppins",
                fontSize: "20px",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <div>{item.productname}</div>
              <div style={{ fontSize: 15, fontWeight: 100 }}>
                <i>Only {item.stock} left in stock</i>
              </div>
              <div style={{ fontSize: 20, fontWeight: 100 }}>
                Mfr:{item.brandname}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "#ef4281",
              fontWeight: "bold",
              fontFamily: "Crimson Pro",
              marginTop: 20,
              fontSize: 20,
              marginLeft: 50,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 14, color: "#000" }}>
                &#8377;{" "}
                {item.offerprice > 0
                  ? (item.price - item.offerprice).toFixed(2)
                  : item.price.toFixed(2)}{" "}
                x {item.qty}
              </div>

              <div>
                &#8377;{" "}
                {item.offerprice > 0
                  ? ((item.price - item.offerprice) * item.qty).toFixed(2)
                  : (item.price * item.qty).toFixed(2)}
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
      <div ><h4>Qty: {item.qty}  </h4></div>
            </div>
          </div>

          <div
            style={{
              fontSize: 16,
              fontFamily: "Poppins",
              marginTop: 50,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Delivery between {month[date.getMonth()]} {date.getDate()} -
            {month[newdate.getMonth()]} {newdate.getDate()}
            {/* <div style={{display:'flex',justifyContent:'right'}}>
               Qty
              </div> */}
            <div>
              <Button
                style={{ marginRight: 7, color: "grey", background: "#f2f2f2" }}
              >
                REMOVE
              </Button>
              <Button
                style={{ marginLeft: 5, color: "grey", background: "#f2f2f2" }}
              >
                SAVE FOR LATER
              </Button>
            </div>
          </div>
          <hr color="black" />
        </div>
      );
    });
  };
///////////////////////////////////////////////////////// Show Cart items Function //////////////////////////////////////////////////////////////////


  return [
    <div className={classes.homediv}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div className={classes.subdiv}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
              Final Cart Review
              </div>

              <div style={{ width: "100%" }}>
                <Slider {...bannersettings}>{showMainBanner()}</Slider>
              </div>

              {/*///////////////////////////////////////////////////////////// toggle Drawer Call//////////////////////////////////////////////////////////////////////////////////////////// */}
              <div className={classes.one} >
                {['right'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                      <Button onClick={toggleDrawer(anchor, true)} style={{ color: "red" }}>+ Add Address</Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "left", fontWeight: "bolder", fontSize: 20 }}> Delivery Address   </div>
                    <div style={{ display: "flex", justifyContent: "left", fontWeight: "lighter", fontSize: 18 }}>{userDetails()}  </div>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
              {/*////////////////////////////////////////////////// toggle Drawer Call Ends//////////////////////////////////////////////////////////////////////////////// */}

              {/* ///////////////////////////////////////////////////////// Show Products in Cart /////////////////////////////////////////////////////////*/}

              <div className={classes.one}>
                PRODUCTS
                <hr color="black" />
                <div className={classes.one}>{showCartItems()}</div>

                {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"}}>
                  <Button style={{color:"white",background:"black"}} onClick={()=>navigate('/home')}>Add Products</Button>
                  </div> */}
              </div>



              {/* ///////////////////////////////////////////////////////// Show Products in Cart Ends /////////////////////////////////////////////////////////*/}

            </Grid>
            <Grid item xs={6}>
              <div className={classes.two}>
                <div
                  style={{
                    fontFamily: "Poppins",
                    alignItems: "left",
                    color: "grey",
                    fontSize: "20px",
                  }}
                >
                  APPLY PROMOCODE / NMS SUPERCASH
                </div>
              </div>

              <div className={classes.three}>
                <div
                  style={{
                    fontFamily: "Poppins",
                    alignItems: "left",
                    color: "grey",
                  }}
                >
                  PAYMENT DETAILS
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    color: "grey",
                    alignItems: "left",
                  }}
                >
                  <div>MRP Total</div>
                  <div style={{ marginLeft: "auto", paddingLeft: 60 }}>
                    &#8377;{totalamount}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    color: "black",
                    alignItems: "left",
                    fontWeight: "bold",
                  }}
                >
                  <div> Total Amount*</div>
                  <div style={{ marginLeft: "auto", paddingLeft: 50 }}>
                    &#8377;{offeramount}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    color: "darkgreen",
                    alignItems: "left",
                    fontWeight: "bold",
                  }}
                >
                  <div> You Saved*</div>
                  <div style={{ marginLeft: "auto", paddingLeft: 50 }}>
                    &#8377;{totalamount - offeramount}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    color: "grey",
                    alignItems: "left",
                    fontSize: 14,
                  }}
                >
                  AMOUNT TO PAY
                </div>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    color: "black",
                    alignItems: "left",
                  }}
                >
                  <div> &#8377;{offeramount}</div>{" "}
                  <div style={{ marginLeft: "auto", paddingLeft: 60 }}>
                    <Button
                      variant="contained"
                      onClick={() =>alert("Payment GateWay Not Linked")}
                      style={{ background: "#000", color: "#fff" }}
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={classes.four}
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "bolder",
                  color: "grey",
                  alignItems: "left",
                  fontSize: 15,
                  marginTop: 5,
                }}
              >
                Bestmeds is a technology platform to facilitate transaction of
                business. The products and services are offered for sale by the
                sellers. The user authorizes the delivery personnel to be his
                agent for delivery of the goods. For details read Terms &
                Conditions
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>,
    <Footer />,
  ];
}
