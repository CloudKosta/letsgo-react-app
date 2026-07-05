import "./css/Button.css";

interface ButtonProps {
    text: string;
    type?: "button" | "submit";
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ text, type = "button", onClick, disabled = false }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="form-button"
        >
            {text}
        </button>
    );
}

export default Button;