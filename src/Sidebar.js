import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./App.css";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import Button from "@material-ui/core/Button";
import FormComponent from "./Form";

const ColorButton = withStyles((theme) => ({
  root: {
    width: 229,
    height: 58,
    textTransform: "none",
    fontSize: 20,
    backgroundColor: "#A3FFD3",
    color: theme.palette.getContrastText("#A3FFD3"),
    fontFamily: "Roboto",
    "&:hover": {
      backgroundColor: "#A3FFD3",
      boxShadow: [
        "inset 0px 8px 28px -6px rgba(24, 39, 75, 0.12)",
        "inset 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
      ].join(","),
    },
  },
}))(Button);

const ToggleBtn = withStyles(() => ({
  root: {
    width: 108,
    height: 78,
    backgroundColor: "#EBF2F7",
    "&:hover": {
      backgroundColor: "#A3FFD3",
      boxShadow: [
        "inset 0px 8px 28px -6px rgba(24, 39, 75, 0.12)",
        "inset 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
      ].join(","),
      "&:active": {
        boxShadow: [
          "inset 0px 8px 28px -6px rgba(24, 39, 75, 0.12)",
          "inset 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
        ].join(","),
        backgroundColor: "#A3FFD3",
      },
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const mountedStyle = {
  animation: "inAnimation 100ms ease-in",
};

const unmountedStyle = {
  animation: "outAnimation 500ms ease-out",
  animationFillMode: "forwards",
};

const Sidebar = ({changeView , blurBg}) => {
  const [btnColor, setColor] = useState("#A3FFD3");
  const [sidenavWidth, setSidenavWidth] = useState(391);
  const [isMounted, setIsMounted] = useState(true);
  const [showDiv, setShowDiv] = useState(true);
  const classes = useStyles();

  const handleClick = () => {
    if (isMounted) {
      setColor("#FFAFAF");
      setSidenavWidth(1050);
      blurBg(true);
    }
    if (!isMounted) {
      setColor("#A3FFD3");
      setSidenavWidth(391);
      blurBg(false);
    }
    setIsMounted(!isMounted);
    if (!showDiv) {
      setShowDiv(true);
    }
  };

  return (
    <div className= "navContainer" style={{ width: sidenavWidth }}>
      <div className="leftNav">
        <div className="welcome">
          <img className="userImg" src="/user.jpg" alt="User" />
          <div className="welcomeMsg">
            <h3>Hi Reader,</h3>
            <p>Here's your News!</p>
          </div>
        </div>
        {showDiv && (
          <div
            className="toggleComponent"
            style={isMounted ? mountedStyle : unmountedStyle}
            onAnimationEnd={() => {
              if (!isMounted) setShowDiv(false);
            }}
          >
            <div className="toggleView">
              <h3>View Toggle</h3>

              <div className="toggleBtnGrp">
                <ToggleBtn
                  onClick={() => changeView("module")}
                  size="large"
                  aria-label="module"
                >
                  <ViewModuleIcon fontSize='large'/>
                </ToggleBtn>
                <ToggleBtn
                  onClick={() => changeView("list")}
                  size="large"
                  aria-label="list"
                >
                  <ViewListIcon fontSize='large'/>
                </ToggleBtn>
              </div>
            </div>
          </div>
        )}
        <div className="feedback">
          <h3>Have a Feedback?</h3>
          <ColorButton
            variant="contained"
            className={classes.margin}
            onClick={handleClick}
            style={{ backgroundColor: btnColor }}
          >
            We’re Listening!
          </ColorButton>
        </div>
      </div>

      <div className="form">
          {!isMounted && <FormComponent/>}
      </div>
    </div>
  );
};

export default Sidebar;
