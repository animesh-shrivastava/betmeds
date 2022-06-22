
import React, { useState,useEffect } from 'react'
import {  styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postDataImage,ServerURL,getData,postData} from '../fetchnodeservices';
import { Divider } from '@mui/material';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayProducts from './DisplayAllProducts';
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
      border: '1px solid #FFF',
      borderRadius:0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',
    },
  },
});

const Input = styled('input')({
  display: 'none',
});

function Product(props) {
  const classes = useStyles();
    const [Clist, setCList] = useState([]);
    const [SClist, setSCList] = useState([]);
    const [Blist, setBList] = useState([]);
    const [icon, setIcon] = useState({ bytes: "",filename: "/default.png"})
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [productname,setProductName]=useState("")
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [offerprice,setOfferPrice]=useState('')
    const [offertype,setOfferType]=useState('')
    const [stock,setStock]=useState('')
    const [status,setStatus]=useState('')
    const [salestatus,setSalesStatus]=useState('')
    const [rating,setRating]=useState("")
    


    const handleIconChange = (event) => {
        
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const saveProducts = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('brandid', brandid)
        formData.append('productname',productname)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('offerprice',offerprice)
        formData.append('offertype',offertype)
        formData.append('stock',stock)
        formData.append('status',status)
        formData.append('salesstatus',salestatus)
        formData.append('rating',rating)
        formData.append('icon', icon.bytes);


        var result = await postDataImage('products/saveproducts', formData)
        if (result.result) {
            Swal.fire({

                position: 'top-middle',
                icon: 'success',
                title: 'Your Product item is Successfully Inserted',
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
    const handleChanged = async (event) => {
        setBrandId(event.target.value)
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

const EmptyOnCancel=()=>{

      setIcon("")
    setProductName("")
    setDescription("")
    setPrice("")
    setOfferPrice("")
    setOfferType("")
    setStock("")
    setStatus("")
    setSalesStatus("")
    setRating("")

}



    const handleDisplayProducts=()=>{
        props.setViewContainer(<DisplayProducts/>)
        
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
                        Products Interface   
                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button onClick={()=>handleDisplayProducts()} style={{fontSize:"1",fontWeight:"bold",color:"#00cec9",background:"#FFF"}} variant="contained" component="span" fullWidth>
                                List of Products 
                            </Button>
                            </Grid>
                        <Grid item xs={12}>
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
                                            <Grid item xs={4}>
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
                                            <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select

                                                value={brandid} displayEmpty
                                                onChange={handleChanged}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >
                                                <MenuItem value="" disabled>Select Brand Name</MenuItem>
                                                {fillBrands()}
                                            </Select>
                                        </FormControl>

                                        </Grid>
                                            <Grid item xs={4}>
                                    
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Name"
                                            onChange={(event) => setProductName(event.target.value)}
                                            fullWidth />
                                        <br /><br />
                                        </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Description"
                                            onChange={(event) => setDescription(event.target.value)}
                                            fullWidth /><br /><br />
                                           </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Price"
                                             onChange={(event) => setPrice(event.target.value)}
                                            fullWidth />
                                        </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="OfferPrice"
                                             onChange={(event) => setOfferPrice(event.target.value)}
                                            fullWidth />
                                       </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="OfferType"
                                             onChange={(event) => setOfferType(event.target.value)}
                                            fullWidth />
                                       </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Stock"
                                             onChange={(event) => setStock(event.target.value)}
                                            fullWidth />
                                        </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Status"
                                             onChange={(event) => setStatus(event.target.value)}
                                            fullWidth />
                                      </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Sales Status"
                                             onChange={(event) => setSalesStatus(event.target.value)}
                                            fullWidth />
                                        </Grid>
                                            <Grid item xs={4}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Rating"
                                             onChange={(event) => setRating(event.target.value)}
                                            fullWidth />
                                       
                                       
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => saveProducts()}
                                                component="span" fullWidth>
                                                Submit Data
                                            </Button>
                                        </label>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => EmptyOnCancel()}
                                                component="span" fullWidth>
                                                Cancel
                                            </Button>
                                        </label>

                                    </Grid>
                                    <Grid item xs={12}><Divider color="white"
                                    /></Grid>

                                    <Grid item xs={6}>
                                    <center>  <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                                            <br />  <br />  <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>
                                           
                                        </label></center>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Avatar
                                            alt="no Image"
                                            src={icon.filename}
                                            variant="rounded"
                                            sx={{ width: 200, height: 120 }}

                                        />



                                    </Grid>

                                </Grid>

                            </div>
                        </div>
                
        );

    }


export default Product