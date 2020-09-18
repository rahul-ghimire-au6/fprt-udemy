import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { getAllVideo, getMyList } from '../../redux/action/action'
import VideoCard from './VideoCard'

function HomeClient({getAllVideo,user,getMyList}) {
    useEffect(()=>{
        getAllVideo()
        getMyList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div>
            <div className='col-12 d-flex flex-wrap'>
                {
                    user.allvideos!==null?
                    user.allvideos.length!==0?
                    user.allvideos.map(item=>
                    <VideoCard item={item} 
                    admin={user.admin} key={item._id} />):
                    <h2 className='col-12 text-center display-2 text-secondary'></h2>:
                    null
                }
            </div>
        </div>
    )
}

const mapDispatch = dispatch =>{
    return {
        getAllVideo:()=>dispatch(getAllVideo()),
        getMyList:()=>dispatch(getMyList())
    }
}
export default connect(state=>{return {...state}},mapDispatch)(HomeClient)
