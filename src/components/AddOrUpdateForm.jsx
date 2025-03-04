import axios from "axios";
import { useEffect, useState } from "react";

const AddOrUpdateForm = () => {
    const cities = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "San Francisco"
    ];
    const [formData, setFormData] = useState(
        {
            "firstName": "",
            "lastName": "",
            "city": "",
            "gender": "",
            "birthDate": "",
            "email": "",
            "phone": "",
            "eyeColor": ""
        }
    );
    const [users, setUsers] = useState([]);
    let [editBtnClickedStatus, setEditBtnClickedStatus] = useState(false);
    let [currUserId, setCurrUserId] = useState(null);

    const InputOnChange = (property, value) => {
        setFormData(
            existingData => ({
                ...existingData,
                [property]: value
            })
        );
    }
    const resetForm = () => {
        setFormData({ firstName: "", lastName: "", gender: "", birthDate: "", email: "", phone: "", eyeColor: "", city: "" });
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://dummyjson.com/users/add", formData);
            if (response.status === 201) {
                users.push(formData);
                setUsers([...users]);
                resetForm();
                console.log(users);
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };
    const deleteUser = async (index) => {
        try {
            const userId = index == 0 ? (index + 1) : index;
            const response = await axios.delete(`https://dummyjson.com/users/${userId}`);
            if (response.status === 200) {
                console.log("User deleted successfully:", response.data);
                users.splice(index, 1);
                setUsers([...users]);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
    const fillFormWithData = async (index) => {
        try {
            const userId = index == 0 ? (index + 1) : index;
            const response = await axios.get(`https://dummyjson.com/users/${userId}`);

            console.log("User Data:", response.data);

            if (!users || users.length <= index) {
                console.error("Invalid user index");
                return;
            }

            const userData = users[index];

            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                gender: userData.gender || "",
                birthDate: userData.birthDate || "",
                email: userData.email || "",
                phone: userData.phone || "",
                eyeColor: userData.eyeColor || "",
                city: userData.city || ""
            });
            setEditBtnClickedStatus(true);
            currUserId == null ? (setCurrUserId(index)) : "";
        } catch (error) {
            console.error("Error while filling user data:", error);
        }
    };

    const updateUser = async (e) => {
        try {
            e.preventDefault();
            let index;
            currUserId != null ? (index = currUserId) : "";

            const userId = index == 0 ? (index + 1) : index;
            const response = await axios.patch(`https://dummyjson.com/users/${userId}`, formData);

            console.log("Updated User:", response.data);

            users.splice(index, 1);
            users.push(formData);
            setUsers([...users]);
            resetForm();

            setEditBtnClickedStatus(false);
            setCurrUserId(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="c-container">
            <form className="bg-base-100 flex flex-col w-fit mx-auto" onSubmit={formSubmit}>
                <input type="text" className="input" placeholder="First Name" onChange={(e) => InputOnChange("firstName", e.target.value)} value={formData.firstName} />
                <input type="text" className="input" placeholder="Last Name" onChange={(e) => InputOnChange("lastName", e.target.value)} value={formData.lastName} />

                <label className="input">
                    <span className="label">Select City</span>
                    <select className="select" id="city" onChange={(e) => InputOnChange("city", e.target.value)} value={formData.city}>
                        <option value="Select">---Select---</option>
                        {
                            cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))
                        }
                    </select>
                </label>

                <label className="input">
                    <span className="label">Gender</span>

                    <label htmlFor="male">Male</label>
                    <input type="radio" className="radio radio-primary" name="gender" id="male" value={"male"} onChange={(e) => InputOnChange("gender", e.target.value)} checked={formData.gender == 'male'} />

                    <label htmlFor="female">Female</label>
                    <input type="radio" className="radio radio-primary" name="gender" id="female" value={"female"} onChange={(e) => InputOnChange("gender", e.target.value)} checked={formData.gender == 'female'} />
                </label>
                <label className="input">
                    <span className="label">Date of Birth</span>
                    <input type="date" onChange={(e) => InputOnChange("birthDate", e.target.value)} value={formData.birthDate} />
                </label>

                <input type="text" className="input" placeholder="Email" onChange={(e) => InputOnChange("email", e.target.value)} value={formData.email} />
                <input type="text" className="input" placeholder="Phone" onChange={(e) => InputOnChange("phone", e.target.value)} value={formData.phone} />
                <input type="text" className="input" placeholder="Eye Color" onChange={(e) => InputOnChange("eyeColor", e.target.value)} value={formData.eyeColor} />

                {
                    !editBtnClickedStatus ?
                        (<input type="submit" value="Add" className="mt-5 btn btn-active btn-primary" />)
                        :
                        (<button onClick={(e) => { updateUser(e) }} className="mt-5 btn btn-active btn-primary">Update</button>)
                }
            </form>

            {users.length > 0 && (

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>City</th>
                                <th>Gender</th>
                                <th>Birth Date</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.city}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.birthDate}</td>
                                    <td>
                                        <button className="btn text-accent mr-2" onClick={() => { fillFormWithData(index) }}>Edit</button>
                                        <button className="btn text-red-400" onClick={() => { deleteUser(index) }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AddOrUpdateForm;