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
        padding: 30,
        margin: 0,
        width: "515px",
        height: "520px"

    },
    csubdiv: {
        background: '#00cec9',
        padding: 10,
        border: "5px solid lightgrey",
        boxShadow: "2px",
        width: "1050px",
        height: "550px",
        borderRadius: "10px",
        margin: 0
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        marginTop: "50px"


    },
    subdiv: {
        background: '#00cec9',
        padding: "20px 20px 0px 20px",
        borderRight: "5px",
        width: "1200px",
        borderRadius: "10px"
    }


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


function DisplayBrands() {
    const classes = useStyles();
    const [List, setList] = useState([]);
    const [open, setOpen] = useState(false)
    const [icon, setIcon] = useState({ bytes: "", filename: "/rgpv-logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [btn, setbtn] = useState(true)
    const [productid,setProductId]=useState('')
    const [categoryId, setcategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [brandid, setBrandId] = useState('')
    const [brandname, setBrandName] = useState('')
    const [status, setStatus] = useState('')
    const [tempIcon, settempIcon] = useState('')
    const [Clist,setCList]=useState([])
    const [SClist,setSCList] =useState([])

    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconsave = async () => {
        var formData = new FormData();
        formData.append('brandid', brandid);
        formData.append('icon', icon.bytes);

        var result = await postDataImage('brands/editicon', formData)
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
        fetchallbrands()
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
                var result1 = postData('brands/deletedata', { brandid: (rowData.brandid) })

                Swal.fire('Deleted!',"<b>"+ rowData.brandname+"</b>" + '  Brand has been deleted.', 'success')
                fetchallbrands()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')

            }


        }
        )
    }

    const editbrands = async () => {

        var result = await postData('brands/editbrands', {categoryId:categoryId,subCategoryId:subCategoryId,brandid:brandid, brandname:brandname, status:status })
        // alert("edit brands called"+" "+ brandid+" "+ brandname+" "+ status)
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: 'Your Brand has been Updated',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Brand',

            })
        }
        fetchallbrands()

    }

    const fetchallbrands = async () => {
        var result = await getData("brands/displayallbrands")
        setList(result.result)
        // alert('subcategories called')
    }



    const fetchallSubcategories = async () => {
        var result = await getData("subcategory/displayallsubcategories")
        setSCList(result.result)
    // alert('subcategories called')
    }

    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setCList(result.result)
        // alert('categories called')

    }


    useEffect(() => {
        fetchallbrands()
        fetchallcategories()
        fetchallSubcategories()
    }, [])

    const handleCancel = () => {
        setShowButton(false)
        setbtn(true)
        setTimeout(() => {
            setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
        }, 0.5);

    }

    const handleOpen = (rowData) => {
        setStatus(rowData.status)
        setBrandId(rowData.brandid)
        
        setBrandName(rowData.brandname)
        setSubCategoryId(rowData.subcategoryid)
        setcategoryId(rowData.categoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
        setOpen(true)
        settempIcon(rowData.icon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallbrands()
    }

    const handleChange = async (event) => {
        setcategoryId(event.target.value);
        var result = await postData("subcategory/displaysubcategories", { catid: event.target.value })
        setSCList(result.result)

    };

    const handleChanged = (event) => {
        setSubCategoryId(event.target.value)
       
        
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


    /***Dialog START**** */

    const showDialog = () => {
        return (
            <div>
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
                                        Edit Catogory Interface <br /><br />
                                
                                        <FormControl fullWidth>
                            <InputLabel ></InputLabel>
                            <Select 
                               value={categoryId} displayEmpty
                                onChange={handleChange}
                                style={{ color: "white" }}
                                variant="outlined"
                            >
                                <MenuItem value="" disabled>Select Catgeory</MenuItem>
                                {fillCategory()}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel ></InputLabel>
                            <Select
                                
                                value={subCategoryId} displayEmpty
                                onChange={handleChanged}
                                style={{ color: "white" }}
                                variant="outlined"
                            >
                                 <MenuItem value="" disabled>Select Sub Catgeory</MenuItem>
                                {fillSubCategory()}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Brands Name"
                                            value={brandname}
                                            onChange={(event) => setBrandName(event.target.value)}
                                            fullWidth />
                                        </Grid>
                        <Grid item xs={12}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Status"
                                            value={status}
                                            onChange={(event) => setStatus(event.target.value)}
                                            fullWidth />


                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => editbrands()}
                                                component="span" fullWidth>
                                                Edit Data
                                            </Button>
                                        </label>

                                    </Grid>
                                   
                                    <Grid item xs={12}>
                                        <Divider color="white"/>
                                    </Grid>
                                    
                                    <Grid item xs={6} style={{marginTop:"20px"}}>
                                        {btn ? <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                                            <center> <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>
                                            </center>
                                        </label> : <div></div>
                                        }
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
                                        }
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Avatar
                                            alt="no Image"
                                            src={icon.filename}
                                            variant="rounded"
                                            sx={{ width: 200, height: 90 }}

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
                title={<h1><i>List Brands</i></h1>}


                columns={[
                    {
                        title: <font size="3">Category Name</font>, field: 'catname',

                       
                    },
                    {
                        title: <font size="3">Sub-Category Name</font>, field: 'subcatname',

                       
                    },
                    {
                        title: 'Brand ID', field: 'brandid',
                      

                    },
                    {
                        title: 'Brand Name', field: 'brandname',

                     
                    },

                    {
                        title: 'Brand Status', field: 'status',

                        // render: rowData => <h3>{rowData.status == "In Stock"||rowData.status == "IN STOCK" || rowData.status == "in stock"  ? <font color="green">{rowData.status}</font> : <font color="red">{rowData.status}</font>}</h3>
                    },
                    {
                        title: 'Brand Icon', field: 'icon',

                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
                    },

                ]}
                data={List}
                actions={[
                    {
                        icon: "edit",
                        tooltip: 'Edit Brand',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: "delete",
                        tooltip: 'Delete Brand',
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




export default DisplayBrands