import './styles.css'
import closeIcon from '../../icons/close.png'



export default function Modal({content, close, functionDate}){

    

    return(
      <div className="modal">
        <div className="container">
          <button className="close" onClick={ close }>
                <img src={closeIcon} alt='close' />
                Back
          </button>
  
          <div>
            <h2>Call details</h2>
  
            <div className="row">
              <span>
                Customer: <i>{content.customer}</i>
              </span>
            </div>
  
            <div className="row">
              <span>
                Subject: <i>{content.subject}</i>
              </span>
              <span>
                Registered in: <i>{functionDate(content)}</i>
              </span>
            </div>
  
            <div className="row">
              <span>
                Status: <i style={{ color: '#FFF', backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999' }}>{content.status}</i>
              </span>
            </div>
  
            {content.comment !== '' && (
              <>
                <h3>Comment</h3>
                <p>
                  {content.comment}
                </p>
              </>
            )}
  
          </div>
        </div>
      </div>
    )
  }