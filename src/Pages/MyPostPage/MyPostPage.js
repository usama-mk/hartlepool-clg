import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import PostCard from '../../Components/PostCard/PostCard'
import "./MyPostPage.css"
// firebase imports
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
// imports for authentication
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function MyPostPage() {
    const user = useSelector(selectUser);
    const userName = user.name;
    const userId = user.uid;

    // Get All Posts
    const [myPosts, setmyPosts] = useState([]);
    useEffect(() => {
        async function getMyPostsFromDatabase() {
            const q = query
                (
                    collection(db, "posts"),
                    where("posted_by", "==", userId),
                )
            const querySnapshot = await getDocs(q);

            setmyPosts(querySnapshot.docs.map
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

        getMyPostsFromDatabase();
    }, [])







    return (
        <div className='myPostPage'>
            <Navbar />

            <div className="myPostPage__postSection">
                {
                    myPosts.length > 0
                        ?
                        myPosts.map(({ doc_id, doc_data }) => (
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
                                allowDelete={true}
                            />
                        ))
                        :
                        <h3 style={{ textAlign: "center", color: "#CED0D4", marginTop: "50px" }}>Nothing Posted Yet !</h3>
                }
            </div>
        </div>
    )
}

export default MyPostPage