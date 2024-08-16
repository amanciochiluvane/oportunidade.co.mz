
import Body from '../../components2/Body/Body'
import { Helmet } from 'react-helmet/es/Helmet'

import './CV.css'

export default function CV(){
    return(
        <div className="CV">
             <Helmet>
                <title>Criar CV</title>
                <meta name="description" content={"Um currículo bem elaborado é essencial para destacar-se no mercado de trabalho competitivo. O CV (Curriculum Vitae) é a primeira impressão que um recrutador terá de você, e pode ser decisivo para conseguir uma entrevista."}/>
                <meta property="og:title" content={"og:Criar CV"}/>
                <meta property="og:description" content={"og: Um currículo bem elaborado é essencial para destacar-se no mercado de trabalho competitivo. O CV (Curriculum Vitae) é a primeira impressão que um recrutador terá de você, e pode ser decisivo para conseguir uma entrevista."}/>
             </Helmet>
           
            <Body/>
        </div>
    )
}