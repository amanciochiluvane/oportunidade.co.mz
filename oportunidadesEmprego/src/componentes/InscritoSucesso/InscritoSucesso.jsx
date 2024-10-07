import SetaVoltar from '../../assets/SetaVoltar.png';
import './InscritoSucesso.css'
import { Link } from 'react-router-dom';
import Verificado from '../../assets/verificado.png'


export default function InscritoSucesso({onCloseSucesss}){
    return(
        <div className="InscritoSucesso">
            <div className="SucessoDiv">
                <img loading="lazy"src={Verificado} />
                <p className='DescrSuccesso1'>Candidatado com <span>Sucesso!</span></p>
                <p className='DescrSuccesso2'>Fique atento ao seu email para receber informações relevantes sobre a vaga</p>
                <Link to="#" className="VoltarEmprego" onClick={onCloseSucesss}>
                    <img loading="lazy"src={SetaVoltar} />
                    <p>Voltar</p>
                </Link>

            </div>
        </div>
    )
} 