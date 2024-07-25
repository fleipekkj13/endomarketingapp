import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { Check } from "lucide-react";

import { ToastContainer, toas, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const notify = (typeNot) => toast("Failed to login!", {
        type: typeNot
    })

    function onSubmit() {
        axios.post('http://192.168.0.103:80/vfu', {
            email: email,
            password: password
        }).then((res) => {
            if(res.data == 'Verificado!') {
                Cookies.set('auth', 'ok', { expires: 7})
                Cookies.set('user', email.split('.')[0])
                
                setTimeout(() => notify('success'), 1000);
                
                window.location.href = '/home'
                
            } else {
                notify('error');
            }
        })
    }

    return (
        <div className="flex items-center justify-center">
            <ToastContainer />
            <div className="logger p-20 rounded-lg m-auto shadow-zinc-400 shadow-md" style={{width: 585, height: 690}}>
                <ul className="flex flex-col align-middle justify-between bg-white relative" style={{height: '100%'}}>
                    <div className="headline space-y-4">
                        <h1 className="font-extrabold text-2xl">Login on the website.</h1>
                        <p className="text-zinc-400">Choose another world!</p>
                    </div>
                    <div className="inputs flex flex-col gap-3 text-sm">
                        <input value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} className="border border-zinc-400 w-3/2 rounded-md p-4 active:border-emerald-500 focus:border-emerald-500 outline-none transition-all" type="email" placeholder="Insert e-mail here..." />
                        <input value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} className="border border-zinc-400 w-3/2 rounded-md p-4 active:border-emerald-500 focus:border-emerald-500 outline-none transition-all" type="password" placeholder="Insert password here..." />
                    </div>
                    <button onClick={() => {onSubmit()}} className="bg-emerald-600 p-4 text-sm rounded-md text-zinc-50 font-black w-2/3 self-center">Login</button>
                </ul>

                <p className="text-sm text-zinc-400 text-center mt-5">Developed by: Felipe Liandro (MKT - Coocerqui)</p>
            </div>
        </div>
    )
}