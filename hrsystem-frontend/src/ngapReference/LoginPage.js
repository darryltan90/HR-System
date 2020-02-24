import { Grid, Paper, Typography, withStyles, Slide, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import compose from 'recompose/compose';
import { login } from './../../api/LoginAPI';
import { FullWidthRoundedSideButton, OutlinedWithValidationDenseField, LanguageSelector } from './../../components/widget';
import { sessionLogin, LoginUpdate, showSnackbar } from './../../redux/actions';
import { indigoFont } from './../../util/ColorCode';
import Registration from './../Registration/Registration';
import ForgotPassword from './../ForgotPassword/ForgotPasswordForm';
import _ from 'lodash';

const styles = theme => ({
   app: {
      padding: '0 50% 0 0',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
   },
   paper: {
      borderRadius: 50,
   },
   appSignup: {
      overflow: 'hidden',
      padding: '0 0 0 10%',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
   },
   paperSignup: {
      borderRadius: '50px 0 0 50px',
   },
   appForgot: {
      overflow: 'hidden',
      padding: '0 35% 0 35%',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
   },
   paperForgot: {
      borderRadius: '50px',
   },
});

const mapStateToProps = state => {
   return {
      failureRootCause: state.Authentication.failureRootCause,
      auth: state.Authentication.auth,
      display: state.Login.display,
      i18n: state.GlobalSettings.i18n,
   }
};

const Login = props => {
   const { classes, history, sessionLogin, display, LoginUpdate, showSnackbar, i18n } = props;

   const [userEmail, setUserEmail] = useState('');
   const [emailError, setEmailError] = useState('');

   const [userPassword, setUserPassword] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const [loginBtnLabel, setLoginBtnLabel] = useState(_.get(i18n, 'login.log_in'));

   useEffect(() => { setLoginBtnLabel(_.get(i18n, 'login.log_in')) }, [i18n])

   const signin = async () => {
      if (!Boolean(userEmail.length) || !Boolean(userPassword.length)) {
         setEmailError(Boolean(userEmail.length) ? '' : _.get(i18n, "forgot_password.email_cannot_empty"));
         setPasswordError(Boolean(userPassword.length) ? '' : _.get(i18n, "forgot_password.password_cannot_empty"));
      }

      if (Boolean(userEmail.length) && Boolean(userPassword.length)) {
         setLoginBtnLabel(_.get(i18n, 'login.logging_in'));
         let payload = { userEmail, userPassword };

         login(payload).then(res => {
            setLoginBtnLabel(_.get(i18n, 'login.log_in'));

            if (res.data.response) {
               sessionLogin({ root: res.data.root, response: res.data.response });
               history.push('/');
            } else {
               if (res.data.root === "userEmail") {
                  setEmailError(_.get(i18n, res.data.message));
               } else if (res.data.root === "Password") {
                  setPasswordError(_.get(i18n, res.data.message));
               } else {
                  showSnackbar({ open: true, type: 'error', message: _.get(i18n, res.data.message) });
               }
               sessionLogin({ root: res.data.root, response: res.data.response });
               throw Error;
            }
         })
      }
   };

   return (
      <React.Fragment>
         {display === 'forgot' &&
            <div className={classes.appForgot}>
               <Zoom direction="right" in={true} timeout={1000} mountOnEnter unmountOnExit>

                  <Paper className={classes.paperForgot}>
                     <Grid container xs={12} style={{ padding: 50 }}>
                        <ForgotPassword />
                     </Grid>
                  </Paper>
               </Zoom>
            </div>
         }

         {display === 'login' &&
            <div className={classes.app}>
               <Slide direction="right" in={true} timeout={1000} mountOnEnter unmountOnExit>

                  <Paper className={classes.paper}>
                     <Grid container xs={12}>
                        <Grid item xs={5}>
                           <img alt="" src="/images/loginImage.png" width="100%" height="500" />
                        </Grid>
                        <Grid container xs={7} style={{ padding: 50 }}>
                           <Grid item xs={12} container justify="center">
                              <Grid item xs={12} container justify="center" >
                                 <img alt="Workspez" src="/images/workspez_logo.png" width="150" height="50" />
                              </Grid>
                              <Grid item xs={12}>
                                 <div style={{ height: 30 }} />
                              </Grid>
                              <Grid item xs={12}>
                                 <OutlinedWithValidationDenseField config={{ label: _.get(i18n, 'login.email'), value: userEmail, valueSetter: setUserEmail, validation: { error: emailError, errorSetter: setEmailError } }} />
                              </Grid>
                              <Grid item xs={12}>
                                 <OutlinedWithValidationDenseField config={{ type: 'password', label: _.get(i18n, 'login.password'), value: userPassword, valueSetter: setUserPassword, validation: { error: passwordError, errorSetter: setPasswordError } }} />
                              </Grid>
                              <Grid item xs={12}>
                                 <div style={{ height: 30 }} />
                              </Grid>
                              <Grid item xs={12} align="center">
                                 <FullWidthRoundedSideButton config={{ clickHandler: signin, label: loginBtnLabel }} />
                              </Grid>
                              <Grid item xs={12}>
                                 <div style={{ height: 30 }} />
                              </Grid>
                              <Grid item xs={12} align="center">
                                 <Typography align='center' style={{ ...indigoFont, fontWeight: 800 }}>
                                    <Route render={({ history }) => <span style={{ ...indigoFont, fontWeight: 800, cursor: 'pointer' }} onClick={() => LoginUpdate([['display', 'forgot']])}>{_.get(i18n, "login.forgot_password")}</span>} />
                                 </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                 <div style={{ height: 10 }} />
                              </Grid>
                              <Grid item xs={12} align="center">
                                 <Typography variant="subtitle2">
                                    {_.get(i18n, "login.not_yet_registered")}
                                    <Route render={({ history }) => <span style={{ ...indigoFont, fontWeight: 800, cursor: 'pointer' }} onClick={() => LoginUpdate([['display', 'signup']])}>{_.get(i18n, "login.sign_up")}</span>} />
                                 </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                 <div style={{ height: 10 }} />
                              </Grid>
                              <Grid item xs={12} align="center">
                                 <LanguageSelector />
                              </Grid>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Paper>

               </Slide>
            </div>
         }

         {display === 'signup' &&
            <div className={classes.appSignup}>
               <Slide direction="left" in={true} timeout={1000} mountOnEnter unmountOnExit>

                  <Paper className={classes.paperSignup}>
                     <Grid container xs={12}>
                        <Grid item xs={3}>
                           <img style={{ borderRadius: '50px 0 0 50px' }} alt="" src="/images/loginImage.png" width="100%" height="500" />
                        </Grid>
                        <Grid container xs={9} style={{ padding: 50 }}>

                           <Registration />

                        </Grid>
                     </Grid>
                  </Paper>

               </Slide>
            </div>
         }

      </React.Fragment>
   )
}

Login.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps, { sessionLogin, LoginUpdate, showSnackbar }), withStyles(styles))(Login);