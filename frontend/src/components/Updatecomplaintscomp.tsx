import { useEffect, useState,useRef } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
interface Complaint {
    username: string;
    area_name: string;
    title: string;
    description: string;
    complaint_date: string;
    complaint_status: string;
    Area:string,
    User:string
}

export const Updatecomplaintscomp = () => {
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [Status, setStatus] = useState<string>("");
const navigate=useNavigate();
    const { id } = useParams<{ id: string }>();
 function updatecomplaint(){
    axios.put(`http://localhost:3000/admincomplaint/${id}`, {
        complaint_status: Status
    }, {
        headers: {
            Authorization: localStorage.getItem("token") || "",
        },
    })
    .then((response) => {
        console.log(response.data);
        alert ("updated complaint")
        navigate("/allcomplaints")
        
    })
    .catch((error) => {
        console.error('Error updating the complaint:', error);
        alert("Error updating the complaint");
    });
 }
 const pdfgenerator=useRef();
  const generatepdf=useReactToPrint({
content: ()=>pdfgenerator.current,
  documentTitle: "All complaints report",
  onAfterPrint: () => alert("Report Printed Successfully")
  });


    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admincomplaint/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setComplaint(response.data.complaint);
            } catch (error) {
                alert("Can't fetch Complaint data");
            }
        };

        fetchComplaint();
    }, [id]);
    const levels = [
        { level: "Not resolved", name: 'Not resolevd' },
        { level: "Resolved", name: 'Resolved' },
        { level: "Working on it ", name: 'Working on it ' },
      
    ];
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();   
    };

    if (!complaint) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div ref={pdfgenerator} className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                <span className="font-bold 0 bg-clip-text text-transparent text-xl ml-5 md:text-4xl mr-5 "style={{ color: 'green' }} > User Complaint</span>
                    <div className="text-3xl font-extrabold mt-3">{complaint.title}</div>
                    <div className="text-slate-500 pt-2">Received on : {formatDate(complaint.complaint_date)}</div>
                    <div className="pt-4">Complaint status:{complaint.complaint_status}</div>
                    <div className="pt-4">{complaint.description}</div>
                  <select
    className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    id="complaintStatus" 
    onChange={(e) => {
        console.log('Selected value:', e.target.value); 
        setStatus(e.target.value);

    }}
>
    {levels.map((level) => (
        <option key={level.level} value={level.level}>{level.name}</option> 
    ))}

</select>

                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">Submitted by</div>
                    <div className="text-xl font-bold">{complaint.User?.username}</div>
                    <div className="text-xl font-bold">{complaint.Area?.area_name}</div>
                </div>
            </div>
        
        </div>
        <button onClick={updatecomplaint} type="button" className="select-none  w-full mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Update Complaint</button>
        <button onClick={generatepdf} className="select-none mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Generate Pdf
                                        </button>
                                        
        </div>
    );
};
