
import React, { useState,useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postDataImage,ServerURL,getData,postData} from '../fetchnodeservices';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayBrand from './DisplayAllBrands'
import Swal from "sweetalert2"

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

function Brand(props) {
  const classes = useStyles();
  const [categoryid, setCategoryID] = useState("")
  const [subCategoryId, setSubCategoryID] = useState("")
  const [brandname, setBrandName] = useState("")
  const [brandicon, setBrandIcon] = useState({ bytes: "", filename: "/default.png" })
  const [status, setStatus] = useState("")
  const [list, setList] = useState([])
  const [SClist, setSCList] = useState([])


  const handleIconChange = (event) => {

      setBrandIcon({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })

  }

  const saveBrand = async () => {
      var formData = new FormData();
      formData.append('subcategoryid', subCategoryId);
      formData.append('categoryid', categoryid);
      formData.append('brandname', brandname)
      formData.append('icon', brandicon.bytes);
      formData.append('status', status);

      var result = await postDataImage('brands/brand', formData)
      if (result.result) {
          
          Swal.fire({

              position: 'top-middle',
              icon: 'success',
              title: 'Your Brand has been Inserted Succesfully',
              showConfirmButton: true,
              timer: 5000

          })
      }

  }

  const fetchallcategories = async () => {
      var result = await getData("category/displaycategories")
      setList(result.result)

  }

  const fetchallsubcategories = async () => {
      var result = await postData("subcategory/displaysubcategories")
      setSCList(result.result)
      // alert(JSON.stringify(categoryid))
  }



  useEffect(() => {
      fetchallcategories()
      fetchallsubcategories()
  }, [])

  
  const handleChanged = (event) => {
      setSubCategoryID(event.target.value)
    //   alert(categoryid)
      
  }

  const handleChange = async(event) => {
      setCategoryID(event.target.value);
      var result = await postData("subcategory/displaysubcategories",{catid:event.target.value})
      setSCList(result.result)

  };

  const fillSubCategory = () => {
      return SClist.map((item) => {
          return (
              <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
          )
      })
  }
 

  const fillCategory = () => {
      return list.map((item) => {
          return (
              <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          )
      })
  }


 
const handleDisplayBrands=()=>{
  props.setViewContainer(<DisplayBrand/>)
  
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
                     Brands Interface   
                      </Grid>
                      <Grid item xs={5}>
                          
                          <Button onClick={()=>handleDisplayBrands()} style={{fontSize:"1",fontWeight:"bold",color:"#00cec9",background:"#FFF"}} variant="contained" component="span" fullWidth>
                              List Brands 
                          </Button>
                          </Grid>
          <Grid item xs={12}>
                      <FormControl fullWidth>
                          <InputLabel ></InputLabel>
                          <Select
                              value={categoryid} displayEmpty
                              onChange={handleChange}
                              style={{ color: "white" }}
                              variant="outlined"
                          >
                              <MenuItem value="" disabled>Select Category</MenuItem>
                              {fillCategory()}
                          </Select>
                      </FormControl>

                  </Grid>


                  <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                  <FormControl fullWidth>
                          <InputLabel ></InputLabel>
                          <Select
                              value={subCategoryId} displayEmpty
                              onChange={handleChanged}
                              style={{ color: "white" }}
                              variant="outlined"
                          >
                              <MenuItem value="" disabled>Select Sub Category</MenuItem>
                              {fillSubCategory()}
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>

                      <CssTextField InputLabelProps={{ style: { color: "white" } }}
                          InputProps={{ style: { color: "white" } }}
                          variant="outlined"
                          label="Brand Name "
                          text={brandname}
                          onChange={(event) => setBrandName(event.target.value)}
                          fullWidth />

                  </Grid>
                  <Grid item xs={12} style={{ alignItems: "center", display: "flex", flexDirection: "column", fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>

                      <CssTextField InputLabelProps={{ style: { color: "white" } }}
                          InputProps={{ style: { color: "white" } }}
                          variant="outlined"
                          label="Status "
                          
                          onChange={(event) => setStatus(event.target.value)}
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
                          src={brandicon.filename}
                          variant="rounded"
                          sx={{ width: 80, height: 50 }}

                      />



                  </Grid>
                  <Grid item xs={6}>
                      <label>

                          <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                              variant="contained"
                              onClick={() => saveBrand()}
                              component="span" fullWidth>
                              Submit
                          </Button>
                      </label>

                  </Grid>
                  <Grid item xs={6}>

                      <Button style={{ fontWeight: "bold", color: "#00cec9", background: "#FFF" }}
                          variant="contained"
                          onClick={() => setCategoryID("")}
                          type='reset'
                          component="span" fullWidth>Cancel</Button>


                  </Grid>
              </Grid>

          </div>
      </div>

  );

}


export default Brand