import React from "react";
import {Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

function Header(props) {
    const { companyName, handleOpen, menu,  handleMenu} = props;
    console.log(menu)
    return (
        <div className="header-menu">
            <div className="header">
            <MenuIcon onClick={() => handleMenu(menu ? false : true)}/>
            <p>{companyName}</p>
            </div>
            <div >          
            <Button onClick={handleOpen} variant="contained" color="primary">
                <AddIcon/> Добавить
            </Button>           
            </div>
        </div>
        
    )  
}

export default Header;