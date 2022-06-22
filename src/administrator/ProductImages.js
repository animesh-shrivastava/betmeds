import React, { useState,useEffect } from 'react'
import {  styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postDataImage,ServerURL,getData,postData} from '../fetchnodeservices';

import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayProductImages from './DisplayProductImages'
// import Dropzone from 'react-dropzone';
import {DropzoneArea} from 'material-ui-dropzone'
import Swal from 'sweetalert2';

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
  display: 'none',
});

function ProductImages(props) {
    const classes = useStyles();
    const [Clist, setCList] = useState([]);
    const [SClist, setSCList] = useState([]);
    const [Blist, setBList] = useState([]);
    const [Plist, setPList] = useState([]);
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [productid,setProductid]=useState('')
    const [uploadFiles,setFiles]=useState([])
    


    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('brandid', brandid)
        formData.append('productid', productid)
       
        uploadFiles.map((file,index)=>{

            formData.append("image"+index , file)
        })

        var result = await postDataImage('productimages/saveproductimages', formData)
        if (result.result) {
            Swal.fire({

                position: 'top-middle',
                icon: 'success',
                title: 'Your Product Images is Successfully Inserted',
                showConfirmButton: true,
                timer: 5000

            })
        }
        fetchallcategories()
    }



    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setCList(result.result)
        // alert('categories called')

    }


    useEffect(() => {
        fetchallcategories()
     

    }, [])



    const handleChangeSubcategory = async (event) => {
        setcategoryId(event.target.value);
        var result = await postData("subcategory/displaysubcategories", { catid: event.target.value })
        setSCList(result.result)

    };

    const handleChangeBrands = async (event) => {
        setSubCategoryId(event.target.value)
        var result = await postData("brands/displaybrand", { subcatid: event.target.value })
        setBList(result.result)

    }
    const handleChangeProducts = async (event) => {
        setBrandId(event.target.value)
        var result = await postData("products/displayproducts", { brandid: event.target.value })
        setPList(result.result)
    }

    const handleChanged=(event)=>{
        setProductid(event.target.value)
        // alert(JSON.stringify(Plist))
    }

    const fillCategory = () => {
        return Clist.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategory = () => {
        return SClist.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fillBrands = () => {
        return Blist.map((item) => {
            return (
                <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
            )
        })
    }

    const fillProducts = () => {
        return Plist.map((item) => {
            return (
                <MenuItem value={item.productid}>{item.productname}</MenuItem>
            )
        })
    }


    const handleDisplayImages=()=>{
        props.setViewContainer(<DisplayProductImages/>)
        
        }
    

   const handleImage=(files) =>{
           
    setFiles(files);
    // alert(JSON.stringify(files))
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
                                <Grid item xs={6} style={{  fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        Products Images    
                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button onClick={()=>handleDisplayImages()} style={{fontSize:"1",fontWeight:"bold",color:"#00cec9",background:"#FFF",width:"220px"}} variant="contained" component="span" fullWidth>
                                List of Product Images 
                            </Button>
                            </Grid>
                        <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select
                                                value={categoryId} displayEmpty
                                                onChange={handleChangeSubcategory}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Select Catgeory</MenuItem>
                                                {fillCategory()}
                                            </Select>
                                        </FormControl>
                                        </Grid>
                                            <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select

                                                value={subCategoryId} displayEmpty
                                                onChange={handleChangeBrands}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Select Sub Catgeory</MenuItem>
                                                {fillSubCategory()}
                                            </Select>
                                        </FormControl>
                                        </Grid>
                                            <Grid item xs={6}>
                                        <FormControl fullWidth>
                                           
                                            <Select

                                                value={brandid} displayEmpty
                                                onChange={handleChangeProducts}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Select Brand Name</MenuItem>
                                                {fillBrands()}
                                            </Select>
                                        </FormControl>

                                        </Grid>
                                            <Grid item xs={6}>
                                    
                                            <FormControl fullWidth>
                                           
                                           <Select

                                               value={productid} displayEmpty
                                               onChange={handleChanged}
                                               style={{ color: "white" }}
                                               variant="outlined"
                                           >
                                               <MenuItem value="" disabled>Select Product Name</MenuItem>
                                               {fillProducts()}
                                           </Select>
                                       </FormControl>
                               
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


export default ProductImages