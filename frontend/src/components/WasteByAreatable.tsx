import {  useState,useRef } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

interface WasteData {
    area_id: number;
    totalWeight: number;
    bioWeight: number;
    nonBioWeight: number;
    areaName:string
}

export const WasteByAreaTable = () => {
    const [data, setData] = useState<WasteData[]>([]);
    const { id } = useParams<{ id: string }>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();

 
    const pdfgenerator=useRef();
    const generatepdf=useReactToPrint({
  content: ()=>pdfgenerator.current,
    documentTitle: "All complaints report",
    onAfterPrint: () => alert("Report Printed Successfully")
    });
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/adminwasteproducedarea/${id}`, {
    params: {
        startDate,
        endDate
    },
    headers: {
        Authorization: localStorage.getItem("token")
    }
});

const data= response.data;
const wasteDataArray: WasteData[] = Object.keys(data).map((key) => ({
    area_id: data[key].area_id,
    totalWeight: parseInt(data[key].totalWeight),
    bioWeight: parseInt(data[key].bioWeight),
    nonBioWeight: parseInt(data[key].nonBioWeight),
    areaName: data[key].areaName
}));


            setData(wasteDataArray);
        } catch (error) {
            alert("cant fetch data ")
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="mt-4">
            <div className="flex justify-end">
            <button onClick={generatepdf} className="select-none mt-4 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Generate Pdf
                                        </button>
                                        <button onClick={fetchData} type="button" className="select-none   mt-4 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Fetch data</button>
                                        </div>
                                        <div ref={pdfgenerator}> 
                                        <span className="font-bold 0 bg-clip-text text-transparent text-xl md:text-4xl mr-5 "style={{ color: 'green' }} > Waste by Area details</span>
                                        
             <div className="mt-4">
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
                            <th className="py-2 border border-gray-300">Area ID</th>
                            <th className="py-2 border border-gray-300">Area Name</th>
                            <th className="py-2 border border-gray-300">Total Weight</th>
                            <th className="py-2 border border-gray-300">Bio Weight</th>
                            <th className="py-2 border border-gray-300">Non-Bio Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(data) && data.map((item) => (
    <tr key={item.area_id}>
        <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.area_id}</td>
        <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.areaName}</td>
        <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.totalWeight}</td>
        <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.bioWeight}</td>
        <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.nonBioWeight}</td>
    </tr>
))}
</tbody>
                </table>
            </section>
            </div>
        </div>
    );
};
