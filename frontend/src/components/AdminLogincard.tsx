import { ChangeEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";

import axios from "axios";
interface SigninInput {
    username: string;
    password: string;
}




export const  AdminLogincard = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""
    });


    async function signinhandler() {
        try {
            const response = await axios.post(`http://localhost:3000/adminlogin`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/admindashboard ");
            alert("You have successfully signed in");
            } catch (err:any) {
                console.log(err.response.data);
                alert("username or password is incorrect");
            }
           
    }
    
    return <div className="h-screen flex justify-center items-center">
        <div  className="h-[390px] w-[360px] bg-grey-900 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
            <div>
                <div className="px-10">
                    <div className="font-bold text-4xl p-4 text-green-900">
                        Admin
                    </div>
                    
                    
                </div>
                <LabelledInput  label={"Username"} type={"text"} placeholder={"Your Username"} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                
                    <LabelledInput label={"Password"}  type={"password"} placeholder="Minimum 6 Characters" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={signinhandler} type="button" className=" mt-6 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Login</button>
                   
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

function LabelledInput({label , placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="font-bold mb-2 mt-2 text-black-700">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}


