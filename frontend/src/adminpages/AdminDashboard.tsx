import {AdminSidebar} from "../components/AdminSidebar";
import  {Appbar} from "../components/Appbar";
import { UserTable } from "../components/UserTable";

export const AdminDashboard = () => {
    return (<div>
        <Appbar content="Admin Dashboard" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
        <UserTable/>
        </div>
        </div>

        
    </div>
    )
}


