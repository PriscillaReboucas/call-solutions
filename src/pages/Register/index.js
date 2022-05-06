import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../icons/logo.png'
import './styles.css'
import {AuthContext} from '../../contexts/auth'


function Register(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);
    
    function handleSubmit(e){
        e.preventDefault();
        
        if(name !== '' && email !== '' && password !== ''){
            signUp(name, email, password);
        }
    }

    return (
        <div className='app'>
            <div className='containerLogin'>            
                <div className='logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className='hidden-content'>Name:</label>
                    <input className='input-content' type='text' placeholder="Full Name" value={name} onChange={((e) => setName(e.target.value))}/>

                    <label className='hidden-content'>E-mail</label>
                    <input className='input-content' type='text' placeholder="E-mail" value={email} onChange={((e) => setEmail(e.target.value))}/>

                    <label className='hidden-content'>Password</label>
                    <input className='input-content' type='password' placeholder="Password" value={password} onChange={((e) => setPassword(e.target.value))}/>
                    <button className='register' type='submit'>{loadingAuth ? 'Loading...': 'Register'}</button>
                </form>
                <Link className='redirect' to='/'>Already have an account</Link>
            </div>
        </div>
       
    )
}

export default Register;