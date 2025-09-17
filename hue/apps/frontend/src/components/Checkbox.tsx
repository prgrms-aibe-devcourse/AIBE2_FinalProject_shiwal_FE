import React from "react";

type CheckboxProps = {
    children?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
    onChange: (checked: boolean) => void;
};

function Checkbox({ children, disabled, checked, onChange }: CheckboxProps) {
    return (
        <label>
            <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            {children}
        </label>
    );
}

export default Checkbox;