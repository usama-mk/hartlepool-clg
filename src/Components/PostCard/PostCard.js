import React, { useEffect, useState } from 'react'
import "./PostCard.css"
import { BsPersonCircle } from "react-icons/bs"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import { RiDeleteBin6Line } from "react-icons/ri"
// firebase imports
import { collection, getDocs, query, where, doc, addDoc, setDoc, Timestamp, deleteDoc, writeBatch, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { deleteObject, getStorage, ref } from 'firebase/storage'


function PostCard({ userId, postId, postedBy, username, date, description, image, allowDelete }) {
    // show delete button
    const [showDel, setShowDel] = useState(false);
    function showDelBtn() {
        if (showDel) {
            setShowDel(false)
        } else {
            setShowDel(true)
        }
    }

    // MAIN FUNCTIONS //
    // 
    // 
    //



    // Check if Already Voted
    const [voted, setVoted] = useState("")
    useEffect(() => {
        async function checkUserVote() {
            const d = query
                (
                    collection(db, "votes"),
                    where("post_id", "==", postId),
                    where("voted_by", "==", userId),
                )
            const querySnapshot = await getDocs(d);

            if (querySnapshot.docs.length === 1) {
                setVoted(querySnapshot.docs.at(0).data().voted)
            }

        }
        checkUserVote();
    }, [voted])



    // Check No of Votes
    const [upvotes, setUpVoted] = useState(0)
    const [downvotes, setDownVoted] = useState(0)
    useEffect(() => {
        async function checkNoOfVotes() {
            // count up votes
            const upQuery = query
                (
                    collection(db, "votes"),
                    where("post_id", "==", postId),
                    where("voted", "==", "up"),
                )
            const querySnapshot = await getDocs(upQuery);
            setUpVoted(querySnapshot.docs.length);

            // count down votes
            const downQuery = query
                (
                    collection(db, "votes"),
                    where("post_id", "==", postId),
                    where("voted", "==", "down"),
                )
            const querySnapshot1 = await getDocs(downQuery);
            setDownVoted(querySnapshot1.docs.length);

        }
        checkNoOfVotes();
    }, [voted])



    // Add Or Remove Vote
    async function addOrRemoveVote(vote) {
        const d = query(collection(db, "votes"), where("voted_by", "==", userId), where("post_id", "==", postId))
        const querySnapshot = await getDocs(d);

        if (querySnapshot.docs.length === 1) {
            // update if already voted
            setVoted("")
            await setDoc(doc(db, "votes", querySnapshot.docs.at(0).id), {
                post_id: postId,
                posted_by: postedBy,
                voted_by: userId,
                voted: vote,
                date: Timestamp.now()
            });
        } else {
            // add vote
            setVoted(vote)
            await addDoc(collection(db, "votes"), {
                post_id: postId,
                posted_by: postedBy,
                voted_by: userId,
                voted: vote,
                date: Timestamp.now()
            });
        }
    }



    // Delete Post 
    const [postDeleted, setPostDeleted] = useState(false);
    async function deletePost() {
        try {
            setPostDeleted(true)// hide post

            // delete image if any
            const storage = getStorage();
            const querySnapshot2 = await getDoc(doc(db, "posts", postId));
            if (querySnapshot2.data().image !== "") {
                await deleteObject(ref(storage, querySnapshot2.data().image));
            }
            //delete post
            await deleteDoc(doc(db, "posts", postId))
            // delete post votes
            const batch = writeBatch(db)
            const d = query(collection(db, "votes"), where("post_id", "==", postId))
            const querySnapshot1 = await getDocs(d);
            if (querySnapshot1.docs.length > 0) {
                querySnapshot1.forEach(function (doc) {
                    batch.delete(doc.ref);
                });
                await batch.commit();
            }
        }
        catch (error) {
            console.log(error.code)
        }
    }




    return (
        <div className='postcard'>
            {postDeleted === false
                ?
                <>
                    <div className="postcard__header">
                        <h5><BsPersonCircle /></h5>

                        <span>
                            <h4>{username}</h4>
                            <small>{date}</small>
                        </span>

                        {/* shows delete option for personal posts */}
                        {
                            allowDelete === true &&
                            <h6>

                                <RiDeleteBin6Line
                                    onClick={showDelBtn}
                                />

                                <button
                                    className={showDel === true ? "postcard__headerDelBtnShow" : ""}
                                    onClick={deletePost}
                                >
                                    delete
                                </button>

                            </h6>
                        }

                    </div>

                    <p className="postcard__description">
                        {description}
                    </p>

                    {/* Shows image only if provided */}
                    {
                        image !== "" ?
                            <>
                                <div className="postcard__image">
                                    <img src={image} alt="" />
                                </div>
                            </>
                            :
                            ""
                    }

                    <div className="postcard__voteContainer">
                        {/* down vote */}
                        <div
                            className={
                                `postcard__vote postcard__vote--downvote 
                        ${voted === "down" && "postcard__voted--down"}`
                            }
                            onClick={() => { addOrRemoveVote("down") }}
                        >
                            <BiDownvote /><span>{downvotes}</span>
                        </div>

                        {/* up vote */}
                        <div
                            className={
                                `postcard__vote postcard__vote--upvote 
                        ${voted === "up" && "postcard__voted--up"}`
                            }
                            onClick={() => { addOrRemoveVote("up") }}
                        >
                            <BiUpvote /><span>{upvotes}</span>
                        </div>
                    </div>
                </>
                :
                ""
            }
        </div>
    )
}

export default PostCard