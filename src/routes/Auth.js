import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { authService } from 'fbase';

export default function Auth() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = ({ target: { name, value } }) =>
    setFormData({
      ...formData,
      [name]: value,
    });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        data = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toogleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    console.log(event.target.name);
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={formData.password}
          onChange={onChange}
        />
        <input
          name="login"
          type="submit"
          value={newAccount ? 'Create new account' : 'Sign In'}
        ></input>
        {error}
      </form>
      <button type="button" onClick={toogleAccount}>
        {newAccount ? 'Sign in' : 'Sign Up'}
      </button>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}
