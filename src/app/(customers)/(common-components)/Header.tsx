"use client";
import {
  AppBar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import LogoIcon from "../../LogoIcon";
import { useState, useEffect } from "react";
import { Search, ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./_header.scss";
function Header() {
  const [user, setUser] = useState<{
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    refreshToken: string;
  }>();

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      //redirect('/');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const [search, setSearch] = useState("");

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const [category, setCategory] = useState(0);

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const searchProduct = () => {
    //pass props and redirect to search page

    console.log("searching for" + location + " " + category + " " + search);
    redirect("/search");
  };

  //fetch cate list
  const categoryList = [
    { id: 1, name: "Drink" },
    { id: 2, name: "Snack" },
    { id: 3, name: "Rice" },
    { id: 4, name: "Bread" },
  ];

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <div className="navbar-container flex flex-row justify-center">
          <div className="navbar-logo flex flex-row justify-start items-center">
            <div className="logo-container">
              <img className="logo" src="./navbar/logo.png" alt="logo"></img>
            </div>
            <Typography variant="h3">COCCAN</Typography>
          </div>
          <div className="navbar-search flex flex-row justify-center">
            <TextField
              className="search"
              label="Search"
              value={search}
              type="search"
              onChange={handleSearchChange}
              fullWidth={true}
              sx={{ color: "#4F200D" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={searchProduct}>
                      <Link href={"/search"}></Link>
                      <Search fontSize="inherit"></Search>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <div className="category-selector w-[1/8]">
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value={0}>All</MenuItem>
                {categoryList.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="navbar-icon flex flex-row justify-end items-center">
            <div className="cart-icon-container px-[0.5rem]">
              <Link href="/cart">
                <IconButton size="large">
                  <ShoppingCart fontSize="inherit"></ShoppingCart>
                </IconButton>
              </Link>
            </div>
            <div className="avatar-login-container px-[0.5rem]">
              {user && <Avatar src={user.photoURL} alt={user.displayName} />}
              {!user && (
                <Button size="large" className="login-btn" variant="contained">
                  <Link href="/">Log In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
