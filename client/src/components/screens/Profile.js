/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../../App";

const Profile = ()=>{
    const [mypost, setMyPost] = useState([])
    const [data, setData] = useState([])
    const [image, setImage] = useState("")
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setMyPost(result.mypost)
        })
    },[])
    const deletePost = (postId)=>{
        fetch(`/deletepost/${postId}`,{
             method:"delete",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
        }).then(res=>res.json)
        .then(result=>{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        window.location.reload();
    }

    useEffect(()=>{
        if(image){
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

           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    
    return (
        <div className="container">
            <header className="header-profile">
                <div className="image-container" >
                    <img className="image-profile" src={state?state.pic:"/"} alt="" />
                    <div className="middle">
                        <label htmlFor="actual-btn" className="text">Upload</label>
                        <input type="file" id="actual-btn" hidden onChange={(e)=>updatePhoto(e.target.files[0])}/>
                    </div>
                </div>
                <article className="info-profile">
                    <h4>{state?state.name:"Loading"}</h4>
                    <ul>
                        <li>{mypost.length} posts</li>
                        <li>{state?state.followers.length:<span>0</span>} followers</li>
                        <li>{state?state.followers.length:<span>0</span>} following</li>
                    </ul>
                </article>
            </header>
            <div className="content row">
                {
                    mypost.map(item=>{
                        return(
                            <section className="col m4 s12" key={item._id}>
                                <div className="card large">
                                    {item.postedBy._id === state._id 
                                    && 
                                    <i className="material-icons like" onClick={()=>{deletePost(item._id)}}>clear</i>}
                                    <div className="card-image">
                                        <img alt="" src={item.photo}/>
                                    </div>
                                    <div className="card-content">
                                        <h5 className="content-title">{item.title}</h5>
                                        <p>{item.body}</p>
                                    </div>
                                </div>
                            </section>
                        )
                    })
                }       
            </div>
    </div>
    )
}


export default Profile