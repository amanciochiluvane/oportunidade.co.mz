import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'

const ResetPassword = () => {
  const {id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruterPassword=password;
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}/reset-password/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recruterPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
      console.log(data.usuario)
      if (data.message ) {
        alert('Senha redefinida com sucesso')
        navigate('/escolher-tipo-login/recrutador');
      }
    } catch (error) {
      setMessage('Erro ao redefinir a senha');
    }
  };

  return (
    <div className='ForgetPassword'>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
