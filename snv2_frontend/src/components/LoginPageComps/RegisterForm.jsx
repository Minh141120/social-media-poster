import React from "react";
import { Form, Button } from 'react-bootstrap';

const margin = {
    marginBottom: '10px' // Use camelCase and quotes around the value
};

const RegisterForm = ({ newName, newUsername, newPassword, newPassword2, handleRegister, newNameOnChange, newUsernameOnChange, newPasswordOnChange, newPassword2OnChange }) => {
    return (
        <div className="login-form-container"> {/* Reuse the class from LoginForm */}
            <Form onSubmit={handleRegister} className="login-form">
                <h2>Register</h2>
                <Form.Group>
                    <Form.Label htmlFor="newname">Name</Form.Label>
                    <Form.Control type="text" id="newname" value={newName} name="newname" onChange={newNameOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="newusername">Username</Form.Label>
                    <Form.Control type="text" id="newusername" value={newUsername} name="newusername" onChange={newUsernameOnChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="newpassword">Password</Form.Label>
                    <Form.Control type="password" id="newpassword" value={newPassword} name="newpassword" onChange={newPasswordOnChange} />
                </Form.Group>
                <Form.Group style={margin}>
                    <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                    <Form.Control type="password" id="confirmPassword" value={newPassword2} name="confirmPassword" onChange={newPassword2OnChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-form-button">Register</Button> {/* Reuse the class from LoginForm */}
            </Form>
        </div>
    );
};

export default RegisterForm;
