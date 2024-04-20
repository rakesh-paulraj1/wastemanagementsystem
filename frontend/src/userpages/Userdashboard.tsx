import {UserSidebar} from "../components/UserSidebar";
import  {Appbar} from "../components/Appbar";
import { Wasteinputform } from "../components/Wasteinput";


export const Userdashboard = () => {
    return (<div>
        <Appbar content="User Dashboard" />
        <div className="flex flex-col md:flex-row w-full">
        <UserSidebar />
        <div className="mt-8 mx-auto max-w-lg">
        <Wasteinputform/>
        </div>
        </div>

        
    </div>
    )
}
