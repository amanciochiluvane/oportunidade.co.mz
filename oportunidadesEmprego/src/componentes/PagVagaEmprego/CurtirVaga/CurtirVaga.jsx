import  { useState } from 'react';
import Coracao from '../../../assets/Coracao.png'
import CoracaoVermelho from '../../../assets/CoracaoVermelho.png'

const CurtirVaga = () => {
  const [imagemCoracao, setImagemCoracao] = useState(Coracao);
  const [curtido, setCurtido] = useState(false);

  const handleClickCoracao = () => {
    setCurtido(!curtido);
    setImagemCoracao(curtido ? Coracao : CoracaoVermelho);
  };

  return (
    <div className='CurtirVaga' onClick={handleClickCoracao}>
      <img src={imagemCoracao} alt="Ícone de coração" />
    </div>
  );
};

export default CurtirVaga;
