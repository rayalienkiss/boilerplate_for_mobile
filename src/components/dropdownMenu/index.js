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
        <div className={style.dropdown_menu_wrap}>
          123
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
