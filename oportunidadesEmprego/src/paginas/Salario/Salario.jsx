import { useState, useEffect } from 'react';
import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego";
import HomemSalario from '../../assets/HomemSalario.png';
import './Salario.css';
import Pesquisar from '../../assets/PesquisarCinzento.png';
import { Helmet } from "react-helmet/es/Helmet";

// Importe o seu JSON de setores aqui
import setoresData from './Salario.json';

export default function Salario() {
    const [setores, setSetores] = useState([]);
    const [selectedSetor, setSelectedSetor] = useState('');
    const [dadosSetor, setDadosSetor] = useState(null);

    useEffect(() => {
        // Simulação de fetch dos dados (pode ser substituído por um fetch real)
        // Aqui setoresData é o seu JSON importado
        setSetores(Object.keys(setoresData));
    }, []);

    const handleSetorChange = (event) => {
        const setorSelecionado = event.target.value;
        setSelectedSetor(setorSelecionado);
        setDadosSetor(setoresData[setorSelecionado]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de pesquisa ou submissão do formulário, se necessário
    };

    return (
        <div className="Salario">
            <Helmet>
                <title>Salário</title>
                <meta name="description" content={"Conheça a ferramenta de salários do Oportunidade.co.mz e tome decisões informadas sobre sua carreira e contratações. Com esta ferramenta avançada, você pode acessar informações detalhadas sobre faixas salariais em diversas indústrias e posições em Moçambique. Seja você um profissional buscando entender seu valor de mercado ou um empregador querendo oferecer salários competitivos, nossa ferramenta oferece os dados que você precisa."}/>
                <meta property="og:title" content={"og:Salário"}/>
                <meta property="og:description" content={"og:Conheça a ferramenta de salários do Oportunidade.co.mz e tome decisões informadas sobre sua carreira e contratações. Com esta ferramenta avançada, você pode acessar informações detalhadas sobre faixas salariais em diversas indústrias e posições em Moçambique. Seja você um profissional buscando entender seu valor de mercado ou um empregador querendo oferecer salários competitivos, nossa ferramenta oferece os dados que você precisa."}/>
            </Helmet> 

            <HeaderEmprego />

            <section className="IntroSalario">
                
                    {dadosSetor ? (
                        <>
                        <section className='DadosSetor'>
                            <h2>{selectedSetor}</h2>
                            <p>{dadosSetor.descrição}</p>
                            <ul>
                                {Object.entries(dadosSetor)
                                    .filter(([key]) => key !== 'descrição')
                                    .map(([cargo, salario]) => (
                                        <li key={cargo}>
                                            <strong>{cargo}:</strong> {salario}
                                        </li>
                                    ))}
                            </ul>

                            <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="PesquisarSalarioImg"><img src={Pesquisar} alt="Pesquisar" /></label>
                            <select value={selectedSetor} onChange={handleSetorChange} required>
                                <option value="">Selecione um setor</option>
                                {setores.map(setor => (
                                    <option key={setor} value={setor}>{setor}</option>
                                ))}
                            </select>
                        </div>

                        
                    </form>
                    
                            </section>
                        </>
                    ) : (
                        <>
                        <section>
                            <h2>Calcule o seu salário</h2>
                            <p>Seja pago pelo que você vale no mercado de trabalho atual</p>

                            <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="PesquisarSalarioImg"><img src={Pesquisar} alt="Pesquisar" /></label>
                            <select value={selectedSetor} onChange={handleSetorChange} required>
                                <option value="">Selecione um setor</option>
                                {setores.map(setor => (
                                    <option key={setor} value={setor}>{setor}</option>
                                ))}
                            </select>
                        </div>

                        
                    </form>
                    
                 
                            </section>
                        </>
                       
                    )}

<img src={HomemSalario} alt="Homem" /> 
                </section>
                
                
        </div>
    );
}

