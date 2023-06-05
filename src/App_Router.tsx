import React from 'react';

import ConnectRouter from './routers/connect_router';
import NoConnectRouter from './routers/no_connect.router';

function AppRouter() {
  return (
    <div>
      {
        localStorage.getItem('token') ? (
          <ConnectRouter />
        ) : (
          <NoConnectRouter />
        )
      }
    </div>
  );
}

export default AppRouter;
