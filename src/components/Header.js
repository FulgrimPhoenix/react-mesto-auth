import { Children } from 'react';
import logo from '../images/logo/logo.svg';

function Header({button, children}){
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className='header__menu'>
        {children}
        <a href='#' className='header__button'>{button}</a>
      </div>
    </header>
  )
}
export default Header;