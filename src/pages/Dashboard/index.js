import './styles.css'
import Header from '../../components/Header';
import AddCall from '../../buttons/AddCall';
import Title from '../../components/Title';
import speak from '../../icons/speak.png'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import firebase from '../../services/firebaseConnection';
import glass from '../../icons/glass.png';
import pencil from '../../icons/pencil.png';
import Modal from '../../components/Modal';


function Dashboard() {

    

    const listRef = firebase.firestore().collection('calls').orderBy('created', 'desc');
    
    const [call, setCall] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [callDetail, setCallDetail] = useState();
    
    useEffect(()=> {
      async function loadCalls(){
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
          updateState(snapshot);
        })
        .catch((err)=>{
          console.log('Something went wrong: ', err);
          setLoadingMore(false);
        })
    
        setLoading(false);
      }
  
      loadCalls();
  
      return () => {
        
      }
    }, []);  
      
    async function updateState(snapshot){
      const isCollectionEmpty = snapshot.size === 0;
  
      if(!isCollectionEmpty){
        let list = [];
  
        snapshot.forEach((doc)=>{
          list.push({
            id: doc.id,
            subject: doc.data().subject,
            customer: doc.data().customer,
            customerID: doc.data().customerID,
            created: doc.data().created,
            status: doc.data().status,
            comment: doc.data().comment
          })
        })
  
        const lastDoc = snapshot.docs[snapshot.docs.length -1]; 
        setCall(call => [...call, ...list]);
        setLastDocs(lastDoc);
  
      } else {
        setIsEmpty(true);
      }
        setLoadingMore(false);
    }

   async function hadleMore(){
      setLoadingMore(true);
      await listRef.startAfter(lastDocs).limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
    }

    function togglePostModal(item){
        setShowPostModal(!showPostModal);
        setCallDetail(item);

    }

    function formatDate(item){
      let date = item.created.toDate()
      let day = date.getDate().toString().padStart(2, '0')
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let year = date.getFullYear();
      return  `${month}/${day}/${year}`
    }


    if(loading){
      return (
        <div  className='containerPages'>
           <Header />
            
            <div className='body'>
                <Title name='My Attendances'>
                  <img src={speak} alt='speak'/>
                </Title>
            </div>

            <div className='layout'>
              <span>Loading calls...</span>
            </div>
          
        </div>
      )
    }

    return (
        <div className='containerPages'>
            <Header />
            
                <div className='body'>
                    <Title name='My Attendances'>
                        <img src={speak} alt='speak'/>
                    </Title>

                    {call.length === 0 ? (
                        <div className='layout'>
                            <h2 className='empty-call'>No calls registered yet, add a <Link to='/customers'>customer</Link> and then create a call.</h2>
                            <Link to='/new' className='new'>
                                <AddCall /> 
                            </Link>

                        </div>
                    ) : (<>
                            <Link to='/new' className='new'>
                                <AddCall /> 
                            </Link>

                            <table>
                                <thead>
                                  <tr>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Registered in</th>
                                    <th scope="col">#</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {call.map((item, index) => {
                                
                                     
                                    return (   
                                    <tr key={index}> 
                                      <td data-label="Customer">{item.customer}</td>
                                      <td data-label="Subject">{item.subject}</td>
                                      <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: item.status === 'Open' ? "#5cb85c" : "#999" }}>{item.status}</span>
                                      </td>
                                      <td data-label="Registered">{formatDate(item)}</td>
                                      <td data-label="#">

                                        <button className='callDetails' onClick={() => togglePostModal(item)}>
                                          <img src={glass} alt='call details'/>
                                        </button>

                                        <Link className='editCall' to={`/new/${item.id}`}>
                                          <img src={pencil} alt='edit call' />
                                        </Link>
                                      </td>
                                    </tr>
                                    )
                                  })}
                                  
                                </tbody>
                            </table> 

                            { !loadingMore && !isEmpty && <button className='btn-more' onClick={hadleMore}>Search more...</button>}                      
                          </>)}
                   
                </div>

                {showPostModal&& (
                  <Modal content={callDetail} close={togglePostModal} functionDate = {formatDate} />
                )}
        </div>
        
    )
}



export default Dashboard;