/* eslint-disable react/prop-types */
import "./PaymentMethodPoup.css"
import EMola from "../../../assets/E-Mola.png"
import MPesa from "../../../assets/M-Pesa.png"
import effect from "../../../assets/effect.png"
import  { useState } from 'react';


export default function PaymentMethodPopup({ onSelectMethod , valorPay}) {
    
    return (

        <div className="PaymentMethodPopup">
            <h2>Métodos de Pagamento</h2>
            <img src={effect} />
            <section>
                <article onClick={() => onSelectMethod('emola')}>
                    <article>
                        <img src={EMola} alt="Emola" />
                        <div>
                            <h2>E-Mola</h2>
                            <p>Pagamentos</p>
                        </div>
                    </article>
 
                    <h2>{valorPay},00 <span>Mts</span></h2>
                </article>

                <article onClick={() => onSelectMethod('mpesa')}>
                    <article >
                        <img src={MPesa} alt="" />
                        <div>
                            <h2>M-Pesa</h2>
                            <p>Pagamentos</p>
                        </div>
                    </article>
 
                    <h2>{valorPay},00 <span>Mts</span></h2>
                </article>

            </section>
            
        </div>
    );
}
