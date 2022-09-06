import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./AddGroupPage.css"
import { IoImagesOutline } from "react-icons/io5"
// firebase imports
import { db, storage } from '../../firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom'
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


function AddPostPage() {
    const { user } = useSelector(selectUser);
    const userName = user.name;
    const userId = user.uid;

    const navigate = useNavigate();//Navigation

    // VALUES FOR FIREBASE //
    // 
    // 

    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");





    // UTILITY FUNCTIONS //
    // 
    // 
    // 


    // Empty Error Message
    const [error, setError] = useState("");






    // MAIN FUNCTIONS //
    // 
    // 
    // 


    function addGroup(event) {
        event.preventDefault();
        if (description === "" && groupName === "") {// check if both inputs are empty
            setError("Both fields cannot be empty")
        }
        else {
            addDocumentToDatabase("")
        }
    }

    async function addDocumentToDatabase() {
        try {
            await addDoc(collection(db, 'groups'),
                {
                    name: groupName,
                    description: description,
                    created_by: userId,
                    creater_name: userName,
                    date: Timestamp.now(),
                })
            navigate("/my-posts")
        } catch (err) {
            alert(err)
        }
    }





    return (
        <div className='addPostPage'>
            <Navbar activePage={"addGroup"} />

            <div className="addPostPage__addPostSection">

                <form action="#" className="addPostPage__form">

                    <h4>Create Post</h4>


                    <input
                        value={groupName}
                        onChange={(event) => {
                            setGroupName(event.target.value)
                            setError("")
                        }}
                        placeholder="group name"
                    />

                    <textarea
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value)
                            setError("")
                        }}
                        placeholder="group description"
                    >
                    </textarea>

                    <p id='error'>{error}</p>

                    <button onClick={addGroup} type="submit">Create</button>
                </form>

            </div>

        </div>
    )
}

export default AddPostPage