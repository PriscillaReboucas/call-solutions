
import './styles.css'
import Header from '../../components/Header';
import Title from '../../components/Title';
import settings from '../../icons/settings.png'
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import avatar from '../../icons/avatar.png'
import firebase from '../../services/firebaseConnection'

function Profile(){

    const { signOut, user, setUser, storageUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [avatarURL, setAvatarURL] = useState(user && user.avatarURL);
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e){
        // if there's a file
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarURL(URL.createObjectURL(e.target.files[0]));
            } else {
                alert ('Only JPEG and PNG types are allowed');
                setImageAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;
        
        const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then( async () => {
                console.log('Image has been sent successfully');
                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then( async (url) => {
                        await firebase.firestore().collection('users').doc(user.uid)
                        .update({
                            avatarURL: url,
                            name: name
                        })
                        .then(() => {
                            let data = {
                                ...user,
                                avatarURL: url,
                                name: name
                            };

                            setUser(data);
                            storageUser(data);
                        })
                    })
            })
         
        
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && name !== ''){
            await firebase.firestore().collection('users').doc(user.uid)
                    .update({
                        name: name
                    })
                    .then (() => {
                        let data = {
                            ...user,
                            name:name
                        };

                        setUser(data);
                        storageUser(data);
                    })
        } else if (imageAvatar !== null && name !== ''){
            handleUpload();
            
        }
    }

    return (
        <div className='containerPages'>
            <Header />
            <div className='body'>
                <Title name='My Account'>
                    <img src={settings} alt='settings'/>
                </Title>
            
                <div className='layout'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span className='hidden-name'>Photo</span>
                            <input type='file' accept='image/*' onChange={handleFile}/><br />
                            {avatarURL === null ? 
                            <img src={avatar} alt='profile from user'/>
                            :
                            <img src={avatarURL} alt='profile from user'/>
                            }
                        </label>

                        <label>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>

                        <label>E-mail</label>
                        <input type="text" value={email} disabled={true} />     

                        <button type="submit">Save</button>       
                    </form>
                </div>

                <div className="layout">
                    <button className="logout-btn" onClick={ () => signOut() }>Exit</button>
                </div>
            </div>
        </div>
    )
}



export default Profile;