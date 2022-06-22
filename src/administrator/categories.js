import {React,useState} from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles'
import { postDataImage } from '../fetchnodeservices';
import Swal from 'sweetalert2'
import DisplayCategories from './DisplayAllCategories';


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




function Categories(props) {

    const classes = useStyles();
    const [categoryName, setCategoryName] = useState("")
    const [icon, setIcon] = useState({ bytes:"", filename: "/default.png" })
    const handleIconChange = (event) => {

        setIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

    }

    const clear=async()=>{
      setCategoryName("")
      setIcon("")
    }

    const saveCategory=async()=>{
        var formData= new FormData();
    formData.append('categoryname',categoryName);
    formData.append('icon',icon.bytes);
    
    var result=await postDataImage('category/categories',formData)
    //  alert(result.result)
    if(result.result){
        Swal.fire({
            position:'center',
            icon: 'success',
            title: 'Your Category has been Inserted Succesfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
          else{
            Swal.fire({
                position:"top-center",
                icon: 'error',
                title: 'Error',
                text: 'Failed to Edit Category',
              
              })
          }
    
    
    }

    const handleDisplayCategories=()=>{
        props.setViewContainer(<DisplayCategories/>)
        
        }
    return (

        <div className={classes.root} >
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{  fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                        Catogory Interface   
                        </Grid>
                        <Grid item xs={5}>
                            
                            <Button onClick={()=>handleDisplayCategories()} style={{fontSize:"1",fontWeight:"bold",color:"#00cec9",background:"#FFF"}} variant="contained" component="span" fullWidth>
                                List of Categories 
                            </Button>
                            </Grid>
                        <Grid item xs={12}>
                        <CssTextField InputLabelProps={{ style: { color: "white" } }}
                            InputProps={{ style: { color: "white" } }}
                            variant="outlined"
                            label="Category Name"
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            fullWidth />

                    </Grid>
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <Input onChange={(event) => handleIconChange(event)} accept="image/" id="contained-button-file" multiple type="file" />
                            <Button style={{fontWeight:"bold",color:"#00cec9",background:"#FFF"}} variant="contained" component="span" fullWidth>
                                Upload Image
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar
                            alt="no Image"
                            src={icon.filename}
                            variant="rounded"
                            sx={{ width: 80, height: 50 }}

                        />



                    </Grid>
                    <Grid item xs={6}>
                        <label>

                            <Button  style={{fontWeight:"bold",color:"#00cec9",background:"#FFF"}}
                            variant="contained"
                            onClick={()=>saveCategory()} 
                            component="span" fullWidth>
                                Submit
                            </Button>
                        </label>

                    </Grid>
                    <Grid item xs={6}>

                        <Button style={{fontWeight:"bold",color:"#00cec9",background:"#FFF"}} 
                        variant="contained"
                        onClick={()=>clear()} 
                        component="span" fullWidth>Cancel</Button>


                    </Grid>
                </Grid>

            </div>
        </div>

    );

}


export default Categories