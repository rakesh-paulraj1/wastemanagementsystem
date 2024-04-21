import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"
import { Wastebyusertable } from "../components/Wastebyusertable"
export const Userwisewaste=()=>{
    return (<div>
        <Appbar content="Complaints" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
            <Wastebyusertable/>
        </div>
        </div>
        
        </div>
    )
}