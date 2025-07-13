import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
        className="w-full mb-2 border p-2 rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
        className="w-full mb-2 border p-2 rounded" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
