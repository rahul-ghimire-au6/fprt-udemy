import React,{useState, useEffect} from 'react'
import Axios from 'axios'
import { base, getMyVideo } from '../../redux/action/action'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import VideoCard from './VideoCard'

function HomeUploader({getMyVideo,user}) {
    const [state,setState] = useState({
        title:'video title',cat:'cooking',price:'',data:null,
        uploading:false
    })

    useEffect(()=>{
        if(user.videos===null){
            getMyVideo()
        }
        if(user.videos!==null)
        console.log(user.videos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])


    async function uploadVideo(){
        let formData = new FormData()
        formData.append( 
            "myFile", 
            state.data, 
            state.data.name 
          ); 
        formData.append('title',state.title)        
        formData.append('cat',state.cat)        
        formData.append('price',state.price)  
        formData.append("token",localStorage.getItem("token"))      
        setState({...state,uploading:true})
        const {data} = await Axios.post(`${base}/videoupload`,formData )
        console.log(data)
        setState({...state,uploading:false})
        getMyVideo()
    }

    return (
        <div className='col-12 text-center'>
        {state.uploading===true?<Spinner />:<>
            <h1>Upload Course Video</h1>
            <form method='post' 
            onSubmit={e=>e.preventDefault()}
            className='col-6 m-auto bg-light'>
                <input type="text" placeholder='video title' value={state.title}
                className='form-control mb-2 col-10 ml-auto mr-auto'
                onChange={e=>setState({...state,title:e.target.value})} />
                <select className="form-control mb-2 col-10 ml-auto mr-auto" 
                onChange={e=>setState({...state,cat:e.target.value})}>
                    <option value='cooking'>cooking</option>
                    <option value='coding'>coding</option>
                    <option value='graphic'>graphic design</option>
                </select>
                <input type="number" 
                className='form-control mb-2 col-10 ml-auto mr-auto' 
                placeholder='enter price' value={state.price} 
                onChange={e=>setState({...state,price:e.target.value})} />
                <input type="file"  accept="video/*" 
                onChange={e=>setState({...state,data:e.target.files[0]})}
                className='form-control mb-2 col-10 ml-auto mr-auto' />
                <button onClick={uploadVideo}>Upload</button>
            </form>
            <div className='mt-5 mb-2 text-center'>
                <h2 className='display-3'>My videos</h2>
            </div>
            <div className='col-12 d-flex flex-wrap'>
                {
                    user.videos!==null?
                    user.videos.length!==0?
                    user.videos.map(item=>
                    <VideoCard item={item} admin={user.admin} key={item._id} />):
                    <h2 className='col-12 text-center display-2 text-secondary'></h2>:
                    null
                }
            </div></>}
        </div>
    )
}

const mapDispatch = dispatch =>{
    return {
        getMyVideo:()=>dispatch(getMyVideo())
    }
}
export default connect(state=>{return {...state}},mapDispatch)(HomeUploader)
