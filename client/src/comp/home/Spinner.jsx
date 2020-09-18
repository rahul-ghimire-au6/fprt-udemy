import React from 'react'
import './style.css'

function Spinner() {
    return (
        <div className='mt-5 pt-5 text-center' 
        style={{
            width:'100vw',height:'100vh',
            backgroundColor:"rgba(0,0,0,0.4)",
            position:"absolute",
            top:"-50px",
            left:'0px',
            zIndex:"100"
        }}>
            <div className="loader mt-5"></div>
            <h3 className='text-light mt-3'>Uploading... This may take some time depending upon video size</h3>
        </div>
    )
}

export default Spinner
