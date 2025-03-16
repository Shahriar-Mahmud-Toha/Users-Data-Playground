import useUserForm from "../../hooks/useUserForm";
import { CITIES } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";
import FormInput from "../common/FormInput";

const UserForm = () => {
    const { formData, formRef, editingUserId, handleInputChange, handleFormSubmit } = useUserForm();
    return (
        <form ref={formRef} className="bg-base-100 mx-auto w-fit p-5 rounded-lg shadow-md" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="grid grid-cols-2 gap-3">
                <FormInput type="text" ref={formData} label="First Name" name="firstName" value={formData.current.firstName} placeholder="Enter your first name" onChange={handleInputChange} required />
                <FormInput type="text" ref={formData} label="Last Name" name="lastName" value={formData.current.lastName} placeholder="Enter your last Name" onChange={handleInputChange} />

                <FormInput type="text" ref={formData} label="Email" placeholder="Enter your email" name="email" value={formData.current.email} onChange={handleInputChange} />
                <FormInput type="text" ref={formData} label="Phone" placeholder="Enter your phone" name="phone" value={formData.current.phone} onChange={handleInputChange} />

                <FormInput type="radio" ref={formData} label="Gender" name="gender" value={formData.current.gender} onChange={handleInputChange} options={['male', 'female']} />
                <FormInput type="text" ref={formData} label="Eye Color" placeholder="Enter your eye color" name="eyeColor" value={formData.current.eyeColor} onChange={handleInputChange} />

                <FormInput type="select" ref={formData} editingUserId={editingUserId} label="City" name="city" value={formData.current.address?.city} onChange={handleInputChange} options={CITIES} />
                <FormInput type="date" ref={formData} label="Birth Date" name="birthDate" value={formatDate(formData.current.birthDate)} onChange={handleInputChange} />
            </div>

            <button type="submit" className="mt-4 w-full btn btn-primary">
                {editingUserId ? "Update" : "Add"}
            </button>
        </form>

    );
};

export default UserForm;