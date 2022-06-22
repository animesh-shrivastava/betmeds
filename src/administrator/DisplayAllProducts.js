import { React, useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { postDataImage, postData, getData, ServerURL } from "../fetchnodeservices";
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    croot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
        marginBottom: -20,
        width: "510px",
        height: "800px",



    },
    csubdiv: {
        background: '#00cec9',
        padding: 10,
        border: "5px solid lightgrey",
        boxShadow: "2px",
        width: "600px",
        height: "79 0px",
        borderRadius: "10px",


    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,


    },
    subdiv: {
        background: '#00cec9',
        padding: "20px 20px 0px 20px",
        borderRight: "5px",
        width: "1200px",
        borderRadius: "10px",
        width: "1570px"

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


function DisplayProducts() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [Clist, setCList] = useState([]);
    const [SClist, setSCList] = useState([]);
    const [Blist, setBList] = useState([]);

    const [open, setOpen] = useState(false)
    const [icon, setIcon] = useState({ bytes: "", filename: "/rgpv-logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [btn, setbtn] = useState(true)
    const [tempIcon, settempIcon] = useState('')
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [productId, setProductId] = useState("")
    const [productname, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [offerprice, setOfferPrice] = useState("")
    const [offertype, setOfferType] = useState("")
    const [stock, setStock] = useState("")
    const [status, setStatus] = useState("")
    const [salesstatus, setSalesStatus] = useState("")
    const [rating, setRating] = useState("")




    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconsave = async () => {
        var formData = new FormData();
        formData.append('productid', productId);
        formData.append('icon', icon.bytes);

        var result = await postDataImage('products/editicon', formData)
        if (result.result) {
            setOpen(false)
            Swal.fire({

                position: 'top-middle',
                icon: 'success',
                title: 'Your Image has been Updated',
                showConfirmButton: true,
                timer: 5000

            })
        }
      fetchallproducts()
    }

    const deleteData = async (rowData) => {

        setOpen(false)

        Swal.fire({
            title: 'Are you sure You want to Delete This Record Permanently',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showDenyButton: true,
            confirmButtonColor: 'red',
            denyButtonColor: 'green',
            denyButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                var result1 = postData('products/deletedata', { productid: (rowData.productid) })

                Swal.fire('Deleted!', "<b>" + rowData.productname + "</b>" + ' Product has been deleted. Successfully', 'success')
        
                fetchallproducts()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')

            }
        }
        )
    }

    const editProducts = async () => {

        var result = await postData('products/editproducts', { categoryid: categoryId, subcategoryid: subCategoryId, brandid: brandid, productid: productId, productname: productname, description: description, price: price, offerprice: offerprice, offertype: offertype, stock: stock, status: status, salesstatus: salesstatus, rating: rating })
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: "<b>" + productname + "</b>" + ' Product has been Updated',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Product',

            })
        }
        fetchallproducts()

    }
    const fetchallproducts = async () => {

        var result = await getData("products/displayallproducts")
        setList(result.result)
    }
    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setCList(result.result)
        // alert('categories called')
    }

    const handleCancel = () => {
        setShowButton(false)
        setbtn(true)

        setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })


    }

    const handleOpen = (rowData) => {
        fetchSubCategory(rowData.categoryid)
        fetchBrands(rowData.subcategoryid)
        setProductId(rowData.productid)
        setRating(rowData.rating)
        setStatus(rowData.status)
        setStock(rowData.stock)
        setOfferType(rowData.offertype)
        setOfferPrice(rowData.offerprice)
        setPrice(rowData.price)
        setDescription(rowData.description)
        setProductName(rowData.productname)
        setBrandId(rowData.brandid)
        setSubCategoryId(rowData.subcategoryid)
        setcategoryId(rowData.categoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
        setOpen(true)
        settempIcon(rowData.icon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallproducts()
    }


    const handleChangeSubcategory = async (event) => {
        setcategoryId(event.target.value);
        fetchSubCategory(event.target.value);
    };
    const fetchSubCategory = async (cid) => {

        var result = await postData("subcategory/displaysubcategories", { catid: cid })
        setSCList(result.result)
    }


    const handleChangeBrands = async (event) => {
        setSubCategoryId(event.target.value)
        fetchBrands(event.target.value)
    }

    const fetchBrands = async (sid) => {
        var result = await postData("brands/displaybrand", { subcatid: sid })
        setBList(result.result)
    }

    const handleChanged = async (event) => {
        setBrandId(event.target.value)
    }

    useEffect(() => {
        fetchallcategories()
        fetchallproducts()
    }, [])


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


    /***Dialog START**** */

    const showDialog = () => {
        return (
            <div >
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


                <Dialog

                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >

                    <DialogContent>

                        <div className={classes.croot} >
                            <div className={classes.csubdiv}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                                        Edit Product <br /><br />
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select
                                                value={categoryId}
                                                onChange={(event) => handleChangeSubcategory(event)}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >

                                                {fillCategory()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select

                                                value={subCategoryId}

                                                onChange={(event) => handleChangeBrands(event)}
                                                style={{ color: "white" }}
                                                variant="outlined"
                                            >

                                                {fillSubCategory()}
                                            </Select>
                                        </FormControl>
                                        
                                    </Grid>
                                    <Grid item xs={6}>
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

                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Name"
                                            value={productname}
                                            onChange={(event) => setProductName(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Description"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            fullWidth /><br />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Product Price"
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="OfferPrice"
                                            value={offerprice}
                                            onChange={(event) => setOfferPrice(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="OfferType"
                                            value={offertype}
                                            onChange={(event) => setOfferType(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Stock"
                                            value={stock}
                                            onChange={(event) => setStock(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Status"
                                            value={status}
                                            onChange={(event) => setStatus(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Sales Status"
                                            value={salesstatus}
                                            onChange={(event) => setSalesStatus(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Rating"
                                            value={rating}
                                            onChange={(event) => setRating(event.target.value)}
                                            fullWidth />


                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => editProducts()}
                                                component="span" fullWidth>
                                                Edit Data
                                            </Button>
                                        </label>    

                                    </Grid>
                                    <Grid item xs={12}><Divider color="white"
                                    /></Grid>

                                    <Grid item xs={6}>
                                        <center>   {btn ? <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                                            <br />  <br />  <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>

                                        </label> : <div></div>
                                        } <br /><br />
                                            {showButton ? <div>
                                                <Button onClick={() => handleIconsave()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                    Save
                                                </Button>
                                                <Button onClick={() => handleCancel()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                    cancel
                                                </Button>
                                            </div> :
                                                <div>

                                                </div>
                                            }</center>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>

                    </DialogActions>
                </Dialog>
            </div>
            /*Dialog End */
        );

    }


    function display() {
        return (

            <MaterialTable
                title={<h1><i>List Of All Products</i></h1>}


                columns={[
                    { title: <font size="3">Category Name</font>, field: 'catname' },
                    { title: <font size="3">Sub Category Name</font>, field: 'subcatname' },
                    { title: <font size="3">Brand  Name</font>, field: 'brandname' },
                    { title: <font size="3">Product ID</font>, field: 'productid' },
                    { title: <font size="3">Product Name</font>, field: 'productname' },
                    { title: <font size="3">Product Description</font>, field: 'description' },
                    { title: <font size="3">Price</font>, field: 'price' },
                    { title: <font size="3">Offer Price</font>, field: 'offerprice' },
                    { title: <font size="3">Offer Type</font>, field: 'offertype' },
                    { title: <font size="3">Stock</font>, field: 'stock' },
                    {
                        title: <font size="3">Status</font>, field: 'status',
                        render: rowData => <h3>{rowData.status == "Continue" || rowData.status == "CONTINUE" || rowData.status == "continue" ? <font color="green">{rowData.status}</font> : <font color="red">{rowData.status}</font>}</h3>

                    },
                    {
                        title: <font size="3">Sales Status</font>, field: 'salesstatus'
                    },
                    {
                        title: <font size="3">Rating</font>, field: 'rating'
                    },
                    {
                        title: <font size="3">Product Icon</font>, field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
                    },

                ]}
                data={list}
                actions={[
                    {
                        icon: "edit",
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: "delete",
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteData(rowData)
                    },

                ]}
            />


        )
    }

    return (
        <div>
            <div className={classes.root}>

                <div className={classes.subdiv}>
                    {display()},
                    {showDialog()}
                </div>

            </div>
        </div>
    )



}


export default DisplayProducts