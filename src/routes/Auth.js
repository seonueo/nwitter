import React, { useState } from 'react';

export default function Auth() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target: { name, value } }) =>
    setFormData({
      ...formData,
      [name]: value,
    });

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
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
        <input name="login" type="submit" value="Log In"></input>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}
