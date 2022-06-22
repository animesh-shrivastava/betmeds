import React, { useEffect, useState } from 'react';
import { getData } from '../fetchnodeservices';
import { Grid, Divider, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstgramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';






function Footer() {
    const [category, setCategory] = useState([])

    const fecthallcategories = async () => {
        var result = await getData("category/displaycategories");
        setCategory(result.result);
    }

    useEffect(function () {
        fecthallcategories();
    }, [])


    const showMainCategory = () => {
        return category.map((item) => {
            return (<div style={{ marginRight: "50px" }}>
                <Button style={{ color: "black",fontFamily:"sans-serif",fontSize:"12px"}}>
                    {item.categoryname}
                </Button>
            </div>)
        })
    }


    return (
        <div >

        <Grid  container spacing={2} style={{fontSize:"10px"}}>

            <Grid item xs={4} style={{ marginTop: "100px", marginLeft: "80px", display: "flex", alignItems: "center" }}>


                <img src='/logo.png' width='80' />
                <span style={{ fontSize: '25px', color: '#00cec9' }}>BestMeds.com       </span>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "100px" }}>


                <span style={{ color: '#999999',fontSize:"20px" }}>Bestmeds.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s
                    most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines.</span>

            </Grid>




            <Grid item xs={2} style={{ marginLeft: "10px", marginLeft: "120px" }}>


                <p><b style={{fontfamily:"Sarabun",fontSize:"14px"}}>COMPANY</b></p>
                <p>About Bestmeds</p>
                <p>Customers Speak</p>
                <p>In the News</p>
                <p>Career</p>
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
                <p>Fees and Payments Policy</p>
                <p>Shipping and Delivery Policy</p>
                <p>Return, Refund and Cancellation Policy</p>
                <p>Contact</p>
            </Grid>
            <Grid item xs={2} >

                <p><b style={{fontfamily:"Sarabun",fontSize:"14px"}}>CATEGORY</b></p>
                {showMainCategory()}

            </Grid>
            <Grid item xs={2}  >
                <p><b style={{fontfamily:"Sarabun",fontSize:"14px"}}>SOCIAL</b></p>

                <p style={{ color: "black", display: "flex", alignItems: "center" }}>
                    <FacebookIcon fontSize='large' color="primary" />
                    Facebook
                </p>

                <p style={{ color: "black", display: "flex", alignItems: "center" }}>
                    <TwitterIcon fontSize='large' color="primary" />
                    Twitter
                </p>

                <p style={{ color: "black", display: "flex", alignItems: "center",color:"linear-gradiant" }}>
                    <InstgramIcon fontSize='large'  />
                    Instagram
                </p>
                
                <p style={{ color: "black", display: "flex", alignItems: "center" }}>
                    <YouTubeIcon fontSize='large' style={{ color: "red" }} />
                    Youtube
                </p>
                
                <p>Refer & Earn</p>

            </Grid>

            <Grid item xs={4} >


                <p><b>SUBSCRIBE TO OUR NEWSLETTER</b></p>
                <div>Get a free subscription to our health and </div>
                <div>fitness tip and stay  tuned to our latest  </div>
                <div>offers</div>


                <img src='/footerimage_play,app store icon.png' width='200' />

               



            </Grid>


        </Grid>
        </div>


    );
}
export default Footer