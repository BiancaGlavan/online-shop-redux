import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import './index.css'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistStore(store)}>
          <App />
        </PersistGate>

      </BrowserRouter>

    </Provider>
  </React.StrictMode>
)
