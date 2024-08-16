import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'

const ResetPasswordCandidato = () => {
  const {id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidatoPassword=password;
    try {
      const res = await fetch(`http://localhost:5000/reset-password-candidato/${id}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidatoPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
      console.log(data.message)
      if (data.message ) {
        alert('Senha redefinida com sucesso')
        navigate('/escolher-tipo-login/candidato');
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

export default ResetPasswordCandidato;
