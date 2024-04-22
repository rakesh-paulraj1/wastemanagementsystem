import { UserSidebar } from "../components/UserSidebar";
import { Appbar } from "../components/Appbar";
import { Complaintsform } from "../components/Complaintsform";
export const UserComplaint=()=>{
    return (
        <div>
        <Appbar content="Add Complaint" />
        <div className="flex w-flex md:flex-row">
       <UserSidebar/>
        <div className="max-w-screen-lg pl-5 ml-auto w-3/4 ">
        <Complaintsform/>
        </div>
        </div>

        
    </div>
    )
}