import React, { useState ,useContext} from 'react'
import axios from 'axios';
import { Row,Col,Form,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../store/user-context';

function Login() {
    const currentUser=useContext(UserContext);

    const {isLoggedIn,getLoggedIn}=currentUser;
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const history = useHistory();
    
    async function loginHandler(e) {
        e.preventDefault();

        try {

            const loginData = {
                email,
                password,
            }

          const res=  await axios.post('/login', loginData);
          console.log(res)
            getLoggedIn();
            history.push('/allProducts');
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
        <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Button type="submit">Login</Button>
            </Form.Group>
        </Form>

        </Col>

       </Row>
    )
}

export default Login;