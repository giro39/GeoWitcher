import { useState } from "react";

interface FormProps {
    fields: { name: string; label: string; type?: string }[];
    onSubmit: (data: { [key: string]: string }) => void;
    submitLabel: string;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel }) => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field.name}>
                    <label>
                        {field.label}
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
            ))}
            {error && <div>{error}</div>}
            <button type="submit">{submitLabel}</button>
        </form>
    )
}

export default Form;