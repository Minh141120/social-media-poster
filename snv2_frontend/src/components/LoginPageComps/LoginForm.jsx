import React from "react";
import { Form, Button } from 'react-bootstrap';
import '../styles/LoginForm.css'; // Import the CSS file here

const margin = {
    marginBottom: '10px' // Use camelCase and quotes around the value
};


const LoginForm = ({ username, password, handleLogin, usernameOnChange, passwordOnChange }) => {
    return (
        <div className="login-form-container"> {/* Use the class here */}
            <Form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" id="username" value={username} name="username" onChange={usernameOnChange} />
                </Form.Group>
                <Form.Group style={margin}>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" id="password" value={password} name="password" onChange={passwordOnChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="login-form-button">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
