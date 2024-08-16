import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouteCandidato = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);
  }, []);

  // Função para atualizar o estado de autenticação
  
  

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/escolher-tipo-login/recrutador" state={{ from: location.pathname }} replace />;
};


export default PrivateRouteCandidato;


