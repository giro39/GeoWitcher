import { useState } from "react";

import styles from "./Form.module.scss";

interface FormProps {
    fields: { name: string; label: string; type?: string, endAdornment?: React.ReactNode }[];
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
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            {fields.map(field => (
                <div key={field.name}>
                    <label className={styles.inputLabel}>
                        {field.label}
                        <div className={styles.inputWrapper}>
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={values[field.name] || ""}
                                onChange={handleChange}
                                required
                                className={`${styles.formInput} ${field.endAdornment ? styles.hasAdornment : ''}`}
                            />
                            {field.endAdornment && (
                                <div className={styles.adornmentContainer}>
                                    {field.endAdornment}
                                </div>
                            )}
                        </div>
                    </label>
                </div>
            ))}
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type="submit" className={styles.formSubmit}>{submitLabel}</button>
        </form>
    )
}

export default Form;