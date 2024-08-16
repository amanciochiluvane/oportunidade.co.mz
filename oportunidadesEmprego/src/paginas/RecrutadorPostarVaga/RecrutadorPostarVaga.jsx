

import HeaderRecrutador from "../../componentes/PagRecrutador/HeaderRecrutador/HeaderRecrutador"
import BarraMenu from "../../componentes/PagRecrutador/BarraMenu/BarraMenu"

import PostarVaga from "../../componentes/PagRecrutador/PostarVaga/PostarVaga"
import './Recrutador.css'

export default function RecrutadorPostarVaga(){
    return(

    <div className="Recrutador">
         <HeaderRecrutador/>
         <div className="DivisaoRecrutador">
            <BarraMenu/>
            <PostarVaga/>  
         </div>
    </div>
    )
}