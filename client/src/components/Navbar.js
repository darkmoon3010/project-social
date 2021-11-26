import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from "../App"
const Navbar = ()=>{
    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
    const renderList = ()=>{
        if(state){
            return [
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2"><Link to="/create">Create Post</Link></li>,
                <li key="3">
                    <button className="btn waves-effect  red darken-1"
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        navigate("/signin")
                    }}>
                        Log out
                    </button>
                </li>
            ]
        
        }else{
            return [
                <li key="4"><Link to="/signin">Login</Link></li>,
                <li key="5"><Link to="/signup">Sign Up</Link></li>
            ]
        }
    }
    return(
    <nav className="white">
        <div className="container">
            <div className="nav-wrapper white">
            <Link to={state?"/":"/signin"} className="brand-logo left">BlogTagram</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar       