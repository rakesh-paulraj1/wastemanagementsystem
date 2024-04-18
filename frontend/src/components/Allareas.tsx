import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Complaint {
    user_id: number,
    complaint_status: string,
    id: number,
    area_id: number
}

export const ComplaintsTable = () => {
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
                            <th className="py-2 border border-gray-300">ID</th>
                            <th className="py-2 border border-gray-300">User ID</th>
                            <th className="py-2 border border-gray-300">Complaint Status</th>
                            <th className="py-2 border border-gray-300">Area ID</th>
                            <th className="py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((i) => (
                            <tr key={i.id}>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.id}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.user_id}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.complaint_status}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.area_id}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>
                                    <Link to={`/getareadetails/${i.id}`}>
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
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
