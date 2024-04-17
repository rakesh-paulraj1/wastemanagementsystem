import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface Complaint {
    user_id:number,
    complaint_status:string,
    id:number,
    area_id:number
}
export const ComplaintsTable=()=>{
    const [data, setData] = useState<Complaint[]>([]);
    const navigate=useNavigate();
    useEffect(() => {
        getcomplaints(); // Call the function to fetch user details
      }, []);
      function getcomplaints(){
        axios.get(`http://localhost:3000/admincomplaints`,{
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
    return(
      

    )
}