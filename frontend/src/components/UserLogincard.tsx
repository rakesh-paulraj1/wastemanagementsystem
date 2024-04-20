import { ChangeEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";

import axios from "axios";
interface SigninInput {
    username: string;
    password: string;
}




export const  UserLogincard = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""
    });


    async function signinhandler() {
        try {
            const response = await axios.post(`http://localhost:3000/userlogin`, postInputs);
            const jwt = response.data.jwt;
            const area_id=response.data.area_id;
            const user_id=response.data.user_id;
            localStorage.setItem("token", jwt);
            localStorage.setItem("user_id",user_id);
            localStorage.setItem("area_id",area_id);

            navigate("/userdashboard");
            alert("You have successfully signed in");
            } catch (err:any) {
                console.log(err.response.data);
                alert("username or password is incorrect");
            }
           
    }
    
    return <div className="h-screen flex justify-center items-center">
        <div  className="h-[390px] w-[360px] bg-neutral-950 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
            <div>
                <div className="px-10">
                    <div className="font-bold text-4xl p-4 text-neutral-400">
                        User
                    </div>
                    
                    
                </div>
                <LabelledInput label={"Username"} type={"text"} placeholder={"Your username"} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                
                    <LabelledInput label={"Password"}  type={"password"} placeholder="Your password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={signinhandler} type="button" className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Login</button>
                   
                </div>
                
            </div>
            
        </div>
    
}

interface LabelledInputType {

    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

 export function LabelledInput({label , placeholder, onChange, type }: LabelledInputType) {
    return <div className="mb-4 mt-4">
        <label className="font-bold  text-black-700">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}


