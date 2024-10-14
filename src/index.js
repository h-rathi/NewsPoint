import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import News from './News';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <div> <Navbar/> <News key="1"  pgSize={10} country="us" category="general" /></div> ,
  },
  
  {
    path: "/sports",
    element: <div> <Navbar/> <News  key="2" pgSize={10} country="us" category="sports" /></div>,
  },
  {
    path: "/science",
    element: <div> <Navbar/> <News  key="3" pgSize={10} country="us" category="science" /></div>,
  },
  {
    path: "/entertainment",
    element: <div> <Navbar/> <News  key="4" pgSize={10} country="us" category="entertainment" /></div>,
  },
  
  {
    path: "/health",
    element: <div> <Navbar/> <News  key="5" pgSize={10} country="us" category="health" /></div>,
  },
  {
    path: "/business",
    element: <div> <Navbar/> <News  key="6" pgSize={10} country="us" category="business" /></div>,
  },
  {
    path: "/technology",
    element: <div> <Navbar/> <News  key="7" pgSize={10} country="us" category="technology" /></div>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

reportWebVitals();
