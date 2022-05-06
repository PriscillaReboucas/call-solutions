import './styles.css'

export default function Title({children, name}){
   
    return (
        <h2 className='title'>
            {children}
            <p>{name}</p>
        </h2>
    )
}