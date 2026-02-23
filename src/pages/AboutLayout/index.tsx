import { Link, Outlet } from "react-router-dom"

function AboutLayout() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/about/products">About Products</Link></li>
                    <li><Link to="/about/authors">About Authors</Link></li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default AboutLayout;