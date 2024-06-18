import { Link } from 'react-router-dom'

const HomePage = () =>{
    return(
        <div>
            <div>
                <button className="btn btn-secondary">
                    <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                </button>
            </div>
        </div>
    )
}
export default HomePage