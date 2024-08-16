import { useState } from 'react';
import HeaderEmprego from "../../componentes/PagEmprego/HeaderEmprego/HeaderEmprego"
import "./TestePerguntas.css"
import { Link } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: 'Prefere trabalhar em equipe ou sozinho?',
    options: ['Equipe', 'Sozinho'],
  },
  {
    id: 2,
    text: 'Gosta mais de lidar com números ou com pessoas?',
    options: ['Números', 'Pessoas'],
  },
  {
    id: 3,
    text: 'Você prefere escrever histórias ou ler livros?',
    options: ['escrever histórias', 'ler livros'],
  },
  {
    id: 4,
    text: 'Como você lida com situações de estresse?',
    options: ['Bem', 'Mal'],
  },
  {
    id: 5,
    text: 'Você prefere trabalhar com prazos apertados ou com flexibilidade de tempo?',
    options: ['Prazos apertados', 'Flexibilidade de tempo'],
  },
  {
    id: 6,
    text: 'Você se sente mais realizado em atividades ao ar livre ou em ambientes fechados?',
    options: ['atividades ao ar livre', 'ambientes fechados'],
  },
  {
    id: 7,
    text: 'Você prefere aprender novas habilidades constantemente ou aperfeiçoar habilidades existentes?',
    options: ['Aprender novas habilidades', 'Aperfeiçoar habilidades existentes'],
  },
  {
    id: 8,
    text: 'Prefere trabalhar em ambientes formais ou informais?',
    options: ['Formais', 'Informais'],
  },
  {
    id: 9,
    text: 'Você prefere organizar tarefas ou improvisar conforme necessário?',
    options: ['Organizar tarefas', 'Improvisar conforme necessário'],
  },
  {
    id: 10,
    text: 'Você prefere liderar um grupo ou colaborar como membro da equipe?',
    options: ['Liderar um grupo', 'Colaborar como membro da equipe'],
  },
  {
    id: 11,
    text: 'Prefere cuidar de plantas ou de animais?',
    options: ['Plantas', 'Animais'],
  },
  {
    id: 12,
    text: 'Você se sente mais confortável apresentando ideias em público ou trabalhando nos bastidores?',
    options: ['Apresentando ideias em público', 'Trabalhando nos bastidores'],
  },
  {
    id: 13,
    text: 'Você prefere trabalhar em um ambiente físico ou digital?',
    options: ['Ambiente físico', 'Ambiente digital'],
  },
  {
    id: 14,
    text: 'Você prefere focar em detalhes ou no quadro geral de um projeto?',
    options: ['Focar em detalhes', 'Quadro geral'],
  },
  {
    id: 15,
    text: 'Você gosta mais de trabalhar em projetos de curto prazo ou longo prazo?',
    options: ['Curto prazo', 'Longo prazo'],
  },
  {
    id: 16,
    text: 'Prefere seguir rotinas ou ter tarefas variadas a cada dia?',
    options: ['Seguir rotinas', 'Tarefas variadas'],
  },
  {
    id: 17,
    text: 'Você prefere resolver problemas práticos ou conceituais?',
    options: ['Problemas práticos', 'Problemas conceituais'],
  },
  {
    id: 18,
    text: 'Você tem interesse em áreas criativas como artes, música ou escrita?',
    options: ['Artes e música', 'Escrita'],
  },
  {
    id: 19,
    text: 'Você valoriza mais o trabalho em equipe ou a realização individual?',
    options: ['Trabalho em equipe', 'Realização individual'],
  },
  {
    id: 20,
    text: 'Você prefere trabalhar em um ambiente calmo ou movimentado?',
    options: ['Ambiente calmo', 'Ambiente movimentado'],
  },
  {
    id: 21,
    text: 'Você prefere se comunicar por escrito ou verbalmente?',
    options: ['Por escrito', 'Verbalmente'],
  },
  {
    id: 22,
    text: 'Você gosta de resolver problemas através de lógica ou criatividade?',
    options: ['Lógica', 'Criatividade'],
  },
  {
    id: 23,
    text: 'Você se sente mais à vontade lidando com clientes ou trabalhando nos bastidores?',
    options: ['Lidando com clientes', 'Trabalhando nos bastidores'],
  },
  {
    id: 24,
    text: 'Você prefere trabalhar em um ambiente internacional ou local?',
    options: ['Internacional', 'Local'],
  },
  {
    id: 25,
    text: 'Você se interessa mais por questões ambientais ou sociais?',
    options: ['Questões ambientais', 'Questões sociais'],
  },
  {
    id: 26,
    text: 'Você prefere trabalhar em um ritmo acelerado ou mais lento e constante?',
    options: ['Ritmo acelerado', 'Mais lento e constante'],
  },
  {
    id: 27,
    text: 'Você gosta mais de aprender novas línguas ou novas tecnologias?',
    options: ['Novas línguas', 'Novas tecnologias'],
  },
  {
    id: 28,
    text: 'Você prefere trabalhar em projetos grandes ou pequenos?',
    options: ['Grandes', 'Pequenos'],
  },
  {
    id: 29,
    text: 'Você valoriza mais a estabilidade financeira ou a realização pessoal no trabalho?',
    options: ['Estabilidade financeira', 'Realização pessoal'],
  },
  {
    id: 30,
    text: 'Você prefere seguir instruções detalhadas ou trabalhar de forma independente?',
    options: ['Seguir instruções', 'Trabalhar de forma independente'],
  },
  {
    id: 31,
    text: 'Você gosta de trabalhar em ambientes com tecnologia de ponta ou ambientes mais tradicionais?',
    options: ['Tecnologia de ponta', 'Ambientes tradicionais'],
  },
  {
    id: 32,
    text: 'Você prefere trabalhar em áreas que exigem habilidades manuais ou intelectuais?',
    options: ['Habilidades manuais', 'Habilidades intelectuais'],
  },
];


