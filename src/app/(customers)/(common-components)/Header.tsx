"use client";
import {
  AppBar,
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
  ThemeProvider,
  MenuItem,
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
import theme from "../../theme";
import PreferedLocationSelector from "@/components/PreferedLocationSelector";
function Header() {
  const categoryList = [
    { id: 1, name: "Drink" },
    { id: 2, name: "Snack" },
    { id: 3, name: "Rice" },
    { id: 4, name: "Bread" },
  ];
  const router = useRouter();

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
    if (orderInfo.isSetByUser) setOrderInfoDialogOpen(false);
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
  //const categoryList = useAppSelector((state) => state.category);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={orderInfoDialogOpen} onClose={handleOrderInfoDialogClose}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Typography variant="h5" fontWeight="500">
              Please select your timeslot and location
            </Typography>
            <Typography variant="subtitle2" color="gray">
              Choose your timeslot and location now to help us show you the
              appropriate dishes
            </Typography>
            <SessionSeletorSection></SessionSeletorSection>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderInfoDialogClose}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <AppBar position="sticky" sx={{ bgcolor: "white" }} className="navbar">
          <Toolbar>
            <div className="navbar-container">
              <Link
                href={"/"}
                className="navbar-logo"
                style={{ textDecoration: "none" }}
              >
                <div className="logo-container">
                  <img className="logo" src="/navbar/Logo.png" alt="logo"></img>
                </div>
                <Typography variant="h4" fontWeight="500" className="title">
                  COCCAN
                </Typography>
              </Link>
              <div className="navbar-icon">
                <div className="navbar-search">
                  <TextField
                    className="search"
                    label="Search"
                    value={search}
                    type="search"
                    onChange={handleSearchChange}
                    fullWidth={true}
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
                <div className="cart-icon-container">
                  <Link href="/cart">
                    <IconButton size="large">
                      <Badge badgeContent={cartItemCount} color="primary">
                        <ShoppingCart fontSize="inherit"></ShoppingCart>
                      </Badge>
                    </IconButton>
                  </Link>
                </div>
                <div className="avatar-login-container">
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
                      variant="contained"
                      color="primary"
                      className="button"
                    >
                      <Link
                        href="/login"
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        Log In
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
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
            <Popper
              open={isUserMenuOpen}
              anchorEl={userMenuAnchorEl}
              placement="bottom-end"
              sx={{ zIndex: 2000 }}
            >
              <MenuList className="user-menu-container">
                <MenuItem
                  className="user-menu-item"
                  onClick={handleUserProfileOpen}
                >
                  <ListItemIcon className="user-menu-item-icon">
                    <Person></Person>
                  </ListItemIcon>
                  <Typography variant="body1">Profile</Typography>
                </MenuItem>
                <MenuItem className="user-menu-item">
                  <ListItemIcon className="user-menu-item-icon">
                    <History></History>
                  </ListItemIcon>
                  <Link href={"/history"} className="user-menu-link">
                    Order History
                  </Link>
                </MenuItem>
                <MenuItem
                  className="user-menu-item"
                  onClick={handleUserProfileOpen}
                >
                  <ListItemIcon className="user-menu-item-icon">
                    <AccountBalanceWallet></AccountBalanceWallet>
                  </ListItemIcon>
                  <Typography variant="body1">Balance</Typography>
                </MenuItem>
                <MenuItem className="user-menu-item" onClick={handleLogout}>
                  <ListItemIcon className="user-menu-item-icon">
                    <Logout></Logout>
                  </ListItemIcon>
                  <Typography variant="body1">Logout</Typography>
                </MenuItem>
              </MenuList>
            </Popper>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default Header;
