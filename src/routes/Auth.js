import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