const professions = [
  { id: 1, name: 'Engenheiro Civil', traits: ['Equipe', 'Números', 'Projetos de longo prazo', 'Ambiente físico', 'Liderar um grupo', 'Flexibilidade de tempo', 'Detalhista', 'Resolver problemas práticos', 'Estabilidade financeira', 'Seguir rotinas'] },
  { id: 2, name: 'Psicólogo', traits: ['Equipe', 'Pessoas', 'Ambiente calmo', 'Liderar um grupo', 'Empatia', 'Comunicação', 'Resolver problemas abstratos', 'Aprendizado contínuo', 'Motivação', 'Saúde mental'] },
  { id: 3, name: 'Professor', traits: ['Equipe', 'Pessoas', 'Liderar um grupo', 'Ambiente calmo', 'Comunicação', 'Educação', 'Criatividade', 'Empatia', 'Aprendizado contínuo', 'Motivação'] },
  { id: 4, name: 'Médico', traits: ['Equipe', 'Pessoas', 'Ambiente movimentado', 'Projetos de longo prazo', 'Empatia', 'Precisão', 'Resolver problemas práticos', 'Saúde', 'Cuidado', 'Ambiente internacional'] },
  { id: 5, name: 'Advogado', traits: ['Equipe', 'Pessoas', 'Argumentação', 'Ambiente movimentado', 'Análise', 'Comunicação', 'Detalhista', 'Trabalho sob pressão', 'Liderar um grupo', 'Estabilidade financeira'] },
  { id: 6, name: 'Programador', traits: ['Sozinho', 'Números', 'Ambiente digital', 'Lógica', 'Criatividade', 'Detalhista', 'Projetos de longo prazo', 'Aprendizado contínuo', 'Análise', 'Trabalhar de forma independente'] },
  { id: 7, name: 'Arquiteto', traits: ['Equipe', 'Números', 'Projetos de longo prazo', 'Ambiente físico', 'Criatividade', 'Detalhista', 'Design', 'Planejamento', 'Resolver problemas práticos', 'Estabilidade financeira'] },
  { id: 8, name: 'Contador', traits: ['Sozinho', 'Números', 'Organizar tarefas', 'Análise', 'Precisão', 'Ambiente calmo', 'Estabilidade financeira', 'Flexibilidade de tempo', 'Detalhista', 'Seguir rotinas'] },
  { id: 9, name: 'Artista Visual', traits: ['Sozinho', 'Pessoas', 'Criatividade', 'Ambiente calmo', 'Detalhista', 'Expressão artística', 'Trabalhar de forma independente', 'Projetos de longo prazo', 'Flexibilidade de tempo', 'Aprendizado contínuo'] },
  { id: 10, name: 'Enfermeiro', traits: ['Equipe', 'Pessoas', 'Empatia', 'Ambiente movimentado', 'Cuidado', 'Saúde', 'Comunicação', 'Resolver problemas práticos', 'Trabalho sob pressão', 'Motivação'] },
  { id: 11, name: 'Dentista', traits: ['Equipe', 'Pessoas', 'Precisão', 'Ambiente calmo', 'Empatia', 'Saúde', 'Detalhista', 'Cuidado', 'Trabalhar de forma independente', 'Estabilidade financeira'] },
  { id: 12, name: 'Engenheiro de Software', traits: ['Equipe', 'Números', 'Ambiente digital', 'Desenvolvimento', 'Lógica', 'Análise', 'Criatividade', 'Detalhista', 'Projetos de longo prazo', 'Aprendizado contínuo'] },
  { id: 13, name: 'Designer Gráfico', traits: ['Sozinho', 'Pessoas', 'Criatividade', 'Ambiente digital', 'Detalhista', 'Expressão artística', 'Trabalhar de forma independente', 'Projetos de longo prazo', 'Aprendizado contínuo', 'Flexibilidade de tempo'] },
  { id: 14, name: 'Chef de Cozinha', traits: ['Equipe', 'Pessoas', 'Criatividade', 'Ambiente movimentado', 'Detalhista', 'Culinária', 'Liderar um grupo', 'Trabalho sob pressão', 'Empatia', 'Motivação'] },
  { id: 15, name: 'Fisioterapeuta', traits: ['Equipe', 'Pessoas', 'Empatia', 'Ambiente calmo', 'Saúde', 'Cuidado', 'Comunicação', 'Resolver problemas práticos', 'Aprendizado contínuo', 'Motivação'] },
  { id: 16, name: 'Consultor Financeiro', traits: ['Sozinho', 'Números', 'Análise', 'Organizar tarefas', 'Precisão', 'Estabilidade financeira', 'Comunicação', 'Flexibilidade de tempo', 'Trabalhar de forma independente', 'Seguir rotinas'] },
  { id: 17, name: 'Biólogo', traits: ['Equipe', 'Números', 'Pesquisa', 'Ambiente calmo', 'Detalhista', 'Ciências', 'Trabalho de campo', 'Aprendizado contínuo', 'Resolver problemas práticos', 'Ambiente internacional'] },
  { id: 18, name: 'Psiquiatra', traits: ['Equipe', 'Pessoas', 'Empatia', 'Ambiente calmo', 'Saúde mental', 'Cuidado', 'Comunicação', 'Resolver problemas abstratos', 'Detalhista', 'Aprendizado contínuo'] },
  { id: 19, name: 'Engenheiro Mecânico', traits: ['Equipe', 'Números', 'Projetos de longo prazo', 'Ambiente físico', 'Detalhista', 'Resolver problemas práticos', 'Ciências', 'Análise', 'Planejamento', 'Estabilidade financeira'] },
  { id: 20, name: 'Professor de Educação Física', traits: ['Equipe', 'Pessoas', 'Motivação', 'Ambiente movimentado', 'Educação', 'Comunicação', 'Saúde', 'Liderar um grupo', 'Cuidado', 'Aprendizado contínuo'] },
  { id: 21, name: 'Jornalista', traits: ['Sozinho', 'Pessoas', 'Investigação', 'Ambiente digital', 'Comunicação', 'Análise', 'Criatividade', 'Detalhista', 'Projetos de longo prazo', 'Flexibilidade de tempo'] },
  { id: 22, name: 'Farmacêutico', traits: ['Equipe', 'Pessoas', 'Precisão', 'Ambiente calmo', 'Saúde', 'Cuidado', 'Análise', 'Detalhista', 'Aprendizado contínuo', 'Empatia'] },
  { id: 23, name: 'Engenheiro Elétrico', traits: ['Equipe', 'Números', 'Projetos de longo prazo', 'Ambiente físico', 'Detalhista', 'Resolver problemas práticos', 'Ciências', 'Análise', 'Planejamento', 'Estabilidade financeira'] },
  { id: 24, name: 'Psicopedagogo', traits: ['Equipe', 'Pessoas', 'Liderar um grupo', 'Ambiente calmo', 'Educação', 'Comunicação', 'Empatia', 'Aprendizado contínuo', 'Cuidado', 'Motivação'] },
  { id: 25, name: 'Gerente de Projetos', traits: ['Equipe', 'Pessoas', 'Planejamento', 'Ambiente movimentado', 'Liderar um grupo', 'Análise', 'Comunicação', 'Detalhista', 'Projetos de longo prazo', 'Trabalho sob pressão'] },
  { id: 26, name: 'Economista', traits: ['Sozinho', 'Números', 'Análise', 'Organizar tarefas', 'Precisão', 'Estabilidade financeira', 'Comunicação', 'Flexibilidade de tempo', 'Trabalhar de forma independente', 'Seguir rotinas'] },
  { id: 27, name: 'Cientista de Dados', traits: ['Sozinho', 'Números', 'Análise', 'Ambiente digital', 'Lógica', 'Detalhista', 'Projetos de longo prazo', 'Aprendizado contínuo', 'Criatividade', 'Trabalhar de forma independente'] },
  { id: 28, name: 'Pedagogo', traits: ['Equipe', 'Pessoas', 'Desenvolvimento Infantil', 'Ambiente calmo', 'Educação', 'Comunicação', 'Empatia', 'Aprendizado contínuo', 'Cuidado', 'Motivação'] },
  { id: 29, name: 'Nutricionista', traits: ['Equipe', 'Pessoas', 'Saúde', 'Ambiente calmo', 'Cuidado', 'Comunicação', 'Empatia', 'Detalhista', 'Aprendizado contínuo', 'Motivação'] },
  { id: 30, name: 'Engenheiro Químico', traits: ['Equipe', 'Números', 'Pesquisa', 'Ambiente físico', 'Detalhista', 'Resolver problemas práticos', 'Ciências', 'Análise', 'Planejamento', 'Estabilidade financeira'] },
];





