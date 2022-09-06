import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { selectUser } from "../../features/userSlice";
import "./HelpPage.css";

const HelpPage = () => {
    const user = useSelector(selectUser);
    const userName = user.name;
    const userId = user.uid;

    const [q1, setQ1] = useState(null);
    const [q2, setQ2] = useState(null);
    const [q3, setQ3] = useState(null);
    const [q4, setQ4] = useState(null);
    const [q5, setQ5] = useState(null);
    const [q6, setQ6] = useState(null);

    const clearOthers = (current) => {
        switch (current) {
            case 1:
                setQ2(null);
                setQ3(null);
                setQ4(null);
                setQ5(null);
                setQ6(null);
                break;
            case 2:
                setQ3(null);
                setQ4(null);
                setQ5(null);
                setQ6(null);
                break;
            case 3:
                setQ4(null);
                setQ5(null);
                setQ6(null);
                break;
            case 4:
                setQ5(null);
                setQ6(null);
                break;
            case 5:
                setQ6(null);
                break;
            default:
                break;
        }
    }

    return (
        <div className="HelpPage">
            <Navbar activePage={"help"} />

            {/* Q1 */}
            <h4>
                1. Do you have a concern?
                <div className="answers">
                    <div className="answer--group">
                        <label htmlFor="q1_y">Yes </label>
                        <input
                            type="radio"
                            name="q1"
                            id="q1_y"
                            value={"yes"}
                            onChange={(e) => {
                                clearOthers(1);
                                setQ1(e.target.value);
                            }}
                        />
                    </div>
                    <div className="answer--group">
                        <label htmlFor="q1_n">No </label>
                        <input
                            type="radio"
                            name="q1"
                            id="q1_n"
                            value={"no"}
                            onChange={(e) => setQ1(e.target.value)}
                        />
                    </div>
                </div>
                {q1 === "yes" ? (
                    <div className="options">
                        <h6>a) Travelling to college – (WARM info interactive PDF link)</h6>
                        <h6>
                            b) Unsure as to whether you can claim bursary (travel/lunch money)
                            (WARM info as above)
                        </h6>
                        <h6> c) Family concerns → (WARM info as above))</h6>
                    </div>
                ) : (
                    ""
                )}
            </h4>

            <br />

            {/* Q2 */}
            {
                (q1 === "no") === true &&
                <>
                    <h4>
                        2.	What emotion have you felt today?
                        <div className="answers">
                            <div className="answer--group">
                                <label htmlFor="q2_h">Happy </label>
                                <input
                                    type="radio"
                                    name="q2"
                                    id="q2_h"
                                    value={"happy"}
                                    onChange={(e) => setQ2(e.target.value)}
                                />
                            </div>
                            <div className="answer--group">
                                <label htmlFor="q2_s">Sad </label>
                                <input
                                    type="radio"
                                    name="q2"
                                    id="q2_s"
                                    value={"sad"}
                                    onChange={(e) => {
                                        clearOthers(2);
                                        setQ2(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="answer--group">
                                <label htmlFor="q2_a">Anxious </label>
                                <input
                                    type="radio"
                                    name="q2"
                                    id="q2_a"
                                    value={"anxious"}
                                    onChange={(e) => {
                                        clearOthers(2);
                                        setQ2(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        {q2 === "sad" || q2 === "anxious" ? (
                            <div className="options">
                                <h6>click on the link: <br />
                                    <a href="https://togetherall.com/en-gb/" target={"blank"}>
                                        togetherall
                                    </a>
                                </h6>
                            </div>
                        ) : (
                            ""
                        )}
                    </h4>
                </>
            }

            <br />

            {/* Q3 */}
            {
                (q1 === "no" && q2 === "happy") === true &&
                <>
                    <h4>
                        3.	Would you like to talk privately with a WARM about how you’re feeling or something on your mind?
                        <div className="answers">
                            <div className="answers">
                                <div className="answer--group">
                                    <label htmlFor="q3_y">Yes </label>
                                    <input
                                        type="radio"
                                        name="q3"
                                        id="q3_y"
                                        value={"yes"}
                                        onChange={(e) => {
                                            clearOthers(3);
                                            setQ3(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="answer--group">
                                    <label htmlFor="q3_n">No </label>
                                    <input
                                        type="radio"
                                        name="q3"
                                        id="q3_n"
                                        value={"no"}
                                        onChange={(e) => setQ3(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {q3 === "yes" ? (
                            <div className="options">
                                <h6>Email: needtotalk@hartlepoolfe.ac.uk</h6>
                            </div>
                        ) : (
                            ""
                        )}
                    </h4>
                </>
            }

            <br />

            {/* Q4 */}
            {
                (q1 === "no" && q2 === "happy" && q3 === "no") === true &&
                <>
                    <h4>
                        4.	Do you ever feel that something or a situation just does not feel right, and you want to report it, however, too frightened to?
                        <div className="answers">
                            <div className="answers">
                                <div className="answer--group">
                                    <label htmlFor="q4_y">Yes </label>
                                    <input
                                        type="radio"
                                        name="q4"
                                        id="q4_y"
                                        value={"yes"}
                                        onChange={(e) => {
                                            clearOthers(4);
                                            setQ4(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="answer--group">
                                    <label htmlFor="q4_n">No </label>
                                    <input
                                        type="radio"
                                        name="q4"
                                        id="q4_n"
                                        value={"no"}
                                        onChange={(e) => setQ4(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        {q4 === "yes" ? (
                            <div className="options">
                                <h6>Use the below link to Report anonymously: <br />
                                    <a href="hartlepoolfe.ac.uk" target={"blank"}>
                                        Report + Support - Hartlepool College of Further Education
                                    </a>
                                </h6>
                            </div>
                        ) : (
                            ""
                        )}
                    </h4>
                </>
            }

            <br />

            {/* Q5 */}
            {
                (q1 === "no" && q2 === "happy" && q3 === "no" && q4 === "no") === true &&
                <>
                    <h4>
                        5.	Do you know your way around College and know where all your classrooms, welfare and student support are?
                        <div className="answers">
                            <div className="answers">
                                <div className="answer--group">
                                    <label htmlFor="q5_y">Yes </label>
                                    <input
                                        type="radio"
                                        name="q5"
                                        id="q5_y"
                                        value={"yes"}
                                        onChange={(e) => setQ5(e.target.value)}
                                    />
                                </div>
                                <div className="answer--group">
                                    <label htmlFor="q5_n">No </label>
                                    <input
                                        type="radio"
                                        name="q5"
                                        id="q5_n"
                                        value={"no"}
                                        onChange={(e) => {
                                            clearOthers(5);
                                            setQ5(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {q5 === "no" ? (
                            <div className="options">
                                <h6>click on the link: <br />
                                    <a href="hartlepoolfe.ac.uk" target={"blank"}>
                                        a map of the college
                                    </a>
                                </h6>
                            </div>
                        ) : (
                            ""
                        )}
                    </h4>
                </>
            }

            <br />

            {/* Q6 */}
            {
                (q1 === "no" && q2 === "happy" && q3 === "no" && q4 === "no" && q5 === "yes") === true &&
                <>
                    <h4>
                        6.	Do you feel in Crisis at any time?
                        <div className="answers">
                            <div className="answers">
                                <div className="answer--group">
                                    <label htmlFor="q6_y">Yes </label>
                                    <input
                                        type="radio"
                                        name="q6"
                                        id="q6_y"
                                        value={"yes"}
                                        onChange={(e) => setQ6(e.target.value)}
                                    />
                                </div>
                                <div className="answer--group">
                                    <label htmlFor="q6_n">No </label>
                                    <input
                                        type="radio"
                                        name="q6"
                                        id="q6_n"
                                        value={"no"}
                                        onChange={(e) => setQ6(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {q6 === "yes" ? (
                            <div className="options">
                                <h6>Contact crisis team: 0300 0132000</h6>
                                <h6>Do you feel low in mood – click on the below link Now:
                                    <a href="https://togetherall.com/en-gb/" target={"blank"}>
                                        togetherall
                                    </a>
                                </h6>
                            </div>
                        ) : (
                            ""
                        )}

                        {q6 === "no" ? (
                            <div className="options">
                                <h6>Thank you for completing the questions</h6>
                            </div>
                        ) : (
                            ""
                        )}
                    </h4>
                </>
            }

        </div>
    );
};

export default HelpPage;
