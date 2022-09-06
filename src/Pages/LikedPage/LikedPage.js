import React, { useEffect, useState } from 'react'
import "./LikedPage.css"
import Navbar from "../../Components/Navbar/Navbar"
import PostCard from '../../Components/PostCard/PostCard'
// firebase imports
import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function LikedPage() {
  const { user } = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  // Get All Posts
  const [allGroups, setAllGroups] = useState([]);
  useEffect(() => {
    async function getAllDocumentsFromDatabase() {
      const q = query(
        collection(db, "groups"),
        orderBy("date")
      )
      const querySnapshot = await getDocs(q);

      setAllGroups(querySnapshot.docs.reverse().map
        (
          (doc) => (
            {
              doc_id: doc.id,
              doc_data: doc.data(),
            }
          )
        )
      );
    }
    getAllDocumentsFromDatabase();
  })



  const followGroup = async (group_id) => {
    const d = query(collection(db, "users"), where("uid", "==", userId))
    const querySnapshot = await getDocs(d);

    if (querySnapshot.docs.length === 1) {
      await setDoc(doc(db, "users", querySnapshot.docs.at(0).id), {
        following: arrayUnion(group_id)
      }, { merge: true });
    }
  }


  return (
    <div className='likedpage'>
      <Navbar activePage={"liked"} />

      <div className="likedpage__postSection">

        {
          allGroups.length > 0
            ?
            allGroups.map(({ doc_id, doc_data }) => (
              <>
                <h5>{doc_data.name} &nbsp;&nbsp;&nbsp;
                  <span>
                    <button
                      onClick={() => followGroup(doc_id)}
                    >
                      follow
                    </button>
                  </span>
                </h5>
              </>
            ))
            :
            <h3 style={{ textAlign: "center", color: "#CED0D4", marginTop: "50px" }}>No Groups Created Yet !</h3>
        }

      </div>
    </div >
  )
}

export default LikedPage;