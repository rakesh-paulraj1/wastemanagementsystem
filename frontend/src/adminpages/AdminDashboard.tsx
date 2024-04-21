import {AdminSidebar} from "../components/AdminSidebar";
import  {Appbar} from "../components/Appbar";
import { UserTable } from "../components/UserTable";

export const AdminDashboard = () => {
    return (<div>
        <Appbar content="Admin Dashboard" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
        <UserTable/>
        </div>
        </div>

        
    </div>
    )
}


