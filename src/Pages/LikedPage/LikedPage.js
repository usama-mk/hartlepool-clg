import React, { useEffect, useState } from 'react'
import "./LikedPage.css"
import Navbar from "../../Components/Navbar/Navbar"
import PostCard from '../../Components/PostCard/PostCard'
// firebase imports
import { arrayUnion, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
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

      const querySnapshot = await getDocs(query
        (
          collection(db, "users"),
          where("uid", "==", userId),
          limit(1)
        ));

      const following = querySnapshot.docs[0].data().following;

      const querySnapshot1 = await getDocs(query(
        collection(db, "groups"),
        orderBy("date")
      ));
      querySnapshot1.docs.reverse().forEach(doc => {
        var followed = false;
        if (following.includes(doc.id)) {
          followed = true;
        }

        setAllGroups((allPosts) => [...allPosts, {
          doc_id: doc.id,
          doc_data: doc.data(),
          followed: followed
        }])
      })
    }
    getAllDocumentsFromDatabase();
  }, [userId])








  const followGroup = async (group_id, group_name) => {
    const d = query(collection(db, "users"), where("uid", "==", userId))
    const querySnapshot = await getDocs(d);

    if (querySnapshot.docs.length === 1) {
      await setDoc(doc(db, "users", querySnapshot.docs.at(0).id), {
        following: arrayUnion(group_id)
      }, { merge: true });
      alert(`You are following ${group_name} group !`);
      window.location.reload();
    }
  }










  return (
    <div className='likedpage'>
      <Navbar activePage={"liked"} />

      <div className="likedpage__postSection">

        {
          allGroups.length > 0
            ?
            allGroups.map(({ doc_id, doc_data, followed }) => (
              <>
                <h5>{doc_data.name} &nbsp;&nbsp;&nbsp;
                  <span>
                    <button
                      onClick={() => {
                        if (!followed) {
                          followGroup(doc_id, doc_data.name);
                        }
                      }}
                    >
                      {followed ? "followed" : "follow"}
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