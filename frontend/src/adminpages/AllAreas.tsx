import { AdminSidebar } from "../components/AdminSidebar"
import { Appbar } from "../components/Appbar"

export const AllAreas=()=>{
    return (<div>
        <Appbar content="Areas" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
            <AllAreas/>
        </div>
        </div>
        
        </div>
    )
}