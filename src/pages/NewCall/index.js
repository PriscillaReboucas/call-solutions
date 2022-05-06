
import './styles.css';
import Title from '../../components/Title';
import plus from '../../icons/plus.png';
import Header from '../../components/Header';
import { useState, useEffect, useContext } from 'react';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';

export default function NewCall(){

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [subject, setSubject] = useState('Support');
    const [status, setStatus] = useState('Open');
    const [comment, setComment] = useState('');
    const [idCustomer, setIdCustomer] = useState(false);

    const { user } = useContext(AuthContext);

    const {id} = useParams();

    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers').get()
            .then( (snapshot) => {
                let list = [];

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        company:doc.data().company
                    })
                })

                if(list.length === 0){
                    console.log('None company has been found ');
                    setCustomers({ id: '1', company: 'None'});
                    setLoading(false);
                   
                }

                setCustomers(list);
                setLoading(false);

                if(id){
                    loadId(list);
                }
            })
            .catch((error) => {
                console.log('Something went wrong', error);
                setLoading(false);
                setCustomers([{ id: '1', company: ''}])
            })
        }

        loadCustomers();
    }, []);

    function handleChangeCustomer(e){
       setCustomerSelected(e.target.value);
    }

    async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('calls').doc(id)
            .update({
                customer: customers[customerSelected].company,
                customerID: customers[customerSelected].id,
                subject: subject,
                status: status,
                comment: comment,
                userId: user.uid
            })
            .then(() => {
                toast.success('Call has been updated successfully');
                setCustomerSelected(0);
                setComment('');
                setSubject('Support');
              
            })
            .catch((error) => {
                toast.error('Save has not been completed, please try later');
                console.log(error)
            })

            return;
        }
        
        await firebase.firestore().collection('calls')
        .add({
            created: new Date(),
            customer: customers[customerSelected].company,
            customerID: customers[customerSelected].id,
            subject: subject,
            status: status,
            comment: comment,
            userId: user.uid
        })
        .then( () => {
            toast.success('New call has been saved successfully');
            setComment('');
            setCustomerSelected(0);
        })
        .catch((error) => {
            toast.error('Save has not been completed, please try later');
            console.log(error);
        })
       
    }

    function handleSubject(e){
        setSubject(e.target.value);
    }

    function handleStatus(e){
        setStatus(e.target.value);
    }

    async function loadId(list){
        await firebase.firestore().collection('calls').doc(id)
        .get()
        .then((snapshot) => {
            setSubject(snapshot.data().subject);
            setStatus(snapshot.data().status);
            setComment(snapshot.data().comment)

            let index = list.findIndex(item => item.id === snapshot.data().customerID);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((error) => {
            console.log(error);
            setIdCustomer(false);
        })
    }


    return (
        <div className='containerPages'>
            <Header />
        
            <div className='body'>
                <Title name='Call'>
                    <img src={plus} alt='add' className='plus'/>
                </Title>

                {customers.length === 0? (
                    <div className='layout'>
                        <h2>You dont have a customer registered yet, please create a customer <Link to='/customers'> here</Link></h2>
                    </div>) : (
                    <div className='layout'>
                        <form className='form-customer' onSubmit={handleRegister}>
                            <label>Customer</label>

                            {loading ? (
                                <input type='text' disabled={true} value='Looking for customers...' />
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.length !== 0 && customers.map((item, index) => {
                                        return (
                                            <option key={item.id} value={index}>{item.company}</option>
                                        )
                                    })}
                                </select>
                            )}
                            <label>Subject</label>
                                <select value={subject} onChange={handleSubject}>
                                    <option value='Support'>Support</option>
                                    <option value='Technical Visit'>Technical Visit</option>
                                    <option value='Financial'>Financial</option>
                                </select>
                                
                            <label>Status</label>
                                <div className='status'>
                                    <input type='radio' name='radio' value='Open' onChange={handleStatus} checked={status === 'Open'}/> 
                                        <span>Open</span>
                                    <input type='radio' name='radio' value='Progress' onChange={handleStatus} checked={status === 'Progress'}/> 
                                        <span>Progress</span>    
                                    <input type='radio' name='radio' value='Answered' onChange={handleStatus} checked={status === 'Answered'}/> 
                                        <span>Answered</span> 
                                </div>

                            <label>Comments</label>
                            <textarea type='text' placeholder='Describe your problem (opcional)' value={comment} onChange={(e) => setComment(e.target.value)}/>

                            <button type='submit'>Save</button>
                        </form>
                    </div>
                )}           
               
            </div>
    </div>
    )
}