import {  useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";

interface WasteData {
    
   username:string,
    totalWeight: number;
    bioWeight: number;
    nonBioWeight: number;
}

export const WasteByUserTable = () => {
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

            setData(response.data);
        } catch (error) {
            alert("cant fetch data ")
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="mt-4">
            <section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            
                            <th className="py-2 border border-gray-300">User Name</th>
                            <th className="py-2 border border-gray-300">Total Weight</th>
                            <th className="py-2 border border-gray-300">Bio Weight</th>
                            <th className="py-2 border border-gray-300">Non-Bio Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.username}>
                               
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.username}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.totalWeight}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.bioWeight}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.nonBioWeight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="mt-4">
                <label htmlFor="startDate">From:</label>
                <input type="date" id="startDate" name="startDate" onChange={(e) => setStartDate(e.target.value)} />
                <label htmlFor="endDate">To:</label>
                <input type="date" id="endDate" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={fetchData} type="button" className="select-none   mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Fetch data</button>

            </div>
        </div>
    );
};
