import React, { useEffect, useRef, useState } from 'react'
import './Login.css';
import { Button, Container } from 'reactstrap';
import axios from 'axios';

export default function Login({ setIsAuth }) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [ users, setUsers ] = useState([]);
    const [ err, setErr ] = useState('');


    useEffect(()=> {
        axios.get('http://www.amock.io/api/Ziyodbek/users')
        .then(res => setUsers(res.data))
        .catch(err => setErr(err));
    })

    const LoginAdd = () => {
        let email = emailRef.current.value;
        let pass = passwordRef.current.value;
        users.map(user => {
            if(email === user.email && pass === user.password){
                window.localStorage.setItem('email', user.email)
                setIsAuth(true)
            }
        })

    }

    return (
        <Container fluid className='bg-dark'>
        <div className='login'>
            <div className='bg-light rounded shadow text-center p-1'>
                {
                    err ?
                    <div className='alert alert-danger'>{ err }</div> :
                    ''
                }
                <input ref={emailRef} type='text' className='w-75 my-3 py-2' placeholder='Enter Your Email...' />
                <input ref={passwordRef} type='text' className='w-75 my-2 py-2' placeholder='Enter Your Password...' />
                <Button onClick={LoginAdd} color='success' className='w-75 my-3'> Add </Button>
            </div>
        </div>
        </Container>
    )
}
