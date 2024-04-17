import { useEffect, useState } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface User {
  id: number;
  username: string;
  emailid: string;
  area_id:number;
}

export const UserTable = () => {
    const navigate=useNavigate();
  useEffect(() => {
    getallUsers(); // Call the function to fetch user details
  }, []);
   
  const [data, setData] = useState<User[]>([]);
function redirectuser(){
navigate("/userwaste")
}
  function getallUsers() {
    axios.get(`http://localhost:3000/getalluser`, {
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
    <div>
      <section className="mx-auto w-full px-4 py-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Area_id</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                <td className="py-2">{i.id}</td>
                <td className="py-2">{i.username}</td>
                <td className="py-2">{i.emailid}</td>
                <td className="py-2">{i.area_id}</td>
                <td className="py-2">
                  <Link to={`/employeeedit/${i.id}`}>
                    <button onClick={redirectuser} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
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
};
