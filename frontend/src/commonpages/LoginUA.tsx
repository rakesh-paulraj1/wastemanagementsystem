import {AdminLogincard} from '../components/AdminLogincard';
import {UserLogincard} from '../components/UserLogincard';


export const Login = () => {
    return (<div>
        <div className="font-bold 0 bg-clip-text text-transparent text-xl md:text-5xl mr-5 "style={{ color: 'green' }}> WASTE MANAGEMENT SYSTEM </div>
        <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 grid grid-cols-1 md:grid-cols-2">
            <UserLogincard />
            <AdminLogincard />
        </div>
        </div>
       
    )
}