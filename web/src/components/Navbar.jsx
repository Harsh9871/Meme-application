import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
const Navbar = () => {
    const router = createBrowserRouter([
        
    ])
    return (
        <>
            <nav>
                <h1>Meme Application</h1>
                <div className="nav-items" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar