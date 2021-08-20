import axios from 'axios';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Fragment, useEffect, useState } from 'react';
import classes from "./Home.module.css";

const Home = () => {
    const [popularQuestions, setPopularQuestions] = useState(null);
    // const [hostelQuestions, setHostelQuestions] = useState(null);
    useEffect(() => {
        const fetchPopularQuestions = async () => {
            console.log("home");
            const { data } = await axios.get("/api/question/popular");
            //console.log(data);
            setPopularQuestions(data);
        }
        fetchPopularQuestions();
    }, [])

    // useEffect(() => {
    //     const fetchHostelQuestions = async () => {
    //         console.log("home");
    //         const { data } = await axios.get("/api/question/hostel");
    //         console.log(data);
    //         setHostelQuestions(data);
    //     }
    //     fetchHostelQuestions();
    // }, [])
    return <Fragment>
        <div>
            {popularQuestions && <h1>Popular Questions</h1>}
            {popularQuestions &&
                popularQuestions.map((popularQuestion) => (
                    <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                            <Tooltip id={`tooltip-top`}>Click to get Details</Tooltip>
                        }
                    >
                        <Link
                            to={`/questions/${popularQuestion._id}`}
                            className={classes.getDetails}
                        >
                            <div className="my-3">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <h5> {popularQuestion.title}</h5>
                                        </CardTitle>
                                        <p className="text-muted">
                                            {" "}
                        Posted by: {popularQuestion.author.username}
                                        </p>
                                        <p> Votes : {popularQuestion.voteCount}</p>
                                        <h5>{popularQuestion.text}</h5>
                                        <p> {popularQuestion.answers.length} Replies</p>
                                    </CardBody>
                                </Card>
                            </div>
                        </Link>
                    </OverlayTrigger>
                ))}
        </div>
    </Fragment>
}

export default Home;