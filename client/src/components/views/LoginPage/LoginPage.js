import React, { useState } from 'react';

const LoginPage = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const { 
            target: { name, value } 
        } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

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
                <label>Email</label>
                <input name="email" type="email" value={email} onChange={onChange} required/>
                <label>Password</label>
                <input name="password" type="password" value={password} onChange={onChange} required/>
                <br />
                <button>Login</button>
            </form>
        </div>
    )
};
export default LoginPage;