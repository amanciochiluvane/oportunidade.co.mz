import  { useState } from 'react';
import './ForgetPassword.css'
import HeaderEmprego from '../PagEmprego/HeaderEmprego/HeaderEmprego';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruterEmail=email;
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recruterEmail }),
      });

      const data = await res.json();
      
      console.log(data);
      alert(data.message);
      setMessage(data.message);
      
    } catch (error) {
      setMessage('Erro ao solicitar redefinição de senha');
    }
  };

  return (
    <>
    <HeaderEmprego/>

    <div className='ForgetPassword'>
      <h2>Esqueceu sua senha?</h2>
      <p>Forneça-nos o endereço de e-mail com o qual você se registrou e nós lhe enviaremos um link para redefinir sua senha.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Redefinir password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default ForgotPassword;
