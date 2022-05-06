import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/auth";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000}/>
          <Navigation />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
