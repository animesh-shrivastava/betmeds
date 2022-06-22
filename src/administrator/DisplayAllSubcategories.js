import { React, useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { postDataImage, postData, getData, ServerURL } from "../fetchnodeservices";
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
        width: "1000px",
        height: "500px",
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


function DisplaySubCategories() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [SClist, setSCList] = useState([]);
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState({ bytes: "", filename: "/rgpv-logo.png" });
    const [showButton, setShowButton] = useState(false);
    const [btn, setbtn] = useState(true);
    const [tempIcon, settempIcon] = useState("");
    const [categoryId, setcategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [subcategoryName, setSubCategoryName] = useState("");
    const [description, setdescription] = useState("");



    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconsave = async () => {
        var formData = new FormData();
        formData.append('subcategoryid', subCategoryId);
        formData.append('icon', icon.bytes);

        var result = await postDataImage('subcategory/editicon', formData)
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
        fetchallSubcategories()
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
                var result1 = postData('subcategory/deletedata', { subcategoryid: (rowData.subcategoryid) })

                Swal.fire('Deleted!', "<b>"+ rowData.subcategoryname+"<b/>"  + '  Category has been deleted.', 'success')
                fetchallSubcategories()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }


        }
        )
    }

    const editSubCategory = async () => {

        var result = await postData('subcategory/editsubcategory', { categoryid: categoryId, subcategoryid: subCategoryId, subcategoryname: subcategoryName, desc: description })
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: 'Your Sub-Category has been saved',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Sub-Category',

            })
        }
        fetchallSubcategories()

    }

    const fetchallSubcategories = async () => {
        var result = await getData("subcategory/displayallsubcategories")
        setSCList(result.result)
        // alert('subcategories called')
    }

    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setList(result.result)
        // alert('categories called')

    }

    useEffect(() => {
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
        setdescription(rowData.description)
        setSubCategoryName(rowData.subcategoryname)
        setSubCategoryId(rowData.subcategoryid)
        setcategoryId(rowData.categoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.icon}` })
        setOpen(true)
        settempIcon(rowData.icon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallSubcategories()
        // alert("fetchall category")
    }



    const fillCategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    const handleChange = (event) => {
        setcategoryId(event.target.value);

    };


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
                                        Edit Sub-Catogory Interface <br /><br />
                                        <FormControl fullWidth>
                                            <InputLabel ></InputLabel>
                                            <Select
                                                value={categoryId} displayEmpty
                                                onChange={handleChange}
                                                style={{ color: "white" }}
                                            >
                                                <MenuItem value="" disabled>Select Category</MenuItem>
                                                {fillCategory()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="SubCategory Name"
                                            value={subcategoryName}
                                            onChange={(event) => setSubCategoryName(event.target.value)}
                                            fullWidth />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="SubCategory description"
                                            value={description}
                                            onChange={(event) => setdescription(event.target.value)}
                                            fullWidth />

                                    </Grid>

                                    <Grid item xs={12}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => editSubCategory()}
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
                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>

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

                title={<h1><i>List Subcategories</i></h1>}


                columns={[


                    {
                        title: <font size="3" >CATEGORY NAME</font>, field: 'catname',

                        render: rowData => <h3><i>{rowData.catname}</i></h3>
                    },
                    { title: <font size="3" >SUB-CATEGORY ID</font>, field: 'subcategoryid' },
                    {
                        title: <font size="3" >SUB-CATEGORY NAME</font>, field: 'subcategoryname',
                        render: rowData => <h3><i>{rowData.subcategoryname}</i></h3>
                    },


                    { title: <font size="3" >DESCRIPTION</font>, field: 'description' },

                    {
                        title: <font size="3" >SUBCATEGORY ICON</font>, field: 'icon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
                    },

                ]}
                data={SClist}
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




export default DisplaySubCategories