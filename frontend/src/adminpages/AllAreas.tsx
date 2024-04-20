import { AdminSidebar } from "../components/AdminSidebar"

import { Appbar } from "../components/Appbar"
import { Areatable } from "../components/AreaTable"

export const AllAreas=()=>{
    return (<div>
        <Appbar content="Areas" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
            <Areatable/>
        </div>
        </div>
        
        </div>
    )
}