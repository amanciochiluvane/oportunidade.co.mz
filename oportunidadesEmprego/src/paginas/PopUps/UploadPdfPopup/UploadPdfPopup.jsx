import { useState } from 'react';
import './UploadPdfPopup.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function UploadPdfPopup({ onClose, valorPay }) {
    const { currentUser } = useSelector((state) => state.user);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Nenhum Arquivo Selecionado");
    const [error, setError] = useState('');
    const [isProcessing,setIsProcessing]=useState(false);

    // Determine if the upload button should be enabled
    const isButtonDisabled = !file;

    const handleUpload = async () => {
        setIsProcessing(true);
        if (!file) {
            setError('Nenhum arquivo selecionado.');
            return;
        }
    
        if (!currentUser || !currentUser.usuário) {
            setError('Usuário não encontrado.');
            return;
        }
    
        let name = 'Nome não disponível';
        let email = 'Email não disponível';
    
        if (currentUser.usuário.candidatoFirstName) {
            name = currentUser.usuário.candidatoFirstName;
            email = currentUser.usuário.candidatoEmail || email;
        } else if (currentUser.usuário.recruterName) {
            name = currentUser.usuário.recruterName;
            email = currentUser.usuário.recruterEmail || email;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('valorPago',valorPay);
    
        try {
            const response = await fetch('http://localhost:5000/enviar-cv-email', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                alert("PDF Enviado com Sucesso! Aguarde por 5horas e receberás o seu PDF revisto no seu email. Obrigado!")
                onClose();
                setIsProcessing(false);
                
            } else {
                setError('Falha ao enviar o CV. Tente novamente.');
                setIsProcessing(false);
            }
        } catch (error) {
            setError('Erro de rede. Tente novamente.');
            setIsProcessing(false);
        }
    };
    
    return (
        <div className="UploadPdfPopup">
            <h2>Faça Upload do seu CV</h2>

            <form className='formUploadPDF'
                onClick={() => document.querySelector(".input-field").click()}
            >
                <input
                    type="file"
                    accept='.pdf,.doc,.docx'
                    className='input-field'
                    hidden
                    onChange={({ target: { files } }) => {
                        if (files && files[0]) {
                            setFile(files[0]);
                            setFileName(files[0].name);
                        }
                    }}
                />

                {file ?
                    <div className='file-preview'>
                        <AiFillFileImage color='#6E46AE' size={60} />
                        <p className='file-name'>{fileName}</p>
                    </div>
                    :
                    <>
                        <MdCloudUpload color='#6E46AE' size={60} />
                        <p>Procure arquivos para fazer upload</p>
                    </>
                }
            </form>

            <section className='uploaded-row'>
                <AiFillFileImage color='#6E46AE' />
                <span className='upload-content'>
                    <p className='file-name'>{fileName}</p>
                    <MdDelete
                        onClick={() => {
                            setFileName("Nenhum Arquivo Selecionado");
                            setFile(null);
                        }}
                    />
                </span>
            </section>

            {error && <p className='error-message'>{error}</p>}

            <button
                className='ContactFormMoneySubmitConfirm'
                id="ContactFormMoneySubmitConfirm"
                onClick={handleUpload}
                disabled={isButtonDisabled} 
            >
               {isProcessing?"Processando ...":"Submeter CV"} 
            </button>
        </div>
    );
}



