import React from 'react';
import { Outlet, Link } from 'react-router-dom';


function NestedProfile() {
  return (
    <div>

      <nav>
      <ul>
        <li><Link to="nested-profile-end">NestedProfileEnd</Link></li>
        {/* <li><Link to="nested-settings-end">NestedSettingsEnd</Link></li> */}
      </ul>
    </nav>

    {/* Render nested routes */}
    <Outlet />
    </div>
  );
}

export default NestedProfile;
