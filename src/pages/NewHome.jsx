import React from 'react';
import './NewHome.css';
import sidebar from "../assets/side.svg";
import { useNavigate } from 'react-router-dom';

export default function NewHome() {

    const navigate = useNavigate();
  return (
    <>
     <div className="navbar-placeholder">
        <button onClick={()=>navigate("/")} className='butt'>
        <img src={sidebar} alt="Sidebar" className='side' />
        </button>
      <h1>Welcome to the New Home Page!</h1>
      <p>This is the updated version of our homepage.</p>
    </div>
    </>
   
  );
}