const TestePerguntas = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [step, setStep] = useState(0);
  const [result, setResult] = useState('');

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = answer;
    setAnswers(updatedAnswers);
    
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const suggestedProfession = calculateProfession(updatedAnswers);
      setResult(suggestedProfession);
    }
  };

  const calculateProfession = (answers) => {
    const professionScores = {};
    professions.forEach(profession => {
      professionScores[profession.name] = 0;
    });
    answers.forEach(answer => {
      professions.forEach(profession => {
        if (profession.traits.includes(answer)) {
          professionScores[profession.name]++;
        }
      });
    });
    let maxScore = -1;
    let suggestedProfession = 'Profissão não encontrada';
    Object.keys(professionScores).forEach(professionName => {
      if (professionScores[professionName] > maxScore) {
        maxScore = professionScores[professionName];
        suggestedProfession = professionName;
      }
    });
    return suggestedProfession;
  };

  if (result) {
    return (
      <div className="TestePerguntas">
        <HeaderEmprego />
        <div className='ResultadoVocacional'>
          <h2>Resultado</h2>
          <p>{result}</p>
          <div>
            <p>Nosso algoritmo é como um guia compassivo em sua jornada de autodescoberta profissional. Através de uma série de perguntas cuidadosamente elaboradas, ele explora suas preferências, valores e habilidades. Cada resposta sua é um traço de cor em uma tela em branco, que, ao final, revela um retrato único e significativo: uma sugestão de profissão que ressoa com quem você é.</p>

            <p>Nosso objetivo é não apenas sugerir uma carreira, mas também iluminar o caminho para que você possa tomar decisões informadas sobre seu futuro profissional. É um convite para explorar, refletir e sonhar, guiado por um algoritmo que busca revelar a magia única que você traz para o mundo do trabalho.</p>
          </div>
          <Link to="/" className='VoltarIncial'>Voltar para a página principal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="TestePerguntas">
      <HeaderEmprego />
      <div className="questionVocacional">
        <h2>{questions[step].text}</h2>
        <div className='ProgressBarContainer'>
        <div className='ProgressBar' style={{ width: `${(step / questions.length) * 100}%` }}></div>
        </div>
        <section className='RespostasSectionVocacional'>
          {questions[step].options.map((option, index) => (
            <div key={index} className={`RespostasVocacional ${answers[step] === option ? 'selected' : ''}`} onClick={() => handleAnswer(option)}>
              <label>{option}</label>
            </div>
          ))}
        </section>
      </div>
     
    </div>
  );
};


export default TestePerguntas;

