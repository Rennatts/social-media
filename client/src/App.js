import React, { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import MainRouter from './MainRouter';
import { Provider } from 'react-redux';
import store from "./redux/store";

import io from 'socket.io-client';


function App(){

    useEffect(() => {
        const socket = io();
    }, [io]);

    return (
      <Provider store={store}>
        <Router>
          <MainRouter></MainRouter>
        </Router>
      </Provider>
    );

};


export default App;

