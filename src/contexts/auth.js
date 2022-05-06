import {useState, createContext, useEffect} from 'react'
import firebase from '../services/firebaseConnection';
import {toast} from 'react-toastify';

export const AuthContext = createContext();

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage(){
            const storageUser = localStorage.getItem('SystemUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

   async function signUp(name, email, password){
       setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            await firebase.firestore().collection('users').doc(value.user.uid)
                .set({
                    name: name,
                    avatarURL: null,
                })
                .then(() => {
                    let data = {
                        uid: value.user.uid,
                        name: name,
                        email: value.user.email,
                        avatarURL: null
                    };

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    toast.success('Welcome to the platform')
                })
        })
        .catch((error) => {
            setLoadingAuth(false);
            if(error.code === 'auth/weak-password'){
                toast.error('Password is not strong enough, please try again');
            } else if (error.code === 'auth/email-already-in-use') {
                toast.error("This email already has been registered");
            }
        })
    }

        function storageUser(data){
            localStorage.setItem('SystemUser', JSON.stringify(data))
        }

        async function signOut(){
            await firebase.auth().signOut();
            localStorage.removeItem('SystemUser');
            setUser(null);
        }

        async function signIn(email, password){
            setLoadingAuth(true);
            await firebase.auth().signInWithEmailAndPassword(email, password)
                    .then( async (value) => {
                       const userProfile = await firebase.firestore().collection('users').doc(value.user.uid).get();
                       let data = {
                           uid: value.user.uid,
                           name: userProfile.data().name,
                           avatarURL: userProfile.data().avatarURL,
                           email: value.user.email
                       };

                       setUser(data);
                       storageUser(data);
                       setLoadingAuth(false);
                       toast.success('Welcome back')
                    })
                    .catch((error) => {
                        setLoadingAuth(false);
                        if(error.code === 'auth/wrong-password'){
                            toast.error('E-mail or password wrong');
                        } else if(error.code === 'auth/invalid-email'){
                            toast.error('The email address is badly formatted, please try a new one')
                        } else if (error.code === 'auth/user-not-found') {
                            toast.error('There is no user record corresponding to this e-mail, please check again or register a new account')
                        }
                        console.log(error);                        
                    })
        }

    return (
        <AuthContext.Provider value={{signed: !!user, user: user, loading: loading, signUp, signOut, signIn, loadingAuth: loadingAuth, setUser, storageUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;