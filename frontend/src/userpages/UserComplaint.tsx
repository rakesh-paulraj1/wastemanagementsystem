import { UserSidebar } from "../components/UserSidebar";
import { Appbar } from "../components/Appbar";
import { Complaintsform } from "../components/Complaintsform";
export const UserComplaint=()=>{
    return (
        <div>
        <Appbar content="User Dashboard" />
        <div className="flex flex-col md:flex-row">
        <UserSidebar />
        <div className="mt-8 mx-auto max-w-lg">
        <Complaintsform/>
        </div>
        </div>

        
    </div>
    )
}