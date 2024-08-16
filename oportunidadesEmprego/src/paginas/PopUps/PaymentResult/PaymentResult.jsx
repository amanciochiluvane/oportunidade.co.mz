/* eslint-disable react/prop-types */
import emogitriste from "../../../assets/EmogiTriste.png";
import emogifeliz from "../../../assets/Emogifeliz.png";
import "./PaymentResult.css";
import { Link } from "react-router-dom";

export default function PaymentResult({ success, onClose, onProceed }) {
    const isSuccessful = success === 'Pagamento bem-sucedido!';

    return (
        <div className="PaymentResult">
            <article>
                <img 
                    src={isSuccessful ? emogifeliz : emogitriste} 
                    alt={isSuccessful ? 'Emoji feliz' : 'Emoji triste'} 
                />
                <h2>{isSuccessful ? 'Pagamento Confirmado!' : 'Pagamento não confirmado!'}</h2>

                <button 
                    className='ContactFormMoneySubmitConfirm' 
                    id="ContactFormMoneySubmitConfirm"  
                    onClick={onProceed} 
                    disabled={!isSuccessful} // Disable button if payment was unsuccessful
                >
                    Continuar
                </button>
            </article>
        </div>
    );
}
