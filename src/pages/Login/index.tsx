import styles from "./Login.module.css";

export default function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Вход</h1>
            </form>
        </div>
    );
}