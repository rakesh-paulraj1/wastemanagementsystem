import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"

export const Complaints=()=>{
    return (<div>
        <Appbar content="Add user" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
            
        </div>
        </div>
        
        </div>
    )
}