import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useEffect } from 'react';



const schema = yup.object().shape({
  email: yup.string()
    .email('Неправильный адрес электронной почты')
      
    .required('Поле обязательно для заполнения'),
  
  password: yup.string()
    .matches (
      /^\w+[!$~#&]/,
      'Пароль должен содержать буквы, цифры и спецсимволы'
    )
    .min(8, 'Длина пароля не должна быть менее 8 символов'),

  password_repeated: yup.string()
    .oneOf([yup.ref('password')], "Пароли не совпадают")
  },
  

);

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema)   
  });

  const submitButtonRef = useRef(null);

  useEffect(() => {
    
    if (!(errors.email || errors.password || errors.password_repeated)) 
      submitButtonRef.current.focus(); 
  });

  return (
    <div className="App">
      <h1>Гаврила был примерным мужем</h1>
      <form onSubmit={handleSubmit(sendFormData)}>     
        
        <input 
            className='input-field'
            name="email"
            // type="email"
             type='text'
            placeholder="Почта"
            {...register('email')}   
        />
        {errors.email && <div className="error-msg">{errors.email.message}</div>}
       
          <input
            className='input-field'
            name="password"
            type="password"
            placeholder="Пароль"
            {...register('password')}
            
        /> 
         {errors.password && <div className="error-msg">{errors.password.message}</div>}
        <input
            className='input-field'
            name="password_repeated"
            type="password"
            placeholder="Повторно введите пароль"
            {...register('password_repeated')}
        />
        {errors.password_repeated && (
          <div className='error-msg'>{errors.password_repeated.message}</div>
        )} 
        <button 
          className="button" 
          type="submit" 
          ref={submitButtonRef}
          disabled={!!(errors.email || errors.password || errors.password_repeated)}>Зарегистрироваться </button>
    
        </form>
    </div>
  );
}

export default App;
