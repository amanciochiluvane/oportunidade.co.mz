import './EmpregadoresDetalhes.css'
import HeaderEmprego from '../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego'
import LogoCoca from '../../assets/LogoCoca2.png'
import FooterEmprego from '../../componentes/PagEmprego/FooterEmprego/FooterEmprego'

export default function EmpregadoresDetalhes(){
    return(
        <div className="EmpregadoresDetalhes">
            <HeaderEmprego/>

            <section>
                <div className='Lilache'>

                </div>
                <img className='EmpregadoresLogoEmpresa' src={LogoCoca}/>

                <div className='OverwiewTextEmpregadores'>
                    <h2>The Coca Cola Company</h2>
                    <p>The Coca-Cola Company é uma empresa multinacional estadunidense fundada em 1892 e conhecida por produzir o refrigerante Coca-Cola. A empresa da indústria de bebidas também fabrica, vende e comercializa outros concentrados e xaropes de bebidas não alcoólicas e alcoólicas.</p>
                </div>

                <h2 className='TitVagasEmpregadores'>Vagas abertas pela Coca Cola</h2>

                <section className='VagasAbertasEmpregadores' >
                    <article>
                        <img src={LogoCoca}/>
                        <div>
                            <h2>Engenheiro Quimico</h2>
                            <p>Publicado em 12/04/2024</p>
                        </div>

                        <button className='VagaExpirada'>Expirado</button>
                    </article>

                    <article>
                        <img src={LogoCoca}/>
                        <div>
                            <h2>Engenheiro Quimico</h2>
                            <p>Publicado em 12/04/2024</p>
                        </div>

                        <button className='VagaDisponivel'>Disponivel</button>
                    </article>
                    <article>
                        <img src={LogoCoca}/>
                        <div>
                            <h2>Engenheiro Quimico</h2>
                            <p>Publicado em 12/04/2024</p>
                        </div>

                        <button className='VagaDisponivel'>Disponivel</button>
                    </article>
                    <article>
                        <img src={LogoCoca}/>
                        <div>
                            <h2>Engenheiro Quimico</h2>
                            <p>Publicado em 12/04/2024</p>
                        </div>

                        <button className='VagaExpirada'>Expirado</button>
                    </article>
                </section>

            </section>

            <FooterEmprego/>
        </div>
    )
}