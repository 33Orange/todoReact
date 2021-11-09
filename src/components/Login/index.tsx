import * as React from 'react';
import { useState, useCallback } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import useStyles from './style';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import {
  registerUserRequest,
  loginUserRequest,
} from '../../redux/actionCreators/userActionCreator';

import { IFormValue } from '../../types/form';

export default React.memo(function Login() {
  const { authorizationError } = useTypedSelector(state => state);
  const [isRegister, setIsRegister] = useState(true);

  const dispatch = useDispatch();

  const handleRedirectToRegister = () => {
    setIsRegister(false);
  };

  const handleRedirectToLogin = () => {
    setIsRegister(true);
  };

  const handleRegister = useCallback((value: IFormValue) => {
    dispatch(registerUserRequest(value));
  }, []);

  const handleLogin = useCallback((value: IFormValue) => {
    dispatch(loginUserRequest(value));
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {isRegister ? (
        <React.Fragment>
          <LoginForm handleLogin={handleLogin} />
          <span className={classes.link} onClick={handleRedirectToRegister}>
            Or u want register?
          </span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RegisterForm handleRegister={handleRegister} />
          <span className={classes.link} onClick={handleRedirectToLogin}>
            Or u want login?
          </span>
        </React.Fragment>
      )}
      <span className={classes.authorizationError}>{authorizationError}</span>
    </div>
  );
});
