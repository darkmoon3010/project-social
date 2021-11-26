/* eslint-disable no-useless-escape */
import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import M from "materialize-css"
const Signup = ()=>{
    const navigate  = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"red darken-2"})
            } else{
                M.toast({html: data.message, classes:"green darken-2"})
                navigate('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2>Sign Up</h2>
                <input type="text" 
                placeholder="Full Name"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                />
                <input type="text" 
                placeholder="Email"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                />
                <input type="password" 
                placeholder="Password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn waves-effect  blue darken-1"
                 onClick={()=>PostData()}
                >Sign Up
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup