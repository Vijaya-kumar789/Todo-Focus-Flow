import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux"
import {store} from './store/store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<AuthContextProvider>
<StrictMode>
    <App />
    <ToastContainer
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
  </StrictMode>
  </AuthContextProvider>
  </Provider>
  
  
  ,
)
