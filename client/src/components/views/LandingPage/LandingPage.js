import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();
  
    const logoutHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                navigate("/login")
            } else {
                alert('Failed to log out')
            }
        })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
        <h2>Landing Page</h2>

        <button onClick={logoutHandler}>Log Out</button>
        </div>
    )
};

export default LandingPage;