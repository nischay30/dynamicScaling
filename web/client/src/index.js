import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue700,blue400} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme=getMuiTheme({
    palette:{
        textColor: blue700,
        primary1Color: blue400,
        primary2Color: blue700
    }
});

ReactDOM.render(
 <MuiThemeProvider muiTheme={muiTheme}>    
  <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);