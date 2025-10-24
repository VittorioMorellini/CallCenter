import React, { Suspense, StrictMode } from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
      // ... log error report
      console.log('Uncaught error in root:', error, errorInfo);
    },
    onCaughtError: (error, errorInfo) => {
      // ... log error report
      console.log('Caught error in root:', error, errorInfo);
    }  
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
