import React, { Component } from 'react';
import UserSignInOrSignUpForm from '../components/userSignInOrSingUp/UserSignInOrSignUpForm';
import UserSignInOrSignUpFormContainer from '../components/userSignInOrSingUp/UserSignInOrSignUpFormContainer';
import { Link } from 'react-router-dom';
import styles from '../pages/SignInPage.module.css';
import stock_futuristic from '../videos/stock_futuristic.mov';

export class SignInPage extends Component {
  render() {
    console.log(this.state);
    return (
      <div className={styles.page}>
        <video className={styles.bgVideo} autoPlay loop muted>
          <source src={stock_futuristic} type="video/mp4" />
        </video>

        <div className={styles.WebsiteName}>
          <p className={styles.WebsiteNamePt1}>Live</p>
          <p className={styles.WebsiteNamePt2}>Return</p>
        </div>
        <h1 className={styles}>See your portfolio return in real time</h1>
        <UserSignInOrSignUpFormContainer
          // className={styles.SignInPage}
          {...this.props}
          render={(onChange, onSignIn, onRegister) => (
            <UserSignInOrSignUpForm
              onChange={onChange}
              onRegister={onRegister}
              onSignIn={onSignIn}
              onRegister={onRegister}
            />
          )}
        />
        <Link className={styles.SignUpLink} to="/signup">
          Need to Sign Up?
        </Link>
      </div>
    );
  }
}

export default SignInPage;
