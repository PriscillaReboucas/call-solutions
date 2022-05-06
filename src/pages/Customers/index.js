
import './styles.css'
import Title from '../../components/Title';
import Header from '../../components/Header';
import pencil from '../../icons/pencil.png';
import {useState} from 'react';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';

function Customers(){

    const [company, setCompany] = useState('');
    const [nif, setNif] = useState('');
    const [address, setAddress] = useState('');

    async function handleRegister(e){
        e.preventDefault();
        
        if(company !== '' && nif !== '' && address !== ''){
            await firebase.firestore().collection('customers')
            .add({
                company: company,
                nif: nif,
                address: address
            })
            .then(() => {
                setCompany('');
                setNif('');
                setAddress('');
                toast.info('Company has been registered successfully.')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Sorry, the company has not been salved.')
            })
        } else {
                toast.error('Please, fill in all the spaces.')
        }

    }

    return (
        <div className="containerPages"> 
            <Header />

            <div className='body'>
                <Title name='New customer'>
                    <img src={pencil} alt='pencil'/>
                </Title>

                <div className='layout'>
                    <form onSubmit={handleRegister} className='form-customer'>
                        <label>Customer's name</label>
                        <input type='text' value={company} onChange={ (e) => setCompany(e.target.value)} />

                        <label>NIF</label>
                        <input type='text' value={nif} onChange={ (e) => setNif(e.target.value)}/>
                        
                        <label>Address</label>
                        <input type='text' value={address} onChange={ (e) => setAddress(e.target.value)}/>

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div> 
        </div>
    )
}


export default Customers;