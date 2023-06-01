"use client"
import { AppBar, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Typography, TextField, InputAdornment, IconButton, Avatar } from '@mui/material'
import React from 'react'
import LogoIcon from '../LogoIcon'
import { useState, useEffect } from 'react'
import {Search, ShoppingCart} from '@mui/icons-material';
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
            redirect('/');
        } else {
            setUser(JSON.parse(userInfo));
        }
    }, [])

  
  const [location, setLocation] = useState('FPT Q9');

  const handleLocationChange = (e: SelectChangeEvent) => {
    setLocation(e.target.value);
  }

  

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
    <AppBar position='static'>
      <Toolbar>
        <LogoIcon fontSize="large"></LogoIcon>
        <Typography variant = 'h6'>
          COCCAN
        </Typography>
        <Stack direction="row" spacing={2}>
          <Select
          value={location}
          label="Location"
          onChange={handleLocationChange}
          autoWidth
          >
            <MenuItem value = {'FPT Q9'}>FPT Q9</MenuItem>
            <MenuItem value = {'NVH'}>NVH</MenuItem>
          </Select>

          <TextField label = "Search"
          value={search}
          type='search'
          onChange={handleSearchChange}
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
          <Link href="/cart">
            <IconButton size='large'>
                <ShoppingCart fontSize='inherit'></ShoppingCart>
            </IconButton>
          </Link>
          {user && <Avatar src = {user.photoURL} alt={user.displayName}/>}
          {!user && <Link href="/">Log In</Link>  }

        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header