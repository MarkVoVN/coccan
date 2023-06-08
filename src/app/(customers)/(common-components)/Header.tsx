"use client"
import { AppBar, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Typography, TextField, InputAdornment, IconButton, Avatar, Box } from '@mui/material'
import React from 'react'
import LogoIcon from '../../LogoIcon'
import { useState, useEffect } from 'react'
import {Search, ShoppingCart} from '@mui/icons-material';
import Link from 'next/link'
import { redirect } from 'next/navigation'
import './_header.scss'
function Header() {

  const [user , setUser] = useState<{
          
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    refreshToken: string,
  
} >();

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        if (!userInfo){
            //redirect('/');
        } else {
            setUser(JSON.parse(userInfo));
        }
    }, [])

  const [search, setSearch] = useState('');

  const handleSearchChange = (e : any) => {
    setSearch(e.target.value);
  }

  const [category, setCategory] = useState(0);

  const handleCategoryChange = (e : any) => {
    setCategory(e.target.value);
  }

  const searchProduct = () => {
    //pass props and redirect to search page
    console.log("searching for" + location + " " + category + " " + search);
  } 

  //fetch cate list
  const categoryList = [
    {id: 1, name: 'Drink'},
    {id: 2, name: 'Snack'},
    {id: 3, name: 'Rice'},
    {id: 4, name: 'Bread'},
  ]

  return (
    <AppBar position='static' className='navbar'>
      <Toolbar>
      <Box className="navbar-container">
        <Box className="navbar-logo">
          <Box className="logo-container">
            <img className="logo" src="./navbar/logo.png" alt='logo'></img>
          </Box>
          <Typography variant = 'h3'>
            COCCAN
          </Typography>
        </Box>
        <Box className="navbar-search">
        <TextField 
          className='search'
          label = "Search"
          value={search}
          type='search'
          onChange={handleSearchChange}
          fullWidth={true}
          sx={{color : '#4F200D'}}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton size='small' onClick={searchProduct}>
              <Search fontSize='inherit'></Search>
              </IconButton>
              
            </InputAdornment>
          }}>
          </TextField>

          <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
          autoWidth
          >
            <MenuItem value = {0}>All</MenuItem>
            {
            categoryList.map((category) => 
            (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)
          )}
          </Select>
        </Box>
        <Box className="navbar-icon">
        <Link href="/cart">
              <IconButton size='large'>
                  <ShoppingCart fontSize='inherit'></ShoppingCart>
              </IconButton>
            </Link>
            {user && <Avatar src = {user.photoURL} alt={user.displayName}/>}
            {!user && <Link href="/">Log In</Link>  }
        </Box>
      </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header