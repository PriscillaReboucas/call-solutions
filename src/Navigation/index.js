import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RouteWrapper from "./Route";
import NotFound from "../pages/Not Found";
import Profile from  '../pages/Profile';
import Customers from "../pages/Customers";
import NewCall from "../pages/NewCall";

export default function Navigation() {
  return (
      
    <Routes>
        <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Login />}/>} /> 
        <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Login />} isPrivate />}/>
        <Route path='/profile' element={<RouteWrapper loggedComponent={<Profile />} defaultComponent={<Login />} isPrivate />}/>
        <Route path='/customers' element={<RouteWrapper loggedComponent={<Customers />} defaultComponent={<Login />} isPrivate/>}/>
        <Route path='/new' element={<RouteWrapper loggedComponent={<NewCall />} defaultComponent={<Login />} isPrivate/>}/>
        <Route path='/new/:id' element={<RouteWrapper loggedComponent={<NewCall />} defaultComponent={<Login />} isPrivate/>}/>
        <Route path='/login' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Login />} />} />
        <Route path='/register' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<Register />} />} />
        <Route path="*" element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<NotFound />} />} />
    </Routes>
  );
}
