import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Complaint {
   area_name:string
    area_id: number
}

export const Areatable = () => {
    const [data, setData] = useState<Complaint[]>([]);

    useEffect(() => {
        getComplaints();
    }, []);

    function getComplaints() {
        axios.get(`http://localhost:3000/allareas`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching the data:', error);
        });
    }

    return (
        <div className="mt-4">
            <section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                           
                            <th className="py-2 border border-gray-300">Area ID</th>
                            <th className="py-2 border border-gray-300">Area name</th>
                            <th className="py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i) => (
                            <tr key={i.area_id}>
                                
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.area_id}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.area_name}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>
                                    <Link to={`/wastebyarea/${i.area_id}`}>
                                        <button className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Get Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
