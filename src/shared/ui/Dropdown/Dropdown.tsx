import clsx from "clsx";
import styles from "./Dropdown.module.css";
import { type ReactNode, useState, useRef, useEffect } from "react";

type DropdownVariant = 'primary' | 'secondary';

export type DropdownItem = {
    title: string;
    url?: string;
    action?: () => void;
};

type DropdownProps = {
    header?: ReactNode,
    items: DropdownItem[];
    variant?: DropdownVariant;
    children: ReactNode;
    className?: string;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
}

export function Dropdown({
                             items,
                             header,
                             variant = 'primary',
                             className,
                             children,
                             startIcon,
                             endIcon
                         }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleItemClick = (item: DropdownItem) => {
        if (item.action) {
            item.action();
        }

        setOpen(false);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <button
                type="button"
                className={clsx(styles.button, styles[variant], className)}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="menu"
            >
                {startIcon}
                <span className={styles.content}>{children}</span>
                {endIcon}
            </button>

            {open && items.length > 0 && (
                <>

                <div className={styles.dataDialog}>
                    <ul>
                        {header && <li className={styles.header}>{header}</li>}
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.url ? (
                                    <a
                                        href={item.url}
                                        className={styles.menuItem}
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        className={styles.menuItem}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.title}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                </>
            )}
        </div>
    )
}
