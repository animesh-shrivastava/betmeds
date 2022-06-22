import { React, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles'
import { postDataImage, getData } from '../fetchnodeservices';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material'
import DisplaySubCategories from './DisplayAllSubcategories';
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
    display: "none"
});




function SubCategories(props) {

    const classes = useStyles();
    const [categoryid, setCategoryID] = useState("")
    const [subcategoryname, setSubCategoryName] = useState("")
    const [subicon, setSubIcon] = useState({ bytes: "",filename: "/default.png" })
    const [description, setdescription] = useState("")

    const [list, setList] = useState([])


    const handleIconChange = (event) => {

        setSubIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }



    const saveSubCategory = async () => {
        var formData = new FormData();
        formData.append('subcategoryname', subcategoryname);
        formData.append('categoryid', categoryid)
        formData.append('icon', subicon.bytes);
        formData.append('description', description);

        var result = await postDataImage('subcategory/subcategories', formData)
        if (result.result) {
            
            Swal.fire({

                position: 'top-middle',
                icon: 'success',
                title: 'Your Subcategory has been Inserted Succesfully',
                showConfirmButton: true,
                timer: 5000

            })
        }

    }
    const handleChange = (event) => {
        setCategoryID(event.target.value);

    };


    const fetchallcategories = async () => {
        var result = await getData("category/displaycategories")
        setList(result.result)

    }

    useEffect(() => {
        fetchallcategories()
        
    }, [])

    const fillCategory = () => {
        return list.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }



    const handleDisplaySubCategories=()=>{
        props.setViewContainer(<DisplaySubCategories/>)
        
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
                       Sub-Catogory Interface   
                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button onClick={()=>handleDisplaySubCategories()} style={{fontSize:"1",fontWeight:"bold",color:"#00cec9",background:"#FFF"}} variant="contained" component="span" fullWidth>
                                List SubCategories 
                            </Button>
                            </Grid>
            <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel ></InputLabel>
                            <Select
                                value={categoryid} displayEmpty
                                onChange={handleChange}
                                style={{ color: "white" }}
                            >
                                <MenuItem value="" disabled>Select Category</MenuItem>
                                {fillCategory()}
                            </Select>
                        </FormControl>

                    </Grid>


                    <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{ style: { color: "white" } }}
                            variant="outlined"
                            label="SubCategory Name"
                            text={subcategoryname}
                            onChange={(event) => setSubCategoryName(event.target.value)}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>

                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{ style: { color: "white" } }}
                            variant="outlined"
                            label="Description "
                            text={description}
                            onChange={(event) => setdescription(event.target.value)}
                            fullWidth />

                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }} variant="contained" component="span" fullWidth>
                                Upload Image
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar
                            alt="no Image"
                            src={subicon.filename}
                            variant="rounded"
                            sx={{ width: 80, height: 50 }}

                        />



                    </Grid>
                    <Grid item xs={6}>
                        <label>

                            <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                                variant="contained"
                                onClick={() => saveSubCategory()}
                                component="span" fullWidth>
                                Submit
                            </Button>
                        </label>

                    </Grid>
                    <Grid item xs={6}>

                        <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                            variant="contained"
                            onClick={() => `${setSubCategoryName("")} ${setCategoryID("")}`}
                            component="span" fullWidth>Cancel</Button>


                    </Grid>
                </Grid>

            </div>
        </div>

    );

}


export default SubCategories