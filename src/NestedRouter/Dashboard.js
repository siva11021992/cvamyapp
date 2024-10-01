import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Render nested routes */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
