import React,{useState,useEffect,createRef} from 'react';
import { makeStyles } from "@material-ui/core"
import {Grid,Divider} from '@mui/material';
import {postData,getData,ServerURL} from "../fetchnodeservices"
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";
import Header from "./Header"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Footer from './Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddToCart from './AddToCart';
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
       

    },
    subdiv: {
      
        padding: 10,
        width: 250,
        marginTop: 50,
        height:320,
        border:'0.5px solid grey',
        borderRadius:10,
        margin:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        background:"#fff"
    }
})

var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
   
  };


  var Brandsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
   
  };


  var Productsettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
   
  };

  var bannersettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

export default function Productlist(props) {
    const classes = useStyles();
    var categoriesSlider=createRef()
    var brandsSlider=createRef()
    var productsSlider=createRef()
 const [category,setCategory]=useState([])
 const [brand,setBrand]=useState([])
 const [product,setProduct]=useState([])
 const [products,setProducts]=useState([])
 const [refresh,setRefresh]=useState(false)
 const [subcategory,setSubCategory]=useState([])
 const [banner,setBanner]=useState([])
 var dispatch=useDispatch()
 var navigate = useNavigate()
 console.log("navigate",navigate)
 var location = useLocation()
 console.log("location",location)
 
 const handleQtyChange=(value,item)=>{
  item['qty']=value
  if(value>0)
  {
    dispatch({type:"ADD_PRODUCT",payload:[item.productid, item]})
  }
  else{
    dispatch({type:"DEL_PRODUCT",payload:[item.productid]})
  }

  setRefresh(!refresh)
}

 const fetchAllProducts=async()=>{

  var result=await postData('products/displayproductbycategoryid',{categoryid:location.state.category})
  setProducts(result.result)

 }

 

 useEffect(function(){
 
 fetchAllProducts()

 },[])
 const showProducts=()=>{
  return products.map((item,index)=>{
  return (
  <div>
  <div className={classes.subdiv} >
   
   <div style={{padding:10}}>
   <img src={`${ServerURL}/images/${item.icon}`} style={{width:180,height:150}}/>
   </div>
   <div style={{fontFamily:'Sarabun',fontSize:18,fontWeight:'bold'}}>
 {item.productname} 
 
</div> 
<div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
{item.offerprice>0?<div style={{display:'flex',flexDirection:'column'}}><div>Price: &#8377; {item.offerprice}</div><div>MRP:<s style={{color:'#ff4757'}}>&#8377; {item.price}</s> </div><div style={{color:'#2ed573'}}>You Save:&#8377; {item.price-item.offerprice}  </div></div>:<></>}
 </div>
 <div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
<AddToCart value={0} onChange={(value)=>handleQtyChange(value,item)}/>
   </div>

  </div>
  </div>
  
  
  )
 })
  }


return (<div>
   <div style={{width:'100%'}} >
        <Header />
        </div>


   {/* All Product */}
   <div style={{fontSize:24,display:'flex',justifyContent:"center",fontWeight:'bold',marginTop:"20px"}}>{location.state.category.categoryname}</div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
         {showProducts()}
        </div>



        <div style={{marginTop:"20px",marginBottom:'20px'}}>
       
       <Divider  style={{background:'#000', marginTop:"20px",marginBottom:'20px',marginLeft:'20px'}}/>
     
         <Footer/>
         </div> 
        
</div>)







}