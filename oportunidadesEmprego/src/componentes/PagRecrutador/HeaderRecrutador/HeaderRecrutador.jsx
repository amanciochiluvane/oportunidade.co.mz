import Logo from'../../../assets/LogotipoLilache.png'
import LogoYango from '../../../assets/LogoYango.png'
import './HeaderRecrutador.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function HeaderRecrutador(){
    const { currentUser } = useSelector((state) => state.user);
    return(
    <div className="HeaderRecrutador">
        <Link to='/'> <img src={Logo} alt="Logotipo" /></Link>
         
          <div>
            <p>Olá, {currentUser.usuário.recruterName} 👋!</p>
            <Link><img src={currentUser.usuário.companyLogotipo}/></Link>
            
        </div>  
    </div>
    )
}