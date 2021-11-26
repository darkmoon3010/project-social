/* eslint-disable no-useless-escape */
import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css"

const Login = ()=>{
    const {dispatch} = useContext(UserContext)
    const navigate  = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"red darken-2"})
            } else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload: data.user})
                M.toast({html: "Logged in successfully", classes:"green darken-2"})
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2>Login</h2>
                <input type="text" 
                placeholder="Email"
                value={email} 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input 
                type="password" 
                placeholder="Password"
                value={password} 
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn waves-effect  blue darken-1"
                onClick={()=>PostData()}>Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}


export default Login