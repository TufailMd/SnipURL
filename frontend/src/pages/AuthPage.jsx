import React from 'react'
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

function Auth() {
    const [login, setLogin] = React.useState(true)

    return (
        <>
            {login ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
        </>
    )
}

export default Auth;