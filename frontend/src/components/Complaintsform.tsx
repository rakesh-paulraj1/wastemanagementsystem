
import {useState,useEffect } from "react";
import axios from "axios";
interface complaintsform {
    title:string,
    complaint_status:string,
    description:string,
    area_id:number,
    user_id:number,
    complaint_date:string
}
export const Complaintsform =()=>{
    
    const [postInputs,setPostInputs]=useState<complaintsform>({
        title:"",
        complaint_status:"",
        description:"",
        area_id:0,
        user_id:0,
        complaint_date:new Date().toISOString().slice(0, 10),

    })
    useEffect(() => {
        const areaId = parseInt(localStorage.getItem("area_id") || "0");
        const userId=parseInt(localStorage.getItem("user_id") || "0")
        setPostInputs(prevInputs => ({
            ...prevInputs,
            area_id: areaId,
            user_id:userId
        }));
    }, []);
    async function addcomplaint() {
        try {
            console.log(postInputs);
            await axios.post(`http://localhost:3000/createcomplaint`, postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("Complaint added successfully");
            
        } catch (err: any) {
            console.log(err.response.data);
            alert("Cannot add Complaint");
        }
    }
  
    const levels = [
        { level: "Not resolved", name: 'Not resolevd' },
        { level: "Resolved", name: 'Resolved' },
        { level: "Working on it ", name: 'Working on it ' },
      
    ];
    
    
    return (<div className="mt-8">
        <span>Enter the Complaint</span>
        <div className="flex justify-center pt-8 "> 
        
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                         title:(e.target.value)
                    })
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title of the Complaint" />

<select
    className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    id="complaintStatus" 
    onChange={(e) => {
        console.log('Selected value:', e.target.value); // Check if the onChange handler is triggered
        setPostInputs({
            ...postInputs,
            complaint_status: e.target.value
        });
    }}
>
    {levels.map((level) => (
        <option key={level.level} value={level.level}>{level.name}</option> // Use level.name for the text content
    ))}
</select>

            <input
                        onChange={(e) => {
                            setPostInputs({ ...postInputs, complaint_date: e.target.value });
                        }}
                        type="date"
                        className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
            <input onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                         description:(e.target.value)
                    })
                }} type="text" className=" mt-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description of the Complaint" />
                <div className="mt-3">
                <button onClick={addcomplaint} type="submit" className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Send Complaint 
                </button>
                </div>
            </div>
        </div>
        </div>
    
    )
}