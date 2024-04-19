import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
type Appbarprops ={
    content:string ;
}

export const Appbar = ({content}:Appbarprops) => {
    const navigate = useNavigate();
const [Logout,setLogout]=useState(false);

    
   function signoutHandler(){
    localStorage.removeItem('token');
    localStorage.removeItem('area_id');
    localStorage.removeItem('user_id');
    setLogout(true);
        
   }
   React.useEffect(() => {if(!localStorage.getItem("token")) {
    navigate ("/") ;
}}, [Logout, navigate]);


    return <nav className="fixed border-b border-slate-900 z-20 top-0 left-0 right-0 flex justify-between py-3 px-16">
     
       <div><Link to={'/admindashboard'} className="font-bold 0 bg-clip-text text-transparent text-xl md:text-4xl mr-5 "style={{ color: 'green' }}>
              {content } 
        </Link>
        </div> 
        <div>
        <button
        class="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={signoutHandler}
      >
        Logout 
      </button>
            
        </div>
    
    </nav>
}