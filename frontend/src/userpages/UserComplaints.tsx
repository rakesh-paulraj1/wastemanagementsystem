import { Appbar } from "../components/Appbar";
import { UserSidebar } from "../components/UserSidebar";
import { Usercomplaintstable } from "../components/Usercomplaints";


export const UserComplaints=()=>{
    return (<div>
        <Appbar content="User Complaints" />
        <div className="flex flex-col md:flex-row w-full">
        <UserSidebar />
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 mt-6">
       <Usercomplaintstable/>
        </div>
        </div>

        
    </div>
    )

}