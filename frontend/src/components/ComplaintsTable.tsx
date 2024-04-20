import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
interface Complaint {
    user_id: number,
    complaint_status: string,
    id: number,
    area_id: number,
    title:string
}

export const ComplaintsTable = () => {
    const [data, setData] = useState<Complaint[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getComplaints();
    }, []);

    function getComplaints() {
        axios.get(`http://localhost:3000/admincomplaints`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            
            const responseData = response.data;
            if (Array.isArray(responseData)) {
                setData(responseData);
            } else if (typeof responseData === 'object' && 'complaints' in responseData) {
                setData(responseData.complaints);
            } else {
                console.error("Invalid response format:", responseData);
            }
        })
        .catch((error) => {
            console.error('Error fetching the data:', error);
        });
    }

    return (
        <div className="mt-4">
           <div className="flex justify-end">
  <button
    onClick={() => setVisible(true)}
    type="button"
    className="select-none mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
    Area-List
  </button>
</div>
            <Dialog header="Area and ID" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <p className="m-0 flex flex-col">
        <ul className="m-0 p-0">
        <li className="mb-2">Vayalur-  area_id: 1</li>
        <li className="mb-2">Srinivasan nagar-  area_id: 2</li>
        <li className="mb-2">Somarasampettai-  area_id: 3</li>
        <li className="mb-2">Rettaivaikal-  area_id: 4</li>
        <li className="mb-2">Ramalinga Nagar-  area_id: 5</li>
    </ul>
        </p>
    </Dialog>
            <section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 border border-gray-300">ID</th>
                            <th className="py-2 border border-gray-300">User ID</th>
                            <th className="py-2 border border-gray-300">Complaint Status</th>
                            <th className="py-2 border border-gray-300">Area ID</th>
                            <th className="py-2 border border-gray-300">Title</th>
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
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.title}</td>
                                <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>
                                    <Link to={`/admincomplaint/${i.id}`}>
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
