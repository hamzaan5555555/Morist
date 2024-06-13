import { useState } from 'react';
import React, { useRef } from 'react';
import { RocketIcon } from "@radix-ui/react-icons";
import logo from '../../assets/Logo1.png'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Contact() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [Acces,setAcces] = useState()
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
                    setSuccessAlert(true); // Afficher l'alerte de succès
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    }

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            {successAlert && (
                <Alert className="mb-10 bg-gray-200 text-center">
                    <svg width="16" height="17" className="ml-[446px] mt-0.4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                            fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>

                    <AlertDescription>
                        Your message has been sent successfully.
                    </AlertDescription>
                </Alert>
            )}
            <div className="  ">
                <img src={logo} alt="logo" className="ml-[560px] w-12"/>

            </div>

            <form ref={form} onSubmit={sendEmail} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="text"
                                name="user_name"
                                id="first-name"
                                autoComplete="given-name"
                                required
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="text"
                                name="last_name"
                                id="last-name"
                                autoComplete="family-name"
                                required
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <Input
                                type="email"
                                name="user_email"
                                id="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400  sm:text-sm"
                                >
                                    <option>+212</option>
                                    <option>+34</option>
                                    <option>+422</option>
                                </select>

                            </div>
                            <Input
                                type="tel"
                                name="phone-number"
                                id="phone-number"
                                required
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                rows={4}
                                required
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-amber-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Contact;
