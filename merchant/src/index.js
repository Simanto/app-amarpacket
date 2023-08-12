import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/appContext.js';
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById('root'));


if(process.env.NODE_ENV === "DEV"){
  root.render(
    <React.StrictMode>
      <AppProvider >
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </AppProvider>
    </React.StrictMode>
  );
}else{
  root.render(
      <AppProvider >
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </AppProvider>
  );
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();