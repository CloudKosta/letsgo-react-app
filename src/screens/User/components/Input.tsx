import "./css/Input.css";

interface InputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}

function Input({ label, id, name, value, onChange, type = "text", placeholder }: InputProps) {
    return (
        <div className="input-wrapper">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                className="input-field"
            />
        </div>
    );
}

export default Input;