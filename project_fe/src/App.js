import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Mainpage from "./component/Mainpage/index";
import Detail from "./component/Detail/index";
import LoginSetting from './component/LoginSetting/index'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Mainpage />}></Route>
              <Route path="/detail/:img" element={<Detail/>}></Route>
              <Route path="/setting" element={<LoginSetting/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
