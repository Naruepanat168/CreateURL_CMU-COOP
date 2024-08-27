import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {HashRouter } from 'react-router-dom'; // ใช้ HashRouter แทน BrowserRouter

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // ไม่จำเป็นต้องระบุชื่อ index.js

// สร้าง store
const store = configureStore({
  reducer: rootReducer,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HashRouter> 
      <App />
    </HashRouter> 
  </Provider>
);

