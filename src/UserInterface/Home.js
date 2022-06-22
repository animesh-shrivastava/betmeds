import React, { useState, useEffect, createRef } from "react";
import { getData, postData, ServerURL } from "../fetchnodeservices";
import { makeStyles } from '@mui/styles';

import Header from "./Header";
import Footer from './Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddToCart from "./AddToCart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import  Grid  from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import  useMediaQuery  from '@mui/material/useMediaQuery';



const useStyles = makeStyles({
    root: {
        background: "#ecf0f1",
        width: "50%",
        height: "400px", padding: "20px",
        marginTop: "20px"


    },
    subdiv: {
        fontFamily: "Sarabun", fontSize: "25px", display: "flex",
        flexDirection: "column", justifyContent: "center",
        height: "300px",
        width: "90px",
        border: "0px solid #ecf0f1",
        marginTop: "10px",
        background: "#ecf0f1"

    },
    homediv: {
        background: "#ecf0f1",
        minHeight:"250vh",
        
    },
    cardimage: {
        width: "300px", height: "150px",
        margin: "100px 50px 0px 50px",
        border: "1px solid lightgrey",
        borderRadius: "15px"
    }


});




var Bannersettings = {

    dots: true,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000

};

var brandsettings = {

    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1


};
   var productsettings = {

        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1

    };
    var couponsettings={
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    

    }



