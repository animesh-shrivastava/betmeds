import React, { useEffect, useState } from "react"
import MaterialTable from "@material-table/core";
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { styled, makeStyles } from '@mui/styles';
import { ServerURL,getData,postDataImage,postData } from '../fetchnodeservices';
import Swal from "sweetalert2";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 900,
    marginTop: 50

  },

  croot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csubdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #FFF',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',

    },

  },
});



export default function DisplayAllBanner(props) {
  var classes = useStyles()
  const [listbanner, setListbanner] = useState([])
  const [bannerid, setbannerId] = useState('')
   const [bannername, setbannername] = useState('')
  const [bannerimage, setbannerimage] = useState({ bytes: '', filename: '/image.png' })








  const fetchAllbanner = async () => {
    var result = await getData("bannerimages/displaybanners")
    setListbanner(result.result)
  }



  
  useEffect(function () {

    fetchAllbanner()

  }, [])




  
  const handleDeleteData = async (rowData) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        var body = { bannerid: rowData.bannerid, bannerimage: rowData.bannerimage }
        var result = await postData("bannerimages/deletebanner", body)
        if (result.result)
          Swal.fire(
            'Deleted!',
            'banner <b>'+rowData.bannername+'</b> has been deleted.',
            'success'
          )
      }
      else
        Swal.fire(
          'Deleted!',
          'Fail to Delete banner .',
          'error'
        )
      fetchAllbanner()
    })

  }
 

  
  function displayAll() {
    return (
      <MaterialTable
        title="List of banners"
        columns={[
          { title: 'banner Id', field: 'bannerid' },
          { title: 'banner Name', field: 'bannername' },
          {
            title: 'Picture', field: 'bannerimage',
            render: rowData => <img src={`${ServerURL}/images/${rowData.bannerimage}`} style={{ width:500,height:150 }} />
          },

        ]}
        data={listbanner}
        actions={[
        //   {
        //     icon: 'edit',
        //     tooltip: 'Edit Category ',
        //     // onClick: (event, rowData) => handleEdit(rowData)
        //   },
          {
            icon: 'delete',
            tooltip: 'Delete banner ',
             onClick: (event, rowData) => handleDeleteData(rowData)
          }
        ]}
      />
    )
  }


  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {displayAll()}
       
      </div>
    </div>

  )

}