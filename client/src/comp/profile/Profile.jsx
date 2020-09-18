import React from 'react'
import {connect} from 'react-redux'
import VideoCard from '../home/VideoCard'

function Profile({user}) {
    let allvideos = null
    console.log(user.allvideos)
    if(user.allvideos!==null){
        console.log(user.allvideos)
        allvideos = user.allvideos.map(item=>{
            if(item.videoId===user.mylist)
            return item
        })
    }
    return (
        <center><div><br/>
            This is profile page
            {allvideos!==null?
            allvideos.map(item=><VideoCard item={item} />):
            null}
        </div></center>
    )
}

export default connect(state=>{return {...state}})(Profile)
