import { useEffect, useState,useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

interface User {
  id: number;
  username: string;
  emailid: string;
  area_id:number;
}



export const UserTable = () => {
  const pdfgenerator=useRef();
  const generatepdf=useReactToPrint({
  content: ()=>pdfgenerator.current,
  documentTitle: "All users report",
  onAfterPrint: () => alert("Report Printed Successfully")
  });
  useEffect(() => {
    getallUsers(); // Call the function to fetch user details
  }, []);
   
  const [data, setData] = useState<User[]>([]);

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
    <div className="mt-4"> 
 <div class="flex justify-end pl-4">
  <button  onClick={generatepdf} class="select-none mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Generate pdf</button>
</div>

      <div ref={pdfgenerator}>
      <span className="font-bold 0 bg-clip-text text-transparent text-xl md:text-4xl mr-5 "style={{ color: 'green' }} > All Users</span>

      <section className="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 border  border-gray-300">ID</th>
              <th className="py-2 border border-gray-300">Name</th>
              <th className="py-2 border border-gray-300">Email</th>
              <th className="py-2 border border-gray-300">Area_id</th>
              <th className="py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>

                <td className="py-2 border  border-gray-300" style={{ padding: "8px" }}>{i.id}</td>
                <td className="py-2 border  border-gray-300"style={{ padding: "8px" }}>{i.username}</td>
                <td className="py-2 border  border-gray-300"style={{ padding: "8px" }}>{i.emailid}</td>
                <td className="py-2 border  border-gray-300"style={{ padding: "8px" }}>{i.area_id}</td>
                <td className="py-2 border  border-gray-300"style={{ padding: "8px" }}>
                  <Link to={`/wastebyuser/${i.id}`}>
                    <button  className=" mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">
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
    </div>
  );
};
