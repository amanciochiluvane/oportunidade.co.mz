import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { currentUser } = useSelector(state => state.user);
    
    if (!currentUser) {
        alert("Não tens permissão para aceder a essa página! Deves ser um Recrutador!");
        return <Navigate to='/escolher-tipo-login/recrutador' />;
        
    }
    else{
        if (!currentUser.usuário.recruterName) {
            alert("Não tens permissão para aceder a essa página! Deves ser um Recrutador!");
            return <Navigate to='/escolher-tipo-login/recrutador' />;
            
        }
    }
   

    // Se o usuário estiver autenticado, renderize as rotas aninhadas
    return children;
}
