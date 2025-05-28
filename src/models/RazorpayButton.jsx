import React,{useEffect} from 'react'

const RazorpayButton = ({paymentButtonId}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.setAttribute('data-payment_button_id', paymentButtonId);

        const form = document.getElementById('razorpay-form');
        if(form) {
            form.appendChild(script);
        }

        return () => {
            if(form && form.contains(script)) {
                form.removeChild(script);
            }
        }
    }, [paymentButtonId]);
  return (
    <div>
        <form id="razorpay-form"></form>
    </div>
  )
}

export default RazorpayButton