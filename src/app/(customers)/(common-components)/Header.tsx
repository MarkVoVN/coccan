"use client";
import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Badge,
  Popper,
  MenuList,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import {
  AccountBalanceWallet,
  History,
  Logout,
  Person,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./_header.scss";
import SessionSeletorSection from "@/components/SessionSeletorSection";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import { useDispatch } from "react-redux";
import useStorage from "@/hooks/useStorage";
import { loginUser, logoutUser } from "@/app/GlobalRedux/Features/userSlice";
import { setOrderInfo } from "@/app/GlobalRedux/Features/orderSlice";
import { setCart } from "@/app/GlobalRedux/Features/cartSlice";
import PreferedLocationSelector from "@/components/PreferedLocationSelector";

function Header() {
  const categoryList = [
    { id: 1, name: "Drink" },
    { id: 2, name: "Snack" },
    { id: 3, name: "Rice" },
    { id: 4, name: "Bread" },
  ];
  const router = useRouter();
  // const [user, setUser] = useState<{
  //   displayName: string;
  //   email: string;
  //   photoURL: string;
  //   uid: string;
  //   refreshToken: string;
  // }>();

  const [search, setSearch] = useState("");

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const searchProduct = () => {
    //pass props and redirect to search page

    console.log("searching for" + location + " " + search);
    router.push("/search");
  };

  const handleOrderInfoDialogClose = () => {
    setOrderInfoDialogOpen(false);
  };

  const orderInfo = useAppSelector((state) => state.order.value);

  const isOrderInfoSetByUser = useAppSelector(
    (state) => state.order.value.isSetByUser
  );

  const [orderInfoDialogOpen, setOrderInfoDialogOpen] = useState(
    !isOrderInfoSetByUser
  );

  const [isUserProfileOpen, setIdUserProfileOpen] = useState(false);

  const handleUserProfileOpen = () => {
    setIdUserProfileOpen(true);
  };

  const handleUserProfileClose = () => {
    setIdUserProfileOpen(false);
    setIsUserMenuOpen(false);
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleUserMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(e.currentTarget);
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    removeItem("userInfo");
    dispatch(logoutUser());
    setIsUserMenuOpen(false);
  };

  const cartItemCount = useAppSelector(
    (state) => state.cart.countOfItemQuantity
  );
  const user = useAppSelector((state) => state.user.value);
  const cart = useAppSelector((state) => state.cart);

  //fetch cate list
  //const categoryList = useAppSelector((state) => state.category);
  const { getItem, setItem, removeItem } = useStorage();
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfoString = getItem("userInfo");
    if (!userInfoString) return;

    const userInfo = JSON.parse(userInfoString);
    dispatch(loginUser({ value: userInfo }));

    const orderInfoString = getItem("orderInfo");
    if (!orderInfoString) return;

    const orderInfo = JSON.parse(orderInfoString);
    dispatch(setOrderInfo({ value: orderInfo }));
    setOrderInfoDialogOpen(false);

    const cartInfoString = getItem("cartInfo");
    if (!cartInfoString) return;
    dispatch(setCart(JSON.parse(cartInfoString)));
  }, []);

  useEffect(() => {
    setItem("cartInfo", JSON.stringify(cart));
  }, [cartItemCount]);

  useEffect(() => {
    setItem("orderInfo", JSON.stringify(orderInfo));
  }, [orderInfo]);

  return (
    <>
      <Dialog
        open={orderInfoDialogOpen}
        onClose={handleOrderInfoDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Please Select your session and location
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choose your session and location now to help us show you the
            appropriate dishes
          </DialogContentText>
          <SessionSeletorSection></SessionSeletorSection>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrderInfoDialogClose} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isUserProfileOpen}
        onClose={handleUserProfileClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle className="text-center" id="alert-dialog-title">
          <Typography variant="h4">Profile</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="flex flex-row pl-[1rem]"
            id="alert-dialog-description"
          >
            <div className="w-1/3">
              <Typography variant="h6">{"Name: "}</Typography>
              <Typography variant="h6">{"Email: "}</Typography>
              <Typography variant="h6">{"Balance: "}</Typography>
              <Typography variant="h6">Prefered Location:</Typography>
            </div>
            <div className="w-1/2">
              <Typography variant="h6">{user.displayName}</Typography>
              <Typography variant="h6">{user.email}</Typography>
              <Typography variant="h6">{user.balance}</Typography>
              <PreferedLocationSelector></PreferedLocationSelector>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserProfileClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="static" className="navbar">
        <Toolbar>
          <div className="navbar-container flex flex-row justify-center">
            <Link
              href={"/"}
              className="navbar-logo flex flex-row justify-start items-center w-fit"
            >
              <div className="logo-container">
                <img className="logo" src="/navbar/Logo.png" alt="logo"></img>
              </div>
              <Typography variant="h3">COCCAN</Typography>
            </Link>
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
            </div>
            <div className="navbar-icon flex flex-row justify-end items-center">
              <div className="cart-icon-container px-[0.5rem]">
                <Link href="/cart">
                  <IconButton size="large">
                    <Badge badgeContent={cartItemCount}>
                      <ShoppingCart fontSize="inherit"></ShoppingCart>
                    </Badge>
                  </IconButton>
                </Link>
              </div>
              <div className="avatar-login-container px-[0.5rem]">
                {user.isAuth && (
                  <IconButton>
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName}
                      onClick={handleUserMenuClick}
                    />
                  </IconButton>
                )}
                {!user.isAuth && (
                  <Button
                    size="large"
                    className="login-btn"
                    variant="contained"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Popper
            open={isUserMenuOpen}
            anchorEl={userMenuAnchorEl}
            placement="bottom-end"
          >
            <MenuList className="user-menu-container">
              <MenuItem onClick={handleUserProfileOpen}>
                <ListItemIcon>
                  <Person></Person>
                </ListItemIcon>
                <Typography variant="body1">Profile</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <History></History>
                </ListItemIcon>
                <Link href={"/history"}>Order History</Link>
              </MenuItem>
              <MenuItem onClick={handleUserProfileOpen}>
                <ListItemIcon>
                  <AccountBalanceWallet></AccountBalanceWallet>
                </ListItemIcon>
                <Typography variant="body1">Balance</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout></Logout>
                </ListItemIcon>
                <Typography variant="body1">Logout</Typography>
              </MenuItem>
            </MenuList>
          </Popper>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
