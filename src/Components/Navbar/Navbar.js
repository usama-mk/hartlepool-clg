import React, { useState } from 'react'
import "./Navbar.css"
// import icons
import { HiOutlineHome } from "react-icons/hi"
import { AiOutlineLike, AiOutlineAppstoreAdd, AiOutlineProfile } from "react-icons/ai"
import { BiCaretDown } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"
import { SiHiveBlockchain } from "react-icons/si"
import { useNavigate } from "react-router-dom";
// imports for authentication
import { useDispatch } from 'react-redux'
import { logOut } from '../../features/userSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'


function Navbar({ activePage }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Toggle Settings Overlay div
    const [settingOpen, setSettingOpen] = useState(false);
    function toggleSettingsOverlay() {
        if (!settingOpen) {
            setSettingOpen(true);
        } else {
            setSettingOpen(false);
        }
    }

    // Logout User
    function logOutUser() {
        signOut(auth).then(() => {
            dispatch(logOut())
            navigate("/")
        }).catch((error) => {
            console.log(error.code)
        })
    }


    return (
        <div className='navbar'>
            {/* LOGO */}
            <div
                className="navbar__logo"
                onClick={() => { navigate("/home") }}
            >
                <SiHiveBlockchain /><span>C<small>BLOG</small></span>
            </div>
            {/* NAVIGATION */}
            <ul className="navbar__nav">
                <li
                    className={`navbar__navitem ${activePage === "home" ? "navbar__navitem--active" : ""}`}
                    onClick={() => { navigate("/home") }}

                >
                    <HiOutlineHome />
                </li>

                <li
                    className={`navbar__navitem ${activePage === "liked" ? "navbar__navitem--active" : ""}`}
                    onClick={() => { navigate("/liked-posts") }}
                >
                    <AiOutlineLike />
                </li>

                <li
                    className={`navbar__navitem ${activePage === "addPost" ? "navbar__navitem--active" : ""}`}
                    onClick={() => { navigate("/add-post") }}
                >
                    <AiOutlineAppstoreAdd />
                </li>

                <li
                    className={`navbar__navitem ${activePage === "addGroup" ? "navbar__navitem--active" : ""}`}
                    onClick={() => { navigate("/add-group") }}
                >
                    <AiOutlineAppstoreAdd />group
                </li>
            </ul>
            {/* SETTINGS */}
            <div className="navbar__setting">
                <div
                    className={`navbar__settingToggle ${settingOpen && "navbar__settingToggle--active"}`}
                    onClick={toggleSettingsOverlay}
                >
                    <BiCaretDown />
                </div>
                {/* dropdown */}
                {settingOpen &&
                    <>
                        <div
                            className="navbar__settingOverlay"
                            id='settingOverlay'
                        >
                            <ul className="navbar__nav--setting">
                                <li
                                    className="navbar__navitem--setting"
                                    onClick={() => { navigate("/profile") }}
                                >
                                    <CgProfile />&nbsp; Profile
                                </li>

                                <li
                                    className="navbar__navitem--setting"
                                    onClick={() => { navigate("/my-posts") }}
                                >
                                    <AiOutlineProfile />&nbsp; My Posts
                                </li>

                                <hr />

                                <li className="navbar__navitem--setting"
                                    onClick={logOutUser}
                                >
                                    <FiLogOut />&nbsp; Logout
                                </li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar