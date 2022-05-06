import plus from '../../icons/plus.png'
import './styles.css'


export default function AddCall(){
    return (
        <div className='containerAddCall'>
            <button className='addCall'>
                <img src={plus} alt='add call'/>
                <h3>Add new call</h3>
            </button>
        </div>
    )
}