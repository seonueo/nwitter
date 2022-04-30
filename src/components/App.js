import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [isLoggendIn, setIsLoggendIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggendIn={isLoggendIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
