import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import classes from "./Home.module.css";

const Home = () => {
  const [popularQuestions, setPopularQuestions] = useState(null);
  const [hostelQuestions, setHostelQuestions] = useState(null);
  const [departmentQuestions, setDepartmentQuestions] = useState(null);
  const [hostel, setHostel] = useState(null);
  const [department, setDepartment] = useState(null);
  useEffect(() => {
    const fetchPopularQuestions = async () => {
      const { data } = await axios.get("/api/question/popular");
      setPopularQuestions(data);
    };
    fetchPopularQuestions();
  }, []);

  useEffect(() => {
    const fetchHostelQuestions = async () => {
      const { data } = await axios.get("/api/question/hostel");
      setHostel(data.hostel);
      if (data.questions?.length > 0) {
        setHostelQuestions(data.questions);
      } else {
        setHostelQuestions(null);
      }
    };
    fetchHostelQuestions();
  }, []);

  useEffect(() => {
    const fetchDepartmentQuestions = async () => {
      const { data } = await axios.get("/api/question/department");
      setDepartment(data.department);
      if (data.questions?.length > 0) {
        setDepartmentQuestions(data.questions);
      } else {
        setDepartmentQuestions(null);
      }
    };
    fetchDepartmentQuestions();
  }, []);
  return (
    <Fragment>
      <div className="container-fluid background">
        <div className="row">
          <div className="col-md-4">
            {hostelQuestions && <h1> {hostel} Questions</h1>}
            {hostelQuestions &&
              hostelQuestions.map((hostelQuestion) => (
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-top`}>Click to get Details</Tooltip>
                  }
                >
                  <Link
                    to={`/questions/${hostelQuestion._id}`}
                    className={classes.getDetails}
                  >
                    <div className="my-3">
                      <Card>
                        <CardBody>
                          <CardTitle>
                            <h5> {hostelQuestion.title}</h5>
                          </CardTitle>
                          <p className="text-muted">
                            {" "}
                            Posted by: {hostelQuestion.author.username}
                          </p>
                          <p> Votes : {hostelQuestion.voteCount}</p>
                          <h5>{hostelQuestion.text}</h5>
                          <p> {hostelQuestion.answers.length} Replies</p>
                        </CardBody>
                      </Card>
                    </div>
                  </Link>
                </OverlayTrigger>
              ))}
          </div>

          <div className="col-md-4">
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

          <div className="col-md-4">
            {departmentQuestions && <h1> {department} Questions</h1>}
            {departmentQuestions &&
              departmentQuestions.map((departmentQuestion) => (
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-top`}>Click to get Details</Tooltip>
                  }
                >
                  <Link
                    to={`/questions/${departmentQuestion._id}`}
                    className={classes.getDetails}
                  >
                    <div className="my-3">
                      <Card>
                        <CardBody>
                          <CardTitle>
                            <h5> {departmentQuestion.title}</h5>
                          </CardTitle>
                          <p className="text-muted">
                            {" "}
                            Posted by: {departmentQuestion.author.username}
                          </p>
                          <p> Votes : {departmentQuestion.voteCount}</p>
                          <h5>{departmentQuestion.text}</h5>
                          <p> {departmentQuestion.answers.length} Replies</p>
                        </CardBody>
                      </Card>
                    </div>
                  </Link>
                </OverlayTrigger>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
