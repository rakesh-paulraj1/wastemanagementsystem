import { AdduserForm } from "../components/AdduserForm";
import {AdminSidebar} from "../components/AdminSidebar";
import  {Appbar} from "../components/Appbar";
export const Adduser1 = () => {
    return(<div>
        <Appbar content="Add user" />
        <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="mt-8 mx-auto max-w-lg">
            <AdduserForm/>
        </div>
        </div>
        
        </div>
    )}