import { AdminSidebar } from "../components/AdminSidebar"

import { Appbar } from "../components/Appbar"
import { Areatable } from "../components/AreaTable"

export const AllAreas=()=>{
    return (<div>
        <Appbar content="Areas" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
            <Areatable/>
        </div>
        </div>
        
        </div>
    )
}