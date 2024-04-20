import axios from 'axios';
import { LabelledInput } from './UserLogincard';
import { useState, useEffect } from 'react';

        

interface wasteinput {
    w_date:Date,
    bio_weight:number,
    non_bio_weight:number,
    user_id:number,
    area_id:number
}
export const Wasteinputform= () => {
    
  
    async function addwaste() {
        try {
            await axios.post(`http://localhost:3000/addwaste`, postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("Waste added successfully");
            
        } catch (err: any) {
            console.log(err.response.data);
            alert("Cannot add waste");
        }
    }
   
    
    const [postInputs, setPostInputs] = useState<wasteinput>({
        w_date: new Date(),
        bio_weight: 0,
        non_bio_weight: 0,
        user_id: 0,
        area_id: 0,
    });
    useEffect(() => {
        const areaId = parseInt(localStorage.getItem("area_id") || "0");
        const userId=parseInt(localStorage.getItem("user_id") || "0")
        setPostInputs(prevInputs => ({
            ...prevInputs,
            area_id: areaId,
            user_id:userId
        }));
    }, []); 
  
    return (<div>
        <div className="font-bold text-3xl p-4 text-neutral-400">
            Enter Waste by Date
        </div>

        <LabelledInput label={"Waste Date"} type={"date"} placeholder={"Waste date"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    w_date: new Date(e.target.value)
                })
            }} />
            <LabelledInput label={"Bio Weight"} type={"number"} placeholder={"Bio weight"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    bio_weight: parseFloat(e.target.value)
                })
            }} />

            <LabelledInput label={"Non-Bio Weight"} type={"number"} placeholder={"Non-bio weight"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    non_bio_weight: parseFloat(e.target.value)
                })
            }} />
        
        <button onClick={addwaste} type="button" className="select-none  w-full mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Add Waste</button>
    </div>
    )
}
