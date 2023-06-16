import { useRef } from "react";
import emailjs from '@emailjs/browser';
import './Contact.css'
import {toast, Toaster} from 'react-hot-toast'

function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_gb7l223', 'template_9avjkpd', form.current, 'ZuCHPV3PtsUz67lmJ')
        .then((result) => {
            console.log(result.text);
            console.log('message sent')
            e.target.reset()
            toast.success('Message sent')
        }, (error) => {
            console.log(error.text);
            toast.error('We are sorry Message not sent please try again')
        });
    };

  return (
    <div className='contact'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h2>Have any Question? We Love To Hear You.</h2>
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
                <input type="text" name="user_name" />
            <label>Email</label>
                <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
                <input type="submit" value="Send" className="send_btn"/>
        </form>
    </div>
  )
}

export default Contact