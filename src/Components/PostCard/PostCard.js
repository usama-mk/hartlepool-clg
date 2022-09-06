import React, { useEffect, useState } from "react";
import "./PostCard.css";
import { BsPersonCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
// firebase imports
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    deleteDoc,
    writeBatch,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { deleteObject, getStorage, ref } from "firebase/storage";

function PostCard({
    userId,
    postId,
    postedBy,
    username,
    date,
    description,
    image,
    allowDelete,
}) {
    // show delete button
    const [showDel, setShowDel] = useState(false);
    function showDelBtn() {
        if (showDel) {
            setShowDel(false);
        } else {
            setShowDel(true);
        }
    }

    // MAIN FUNCTIONS //
    //
    //
    //



    // Delete Post
    const [postDeleted, setPostDeleted] = useState(false);
    async function deletePost() {
        try {
            setPostDeleted(true); // hide post

            // delete image if any
            const storage = getStorage();
            const querySnapshot2 = await getDoc(doc(db, "posts", postId));
            if (querySnapshot2.data().image !== "") {
                await deleteObject(ref(storage, querySnapshot2.data().image));
            }
            //delete post
            await deleteDoc(doc(db, "posts", postId));
            // delete post votes
            const batch = writeBatch(db);
            const d = query(collection(db, "votes"), where("post_id", "==", postId));
            const querySnapshot1 = await getDocs(d);
            if (querySnapshot1.docs.length > 0) {
                querySnapshot1.forEach(function (doc) {
                    batch.delete(doc.ref);
                });
                await batch.commit();
            }
        } catch (error) {
            console.log(error.code);
        }
    }





    return (
        <div className="postcard">
            {postDeleted === false ? (
                <>
                    <div className="postcard__header">
                        <h5>
                            <BsPersonCircle />
                        </h5>

                        <span>
                            <h4>{username}</h4>
                            <small>{date}</small>
                        </span>

                        {/* shows delete option for personal posts */}
                        {allowDelete === true && (
                            <h6>
                                <RiDeleteBin6Line onClick={showDelBtn} />

                                <button
                                    className={
                                        showDel === true ? "postcard__headerDelBtnShow" : ""
                                    }
                                    onClick={deletePost}
                                >
                                    delete
                                </button>
                            </h6>
                        )}
                    </div>

                    <p className="postcard__description">{description}</p>

                    {/* Shows image only if provided */}
                    {image !== "" ? (
                        <>
                            <div className="postcard__image">
                                <img src={image} alt="" />
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                </>
            ) : (
                ""
            )}
        </div>
    );
}

export default PostCard;
