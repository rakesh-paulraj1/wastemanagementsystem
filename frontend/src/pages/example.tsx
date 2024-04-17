import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
    id: number;
     username: string;
     emailid: string;
    
   }
export const UserTable=()=>{
   
   useEffect(()=>{
    getallUsers;
   })
   
       const [data, setData] = useState<User[]>([]);
       function getallUsers() {
        axios
          .get(`http://localhost:3000/getalluser`)
          .then((response) => {
            console.log(response.data);
            
            setData(response.data.results.results);
          })
          .catch((error) => {
            console.error('Error fetching the data:', error);
          });
      }
 
    return (
        
        <div>
             <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              
              
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i.id}>
                
                <td className="py-2">{i.id}</td>
                <td className="py-2">{i.username}</td>
                <td className="py-2">{i.emailid}</td>
                
                
                
                <td className="py-2">
                 <Link to={`/employeeedit/${i.id}`}> <span
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Get Details
                  </span></Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
    
    

    <div
  class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Id
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Name
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Email
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            John Michael
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Alexa Liras
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Michael Levi
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            24/12/08
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Richard Gran
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            04/10/21
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
    )
}