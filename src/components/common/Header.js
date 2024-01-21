import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';

import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import { BsMoon } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';
import { UserProfileConsumer } from '../../contexts/user/userProfileContext';
import beast from './beats.svg';

const Header = () => {
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isChangeButton, setIsChangeButton] = useState(true);
  const { isLogin, logout } = UserProfileConsumer();

  const changeMode = () => {
    setIsChangeButton((isChangeButton) => !isChangeButton);
  };

  const darkMode = () => {
    document.querySelector('body').setAttribute('class', 'dark-theme');
    return <ImSun />;
  };

  const lightMode = () => {
    document.querySelector('body').setAttribute('class', 'light-theme');
    return <BsMoon />;
  };

  // handle the sticky-header
  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

    window.addEventListener('scroll', handleIsSticky);

    return () => {
      window.removeEventListener('scroll', handleIsSticky);
    };
  }, [isSticky]);

  const cartQuantity = cartItems.length;

  return (
    <>
      <header id='header' className={isSticky ? 'sticky' : ''}>
        <div className='container'>
          <div className='navbar'>
            <h2 className='nav_logo'>
              <Link to='/'>
                <img src={beast} alt='beast' style={{ height: 40 }} />
                <span style={{ marginLeft: 7 }}>Beats</span>
              </Link>
            </h2>
            <nav className='nav_actions'>
              <div className='search_action'>
                <span onClick={() => toggleSearch(true)}>
                  <AiOutlineSearch />
                </span>
                <div className='tooltip'>Search</div>
              </div>

              <div className='cart_action'>
                <Link to='/cart'>
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && (
                    <span className='badge'>{cartQuantity}</span>
                  )}
                </Link>
                <div className='tooltip'>Cart</div>
              </div>

              <div className='user_action'>
                <span>
                  <AiOutlineUser />
                </span>
                <div className='dropdown_menu'>
                  <h4>
                    Hello!{' '}
                    {formUserInfo && <Link to='*'>&nbsp;{formUserInfo}</Link>}
                  </h4>
                  <p>Access account and manage orders</p>
                  {!isLogin && (
                    <button type='button' onClick={() => toggleForm(true)}>
                      Login / Signup
                    </button>
                  )}
                  {isLogin && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Link to='/userProfile'>
                        <button type='button'>User Profile</button>
                      </Link>
                      <Link to='/'>
                        <button
                          type='button'
                          style={{
                            backgroundColor: 'red',
                          }}
                          onClick={logout}
                        >
                          Logout
                          <span
                            style={{
                              marginLeft: 6,
                              fontSize: 15,
                              fontWeight: 900,
                            }}
                          >
                            <IoLogOut />
                          </span>
                        </button>
                      </Link>
                    </div>
                  )}
                  <div className='separator'></div>
                  <ul>
                    {dropdownMenu.map((item) => {
                      const { id, link, path } = item;
                      return (
                        <li key={id}>
                          <Link to={path}>{link}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className='menuBtn'>
                <button
                  type='button'
                  className='darkLight'
                  onClick={changeMode}
                >
                  {isChangeButton ? darkMode() : lightMode()}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchBar />
      <AccountForm />
    </>
  );
};

export default Header;
