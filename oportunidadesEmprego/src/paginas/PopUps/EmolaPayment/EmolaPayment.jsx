/* eslint-disable react/prop-types */
import  { useState } from 'react';
import "../MpesaPayment/MpesaPayment.css";

export default function EmolaPayment({ onConfirmPayment, onCancel, valorPay }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handlePaymentUsing = async () => {
        console.log('handlePaymentUsing() start...');
        setIsProcessing(true);
        
        // Composição do payload para realizar a transação
        const formData = {
            carteira: '1724063452409x242030569118760960',
            numero: phone, // número de telefone inserido no formulário
            'quem comprou':phone, // Substitua pelo nome do comprador real
            valor: valorPay,
        };

        try {
            const response = await fetch('https://mozpayment.online/api/1.1/wf/pagamentorotativoemola', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                // Pagamento realizado com sucesso
                console.log('handlePaymentUsing() end with success...', data);
                setMessage({ text: 'Pagamento realizado com sucesso!', type: 'success' });
                onConfirmPayment('Pagamento bem-sucedido!');
            } else {
                const errorData = await response.json();
                console.log('handlePaymentUsing() end with errors...', errorData);
                setMessage({ text: 'Pagamento falhou. Tente novamente ou mais tarde.', type: 'error' });
                onConfirmPayment('Pagamento falhou.');
            }
        } catch (error) {
            console.log('Network error: ', error);
            setMessage({ text: 'Pagamento falhou. Tente novamente ou mais tarde.', type: 'error' });
            onConfirmPayment('Pagamento falhou.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="MPESAPAYMENT">
            <article>
                <h3>Valor a Pagar</h3>
                <h2>{valorPay},00<span>Mts</span></h2>
            </article>
            
            <div>
                <article className='ContactFormMoney'>
                    <label htmlFor="InputContact">Digite o seu contacto</label>
                    <input
                        type="text"
                        id='InputContact'
                        value={phone}
                        pattern="\d{0,9}"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,9}$/.test(value)) {
                                setPhone(value);
                            }
                        }}
                    />
                </article>
                <div className='ContactFormMoneySubmit'>
                    <button onClick={handlePaymentUsing} className='ContactFormMoneySubmitConfirm'>
                        {isProcessing ? "Processando...." : "Confirmar Pagamento"}
                    </button>
                    <button className='ContactFormMoneySubmitCancel' onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
