/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css"


const CreatePost = ()=>{
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch('/createpost',{
            method: "post",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic: url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"red darken-2"})
            } else{
                M.toast({html: "Created post successfully", classes:"green darken-2"})
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[url])

    const postDetails = ()=>{
        const data= new FormData()
        data.append("file", image)
        data.append("upload_preset", "project-social")
        data.append("clould_name", "dxlshtm2n")
        fetch("https://api.cloudinary.com/v1_1/dxlshtm2n/image/upload",{
            method: "post",
            body: data,

        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    return(
        <div className="card input-filed create-post">
            <input type="text" 
            placeholder="Tilte" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" 
            placeholder="Body" 
            value={body}
            onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
            <div className="btn blue darken-1">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect blue darken-1" 
            onClick={()=>postDetails()}>Submit
            </button>
        </div>
    )
}

export default CreatePost