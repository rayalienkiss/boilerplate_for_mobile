import React from 'react';
import ReactDOM from 'react-dom';
// 适用 react hot loader 让热更新后保留React的组件状态
import {
  AppContainer
} from 'react-hot-loader';
import {
  BasicExample
} from './components';
import $ from 'jquery';  

const appElement = document.getElementById('app');

ReactDOM.render(  
  <AppContainer>
    <BasicExample/>
  </AppContainer>,
  appElement,
);

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     ReactDOM.unmountComponentAtNode(appElement);
//     render();
//   });
// }

// 前端脚本中配置热更新处理逻辑
// if (module.hot) {  
//   module.hot.accept();
// }

// 前端脚本中配置热更新处理逻辑
if(module.hot) {
  module.hot.accept(function(err) {
      if(err) {
          console.error("Cannot apply hot update", err);
      }
  });
}