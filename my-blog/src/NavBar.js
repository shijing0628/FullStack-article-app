import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';
export const NavBar = () => {
 const padding = {
  padding: 15
 }
 return (
  <div>
   <nav className="navbar"  >
    <ul >
     <li>
      <Link to='/' style={padding} >Home</Link>
     </li>
     <li>
      <Link to='/about' style={padding}>About</Link>
     </li>
     <li>
      <Link to='/articleslist' style={padding}>Articles</Link>
     </li>
    </ul>
   </nav>
  </div>
 )
}
