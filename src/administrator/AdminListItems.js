import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category'
import Categories from './categories'
import SubCategories from './subcategories'
import Brand from './Brands'
import Product from './Product'
import Typography from '@mui/material/Typography';
import ProductImages from './ProductImages';
import Image from '@mui/icons-material/Image'
import BannerImages from './BannerImages';
import DisplayAllCoupon from './DisplayAllCoupon';
import Coupon from './Coupon';



export default function AdminListItems(props) {

  const handleClick = (v) => {
    props.setViewContainer(v)

  }




  return (
    <React.Fragment>
      <ListItemButton >
        <ListItemIcon >
          <DashboardIcon />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Dashboard
        </Typography>

      </ListItemButton>

      <ListItemButton onClick={() => { handleClick(<Categories setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <CategoryIcon />

        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Categories
        </Typography>
      </ListItemButton>

      <ListItemButton onClick={() => { handleClick(<SubCategories setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Sub-Categories
        </Typography>
      </ListItemButton>

      <ListItemButton onClick={() => { handleClick(<Brand setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Brands
        </Typography>
      </ListItemButton>

      <ListItemButton onClick={() => { handleClick(<Product setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Products
        </Typography>
      </ListItemButton>



      <ListItemButton onClick={() => { handleClick(<ProductImages setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <Image />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Products Images
        </Typography>
      </ListItemButton>



      <ListItemButton onClick={() => { handleClick(<BannerImages setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <Image />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Banner
        </Typography>
      </ListItemButton>



      <ListItemButton onClick={() => { handleClick(<Coupon setViewContainer={props.setViewContainer} />) }}>
        <ListItemIcon>
          <Image />
        </ListItemIcon>
        <Typography
          variant="h6"
          color="inherit"

        >
          Coupon
        </Typography>
      </ListItemButton>

    </React.Fragment>
  );
}