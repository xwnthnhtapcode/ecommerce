import React, { Suspense }  from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/routes';
import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
