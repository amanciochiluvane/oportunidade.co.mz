import HeaderRecrutador from "../../componentes/PagRecrutador/HeaderRecrutador/HeaderRecrutador"
import BarraMenu from "../../componentes/PagRecrutador/BarraMenu/BarraMenu"
import RecrutadorSettings from "../../componentes/PagRecrutador/RecrutadorSettings/RecrutadorSettings"



export default function Settings(){
    return(
        <div className="Recrutador">
         <HeaderRecrutador/>
         <div className="DivisaoRecrutador">
            <BarraMenu/>
            <RecrutadorSettings/>  
         </div>
         

    </div>
    )
}