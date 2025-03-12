import useUserForm from "../../hooks/useUserForm";
import { CITIES } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";
import FormInput from "../common/FormInput";

const UserForm = () => {
    const { formData, editingUserId, handleInputChange, handleFormSubmit } = useUserForm();
    return (
        <form className="bg-base-100 mx-auto w-fit p-5 rounded-lg shadow-md" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="grid grid-cols-2 gap-3">
                <FormInput type="text" label="First Name" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleInputChange} required />
                <FormInput type="text" label="Last Name" name="lastName" placeholder="Enter your last Name" value={formData.lastName} onChange={handleInputChange} />

                <FormInput type="text" label="Email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleInputChange} />
                <FormInput type="text" label="Phone" placeholder="Enter your phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                
                <FormInput type="radio" label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} options={['male', 'female']} />
                <FormInput type="text" label="Eye Color" placeholder="Enter your eye color" name="eyeColor" value={formData.eyeColor} onChange={handleInputChange} />

                <FormInput type="select" label="City" name="city" value={formData.address.city} onChange={handleInputChange} options={CITIES} />
                <FormInput type="date" label="Birth Date" name="birthDate" value={formatDate(formData.birthDate)} onChange={handleInputChange} />
            </div>

            <button type="submit" className="mt-4 w-full btn btn-primary">
                {editingUserId ? "Update" : "Add"}
            </button>
        </form>

    );
};

export default UserForm;