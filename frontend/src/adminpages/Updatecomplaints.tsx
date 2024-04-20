import { Updatecomplaintscomp } from "../components/Updatecomplaintscomp"
import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"
export const Updatecomplaints=()=>{
    return(
        <div>
            <Appbar content="Complaint" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
           <Updatecomplaintscomp/>
        </div>
        </div>
        
        </div>
        
    )
}