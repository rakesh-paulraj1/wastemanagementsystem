import { useEffect, useState } from "react";
import axios from "axios";


interface Complaint {
    user_id: number,
    complaint_status: string,
    id: number,
    title:string

}

export const Usercomplaintstable = () => {
const [data, setData] = useState<Complaint[]>([]);

useEffect(() => {
getComplaints();
}, []);
function getComplaints() {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
        console.error("User ID not found in local storage.");
        return;
    }

    axios.get(`http://localhost:3000/complaints/${userId}`, {
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
<section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
<table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
<thead className="bg-gray-200">
<tr>
<th className="py-2 border border-gray-300">ID</th>
<th className="py-2 border border-gray-300">User ID</th>
<th className="py-2 border border-gray-300">Complaint Status</th>
<th className="py-2 border border-gray-300">Complaint Title</th>

</tr>
</thead>
<tbody>
{data.map((i) => (
<tr key={i.id}>
<td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.id}</td>
<td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.user_id}</td>
<td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.complaint_status}</td>
<td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{i.title}</td>
</tr>
))}
</tbody>
</table>
</section>
</div>
);
}
