import React from "react";
import clsx from 'clsx';
import * as authActions from '../../actions/authActions';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton, makeStyles } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./signin.scss";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
     margin: "0 auto",
    },
    margin: {
        margin: theme.spacing(1.5),
      },
    withoutLabel: {
        marginTop: theme.spacing(3),
      },
    textField: {
        width: '100%',
    },
    button: {
        width: '100px',
        height: "40px",
        marginTop: "20px"
    },
    buttonForm: {
        width: '100%',
        display: "flex",
        alignItems: "flex-end"
    }
    
  }));

function Signin(props) {   
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
      });
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const validateEmail = email => {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
      }
      const handleLogin = () => {
          const { email, password } = values;
          props.authActions.signIn({email: email, password: password}, props.history);       
      }
    return(
        <div className="signin">  
          <div className="signin-inner">
            <div className="signin-form">
              <form className={classes.root}>
                <div className={classes.textField}>
                  <h2>Авторизация</h2>
                </div>
                <FormControl className={clsx(classes.margin, classes.textField)}  variant="outlined">
                  <TextField      
                    id="email"
                    name="Email"
                    onChange={handleChange('email')}
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    error={!validateEmail(values.email) && values.email.length > 0 ? "Email недействителен" : ""}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                  <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                 />
               </FormControl>
               <FormControl className={clsx(classes.buttonForm)}>
                  <Button disabled={!validateEmail(values.email) || !values.password} onClick={handleLogin} className={classes.button} variant="contained" color="primary">
                    Войти
                  </Button>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      )
    }
Signin.propTypes = {
    isLoading: PropTypes.bool,    
};
const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading,
});
const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Signin));