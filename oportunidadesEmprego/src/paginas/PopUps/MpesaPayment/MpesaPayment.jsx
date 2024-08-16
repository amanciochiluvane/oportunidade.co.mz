import React, { useState } from 'react';
import "./MpesaPayment.css"
export default function MpesaPayment({ onConfirmPayment, onCancel,valorPay }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [token, setToken] = useState(null);
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

  
    const handlePaymentUsing = async () => {
        console.log('handlePaymentUsing() start...');
        setIsProcessing(true);
        const credentials = {
          grant_type: 'client_credentials',
          client_id: '9cb19646-6c1f-4820-8cd7-853c07e982e3',
          client_secret: 'T2bclW9Rm0whpmVlPFJza8KyTGrkHU1zIplBo2Pm',
          emola_wallet_id: null, // eMola Production e2Payments
          mpesa_wallet_id: '461143', // Carteira de Testes da Live
        };
    
        const tokenCredentials = {
          grant_type: credentials.grant_type,
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
        };
    
        // Passo 1 - Requisição do token
        let token1;
        try {
          const response = await fetch('https://e2payments.explicador.co.mz/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(tokenCredentials),
          });
    
          if (response.ok) {
            const data = await response.json();
            token1 = `${data.token_type} ${data.access_token}`;
            setToken(token1);
          } else {
            const errorData = await response.json();
            console.log('Server error #52: ', errorData);
            setMessage({ text: 'Erro ao obter o token. Tente novamente.', type: 'error' });
            return false;
          }
        } catch (error) {
          console.log('Network error: ', error);
          setMessage({ text: 'Erro de rede ao obter o token. Tente novamente.', type: 'error' });
          return false;
        }
    
        if (!token1) {
          console.log('Failed to obtain token');
          setMessage({ text: 'Falha ao obter o token. Tente novamente.', type: 'error' });
          return;
        }
    
        // Passo 2 - Composição do payload para realização da transação
        const formData = {
          client_id: credentials.client_id,
          sms_reference: 'JogoB1234', // A ser mostrada na SMS de confirmação de pagamento (Mpesa/eMola)
          phone, // número de telefone inserido no formulário
          amount: valorPay,
          reference: 'PROe2Payments321', // A ser mostrada no POPUP na inserção do PIN (Mpesa/eMola), sem espaços e sem acentos, máximo 32 caracteres, apenas letras e números
          fromApp: null, // Se a opção senha de apps estiver ativa
        };
    
        const ENDPOINT = `https://e2payments.explicador.co.mz/v1/c2b/mpesa-payment/${credentials.mpesa_wallet_id}`;
         
    
        try {
          const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
              'Authorization': token1,
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
            onConfirmPayment('Pagamento bem-sucedido!')
          } else {
            const errorData = await response.json();
            console.log('handlePaymentUsing() end with errors #100...', errorData);
            setMessage({ text: 'Pagamento falhou. Tente novamente ou mais tarde.', type: 'error' }); 
            onConfirmPayment('Pagamento falhou.')
          }
        } catch (error) {
          console.log('Network error: ', error);
          setMessage({ text: 'Pagamento falhou. Tente novamente ou mais tarde.', type: 'error' });
          onConfirmPayment('Pagamento falhou.')
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
                        <button onClick={handlePaymentUsing} className='ContactFormMoneySubmitConfirm' > {isProcessing?"Processando....":"Confirmar Pagamento"}</button>
                        <button className='ContactFormMoneySubmitCancel' onClick={onCancel}>Cancelar</button>
                    </div>
                </div>
         
        </div>
    );
}
