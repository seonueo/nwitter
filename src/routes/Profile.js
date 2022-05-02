import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'fbase';

export default function Profile() {
  const history = useHistory();
  const onLogOutclick = () => {
    authService.signOut();
    history.push('/');
  };
  return (
    <button type="button" onClick={onLogOutclick}>
      logout
    </button>
  );
}
