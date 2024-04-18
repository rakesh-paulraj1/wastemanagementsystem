import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"
import { ComplaintsTable } from "../components/ComplaintsTable"
export const Complaints=()=>{
    return (<div>
        <Appbar content="Complaints" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
            <ComplaintsTable/>
        </div>
        </div>
        
        </div>
    )
}