import React from "react";

const FormInput = ({ type, name, value, onChange, placeholder = "", label = "", options = [], required = false }) => {
    switch (type) {
        case 'select':
            return (
                <label className="input">
                    {label && <span className="label">{label}</span>}
                    <select className="select" id={name} onChange={onChange} name={name} value={value} required={required}>
                        <option value="">---Select---</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
            );
        case 'radio':
            return (
                <label className="input">
                    {label && <span className="label">{label}</span>}
                    {options.map((option, index) => (
                        <React.Fragment key={index}>
                            <input
                                type="radio"
                                className="radio radio-primary"
                                name={name}
                                id={option}
                                value={option}
                                onChange={onChange}
                                checked={value === option}
                                required={required}
                            />
                            <label htmlFor={option}>{option}</label>
                        </React.Fragment>
                    ))}
                </label>
            );
        case 'date':
            return (
                <label className="input">
                    {label && <span className="label">{label}</span>}
                    <input type="date" onChange={onChange} name={name} value={value} required={required} />
                </label>
            );
        default:
            return (
                <label className="input">
                    {label && <span className="label">{label}</span>}
                    <input
                        type={type}
                        className="input"
                        placeholder={placeholder}
                        onChange={onChange}
                        name={name}
                        value={value}
                        required={required}
                    />
                </label>
            );
    }
};

export default FormInput;