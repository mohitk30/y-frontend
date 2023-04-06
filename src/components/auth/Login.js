import React,{useState} from 'react'
import './login.css'
import { register,login } from '../../services' 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login=()=>{

    const [registerEmail,setRegisterEmail]=useState('');
    const [registerPassword,setRegisterPassword]=useState('');

    const [loginEmail,setLoginEmail]=useState('');
    const [loginPassword,setLoginPassword]=useState('');

    const handleRegisterUser= async ()=>{
         if( registerEmail ==='' ){
            toast.error("Email is required");
            return;
         }
         if( registerPassword ==='' ){
            toast.error("Password is required");
            return;
         }

         const result= await register({
            email:registerEmail,
            password:registerPassword
         })

         if( result?.data?.status==='200'){
            toast.success(result?.data?.message)
            setRegisterEmail('');
            setRegisterPassword('');

         }else{
            toast.error(result?.data?.message);
         }
    }
    const navigate = useNavigate();
    // login function handler
    const handleLogin= async ()=>{
        if( loginEmail ==='' ){
            toast.error("Email is required");
            return;
         }
         if( loginPassword ==='' ){
            toast.error("Password is required");
            return;
         }

         const result= await login({
            email:loginEmail,
            password:loginPassword
         })

         if( result?.data?.status==='200'){
            toast.success(result?.data?.message)
            localStorage.setItem("6f0bb1e57b8223a94ededf83ad6e1e40",  result?.data?.token)
            setRegisterEmail('');
            setRegisterPassword('');
            navigate('/contacts'); 
            
         }else{
            toast.error(result?.data?.message);
         }
    } 

    return (
        <>
        <div className='appHeader font-bold  '>Contact Manager</div>
       <div className='flex w-[100%]'>
                 <div className='w-[50%] leftBlock'>
                    <div className='p-5 font-bold  headingTag'>Register</div>
                    <div className='px-5'>Register here if you have't done before.</div>
                    <div className='p-5'>

                        <input className='inputsBlock' value={registerEmail} placeholder='Email..' onChange={(e)=>setRegisterEmail(e.target.value)} />
                        <input className='inputsBlock' type='password' value={registerPassword}  placeholder='Password..' onChange={(e)=>setRegisterPassword(e.target.value)} />
                        <div className='buttonDiv'>
                            <button className='buttonYellow' onClick={handleRegisterUser} >Register</button>
                        </div>
                    </div>
                 </div>
                 <div className='w-[50%] leftBlock'>
                 <div className='p-5 font-bold  headingTag'>Login</div>
                 <div className='px-5'>Login with your Email and password.</div>
                   <div className='p-5'>

                        <input className='inputsBlock' value={loginEmail} placeholder='Email..'  onChange={(e)=>setLoginEmail(e.target.value)} />
                        <input className='inputsBlock' type='password' value={loginPassword} placeholder='Password..' onChange={(e)=>setLoginPassword(e.target.value)} />
                        <div className='buttonDiv'>
                            <button className='buttonYellow' onClick={handleLogin} >Login</button>
                        </div>
                    </div>
                 </div>
            </div>
            
            </>)
}
export default Login;