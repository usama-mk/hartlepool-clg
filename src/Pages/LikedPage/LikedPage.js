import React, { useEffect, useState } from 'react'
import "./LikedPage.css"
import Navbar from "../../Components/Navbar/Navbar"
import PostCard from '../../Components/PostCard/PostCard'
// firebase imports
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebaseConfig';
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function LikedPage() {
  const user = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  // Fetch liked Posts Ids
  const [postsIds, setPostIds] = useState([]);
  useEffect(() => {
    async function getLikedIdsFromDatabase() {
      const q = query
        (
          collection(db, "votes"),
          where("voted_by", "==", userId),
          where("voted", "==", "up"),
        )
      const querySnapshot = await getDocs(q);

      setPostIds(querySnapshot.docs.map
        (
          (doc) => (
            {
              id: doc.data().post_id
            }
          )
        )
      )
    }
    getLikedIdsFromDatabase();
  }, [])


  // Get All Liked Posts
  const [allLikedPosts, setAllLikedPosts] = useState([]);
  useEffect(() => {
    function getAllLikedPostsFromDatabase() {

      postsIds.forEach(async ({ id }) => {
        const querySnapshot = await getDoc(doc(db, "posts", id));

        if (!allLikedPosts.some(x => x.doc_id === querySnapshot.id)) {
          setAllLikedPosts(
            (allLikedPosts) =>
              [
                ...allLikedPosts,
                {
                  doc_id: querySnapshot.id,
                  doc_data: querySnapshot.data(),
                }
              ]
          )
        }
      });
    }

    getAllLikedPostsFromDatabase();

  }, [postsIds])


  return (
    <div className='likedpage'>
      <Navbar activePage={"liked"} />

      <div className="likedpage__postSection">

        {
          allLikedPosts.length > 0
            ?
            allLikedPosts.map(({ doc_id, doc_data }) => (
              < PostCard
                key={doc_id}
                postId={doc_id}
                postedBy={doc_data.posted_by}
                userId={userId}
                username={doc_data.username}
                date={
                  doc_data.date.toDate().toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
                }
                description={doc_data.description}
                image={doc_data.image}
              />
            ))
            :
            <h3 style={{ textAlign: "center", color: "#CED0D4", marginTop: "50px" }}>No Liked Post Yet !</h3>
        }

      </div>
    </div >
  )
}

export default LikedPage 