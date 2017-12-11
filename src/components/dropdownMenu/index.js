import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Counter } from 'COM';
// import { axios } from 'UTILS';
import './dropdownMenu';
import classNames from 'classnames';

class DropdownMenu extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			visible: false, // 显示开关状态
		};
	};

	static defaultProps = {
		// visible: false, // 弹层开关属性
		// maskCloseNeed: false, // 通过点击遮罩层关闭弹层的开关属性
		// foot: true, // 开启脚部结构
		// primaryButtonText: '确定', // 弹层主按钮文字描述
		// secondaryButtonText: '取消', // 弹层次按钮文字描述
		// secondaryButton: false, // 在弹层中只显示一个按钮
  };

  static propTypes = {
		// visible: React.PropTypes.bool.isRequired,
		// maskCloseNeed: React.PropTypes.bool.isRequired,
		// foot: React.PropTypes.bool.isRequired,
		// primaryButtonText: React.PropTypes.string.isRequired,
		// secondaryButtonText: React.PropTypes.string.isRequired,
		// secondaryButton: React.PropTypes.bool.isRequired,
  };

  switch = () => {
    if (this.state.visible == true) {
      this.setState({
        visible: false,
      });
    } else {
      this.setState({
        visible: true,
      });
    }
  };

  componentDidMount() {
  }

  render() {

    let me = this;
		let { visible } = me.state;

    const ddWrapClass = classNames({
      'dd_wrap': true,
      'show': visible,
    });

    return (
      // <div className={style.center}>
      //   <div className={style.dm}>
      //     <div className={style.dm_switch}>
      //       DROPDOWN MENU
      //     </div>
      //     <ul className={style.dm_menu}>
      //       <li>
      //         <a className={style.dm_option} href="###">
      //           option one
      //         </a>
      //       </li>
      //       <li>
      //         <a className={style.dm_option} href="###">
      //           option two
      //         </a>
      //       </li>
      //       <li>
      //         <a className={style.dm_option} href="###">
      //           option three
      //         </a>
      //       </li>
      //     </ul>
      //   </div>
      // </div>
      <div className="dd_body">
        <div className={ddWrapClass}>
          <div className="icon-wrap" onClick={me.switch}>
            <span className="icon"></span>
          </div>
          <ul>
            <li>
              this's a default option for menu
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
