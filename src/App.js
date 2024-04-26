import './App.css';
import { useForm } from 'react-hook-form';

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
      mode: "onBlur",
      defaultValues: {
          email: '',
          password: ''
      },
  });

  const emailProps = {
    pattern: {
      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      message: "Неверный адрес электронной почты",
    },
  };

  const passwordProps = {
    minLength: {value: 8, message: "Пароль должен быть не менее 8 символов"},
    pattern: {
      value: /^\w+[!$~#&]/,
      message: "Пароль должен содержать буквы, цифры и спецсимволы",
    },
  };

  let passwordError = errors.password?.message; 
  let emailError = errors.email?.message; 
  
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit(sendFormData)}>
        
        
        
        <input 
            className='input-field'
            name="email"
            // type="email"
             type='text'
            placeholder="Почта"
            {...register('email', emailProps)}
            
        />
        {emailError && <div className="error-msg">{emailError}</div>}
         <input
            className='input-field'
            name="password"
            type="password"
            placeholder="Пароль"
            {...register('password', passwordProps)}
            
        />
        {passwordError && <div className="error-msg">{passwordError}</div>}
        <input
            className='input-field'
            name="password_repeated"
            type="password"
            placeholder="Повторно введите пароль"
            {...register("password_repeated", {
              required: "Please confirm your password",
              validate: (value) => {
                return value === watch("password") || "Пароли не совпадают";
              }
            })}
            
        />
        {errors.password_repeated && (
          <div className='error-msg'>{errors.password_repeated.message}</div>
        )}
        <button 
          className="button" 
          type="submit" 
          disabled={!!(emailError || passwordError || errors.password_repeated)}>Зарегистрироваться </button>
        </form>
    </div>
  );
}

export default App;
