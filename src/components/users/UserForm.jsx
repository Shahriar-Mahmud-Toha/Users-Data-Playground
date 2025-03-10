import useUserForm from "../../hooks/useUserForm";
import { CITIES } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";
import FormInput from "../common/FormInput";

const UserForm = () => {
    const { formData, editingUserId, handleInputChange, handleFormSubmit } = useUserForm();
    return (
        <form className="bg-base-100 flex flex-col w-fit mx-auto" onSubmit={(e) => { handleFormSubmit(e) }} >
            <FormInput type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={(e) => { handleInputChange(e) }} required={true} />
            <FormInput type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={(e) => { handleInputChange(e) }} />
            <FormInput type="select" label="Select City" name="city" value={formData.address.city} onChange={(e) => { handleInputChange(e) }} options={CITIES} />
            <FormInput type="radio" label="Gender" name="gender" value={formData.gender} onChange={(e) => { handleInputChange(e) }} options={['male', 'female']} />
            <FormInput type="date" label="Date of Birth" name="birthDate" value={formatDate(formData.birthDate)} onChange={(e) => { handleInputChange(e) }} />
            <FormInput type="text" placeholder="Email" name="email" value={formData.email} onChange={(e) => { handleInputChange(e) }} />
            <FormInput type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={(e) => { handleInputChange(e) }} />
            <FormInput type="text" placeholder="Eye Color" name="eyeColor" value={formData.eyeColor} onChange={(e) => { handleInputChange(e) }} />

            <button type="submit" className="mt-5 btn btn-active btn-primary">
                {editingUserId ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default UserForm;