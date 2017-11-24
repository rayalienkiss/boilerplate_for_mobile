import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Counter } from 'COM';
// import { axios } from 'UTILS';
import style from './dropdownMenu';

class DropdownMenu extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={style.center}>
        <div className={style.dm}>
          <div className={style.dm_switch}>
            DROPDOWN MENU
          </div>
          <ul className={style.dm_menu}>
            <li>
              option one
            </li>
            <li>
              option two
            </li>
            <li>
              option three
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
