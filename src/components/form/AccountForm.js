import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import { UserProfileConsumer } from '../../contexts/user/userProfileContext';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

const AccountForm = () => {
  const { isFormOpen, toggleForm } = useContext(commonContext);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [username, setUserName] = useState(null);
  const { fetchProfileData } = UserProfileConsumer();

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    toggleForm(false);
  });

  useScrollDisable(isFormOpen);

  const [isSignupVisible, setIsSignupVisible] = useState(false);

  // Signup-form visibility toggling
  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  const googleLogin = async () => {
    toggleForm(false);
    const { user } = await signInWithPopup(auth, provider);
    setUserData(user);
    fetchProfileData();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        fetchProfileData();
        clearInputField();
        toggleForm(false);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already exist');
        }
        console.log(err.message);
      });
  };

  const submitHandlerLog = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        fetchProfileData();
        clearInputField();
        toggleForm(false);
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          alert('Password is wrong');
        }
        console.log('Err', err.message);
      });
  };

  const clearInputField = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setConfPassword('');
  };

  return (
    <>
      {isFormOpen && (
        <div className='backdrop'>
          <div className='modal_centered'>
            <form
              id='account_form'
              ref={formRef}
              onSubmit={isSignupVisible ? submitHandler : submitHandlerLog}
            >
              {/*===== Form-Header =====*/}
              <div className='form_head'>
                <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                <p>
                  {isSignupVisible
                    ? 'Already have an account ?'
                    : 'New to X-Beat ?'}
                  &nbsp;&nbsp;
                  <button type='button' onClick={handleIsSignupVisible}>
                    {isSignupVisible ? 'Login' : 'Create an account'}
                  </button>
                </p>
              </div>

              {/*===== Form-Body =====*/}
              <div className='form_body'>
                {isSignupVisible && (
                  <div className='input_box'>
                    <input
                      type='text'
                      name='username'
                      className='input_field'
                      value={username}
                      onChange={(event) => setUserName(event.target.value)}
                      required
                    />
                    <label className='input_label'>Username</label>
                  </div>
                )}
                <div className='input_box'>
                  <input
                    type='email'
                    name='email'
                    className='input_field'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <label className='input_label'>Email</label>
                </div>
                <div className='input_box'>
                  <input
                    type='password'
                    name='password'
                    className='input_field'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <label className='input_label'>Password</label>
                </div>

                {isSignupVisible && (
                  <div className='input_box'>
                    <input
                      type='password'
                      name='confPassword'
                      className='input_field'
                      value={confPassword}
                      onChange={(event) => setConfPassword(event.target.value)}
                      required
                    />
                    <label className='input_label'>Confirm Password</label>
                  </div>
                )}
                <button type='submit' className='btn login_btn'>
                  {isSignupVisible ? 'Signup' : 'Login'}
                </button>
              </div>

              {/*===== Form-Footer =====*/}
              <div className='form_foot'>
                <p>or login with</p>
                <div className='login_options'>
                  <Link to='/'>Facebook</Link>
                  <button
                    onClick={googleLogin}
                    style={{ backgroundColor: 'red' }}
                  >
                    Google
                  </button>
                  <Link to='/'>Twitter</Link>
                </div>
              </div>

              {/*===== Form-Close-Btn =====*/}
              <div
                className='close_btn'
                title='Close'
                onClick={() => toggleForm(false)}
              >
                &times;
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