export default function Home() {
    const classes = useStyles();
    const [category, setCategory] = useState([]);
    const [refresh, setRefresh] = useState(false);
    var categoriesSlider = createRef();
    var BrandSlider = createRef();
    var ProductSlider = createRef();
    var dispatch = useDispatch();

    var navigate=useNavigate();
    var theme=useTheme();
  const matches=useMediaQuery(theme.breakpoints.down('lg'));// media query for responsiveness
  var categorysettings = {

    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: matches?3:5,
    slidesToScroll: 1,


};

    const [banner, setBanner] = useState([]);
    const [TopBrands, setTopBrands] = useState([]);
    const [TopProducts, setTopProducts] = useState([]);
    const [coupon, setCoupon] = useState([]);
    

    const fecthallcategories = async () => {
        var result = await getData("category/displaycategories");
        setCategory(result.result);

    }
    const fetchbannerimages = async () => {
        var result = await getData("bannerimages/displaybanners");
        setBanner(result.result);

    }
    const fetchcouponimages = async () => {
        var result = await getData("couponimages/displaycoupons");
        setCoupon(result.result);

    }

    const fetchTopBrands = async () => {
        var result = await postData("brands/displaybrandbystatus", { status: "top brand" });
        setTopBrands(result.result);


    }


    const fetchProductsByStatus = async () => {
        var result = await postData("products/displayproductsbystatus", { salesstatus: "trending" });
        setTopProducts(result.result);


    }




const handleproductlist=(categoryid)=>{

navigate('/productlist',{state:{category:categoryid}})


}



    


    const carousolBanner = () => {
        return banner.map((item) => {
            return (
                <div>

                <div style={{ display: "flex",justifyContent:"center"}} >
                    <img style={{ marginTop: "10px", border: "1px solid grey",width:"95%"  }}
                        src={`${ServerURL}/images/${item.bannerimage}`}  />
                </div>
            </div>
            )
        })
    }


    const carousolCoupon = () => {
        return coupon.map((item) => {
            return (
                <div >

                <div style={{ display: "flex",justifyContent:"center"}} >
                    <img style={{ marginTop: "30px", border: "1px solid grey",width:"95%" ,borderRadius:"30px" }}
                        src={`${ServerURL}/images/${item.couponimage}`}  />
                </div>
            </div>
            )
        })
    }





    const carousolCategory = () => {
        return category.map((item) => {
            return (
                <>
                    <div
                        style={{
                            width: "90%",
                            height: "260px",
                            background: "white",
                            paddingTop: "10px",
                            // borderRadius: "20px",
                            border: "0.5px solid grey",
                            padding: "40px 0px 0px 0px"
                        }} >

                        <img 
                         src={`${ServerURL}/images/${item.caticon}`} height="100px" width="120px" 
                         onClick={()=>handleproductlist(item.categoryid)}
                        />
                        <h3 style={{ fontFamily: "Sarabun" }} onClick={()=>handleproductlist(item.categoryid)}>{item.categoryname}</h3>
                    </div>
                </>
            )
        })
    }



    const handleQtyChange = (value, item) => {
      item["qty"]=value;
        if (value > 0) {
            dispatch({ type: "ADD_PRODUCT", payload: [item.productid, item] })
        }
        else {
            dispatch({ type: "DEL_PRODUCT", payload: [item.productid] })
        }

        setRefresh(!refresh)
    }





    const carousolProducts = () => {
        return TopProducts.map((item) => {
            return (
                <>
                    <div
                        style={{
                            width: "90%",
                            height: "250px",
                            background: "white",
                            paddingTop: "10px",
                            // borderRadius: "20px",
                            border: "1px solid grey",

                            padding: "40px 0px 0px 0px"
                        }} >

                        <img onClick={()=> navigate('/productshow',{state:{product:item}})}  src={`${ServerURL}/images/${item.icon}`} height="100px" width="120px" />
                        <span onClick={()=> navigate('/productshow',{state:{product:item}})} style={{ fontFamily: "Sarabun", display: "flex", justifyContent: "left", marginLeft: "10px", color: "black" }}>{item.productname}</span>

                        <span style={{ fontFamily: "Sarabun", display: "flex", justifyContent: "left", marginLeft: "10px" }} >
                            Price:&#8377;
                            <span style={{ color: "#2ed573", marginLeft: "2px" }}>{item.offerprice}</span>
                            <span style={{ marginLeft: "5px" }}>&#8377;<s style={{ color: "#ff4757", marginLeft: "2px" }}>{item.price}</s></span>

                        </span>
                        <span style={{ fontFamily: "Sarabun", display: "flex", justifyContent: "left", marginLeft: "10px", color: "#2ed573" }} >

                            You Save : {(item.price) - (item.offerprice)}

                        </span>
                        <span style={{ display: "flex", justifyContent: "center",marginTop:"15px" }}>{<AddToCart value={0} onChange={(value) => handleQtyChange(value, item)} />}</span>


                    </div>
                </>
            )
        })
    }


    const carousolTopBrands = () => {
        return TopBrands.map((item) => {
            return (
                <>
                    <div
                        style={{
                            width: "90%",
                            height: "250px",
                            background: "white",
                            paddingTop: "10px",
                            // borderRadius: "20px",
                            border: "1px solid grey",
                            padding: "40px 0px 0px 0px"
                        }} >

                        <img src={`${ServerURL}/images/${item.icon}`} height="100px" width="120px" />
                        <h3 style={{ fontFamily: "Sarabun" }}>{item.brandname}</h3>
                    </div>
                </>
            )
        })
    }

    useEffect(function () {
        fetchTopBrands();
        fetchbannerimages();
        fecthallcategories();
        fetchProductsByStatus();
        fetchcouponimages();
    }, [])


    return ([

        <Header />,
        <div className={classes.homediv}>
            <center>
                <div style={{ width: "100%" }}>
                    <Slider  {...Bannersettings}>

                        {carousolBanner()}
                    </Slider>
                </div>

                <div style={{ width: "80%" }}>
                 
                    <Slider  {...couponsettings}>

                        {carousolCoupon()}
                    </Slider>
                </div>
               


                { ////////////////////////////category Slider //////////////////////////////////////////////////
                }
                <h1 style={{ fontFamily: "Sarabun" }}>Shop by Category</h1>

                <div style={{ width: "95%", margin: "30px 0px 50px 0px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >

                    <div style={{ width: "10px" }}>
                        <ArrowBackIos onClick={() => categoriesSlider.current.slickPrev()} style={{ cursor: "pointer", fontSize: 40, color: "black", }} />
                    </div>
                    <div style={{ width: "90%" }}>
                        <Slider  {...categorysettings} ref={categoriesSlider}>

                            {carousolCategory()}

                        </Slider>
                    </div>

                    <div style={{ width: "15px" }}>
                        <ArrowForwardIosIcon onClick={() => categoriesSlider.current.slickNext()} style={{ cursor: "pointer", fontSize: 40, color: "black" }} />

                    </div>
                </div>
                { ////////////////////////////category Slider End //////////////////////////////////////////////////
                }


                { ////////////////////////////Brand Slider //////////////////////////////////////////////////
                }
                <h1 style={{ fontFamily: "Sarabun" }}>Top Brands</h1>

                <div style={{ width: "95%", margin: "30px 0px 50px 0px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >

                    <div style={{ width: "10px" }}>
                        <ArrowBackIos onClick={() => BrandSlider.current.slickPrev()} style={{ cursor: "pointer", fontSize: 40, color: "black", }} />
                    </div>
                    <div style={{ width: "90%" }}>
                        <Slider  {...brandsettings} ref={BrandSlider}>

                            {carousolTopBrands()}

                        </Slider>
                    </div>

                    <div style={{ width: "15px" }}>
                        <ArrowForwardIosIcon onClick={() => BrandSlider.current.slickNext()} style={{ cursor: "pointer", fontSize: 40, color: "black" }} />

                    </div>
                </div>

                { ////////////////////////////Brand Slider End //////////////////////////////////////////////////
                }





                { ////////////////////////////Product Slider //////////////////////////////////////////////////
                }
                <h1 style={{ fontFamily: "Sarabun" }}>Top Products</h1>

                <div style={{ width: "95%", margin: "30px 0px 50px 0px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >

                    <div style={{ width: "10px" }}>
                        <ArrowBackIos onClick={() => ProductSlider.current.slickPrev()} style={{ cursor: "pointer", fontSize: 50, color: "black", }} />
                    </div>
                    <div style={{ width: "90%" }}>
                        <Slider  {...productsettings} ref={ProductSlider}>

                            {carousolProducts()}


                        </Slider>
                    </div>


                    <div style={{ width: "15px" }}>
                        <ArrowForwardIosIcon onClick={() => ProductSlider.current.slickNext()} style={{ cursor: "pointer", fontSize: 40, color: "black" }} />

                    </div>
                </div>

                { ////////////////////////////Product Slider End //////////////////////////////////////////////////
                }




            </center>
        </div>,
        <Footer />

    ])
}