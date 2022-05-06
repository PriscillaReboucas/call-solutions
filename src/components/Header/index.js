import './styles.css';
import { Link } from 'react-router-dom';
import avatar from '../../icons/avatar.png';
import home from '../../icons/home.png';
import customers from '../../icons/clients.png';
import settings from '../../icons/settings.png';
import {AuthContext} from '../../contexts/auth';
import { useContext } from 'react';

export default function Header(){

    const { user } = useContext(AuthContext);
    return (
        <header className='containerHeader'>
            <div className='profile'>
                <img src={user.avatarURL === null ? avatar : user.avatarURL} alt='avatar'/>
            </div>
            <nav className='mainNavigation'>
                    <Link className='menu' to='/dashboard'>
                        <img src={home} alt='call' />
                        <p>Calls</p>
                    </Link>
                    <Link className='menu' to='/customers'>
                        <img src={customers} alt='customers' />
                        <p>Customers</p>
                    </Link>
                    <Link className='menu' to='/profile'>
                        <img src={settings} alt='settings' />
                        <p>Settings</p>
                    </Link>
            </nav>
    </header>
    )
}