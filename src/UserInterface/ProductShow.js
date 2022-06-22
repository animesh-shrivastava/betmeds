import  React,{useState,useEffect,createRef} from 'react';
import {Button,TextField,Grid,Divider} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToCart from './AddToCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ServerURL,postData } from '../fetchnodeservices';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 



const theme = createTheme();
const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imagediv:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10,
      padding:20,
    },

    productinfo:{
      display:"flex",
      justifyContent:"center",
      margin:"0px 200px 0px 200px"
      
    }

    
  });



  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 1,
   
  };


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


export default function ProductShow(props){
  var navigate=useNavigate()
      var imagesSlider=createRef()
      var classes=useStyles()
      var dispatch=useDispatch()
      const [refresh,setRefresh]=React.useState(false)
      const[listimage,setListImages]=useState([])
     
      var location=useLocation()
      var product=location.state.product
      const[image,setImage]=useState(product.icon)
      const [productinfo,setProductInfo]=useState([])

const fetchProductDetailes=async()=>{
  
  // var id={productid:location.state.product.productid}

  var result= await postData('products/fetchproductdetails',{productid:location.state.product.productid,brandid:location.state.product.brandid,categoryid:location.state.product.categoryid,subcategoryid:location.state.product.subcategoryid})

// alert(JSON.stringify(result.result))
setProductInfo(result.result)

}



      const fetchProductImages=async()=>{
      
        // var id={productid:location.state.product.productid}
        var result= await postData('productimages/fetchproductimages',{productid:location.state.product.productid})
        if(result.result)
        {
          setListImages(result.result)
        }
            }
        
            const handleChangePicture=(pic)=>{
              setImage(pic)
            }
        
        
            const showImagesList=()=>{
              return listimage.map((item,index)=>{
              return (
              <div>
              <div className={classes.imagediv} >
               
               <div style={{padding:"5%",border:"1px solid grey"}}>
               <img onClick={()=>handleChangePicture(item.image)}  src={`${ServerURL}/images/${item.image}`} style={{width:50,height:50,cursor:'pointer'}}/>
               </div>
                  
              </div>
              </div>
              
              
              )      
              
              })
              
              
              }
        
              useEffect(function(){
               fetchProductImages()
               fetchProductDetailes()
              
              },[])
        
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
        




  
  return (
            <>
              <div style={{width:'100%'}} >
            <Header />
            </div>
                <div className={classes.productinfo}>
                <Grid container spacing={2} style={{padding:"20px"}}>
                    <Grid item xs={12}  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    
                    <Grid item xs={12} sm={6} md={6} lg={6} style={{display:'flex',justifyContent:'center',flexDirection:"column"}}>
           <img src={`${ServerURL}/images/${image}`} width="80%"  />
    
            {/* category tag */}
            
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 50,
                    paddingBottom: 50,
                  }}
                >
           
            <ArrowBackIos onClick={()=>imagesSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:24,color:'#95a5a6'}} />
            </div>
            <div style={{ width:'60%' }}>
             <Slider {...settings}  ref={imagesSlider}>
                  {showImagesList()}
            </Slider>
            </div>
    
            <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 50,
                    paddingBottom: 50,
                  }}
                >
           
            <ArrowForwardIosIcon onClick={()=>imagesSlider.current.slickNext()} style={{cursor: "pointer",fontSize:24,color:'#95a5a6'}} />
            </div>
          
        
         
            </div> 
    
    {/* ////////////////////////////// */}
             </Grid>
             
    
             <Grid item xs={12} sm={6} style={{marginRight:"40px"}}>
               <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", paddingTop: 20,fontSize:35}}>
               {product.productname}
               <div style={{ fontFamily:'Poppins',fontWeight:"lighter", fontSize:20}}> {product.description} {product.brandname}</div>
               </Grid>
               <Grid xs={12} sm={6} style={{marginTop:"20px"}} >
               <FavoriteBorderIcon/>
               </Grid>
               <Grid style={{padding:"10px"}}>
               <Divider />
               </Grid>
    
               <Grid xs={12} sm={6} style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20}}>
               <span>Offer Price* </span>
               <span style={{color:"#ff4757",fontWeight:'bold',fontFamily:'Poppins',fontSize:25}}>&#8377; {product.price-product.offerprice}</span>
              <div style={{fontSize:20,fontWeight:"lighter",padding:"10px"}}>
              <s>MRP  &#8377;{product.price}</s>
              <span style={{color:'#2ed573'}}> GET {((product.offerprice*100)/product.price).toFixed(1)}% OFF</span>
              <div>(inclusive of all taxes)</div>
              <div>Manufacturer:{productinfo.map((item)=>{
                return <span style={{fontWeight:"bolder"}}> {item.brandname}</span>
              })}</div>

              <div>Type:{productinfo.map((item)=>{
                return <span style={{fontWeight:"bolder"}}> {item.subcategoryname}</span>
              })}</div>

              <span>Country Of Origin:</span><span> India</span>
              <div>*Deliver charges if applicable will be applied checkout</div>
              </div>
               </Grid>
               <Grid>
                   <AddToCart value={0} onChange={(value)=>handleQtyChange(value,product)} />
               </Grid>
    
               <Grid style={{padding:"10px"}}>
               <Divider />
               </Grid>
               <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 14, paddingTop: 20}}>
              Check Availability & Expiry
               </Grid>
               <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 14, paddingTop: 20}}>
              <span style={{marginRight:'10px'}}>PINCODE:</span>
              <CssTextField variant="standard" input type="number" maxlength="6"  />
              <ArrowForwardIcon  style={{marginRight:'10px'}}/>
               </Grid>
    </Grid>
    </Grid>
    </Grid>
    </div>
    <div style={{width:'100%'}} >
            <Footer />
            </div>
    
           </>
    
  )

}