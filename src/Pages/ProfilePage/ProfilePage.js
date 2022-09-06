import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./ProfilePage.css"
import { BiEditAlt } from "react-icons/bi"
import { IoPersonCircleSharp } from "react-icons/io5"
import { MdAlternateEmail } from "react-icons/md"
import { BiLock, BiMessageAltCheck, BiUpvote, BiDownvote } from "react-icons/bi"
// firebase imports
import { auth, db } from '../../firebaseConfig';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


function ProfilePage() {
    const { user } = useSelector(selectUser);
    const userName = user.name;
    const userEmail = user.email;
    const userId = user.uid;




    // MAIN FUNCTIONS
    // 
    // 
    // 

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [dob, setDob] = useState("");
    const [course, setCourse] = useState("");


    useEffect(() => {
        async function getRelevantPosts() {
            const querySnapshot = await getDocs(query
                (
                    collection(db, "users"),
                    where("uid", "==", userId),
                    limit(1)
                ));

            setDob(querySnapshot.docs[0].data().dob.toDate().toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit' }));
            setCourse(querySnapshot.docs[0].data().course);
        }
        getRelevantPosts();
    }, [userId])









    return (
        <div className='profilePage'>
            <Navbar />

            <div className="profilePage__profileSection">

                <form className="profilePage__form" autoComplete='off'>

                    <h4>
                        User Profile
                    </h4>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <IoPersonCircleSharp />
                        </span>
                        <input
                            type="text"
                            name='name'
                            value={name}
                            readOnly={true}
                        />
                    </div>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <MdAlternateEmail />
                        </span>
                        <input
                            type="email"
                            name='email'
                            value={email}
                            readOnly={true}
                        />
                    </div>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <IoPersonCircleSharp />
                        </span>
                        <input
                            type="text"
                            name='dob'
                            value={dob}
                            readOnly={true}
                        />
                    </div>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <IoPersonCircleSharp />
                        </span>
                        <input
                            type="text"
                            name='course'
                            value={course}
                            readOnly={true}
                        />
                    </div>


                </form>

            </div>

        </div>
    )
}

export default ProfilePage