import './Global.css';

import Header from '../componants/header/header.js';
import Footer from '../componants/footer/footer.js'
import SignInForm from '../componants/signinform/signinform.js'


function SignIn() {
    return (
        <>
            <Header />
            <SignInForm />
            <Footer />
        </>
    );     
}

export default SignIn;