import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginForm from "../../components/LoginPageComps/LoginForm"
import RegisterForm from "../../components/LoginPageComps/RegisterForm"
import AuthService from "../../services/AuthService"
import UserService from "../../services/UserService"
import {Button} from "react-bootstrap"
const LoginPage = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [newName, setNewName] = useState("")
    const [accountStatus, setAccountStatus] = useState(true)
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('try login')
        const user = await AuthService.login({username, password})
        window.localStorage.setItem('loggedSocialNetworkUser', JSON.stringify(user))
        console.log(user)
        setUser(user)
        setUsername('')
        setPassword('')
        navigate(`/userhomepage/${user.id}`)
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('try register')
        if(newPassword === newPassword2){
            const userObject = {
                name: newName,
                username: newUsername,
                password: newPassword
            }
            const newUser = await UserService.create(userObject)
            // const newUser2 = await AuthService.register(userObject)
            setNewName('')
            setNewUsername('')
            setNewPassword('')
            setNewPassword2('')
            console.log(newUser)
        } else{
            setErrMsg('ur password is sus')
            setTimeout(()=> {
                setErrMsg(null)
            },5000)
        }
        
    }
    return(
        <div>
            <div>
                <button className="btn btn-secondary">
                    <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>HomePage</Link>
                </button>
            </div>

            <div style={{color:"red"}}>{errMsg}</div>
            <div>
                {
                    accountStatus ? 
                        <div>
                            <LoginForm
                                username={username}
                                password={password}
                                handleLogin={handleLogin}
                                usernameOnChange={({target}) => {setUsername(target.value)}}
                                passwordOnChange={({target}) => {setPassword(target.value)}}
                            />
                            <div style={{ textAlign: 'center' }}> {/* Add this div with text-align style */}
                                <button onClick={() => setAccountStatus(false)} className="btn btn-link">don't have account, register now</button>
                            </div>
                        </div> :
                        <div>
                            <RegisterForm
                                newName={newName}
                                newUsername={newUsername}
                                newPassword={newPassword}
                                newPassword2={newPassword2}
                                handleRegister={handleRegister}
                                newNameOnChange = {({target}) => {setNewName(target.value)}}
                                newUsernameOnChange = {({target}) => {setNewUsername(target.value)}}
                                newPasswordOnChange = {({target}) => {setNewPassword(target.value)}}
                                newPassword2OnChange = {({target}) => {setNewPassword2(target.value)}}
                            /> 
                            <div style={{ textAlign: 'center' }}> {/* Add this div with text-align style */}
                                <button onClick={() => setAccountStatus(true)} className="btn btn-link"> login here  </button>
                            </div>
                        </div> 
                }
            </div>
        </div>
    )
}

export default LoginPage