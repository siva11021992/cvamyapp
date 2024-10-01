import React from 'react';
import { Outlet, Link } from 'react-router-dom';


function Profile() {
  return (
    
    
    <div>
    <nav>
      <ul>
        <li><Link to="nested-profile">NestedProfile</Link></li>
        {/* <li><Link to="nested-settings">NestedSettings</Link></li> */}
      </ul>
    </nav>

    {/* Render nested routes */}
    <Outlet />
  </div>
  );
}

export default Profile;
