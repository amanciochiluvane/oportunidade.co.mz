import  { useState } from 'react';
import './RecrutadorSettings.css'
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut
 
} from '../../../redux/user/userSlice';
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

export default function RecrutadorSettings() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        // eslint-disable-next-line no-unused-vars
        formState:{ errors },

    }=useForm();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setIsLoading(true);

    // Verifica se companyLogotipo recebeu algum dado
    if (!data.companyLogotipo || data.companyLogotipo.length === 0) {
        data.companyLogotipo = currentUser.usuário.companyLogotipo;
        submitForm(data);
    } else {
        const logoFile = data.companyLogotipo[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            const logoBase64 = reader.result;
            data.companyLogotipo = logoBase64;
            submitForm(data);
        };

        reader.readAsDataURL(logoFile);
    }
};

const submitForm = async (data) => {
    dispatch(updateUserStart());

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}/updateRecrutador/${currentUser.usuário._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const formdata = await res.json();

        if (formdata.success === false) {
            dispatch(updateUserFailure(formdata));
            alert('Falha ao atualizar o perfil');
            return;
        }

        dispatch(updateUserSuccess(formdata));
        alert('Perfil Atualizado com Sucesso!');
        dispatch(signOut());
        navigate('/escolher-tipo-login/recrutador');
    } catch (error) {
        dispatch(updateUserFailure(error));
        alert('Ocorreu um erro ao atualizar o perfil');
    } finally {
        setIsLoading(false);
    }

   
};

  return (
    <div className='Dashboard'>
      <h2 className='ConfigTit'>Configurações</h2>
    <form onSubmit={handleSubmit(onSubmit)}>

    
      <div className='FotoPerfil'>
        <p>Foto de Perfil</p>
        <input type="file" id="fileInput"  {...register("companyLogotipo")} />
      </div>

      <section className='TextosConfig'>
            <div>
                <p>Nome Recrutador</p>
                <input type="text" {...register("recruterName")} defaultValue={currentUser.usuário.recruterName} />
            </div>
            <div>
                <p>Email Recrutador</p>
                <input type="email" {...register("recruterEmail")} defaultValue={currentUser.usuário.recruterEmail} />
            </div>

            

      </section>

      <article className='DecisaoConfig'>
        <input className='ActualizarConfig' type='submit' value={isLoading ? 'Processando ...' : 'Actualizar'}/>
        
      </article>
      </form>
    </div>
  );
}
