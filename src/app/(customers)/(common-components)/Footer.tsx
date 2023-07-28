"use client";

import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../../theme";
import "./footer.scss";
import { Facebook, Google, Instagram, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="page-container">
          <footer>
            <div className="footer-container">
              <div className="content">
                <div className="logo-container">
                  <img
                    className="logo"
                    src="/navbar/COCCAN_white.png"
                    alt="logo"
                    width={80}
                    height={80}
                  ></img>
                  <Typography variant="h4">COCCAN</Typography>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <ul>
                    <li className="social-icons">
                      <a href="#">
                        <Facebook></Facebook>
                      </a>
                    </li>
                    <li className="social-icons">
                      <a href="#">
                        <Twitter></Twitter>
                      </a>
                    </li>
                    <li className="social-icons">
                      <a href="#">
                        <Instagram></Instagram>
                      </a>
                    </li>
                    <li className="social-icons">
                      <a href="#">
                        <Google></Google>
                      </a>
                    </li>
                  </ul>
                  <Typography variant="subtitle1">
                    Made by F-Teamwork
                  </Typography>
                  <h6>PROJECT SWP391 - COCCAN</h6>
                </Box>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Footer;
