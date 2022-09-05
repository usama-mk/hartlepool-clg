import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import "./AddPostPage.css"
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
  const user = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  const navigate = useNavigate();//Navigation

  // VALUES FOR FIREBASE //
  // 
  // 

  const [description, setDescription] = useState("");
  const [imageFile, setimageFile] = useState(null);





  // UTILITY FUNCTIONS //
  // 
  // 
  // 

  // Show input image name
  function showImgName() {
    var imgName = document.getElementById("imgInput").value;
    if (imgName === "") {
      document.getElementById("inputImgName").innerText = "Add Image";
    } else {
      document.getElementById("inputImgName").innerText = imgName.split("\\").pop();
    }
  }

  // Empty Error Message
  const [error, setError] = useState("");






  // MAIN FUNCTIONS //
  // 
  // 
  // 


  function addPost(event) {
    event.preventDefault();
    if (description === "" && imageFile === null) {// check if both inputs are empty
      setError("Both fields cannot be empty")
    }
    else if (description !== "" && imageFile === null) {
      addDocumentToDatabase("")
    }
    else {
      addImageToStorage()//call add image function
    }
  }

  function addImageToStorage() {
    const imageRef = ref(storage, `post-images/${imageFile.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on
      ('state-changed',

        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },

        (error) => {// error in image upload
          alert(">>> " + error)
        },

        () => {// successful image upload
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDocumentToDatabase(downloadURL)//call add document function
          });
        }

      );
  }

  async function addDocumentToDatabase(downloadURL) {
    try {
      await addDoc(collection(db, 'posts'),
        {
          posted_by: userId,
          username: userName,
          description: description,
          image: downloadURL,
          date: Timestamp.now(),
        })
      navigate("/my-posts")
    } catch (err) {
      alert(err)
    }
  }





  return (
    <div className='addPostPage'>
      <Navbar activePage={"addPost"} />

      <div className="addPostPage__addPostSection">

        <form action="#" className="addPostPage__form">

          <h4>Create Post</h4>

          <textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
              setError("")
            }}
            placeholder="what's on your mind ?"
          >
          </textarea>

          {/* image input */}
          <div className="addPostPage__formImg">
            <button>
              <span><IoImagesOutline /></span>
              <p id='inputImgName'>Add Image</p>
            </button>

            <input
              id='imgInput'
              type="file"
              text="hello"
              onChange={(event) => {
                showImgName()
                setimageFile(event.target.files[0])
                setError("")
              }}
              accept="image/*"
            />
          </div>

          <p id='error'>{error}</p>

          <button onClick={addPost} type="submit">Post</button>
        </form>

      </div>

    </div>
  )
}

export default AddPostPage