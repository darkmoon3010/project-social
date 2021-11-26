import React,{useContext,useEffect, useState} from "react";
import { format} from 'timeago.js';
import {UserContext} from "../../App"
import { Link } from "react-router-dom";
const Home = ()=>{
    const [data, setData] = useState([])
    const {state} = useContext(UserContext)
    //get all post
    useEffect(()=>{
        fetch('/allpost', {
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }            
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
    //like post
    const likePost = (id)=>{
        fetch('/like', {
            method: "put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                postId: id
            })        
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item =>{
                if(item._id===result._id){
                    return result
                }else return item
            })
            setData(newData)
        })
    }
    //unlike
    const unLikePost = (id)=>{
        fetch('/unlike', {
            method: "put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                postId: id
            })        
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item =>{
                if(item._id===result._id){
                    return result
                }else return item
            })
            setData(newData)
        })
    }
    //comment
    const makeComment = (text,postId)=>{
          fetch('/comment',{
                method:"put",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json",
                },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else
                    return item
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    //delete
    
    return (
        <div className="container">  
            {
                data.map(item=>{
                    return(
                    <div className="card home-card" key={item._id}>
                        <h5 className="username"><Link to={"/user/"+item.postedBy._id}>{item.postedBy.name}</Link></h5>
                        <span className="time">{format(item.createdAt)}</span>    
                        <div className="card-image">
                        <img alt="" src={item.photo}/>
                        </div>
                        <div className="card-content">
                            {item.likes.includes(state._id)
                                ? <i className="material-icons heart like" onClick={()=>{unLikePost(item._id)}}>favorite</i>
                                : <i className="material-icons like" onClick={()=>{likePost(item._id)}}>favorite_border</i>
                            }
                            <p>{item.likes.length} like</p>
                            <h4 className="content-title">{item.title}</h4>
                            <p>{item.body}</p>
                             {
                                item.comments.map(record=>{
                                    return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="Add a comment"/>
                                <button className=" waves-effect btn-flat">Post</button>
                            </form>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}


export default Home