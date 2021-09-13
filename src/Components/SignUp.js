import React, { useState,useContext } from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../store/user-context'


function SignUp() {

    const currentUser = useContext(UserContext);
    const {getLoggedIn}=currentUser;
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    
    const history = useHistory();
    
    async function signUpFormHandler(e) {
        e.preventDefault();

        try {
            const newUserData = {
                email,
                password,
                passwordVerify
            }
    
            const res=await axios.post('/register',newUserData);
            getLoggedIn();
                console.log(newUserData)
            
            console.log(res)
            
            
            history.push('/allproducts');

        }
        catch (e) {
            console.log(e);
        }

    }


    return (
       <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
        <Form onSubmit={signUpFormHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>setPasswordVerify(e.target.value)}/>
            </Form.Group>
            
                <Button variant="primary" type="submit">SignUp</Button>

        </Form>

        </Col>

       </Row>
    )
}

export default SignUp;