import axios from 'axios';
import { LabelledInput } from './UserLogincard';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
interface Userinput {
    username:string,
    password:string,
    address:string,
    area_id:number,
    emailid:string,



}
export const AdduserForm = () => {
    async function adduser() {
        try {
            await axios.post(`http://localhost:3000/adminadd`, postInputs, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            alert("User added successfully");
        } catch (err: any) {
            console.log(err.response.data);
            alert("username or password is incorrect");
        }
    }
    const [postInputs, setPostInputs] = useState<Userinput>({
        username: "",
        password: "",
        emailid: "",
        area_id: 0,
        address: ""
    });
    const handleCityChange = (e: any) => {
    let selectedValue: string | number;

    // Check if e.value is a string, if not, parse it as a number
    if (typeof e.value === 'string') {
        selectedValue = e.value.trim();
    } else {
        selectedValue = parseInt(e.value); // or parseFloat(e.value) for decimal numbers
    }

    setSelectedCity(selectedValue);
    console.log("Selected city:", selectedValue); // Debugging statement

    console.log("All cities:", cities); // Debugging statement

    const selectedCityObj = cities.find(city => city.name === selectedValue);
    console.log("Selected city object:", selectedCityObj); // Debugging statement

    if (selectedCityObj) {
        setPostInputs(prevState => {
            const newState = {
                ...prevState,
                area_id: selectedCityObj.area_id
            };
            console.log("Post inputs after update:", newState);
            return newState; 
        });
    }
};

    
    
    
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Vayalur', area_id: 1 },
        { name: 'Srinivasan nagar', area_id: 2 },
        { name: 'Somarasampettai', area_id: 3},
        { name: 'Rettaivaikal', area_id: 4 },
        { name: 'Ramalinga Nagar', area_id: 5 }
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
        <div className='font-bold mb-2 mt-2 text-neutral-400'>User area</div>

        <Dropdown value={selectedCity} onChange={handleCityChange} options={cities} optionLabel="name"
            placeholder="Select a City" className="w-full md:w-14rem" />
           
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
    </div>)
}
