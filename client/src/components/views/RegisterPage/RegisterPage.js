import React, { useState } from 'react';

const RegisterPage = () => {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onNameHandler = (event) => {
        setName(event.target.value);
    }

    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert('Password and confirm password do not match')
        }

        let body = {
            name: name,
            email: email,
            password: password, 
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
            <form 
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onSubmit={onSubmit}
            >
                <label>Name</label>
                <input name="name" type="text" value={name} onChange={onNameHandler} required/>
                <label>Email</label>
                <input name="email" type="email" value={email} onChange={onEmailHandler} required/>
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={onPasswordHandler} required/>
                <label>Confirm Password</label>
                <input name="confirmPassword" type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} required/>
                
                <br />
                <button>Login</button>
            </form>
        </div>
    )
};
export default RegisterPage;
