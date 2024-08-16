import HeaderRecrutador from "../../componentes/PagRecrutador/HeaderRecrutador/HeaderRecrutador"
import BarraMenu from "../../componentes/PagRecrutador/BarraMenu/BarraMenu"

import RecrutadorCandidatos from "../../componentes/PagRecrutador/RecrutadorCandidatos/RecrutadorCandidatos"
import './Recrutador.css'

export default function RecrutadorLIstaCandidatosRecrutador(){
    return(

    <div className="Recrutador">
         <HeaderRecrutador/>
         <div className="DivisaoRecrutador">
            <BarraMenu/>
            <RecrutadorCandidatos/>  
         </div>
         

    </div>
    )
}