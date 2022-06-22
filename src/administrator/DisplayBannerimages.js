import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { makeStyles } from "@mui/styles";
import { postData, postDataImage, getData, ServerURL } from "../fetchnodeservices";
import Dialog from "@mui/material/Dialog";
import { alpha, styled } from "@mui/material/styles";
import { Grid, TextField, Button, Avatar, Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1.5px solid #FFF",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#FFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFF",
    },
  },
});
const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subdiv: {
    background: "#00cec9",
    padding: 20,
    width: 1000,
    marginTop: 50,
  },
  droot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dsubdiv: {
    background: "#00cec9",
    padding: 20,
    width: 1500,
    marginTop: 50,
  },
});

export default function DisplayBannerImages(props) {
  const classes = useStyles();
  const [categorylist, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = React.useState("");
  const [subcategoryId, setSubcategoryId] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [productImagesId, setProductImagesId] = useState("");
 
  const [list, setList] = useState([]);
  const [subCategoryList, setSubcategoryList] = useState([]);
  const [brandlist, setBrandList] = useState([]);
  const [productlist, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState({ bytes: "", filename: "/image1.png" });
  const [showButton, setShowButton] = useState(false);
  const [tempIcon, setTempIcon] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);

  const handleCancel = () => {
    setShowButton(false);
    setBtnStatus(true);
    setIcon({ bytes: "", filename: `${ServerURL}/images/${tempIcon}` });
  };

  const handleOpen = (rowData) => {
    setProductImagesId(rowData.productimagesid);
    setCategoryId(rowData.categoryid);
    fetchSubcategories(rowData.categoryid);
    fetchBrands(rowData.subcategoryid);
    fetchProducts(rowData.brandid);
    setSubcategoryId(rowData.subcategoryid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    
    
    setIcon({ bytes: "", filename: `${ServerURL}/images/${rowData.image}` });
    setTempIcon(rowData.image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchProducts();
    setShowButton(false)
    setBtnStatus(true)
  };

  /***********************Dialog ****************************************************/
  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    fetchSubcategories(event.target.value);
  };

  const fetchCategories = async () => {
    var result = await getData("categories/displayallcategories");
    setCategoryList(result.result);
  };
  useEffect(function () {
    fetchCategories();
  }, []);

  const fillCategory = () => {
    return categorylist.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handleSubCategoryChange= (event) => {
    setSubcategoryId(event.target.value);
    fetchBrands(event.target.value);
  };

  const fetchSubcategories = async (cid) => {
    var result = await postData("subcategories/displaysubcategory", { categoryid: cid });
    setSubcategoryList(result.result);
    
  };

  const fillSubcategory = () => {
    return subCategoryList.map((item) => {
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
    });
  };

  const handleBrandChange = (event) => {
    setBrandId(event.target.value);
    fetchAllProducts(event.target.value);
  };

  const fetchBrands = async (scid) => {
    var result = await postData("brand/displaybrand", { subcategoryid: scid });
    setBrandList(result.result);
    
  };
 

  const fillBrands = () => {
    return brandlist.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };


  const fetchAllProducts=async(bid)=>{
    //alert(bid)

    var result = await postData("productimages/displayallproductimages",{brandid:bid,subcategoryid:subcategoryId})
    setProductList(result.result)
 }

useEffect(function () {
    fetchAllProducts();
  }, []);
  const handleChangeproduct = async(event) => {
    setProductId(event.target.value)
    
    };

const fillproduct=()=>{
    return productlist.map((item)=>{
    return(
      <MenuItem value={item.productid}>{item.productname}</MenuItem>
    )
    })
    }

 

  const handleIconChange = (event) => {
    setShowButton(true);
    setBtnStatus(false);
    setIcon({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleIconSave = async () => {
    var formData = new FormData();
    formData.append("productimagesid", productImagesId);
    formData.append("icon", icon.bytes);
    var result = await postDataImage("productimages/editicon", formData);
    if (result.result) {
      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Your Product Icon has been Updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "fail",
        title: "Fail to update product Icon",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setShowButton(false);
    setBtnStatus(true);
  };

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var dresult = await postData("productimages/deletedata", { productimagesid: rowData.productimagesid });
        if (dresult.result) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        }
      }
      fetchAllProducts();
    });
  };

  const handleSubmit = async () => {
    var result = await postData("productimages/editdata", {
      categoryid: categoryId,
      subcategoryid: subcategoryId,
      brandid: brandId,
      productid: productId,
      productimagesid: productImagesId,
     
    });
    if (result.result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your products has been updated",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "fail",
        title: "Fail to update products",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <div className={classes.root}>
              <style jsx>
                {`
                  fieldset.MuiOutlinedInput-notchedOutline {
                    border-color: white !important;
                  }

                  svg.MuiSvgIcon-root {
                    color: white !important;
                  }

                  div.MuiOutlinedInput-input.MuiSelect-select {
                    color: #fff !important;
                  }
                `}
              </style>

              <div className={classes.subdiv}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                    Edit Products
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryId}
                        label="Category"
                        onChange={(event) => handleCategoryChange(event)}
                      >
                        {fillCategory()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Sub Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subcategoryId}
                        label="Sub Category"
                        onChange={(event) => handleSubCategoryChange(event)}
                      >
                        {fillSubcategory()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                        Brands
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandId}
                        label="Brands"
                        onChange={(event) => handleBrandChange(event)}
                      >
                        {fillBrands()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productId}
          label="Product"
          onChange={(event)=>handleChangeproduct(event)}
        >
          {fillproduct()}
        </Select>
      </FormControl>
      </Grid>
      {/* <Grid item xs={4}>
                    <CssTextField
                      variant="outlined"
                      value={productName}
                      InputLabelProps={{
                        style: { color: "#FFF" },
                      }}
                      inputProps={{ style: { color: "#FFF" } }}
                      label="Product Name"
                      onChange={(event) => setProductName(event.target.value)}
                      fullWidth
                    />
                  </Grid> */}
                  
                  <Grid item xs={12}>
                    <Button
                      onClick={() => handleSubmit()}
                      style={{
                        background: "#FFF",
                        color: "#7ed6df",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      fullWidth
                    >
                      Edit Data
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider style={{ background: "#FFF" }} />
                  </Grid>

                  <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {btnStatus ? (
                      <>
                        <label htmlFor="contained-button-file">
                          <Input onChange={(event) => handleIconChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
                          <Button
                            style={{
                              background: "#FFF",
                              color: "#7ed6df",
                              fontWeight: "bold",
                            }}
                            variant="contained"
                            component="span"
                            fullWidth
                          >
                            Upload
                          </Button>
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                    {showButton ? (
                      <div>
                        {" "}
                        <Button onClick={handleIconSave} style={{ color: "#FFF", fontWeight: "bold" }}>
                          Save
                        </Button>
                        <Button onClick={handleCancel} style={{ color: "#FFF", fontWeight: "bold" }}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={icon.filename}
                      // variant="rounded"
                      sx={{ width: 70, height: 70 }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  /**********************Dialog End ****************************************************/

  const fetchProducts = async () => {
    var result = await getData("productimages/displayproductimages");
    setList(result.result);
  };
  useEffect(function () {
    fetchProducts();
  }, []);

  function display() {
    return (
      <MaterialTable
        title="List Products"
        columns={[
          { title: "Product Image ID", field: "productimagesid" },
          { title: "Category", field: "categoryname" },
          { title: "Sub-Category", field: "subcategoryname" },
          { title: "Brand", field: "brandname" },
          { title: "Product Name", field: "productname" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => <img src={`${ServerURL}/images/${rowData.image}`} style={{ width: 60, borderRadius: "25%" }} alt="" />,
          },
        ]}
        data={list}
        actions={[
          {
            icon: "edit",
            tooltip: "edit subcategory",
            onClick: (event, rowData) => {
              handleOpen(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Category",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div>
      <div className={classes.droot}>
        <div className={classes.dsubdiv}>
          {display()}
          {showDialog()}
        </div>
      </div>
    </div>
  );
}
