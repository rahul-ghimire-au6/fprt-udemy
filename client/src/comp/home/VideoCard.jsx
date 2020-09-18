import React,{useState,useEffect} from 'react'
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import {connect} from 'react-redux'
import "react-toastify/dist/ReactToastify.css";
import { base } from "../../redux/action/action";

function VideoCard({item,admin,user}) {
    const [paid,setPaid] = useState(false)
    useEffect(()=>{
      const orders = user.mylist
      if(orders!==null){
        console.log(orders)
        orders.forEach(element => {
          if(element.videoId===item._id)setPaid(true)
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    async function handleToken(token, addresses) {
        const data = await axios.post(
          `${base}/checkout`,
        { 
            token, 
            userToken:localStorage.getItem('token'),
            videoId:item._id,
            product:{name:item.title,price:item.price,description:item.cat},
        });
        if (data.status === 200) {
          toast("payment success", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      }
    return (
    <div className='col-3 p-3'>
        <div className='col-12 border border-dark rounded p-0 pb-2 text-center'>
            <video src={item.url} className='col-12 p-0' controls={paid} ></video>
            <div className='text-left pl-2'>
            <h3>Title: {item.title}</h3>
            <h4>Category: {item.cat}</h4>
            <h5>price: {item.price} Rs.</h5>
            </div>
            {admin===false?
            paid===false?
            <StripeCheckout
            stripeKey="pk_test_51HSbWoKj8Sbxr1rGSkmSXabjIy29S4KhPcwUeSFakzhJq1qf2qmIHOoICQHiTqqUDaidsGT5HohMGQmv06ujW1I600jHvqc8NR"
            token={handleToken}
            amount={(item.price*100) /73}
            name={item.title}
            billingAddress
            shippingAddress
          />:null:
            null}
        </div>
    </div>
    )
}

export default connect(state=>{return {...state}})(VideoCard)
