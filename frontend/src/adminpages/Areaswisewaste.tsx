import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"
import { WasteByAreaTable } from "../components/WasteByAreatable"
export const Areawisewaste=()=>{
    return (<div>
        <Appbar content="Complaints" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
            <WasteByAreaTable/>

        </div>
        </div>
        
        </div>
    )
}