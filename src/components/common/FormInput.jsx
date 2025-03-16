import React, { useEffect } from "react";
import useUserForm from "../../hooks/useUserForm";

const FormInput = ({ type, ref, editingUserId = "", name, value, onChange, placeholder = "", label = "", options = [], required = false }) => {
    const { formRef } = useUserForm();
    useEffect(() => {
        if (type === 'select' && editingUserId) {
            formRef.current[name].value = value;
        }
    }, [editingUserId]);
    switch (type) {
        case 'select':
            return (
                <div className="mb-5">
                    {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
                    <select
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent outline-none"
                        ref={ref}
                        id={name}
                        onChange={onChange}
                        name={name}
                        defaultValue={value}
                        required={required}
                    >
                        <option value="">---Select---</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            );
        case 'radio':
            return (
                <div className="mb-5">
                    {label && <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</span>}
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="radio"
                                ref={ref}
                                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 outline-none 
               dark:bg-gray-700 dark:border-gray-600 
               dark:focus:ring-accent dark:focus:border-accent dark:ring-offset-gray-800 
               dark:focus:ring-offset-gray-800 checked:accent-accent"
                                name={name}
                                id={option}
                                value={option}
                                onChange={onChange}
                                defaultChecked={value === option}
                                required={required}
                            />

                            <label htmlFor={option} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option}</label>
                        </div>
                    ))}
                </div>
            );
        case 'date':
            return (
                <div className="mb-5">
                    {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
                    <input
                        type="date"
                        ref={ref}
                        onChange={onChange}
                        name={name}
                        defaultValue={value}
                        required={required}
                        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent outline-none border-2"
                    />
                </div>
            );
        default:
            return (
                <div className="mb-5">
                    {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
                    <input
                        type={type}
                        ref={ref}
                        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent outline-none border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
                        placeholder={placeholder}
                        onChange={onChange}
                        name={name}
                        defaultValue={value}
                        required={required}
                    />
                </div>
            );
    }
};

export default FormInput;
