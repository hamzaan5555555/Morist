import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(import.meta.env.VITE_APP_SERVICE_ID,
                import.meta.env.VITE_APP_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_APP_PUBLIC_KEY
            )
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" className="border-2" />
            <label>Email</label>
            <input type="email" name="user_email" className="border-2" />
            <label>Message</label>
            <textarea name="message" className="border-2" />
            <button type="submit" value="Send" className="bg-black text-white" >Send</button>
        </form>
    );
};

export default Contact
