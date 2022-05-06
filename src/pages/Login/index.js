
import {Link} from 'react-router-dom';
import logo from '../../icons/logo.png';
import { useState } from 'react';
import './styles.css'
import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth';

function Login() {

    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);

     function handleSubmtit(e){
        e.preventDefault();
        
        if(email !== '' && password !== ''){
           signIn(email, password);
        }
    }

    return (
        <div className='app'>
            <div className='containerLogin'>
                <div className='logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <form onSubmit={handleSubmtit}>
                    <label className='hidden-content'>E-mail</label>
                    <input className='input-content' type='text' placeholder='E-mail' value={email} onChange={( (e) => setEmail(e.target.value) )}/>
                    <label className='hidden-content'>Password</label>
                    <input className='input-content' type='password' placeholder='Password' value={password} onChange={( (e) => setPassword(e.target.value) )}/>
                    <button className='login-button' type='submit'>{loadingAuth ? 'Loading...' : 'Login'}</button>
                </form>
                <Link className='register-button' to='/register'>Register</Link>
            </div>
        </div>
    )
}


export default Login;