import type {ReactNode} from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
    variant?: ButtonVariant;
    children: ReactNode;
    className?: string;
    endIcon?: ReactNode,
    startIcon?: ReactNode,
}

export function Button({variant = 'primary', className, children, startIcon, endIcon}: ButtonProps) {
    return (
        <button className={clsx(styles.button, styles[variant], className)}>
            {startIcon ?? startIcon}
            {children}
            {endIcon ?? endIcon}
        </button>
    )
}

//stories