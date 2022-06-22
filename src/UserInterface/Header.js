import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Menu, MenuItem, Grid, Badge } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getData, postData } from '../fetchnodeservices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import  useMediaQuery from '@mui/material/useMediaQuery';


import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




// import Categories from '../administrator/categories';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
/////////////////////////////// Header Start/////////////////////////////////////////////////////////
export default function Header() {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [userIcon, setuserIcon] = useState(null);
  const [PanchorEl, setPAnchorEl] = useState(null);


  const openp = Boolean(PanchorEl);//open pop cart product

  const open = Boolean(anchorEl);
  const openUserIcon = Boolean(userIcon);// oprn user icon popup option

  var products = useSelector(state => state.product);//select product from redux state
  var keys = Object.keys(products).length;//select product keys from redux state and calculate length
  var navigate=useNavigate();    // for navigate on specific route
  var theme=useTheme();
  const matches=useMediaQuery(theme.breakpoints.down('md'));// media query for responsiveness

  var listproducts = Object.values(products);//select product values only from redux state 


  var totalamount=listproducts.reduce(calculateamount,0)
  var offeramount=listproducts.reduce(offeramount,0)

  function calculateamount(p,n){
    return (p+(n.price*n.qty))
  }

  function offeramount(p,n){
    return (p+(n.offerprice*n.qty))
  }




  const handleproductlist=(categoryid)=>{

    navigate('/productlist',{state:{category:categoryid}})
    
    
    }
    






  const ProductShowCart = () => {
    return listproducts.map((item,index) => {

      return (<>
     
        <Grid container spacing={2} style={{ marginBottom: "10px" }} >
          <Grid item xs={8}>
            <span style={{ fontWeight: "lighter", letterSpacing: 2 }}>{item.productname}</span>

          </Grid>
          <Grid item xs={4} >
            <span style={{ fontWeight: "lighter", letterSpacing: 2, display: "flex", justifyContent: "right" }}>&#8377; {item.offerprice} x {item.qty} </span>

          </Grid>
        </Grid>
      </>
      )

    })
    
  }

  const handlePopoverOpen = (event) => {
    setPAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPAnchorEl(null);
  };

  const handleClick = (event, categoryid) => {
    // alert(categoryid)
    setAnchorEl(event.currentTarget);
    fecthallSubcategoriesById(categoryid)
    // alert("hello")
    // alert(JSON.stringify(subcategory))
  };
  const handleClose = () => {
    setAnchorEl(null);
    setuserIcon(null);
  };


  const userIconClick = (event) => {
    setuserIcon(event.currentTarget);


  }


  const fecthallcategories = async () => {
    var result = await getData("category/displaycategories");
    setCategory(result.result);

  }


  const fecthallSubcategoriesById = async (cid) => {
    var result = await postData("subcategory/displaysubcategories", { catid: cid });
    setSubcategory(result.result);
  }

  // const fecthallSubcategories = async (cid) => {
  //   var result = await postData("subcategory/displayallsubcategory");
  //   setallSubcategory(result.result);
  // }

  useEffect(function () {
    fecthallcategories();
    // fecthallSubcategories();
  
  }, [])


  const CartPopover = () => {

    return (
      <div>

        <Popover
          style={{ marginTop: "10px", }}
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={openp}
          anchorEl={PanchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div style={{ width: 400, padding: 20 }}>
            <Grid container spacing={2} style={{ marginBottom: "10px" }}>
              <Grid item xs={8}>
                <span style={{ fontWeight: "lighter", letterSpacing: 2 }}>Order Summary</span>

              </Grid>
              <Grid item xs={4}>
                <span style={{ fontWeight: "lighter", letterSpacing: 2, display: "flex", justifyContent: "right" }}>({keys}) Items</span>

              </Grid>
            </Grid>
            <hr fullWidth />


            {ProductShowCart()}


            <Grid container spacing={5} >
              <Grid item xs={6}>
                <span style={{ color: "#fbc531" }}>Total &#8377; {`${(offeramount).toFixed(2)}`} </span>
              
                <span style={{ color: "green",display:"block" }}>You Save &#8377; {`${(totalamount-offeramount).toFixed(2)}`} </span>
              </Grid>

              {/* <Grid item xs={6}style={{ display: "flex", justifyContent: "right" }} >
<Button style={{color:"white",background:"green"}}>Proceed To Cart</Button>
              </Grid> */}

            </Grid>

          </div>
        </Popover>
      </div>
    );

  }

  const Appbar2 = () => {
    return (
      <div style={{ width: "100%", background: "black", height: "40px", display: "flex", justifyContent: "center"}}>

        {category.map((item, index) => {
          return (<>
            {index <= 6 ? <span>
              <span>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  // onClick={(event) => handleClick(event, item.categoryid)}
                  style={{ color: 'white', fontSize: "15px", marginRight: "50px" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", fontFamily:"Sarabun", }}> {matches?<></>:item.categoryname}</div>
                </Button>
              </span>
            </span> : <></>}</>
          )
        })}


      </div>
    )

  }


  const showMainCategory = () => {
    return category.map((item, index) => {
      return (<>
        {index <= 3 ? <div>
          <div >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => `${handleClick(event, item.categoryid)} `}
            
              style={{ color: 'black', fontSize: "20px", marginRight: "50px",fontFamily:"Sarabun",fontWeight:"bold", }}>
              <span > {item.categoryname}</span>
            </Button>
          </div>
        </div> : <></>}</>
      )
    })
  }

  const showSubcategory = () => {
    return subcategory.map((item) => {

      return (
        <MenuItem style={{ width: "150px", fontSize: "16px" }} value={item.subcategoryid}>
          <span style={{ fontFamily: "Sarabun", fontSize: "14px" }}>  {item.subcategoryname}
          </span>

        </MenuItem>

      )
    })
  }


  const handleCategoryProducts=(categoryid)=>{
    navigate('/productlist',{state:{category:categoryid}})
  }
 
  const [MenuIconList, setMenuIconList] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuIconList({ ...MenuIconList, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {category.map((item, index) => (
          <ListItem button key={item.categoryid}>
            <ListItemIcon>
              
            </ListItemIcon>
            <ListItemText onChange={()=>handleCategoryProducts(item.categoryid)} primary={item.categoryname} />
          </ListItem>
        ))}
      </List>
      
    </Box>
  );







  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="static">
        <Toolbar>

{/* {macthes is for reposiveness if it matches  to a particular size given above in Media Query} */}
       { matches?  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleDrawer('left',true)} />
          </IconButton>:<></>}

          <div style={{ marginRight: "auto" }}>

            {/* <img src='/best meds  1 png.png' height="100px"></img>   */}
            <img src='/Best Meds 2 PNG.png' height="100px"></img>




          </div>

          <div style={{ width: "70%", display: "flex", justifyContent: "center" }}   >
            {matches?<></>:showMainCategory()}
{/* {macthes is for reposiveness if it matches  to a particular size given above in Media Query} */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {showSubcategory()}
            </Menu>
          </div>
          <div style={{ width: "13%", display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Medicine Here…"
                inputProps={{ 'aria-label': 'search' }}
                style={{ border: "1px solid black", borderRadius: "20px" }}
              />
            </Search>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <span>
              <Badge badgeContent={keys} color="secondary">
                <ShoppingCartIcon
                  aria-owns={openp ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  fontSize='medium'
                  style={{ marginLeft: "50px" }}
                  onClick={()=>navigate('/showcart',{state:{cartreview:""}})}
                />
              </Badge>
              {CartPopover()}
            </span>
            <span><Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => userIconClick(event)}
            >

              <PersonIcon fontSize='medium' style={{ marginLeft: "20px", color: "black" }} />
              
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={userIcon}
                open={openUserIcon}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                }}
              >
                <MenuItem>Your Profile</MenuItem>
                <MenuItem>Logout</MenuItem>

              </Menu></span>
          </div>
        </Toolbar>
      </AppBar>


      {Appbar2()}

      <div>
      <React.Fragment key={'left'}>
          
          <SwipeableDrawer
            anchor={'left'}
            open={MenuIconList['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>

    </Box>

  );
}
//////////////////////////////////// Header Ends////////////////////////////////////////////////////

