/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom"
import {UserContext} from "../../App";

const Profile = ()=>{
    const [userProfile, setProfile] = useState(null)
    const [showFollow, setShowFollow] = useState(true)
    const {dispatch} = useContext(UserContext)

    //Load user page
    const {userid} = useParams()
     useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{    
            setProfile(result)
       })
    },[])

    //follow
    const followUser = ()=>{
        fetch("/follow",{
            method:"put",
            headers: {
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following: data.following, followers: data.followers}})   
            localStorage.setItem("user", JSON.stringify(data))  
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    //unfollow
    const unfollowUser = ()=>{
        fetch("/unfollow",{
            method:"put",
            headers: {
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following: data.following, followers: data.followers}})   
            localStorage.setItem("user", JSON.stringify(data))  
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }

    return (
        <>
        {userProfile  
        ?   <div className="container">
                    <header className="header-profile">
                        <div >
                            <img className="image-profile" src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/245838767_263093485750850_2050047018004416710_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gdqh77ZPOkkAX8BisUL&_nc_ht=scontent.fhan14-2.fna&oh=ffdfdd2c95ef7dcca6bb5384acd9317a&oe=61A34D88" alt="" />
                        </div>
                        <article className="info-profile">
                            <div className="name-profile">
                                <h4>{userProfile.user.name}</h4>
                                {
                                    showFollow?
                                    <button className="btn blue" onClick={()=>followUser()}>Follow</button>
                                    : <button className="btn blue" onClick={()=>unfollowUser()}>Unfollow</button>
                                }
                            </div>
                            <p>{userProfile.user.email}</p>

                            <ul>
                                <li>{userProfile.posts.length} posts</li>
                                <li>{userProfile.user.followers.length} followers</li>
                                <li>{userProfile.user.following.length} following</li>
                            </ul>
                        </article>
                    </header>
                    <div className="content row">
                        {
                            userProfile.posts.map(item=>{
                                return(
                                    <section className="col m4 s12" key={item._id}>
                                        <div className="card large">
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
        
        :   <div className="container">
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </div>                   
        }
    </>
    )
}


export default Profile