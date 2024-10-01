// Home.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Home;
