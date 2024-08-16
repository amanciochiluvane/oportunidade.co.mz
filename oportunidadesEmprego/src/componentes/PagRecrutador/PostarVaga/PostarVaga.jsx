
import './PostarVaga.css'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function PostarVaga(){
    const { currentUser } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        // eslint-disable-next-line no-unused-vars
        formState:{ errors },

    }=useForm();

    const onSubmit = (data) => {
        setIsLoading(true);
            
            // Add the logo base64 string to the data object
            data.companyLogo = currentUser.usuário.companyLogotipo;
            data.companyName=currentUser.usuário.recruterName; 
            data.postedBy=currentUser.usuário.recruterEmail;
            
            // Now you can send the data to the server
            fetch("http://localhost:5000/publicar-vaga", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if(result.acknowledged === true){
                    alert("Vaga publicada com sucesso");
                }
                reset()

            })
            .catch(error => {
                console.error('Error:', error);
            }).finally(() => {
                setIsLoading(false); // Definindo isLoading para false quando terminar de enviar os dados
            });

        };
    
    
    return(
        <div className='Dashboard'>
            <section className="PostarVaga">
                <h2>Detalhes da vaga</h2>
                <p>Descreva a tarefa e as responsabilidades da vaga</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p>Nome da Empresa</p>
                        <input type="text" {...register("companyName")} value={currentUser.usuário.recruterName} required disabled/>
                    </div>
                    <div>
                        <p>Titulo da Vaga</p>
                        <input type="text" {...register("jobTitle")} required />
                    </div>

                    <section>
                    <div>
    <p>Categoria da Vaga</p>
    <select name="categoria" id="categoria" {...register("category")} required>
        <option value="Agricultura">Agricultura</option>
        <option value="Tecnologia">Tecnologia</option>
        <option value="Construção">Construção</option>
        <option value="Educação">Educação</option>
        <option value="Saúde">Saúde</option>
        <option value="Financeiro">Financeiro</option>
        <option value="Mecânica">Mecânica</option>
        <option value="Energia">Energia</option>
        <option value="Transporte">Transporte</option>
    </select>
</div>


                        <div>
    <p>Tipo de Companhia</p>
    <select name="categoria" id="categoria" {...register("companyType")} required>
        <option value="Startup">Startup</option>
        <option value="Estrangeira">Estrangeira</option>
        <option value="Nacional">Nacional</option>
        <option value="Corporativa">Corporativa</option>
        <option value="Outros">Outros</option>
    </select>
</div>
                        <div>
                            <p>Nível de Experiência</p>
                            <select name="contrato" id="contrato" {...register("experiencelevel")} required >
                                <option value="SemExperiência">Sem Experiência</option>
                                <option value="Estágio">Estágio e Recém-formado</option>
                                <option value="Executivo">Executivo</option>
                                <option value="Sênior">Sênior</option>
                                <option value="Médio">Médio</option>
                            </select>
                        </div>

                        <div>
                            <p>Número de posições</p>
                            <select name="posicoes" id="posicoes" {...register("positions")} required >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
       
                            </select>

                        </div>
                        <div>
                            <p>Localização da vaga</p>
                            <select name="provincia" {...register("location")} required >
                                <option value="Maputo">Maputo</option>
                                <option value="Gaza">Gaza</option>
                                <option value="Inhambane">Inhambane</option>
                                <option value="Sofala">Sofala</option>
                                <option value="Manica">Manica</option>
                                <option value="Tete">Tete</option>
                                <option value="Zambezia">Zambezia</option>
                                <option value="Nampula">Nampula</option>
                                <option value="Cabo Delgado">Cabo Delgado</option>
                                <option value="Niassa">Niassa</option>
                            </select>
                        </div>

                        <div>
                            <p>Tipo de Emprego</p>
                            <select name="tipoEmprego" {...register("employmentType")} required>
                                <option value="Tempo integral">Tempo Integral</option>
                                <option value="Meio período">Meio Período</option>
                                <option value="Contrato">Contrato</option>
                                <option value="Estágio">Estágio</option>
                                <option value="Trabalho remoto">Trabalho Remoto</option>
                                <option value="Temporário">Temporário</option>
                                <option value="Freelancer">Freelancer</option>
                                <option value="Voluntário">Voluntário</option>
                            
                            </select>
                            </div>



                       

                    </section>

                    <div>
                        <p>
                        Breve descrição da vaga
                        </p>
                        <textarea contentEditable="true"  className='InputLongo'{...register("description")} required />
                    </div>

                    <div>
                        <p>
                        Responsabilidades
                        </p>
                        <textarea  className='InputLongo'{...register("responsabilities")} required />
                    </div>

                    <div>
                        <p>
                        Requisitos
                        </p>
                        <textarea   className='InputLongo' {...register("requirements")} required />
                    </div>
                    <div>
                        <p>Logo da Empresa</p>
                        <input type="file" name='companyLogo' {...register("companyLogo")} disabled />
                    </div>
                    <div>
                    <p>Publicado por</p>
                    <input type="email" name='postedBy' {...register("postedBy")} required value={currentUser.usuário.recruterEmail} disabled/>
                </div>

                    <input type="submit"value={isLoading ? 'Processando ...' : 'Publicar vaga'} className='PublicarBotao' disabled={isLoading} />
                </form>
            </section>
        </div>
    )
}