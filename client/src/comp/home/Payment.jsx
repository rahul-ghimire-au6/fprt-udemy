import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { base } from "../../redux/action/action";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 649,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      `${base}/checkout`,
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("payment success", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <StripeCheckout
        stripeKey="pk_test_51HSbWoKj8Sbxr1rGSkmSXabjIy29S4KhPcwUeSFakzhJq1qf2qmIHOoICQHiTqqUDaidsGT5HohMGQmv06ujW1I600jHvqc8NR"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  );
}

export default App
