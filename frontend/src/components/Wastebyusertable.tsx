import {  useState,useRef } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

interface WasteData {
    w_date: string;
    total_weight: number;
    bio_weight: number;
    non_bio_weight: number;
    
}

export const Wastebyusertable = () => {
    const [data, setData] = useState<WasteData[]>([]);
    const { id } = useParams<{ id: string }>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();


    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/adminwasteproduceduser/${id}`, {
    params: {
        startDate,
        endDate
    },
    headers: {
        Authorization: localStorage.getItem("token")
    }
});

const { totalWasteByDate } = response.data; 

setData(totalWasteByDate);
} catch (error) {
            alert("cant fetch data ")
            console.error('Error fetching data:', error);
        }
    };
    const pdfgenerator=useRef();
    const generatepdf=useReactToPrint({
  content: ()=>pdfgenerator.current,
    documentTitle: "All complaints report",
    onAfterPrint: () => alert("Report Printed Successfully")
    });
   

    return (
        <div className="mt-2">
            <div className="flex justify-end">
            <button onClick={generatepdf} className="select-none mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Generate Pdf
                                        </button>
                                        </div>
                <div ref={pdfgenerator}>
                <span className="font-bold 0 bg-clip-text text-transparent text-xl md:text-4xl mr-5 "style={{ color: 'green' }} > Waste by User details</span>

             <div >
             <div className="flex items-center space-x-4">
  <label htmlFor="startDate" className="text-gray-700">From:</label>
  <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1 mr-2" />
  <label htmlFor="endDate" className="text-gray-700">To:</label>
  <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1" />
</div>

            </div>
            <section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 border border-gray-300">Date</th>
                            <th className="py-2 border border-gray-300">Name</th>
                            <th className="py-2 border border-gray-300">Total Weight</th>
                            <th className="py-2 border border-gray-300">Bio Weight</th>
                            <th className="py-2 border border-gray-300">Non-Bio Weight</th>
                        </tr>
                    </thead>
                    <tbody>
    {data.map((item, index) => (
        <tr key={index}>
            
            <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.w_date}</td>
            <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.User.username}</td>
            <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.total_weight}</td>
            <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.bio_weight}</td>
            <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.non_bio_weight}</td>
        </tr>
    ))}
</tbody>
                </table>
            </section>
            </div>
            <button onClick={fetchData} type="button" className="select-none mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Fetch data</button>
        </div>
    );
    
    
};
