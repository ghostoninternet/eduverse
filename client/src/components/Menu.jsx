import React,{useState}  from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';

const Menu = (props) => {
  
  return (
    <div>
      {props.isOpen ? (
        <div>
          <button onClick={props.handleClick}>
            <CloseIcon fontSize="large" className="" />
          </button>
        </div>
      ) : (
        <div className="">
          <button onClick={props.handleClick}>
            <MenuIcon fontSize="large" className="" />
          </button>
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Menu;
