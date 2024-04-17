import axios from 'axios';
import { LabelledInput } from './UserLogincard';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
        
import { useState } from 'react';
interface Userinput {
    username:string,
    password:string,
    address:string,
    area_id:number,
    emailid:string,



}
export const AdduserForm = () => {
    const navigate=useNavigate();
    const [visible, setVisible] = useState(false);
    async function adduser() {
        try {
            await axios.post(`http://localhost:3000/adminadd`, postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("User added successfully");
            navigate("/admindashboard");
            
        } catch (err: any) {
            console.log(err.response.data);
            alert("username or password is incorrect");
        }
    }
    const handleAreaIdChange = (e) => {
        const selectedAreaId = parseInt(e.target.value); // Parse selected value to integer
        setPostInputs(prevState => ({
            ...prevState,
            area_id: selectedAreaId // Update area_id in postInputs state
        }));
    };
    
    const [postInputs, setPostInputs] = useState<Userinput>({
        username: "",
        password: "",
        emailid: "",
        area_id: 0,
        address: ""
    });

    
   
    const cities = [
        { area_id: 1, name: 'Vayalur' },
        { area_id: 2, name: 'Srinivasan nagar' },
        { area_id: 3, name: 'Somarasampettai' },
        { area_id: 4, name: 'Rettaivaikal' },
        { area_id: 5, name: 'Ramalinga Nagar' }
    ];
    return (<div>
        <div className="font-bold text-3xl p-4 text-neutral-400">
            Enter User details
        </div>

        <LabelledInput label={"Username"} type={"text"} placeholder={"Your username"} onChange={(e) => {
            setPostInputs({
                ...postInputs,
                username: e.target.value
            })
        }} />

        <LabelledInput label={"Password"} type={"password"} placeholder={"user password"} onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }} />
        <div className='font-bold mb-2 mt-2 text-neutral-400 '>User area</div>
        <div className='flex justify-between'>
        <button  onClick={() => setVisible(true)} type="button" className="select-none  w-full mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">List</button>
<Dialog header="Area and ID" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
    <p className="m-0 flex flex-col">
    <ul className="m-0 p-0">
    <li className="mb-2">Vayalur-  area_id: 1</li>
    <li className="mb-2">Srinivasan nagar-  area_id: 2</li>
    <li className="mb-2">Somarasampettai-  area_id: 3</li>
    <li className="mb-2">Rettaivaikal-  area_id: 4</li>
    <li className="mb-2">Ramalinga Nagar-  area_id: 5</li>
</ul>
    </p>
</Dialog>


         
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' id="areaId" value={postInputs.area_id} onChange={handleAreaIdChange}>
                <option value={0}>Select an Area ID</option>
                {cities.map(city => (
                    <option key={city.area_id} value={city.area_id}>{city.area_id}</option>
                ))}
            </select>
            
            </div>
            <LabelledInput label={"Email "} type={"text"} placeholder={"user email"} onChange={(e) => {
            setPostInputs({
                ...postInputs,
                emailid: e.target.value 
            })
        }} />
       
        <LabelledInput label={"Address"} type={"text"} placeholder={"user address"} onChange={(e) => {
            setPostInputs({
                ...postInputs,
                address: e.target.value
            })
        }} />
        <button onClick={adduser} type="button" className="select-none  w-full mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ">Add User</button>
    </div>
    )
}
