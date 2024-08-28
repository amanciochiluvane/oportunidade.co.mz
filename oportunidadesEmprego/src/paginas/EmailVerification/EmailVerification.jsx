import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./EmailVerification.css"
import verifyemail from "../../assets/verifyemail.png"

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { token } = useParams(); // Obtém o token da URL

  useEffect(() => {
    if (token) {
      // Determinar se o token é de recrutador ou candidato
      const isRecruiterToken = token.startsWith('rec-');
      const endpoint = isRecruiterToken
        ? `${import.meta.env.VITE_APP_BACKEND}/verificar-email/recrutador/${token}`
        : `${import.meta.env.VITE_APP_BACKEND}/verificar-email/candidato/${token}`;

      fetch(endpoint, {
        method: 'GET' // Especifica explicitamente o método GET
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.messageSuccess) {
            setMessage(data.messageSuccess);
            const isRecruiterToken2 = token.startsWith('rec-');
            if(isRecruiterToken2){
                setTimeout(() => navigate('/escolher-tipo-login/recrutador'), 3000); 
            }
            else{
                setTimeout(() => navigate('/escolher-tipo-login/candidato'), 3000); 
            }
           
            // Redirecionar após 3 segundos
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar o email:', error);
          setMessage('Ocorreu um erro ao verificar seu email. Por favor, tente novamente.');
        });
    } else {
      setMessage('Token de verificação não fornecido.');
    }
  }, [token, navigate]); // Agora `token` é uma dependência

  return (
    <div className='EmailVerification'>
      <article>
           <img src={verifyemail}/>
          <h1>Verificação de Email</h1>
          <p>{message}</p>
      </article>
    </div>
  );
};

export default EmailVerification;



