import React, { useEffect, useState } from 'react'
import "./HomePage.css"
// import components
import Navbar from "../../Components/Navbar/Navbar"
import PostCard from '../../Components/PostCard/PostCard'
// firebase imports
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function HomePage() {

    const user = useSelector(selectUser);
    const userName = user.name;
    const userId = user.uid;



    // MAIN FUNCTIONS //
    // 
    // 
    // 

    // Get All Posts
    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        async function getAllDocumentsFromDatabase() {
            const q = query(
                collection(db, "posts"),
                orderBy("date")
            )
            const querySnapshot = await getDocs(q);

            setAllPosts(querySnapshot.docs.reverse().map
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




    return (
        <div className='homepage'>
            <Navbar activePage={"home"} />
            <div className="homepage__postSection">
                {
                    allPosts.map(
                        ({ doc_id, doc_data }) => (
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
                        )
                    )
                }
            </div>

        </div >
    )
}

export default HomePage