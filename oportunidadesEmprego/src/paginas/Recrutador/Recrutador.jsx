import HeaderRecrutador from "../../componentes/PagRecrutador/HeaderRecrutador/HeaderRecrutador"
import BarraMenu from "../../componentes/PagRecrutador/BarraMenu/BarraMenu"
import Dashboard from "../../componentes/PagRecrutador/Dashboard/Dashboard"
import './Recrutador.css'
import { Helmet } from "react-helmet/es/Helmet"

export default function Recrutador(){
    return(
    
        
    <div className="Recrutador">
        <Helmet>
                <title>Recrutador</title>
                
                <meta property="og:title" content={"og: Recrutador"}/>

                
             </Helmet> 
         <HeaderRecrutador/>
         <div className="DivisaoRecrutador">
            <BarraMenu/>
            <Dashboard/>  
         </div>
         

    </div>
    )
}