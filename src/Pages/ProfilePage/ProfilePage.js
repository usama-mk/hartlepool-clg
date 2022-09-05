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
import { collection, getDocs, query, where } from 'firebase/firestore'
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


function ProfilePage() {
    const user = useSelector(selectUser);
    const userName = user.name;
    const userEmail = user.email;
    const userId = user.uid;


    // reset input fields 
    function resetInputs() {
        setName(userName);
        setEmail(userEmail);
        setPassword("");
        setConfirmPassword("");
    }

    // show edit panel 
    const [showEdit, setshowEdit] = useState(false);
    function toggleEditPanel() {
        if (showEdit) {
            setshowEdit(false);
        } else {
            setshowEdit(true);
        }
    }


    // MAIN FUNCTIONS
    // 
    // 
    // 

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    // Update User
    async function updateUserInDatabase(event) {
        event.preventDefault();
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            setError("*all fields are required")
            return
        }
        else if (password !== confirmPassword) {
            setError("*passwords don't match")
            return
        }

        // username
        await updateProfile(auth.currentUser, { displayName: name })
            .then(async () => {

                // email
                await updateEmail(auth.currentUser, email)
                    .then(async () => {

                        // password
                        await updatePassword(auth.currentUser, password)
                            .then(() => {
                                setError("* profile updated !")
                                setTimeout(() => {
                                    setError("")
                                    setshowEdit(false)
                                }, 3000);
                            }).catch((error) => {
                                setError(error.code)
                            })

                    }).catch((error) => {
                        setError(error.code)
                    })

            }).catch((error) => {
                setError(error.code)
            })

    }


    // Check No of Votes
    const [upvotes, setUpVoted] = useState(0)
    const [downvotes, setDownVoted] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    useEffect(() => {
        async function checkNoOfVotes() {
            // count up votes
            const upQuery = query
                (
                    collection(db, "votes"),
                    where("posted_by", "==", userId),
                    where("voted", "==", "up"),
                )
            const querySnapshot1 = await getDocs(upQuery);
            setUpVoted(querySnapshot1.docs.length)

            const downQuery = query
                (
                    collection(db, "votes"),
                    where("posted_by", "==", userId),
                    where("voted", "==", "down"),
                )
            const querySnapshot2 = await getDocs(downQuery);
            setDownVoted(querySnapshot2.docs.length)

            const totalQuery = query
                (
                    collection(db, "posts"),
                    where("posted_by", "==", userId),
                )
            const querySnapshot3 = await getDocs(totalQuery);
            setTotalPosts(querySnapshot3.docs.length)


        }
        checkNoOfVotes();
    }, [])




    return (
        <div className='profilePage'>
            <Navbar />

            <div className="profilePage__profileSection">

                <form className="profilePage__form" autoComplete='off'>

                    <h4>
                        User Profile
                        <span
                            className={`profilePage__formToggleEdit ${showEdit && "profilePage__formToggleEdit--active"}`}
                            onClick={() => {
                                toggleEditPanel();
                                resetInputs();
                            }}
                        >
                            <BiEditAlt />
                        </span>
                    </h4>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <IoPersonCircleSharp />
                        </span>
                        <input
                            type="text"
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={
                                (event) => setName(event.target.value)
                            }
                            readOnly={!showEdit}
                            required
                            onKeyUp={() => setError(" ")}
                        />
                    </div>

                    <div className="profilePage__formInputGroup">
                        <span>
                            <MdAlternateEmail />
                        </span>
                        <input
                            type="email"
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={
                                (event) => setEmail(event.target.value)
                            }
                            readOnly={!showEdit}
                            required
                            pattern="^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))"
                            title="Please enter a valid email address"
                            onKeyUp={() => setError(" ")}
                        />
                    </div>

                    {
                        showEdit ?

                            <>{/*Edit Panel*/}

                                <div className="profilePage__formInputGroup">
                                    <span>
                                        <BiLock />
                                    </span>
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={
                                            (event) => setPassword(event.target.value)
                                        }
                                        required
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                                        onKeyUp={() => setError(" ")}
                                    />
                                </div>

                                <div className="profilePage__formInputGroup">
                                    <span>
                                        <BiLock />
                                    </span>
                                    <input
                                        type="password"
                                        name='passwordConfirm'
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        required
                                        onChange={
                                            (event) => setConfirmPassword(event.target.value)
                                        }
                                        onKeyUp={() => {
                                            if (confirmPassword !== password) {
                                                setError("*passwords dont match")
                                            } else {
                                                setError(" ")
                                            }
                                        }}
                                    />
                                    <p id='passwordError'>{error}</p>
                                </div>

                                <button
                                    type='submit'
                                    className="profilePage__formInputButton"
                                    onClick={updateUserInDatabase}
                                >
                                    Update
                                </button>
                            </>
                            :
                            <>{/*Info Panel*/}
                                <div>
                                    <div className="profilePage__formInputGroup
                                profilePage__formInputGroup--info
                                profilePage__formInputGroup--infoFirst">
                                        <span>
                                            <BiMessageAltCheck />
                                        </span>
                                        <input
                                            type="text"
                                            value={totalPosts + " Posts"}
                                            readOnly
                                        />
                                    </div>

                                    <div className="profilePage__formInputGroup
                                profilePage__formInputGroup--info">
                                        <span>
                                            <BiUpvote />
                                        </span>
                                        <input
                                            type="text"
                                            value={upvotes + " UpVotes"}
                                            readOnly
                                        />
                                    </div>

                                    <div className="profilePage__formInputGroup
                                profilePage__formInputGroup--info
                                profilePage__formInputGroup--infoLast">
                                        <span>
                                            <BiDownvote />
                                        </span>
                                        <input
                                            type="text"
                                            value={downvotes + " DownVotes"}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </>

                    }

                </form>

            </div>

        </div>
    )
}

export default ProfilePage