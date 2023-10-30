import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const Navigate = useNavigate();
    const [authing, setAuthing] = useState(false);



    const signInWithGoogle = async () => {
        setAuthing(true);

        try {
            const response = await signInWithPopup(auth, new GoogleAuthProvider());
            console.log(response.user.uid);
            Navigate('/');
        } catch (error) {
            console.log(error);
            setAuthing(false);
        }
    };

    const signInWithFacebook = async () => {
        setAuthing(true);

        try {
            // Use the FacebookAuthProvider to sign in with Facebook
            const response = await signInWithPopup(auth, new FacebookAuthProvider());
            console.log(response.user.uid);
            Navigate('/');
        } catch (error) {
            console.error(error);
            setAuthing(false);
        }
    };

    console.log(auth?.currentUser?.photoURL);

    

    return (
        
        <div className="signIn">
            <p>Login Now!</p>
            

            <p>Welcome to your login page</p>
            <button className="signInGoogle" onClick={signInWithGoogle}>Sign in with Google</button>
            <button className="signInFacebook" onClick={signInWithFacebook}>Sign in with Facebook</button>
        </div>
    );
};

export default LoginPage;
