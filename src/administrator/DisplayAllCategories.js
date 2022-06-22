import { React, useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import { Avatar, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { postDataImage, postData, getData, ServerURL } from "../fetchnodeservices";
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    croot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        margin: 0,
        width: "510px",
        height: "450px"

    },
    csubdiv: {
        background: '#00cec9',
        padding: 10,
        border: "5px solid lightgrey",
        boxShadow: "2px",
        width: "600px",
        height: "350px",
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


function DisplayCategories() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const [icon, setIcon] = useState({ bytes: "", filename: "/rgpv-logo.png" })
    const [showButton, setShowButton] = useState(false)
    const [btn, setbtn] = useState(true)
    const [tempIcon, settempIcon] = useState('')
    const [categoryId, setcategoryid] = useState('')

    const handleIconChange = (event) => {
        setShowButton(true)
        setbtn(false)
        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const handleIconsave = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('icon', icon.bytes);

        var result = await postDataImage('category/editicon', formData)
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
        fetchallcategories()
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
                var result1 = postData('category/deletedata', { categoryid: (rowData.categoryid) })
                if(result1){
                Swal.fire('Deleted!',"<b>"+ rowData.categoryname+"<b/>" + '  Category has been deleted.', 'success')
                fetchallcategories()
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }

        }
        )
    }

    const editCategory = async () => {

        var result = await postData('category/editcategory', { categoryid: categoryId, categoryname: categoryName })
        setOpen(false)
        if (result.result) {

            Swal.fire({
                position: 'top-middle',
                icon: 'success',
                title: 'Your Category has been saved',
                showConfirmButton: true,
                timer: 5000
            })
        }
        else {
            Swal.fire({
                position: "top-middle",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Category',

            })
        }
        fetchallcategories()

    }

    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setList(result.result)

    }

    useEffect(() => {
        fetchallcategories()

    }, [])

    const handleCancel = () => {
        setShowButton(false)
        setbtn(true)
        setTimeout(() => {
            setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` })
        }, 0.5);

    }

    const handleOpen = (rowData) => {
        setCategoryName(rowData.categoryname)

        setcategoryid(rowData.categoryid)
        setIcon({ bytes: '', filename: `${ServerURL}/images/${rowData.caticon}` })
        setOpen(true)
        settempIcon(rowData.caticon)
    }
    const handleClose = () => {
        setOpen(false)
        fetchallcategories()
        // alert("fetchall category")
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
                                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                                            InputProps={{ style: { color: "white" } }}
                                            variant="outlined"
                                            label="Category Name"
                                            value={categoryName}
                                            onChange={(event) => setCategoryName(event.target.value)}
                                            fullWidth />

                                    </Grid>

                                    <Grid item xs={12}>
                                        <label>

                                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                                variant="contained"
                                                onClick={() => editCategory()}
                                                component="span" fullWidth>
                                                Edit Data
                                            </Button>
                                        </label>

                                    </Grid>
                                    <Grid item xs={12}><Divider color="white"
                                    /></Grid>

                                    <Grid item xs={6} style={{ marginTop: "20px" }}>
                                        {btn ? <label htmlFor="contained-button-file">
                                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                                            <center> <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF", }} variant="contained" component="span" >
                                                Upload Image
                                            </Button>
                                            </center>
                                        </label> : <div></div>
                                        }
                                        {showButton ? <div>
                                          <center>  <Button onClick={() => handleIconsave()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                Save
                                            </Button>
                                            <Button onClick={() => handleCancel()} style={{ fontWeight: "bold", color: "#FFF" }} component="span" >
                                                cancel
                                            </Button></center>
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
                                            sx={{ width: 200, height: 70 }}

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
                title={<h1><i>List Categories</i></h1>}


                columns={[
                    {
                        title: <font size="3">Category ID</font>, field: 'categoryid'

                    },
                    {
                        title: <font size="3">Category Name</font>, field: 'categoryname'
                    },
                    {
                        title: <font size="3">Category Icon</font>, field: 'caticon',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.caticon}`} style={{ width: 100, height: "70%", borderRadius: "5px" }} />
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




export default DisplayCategories