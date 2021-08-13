import React, { useEffect, useState, Fragment } from 'react'
import classes from './QuestionDetail.module.css';
import axios from 'axios';

const QuestionDetail = (props) => {
    //const [question, setQuestion] = useState(null);
    const [answerSortType, setAnswersSortType] = useState('Oldest');
    const question = {
        author: "Parth",
        title: "Random Question",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod lobortis blandit. Sed varius sed urna in ornare. Praesent hendrerit metus ac convallis porttitor. Vivamus vestibulum tempor lorem, vehicula porttitor arcu facilisis mollis. Nullam lacinia eros eget lacus vestibulum, eget accumsan massa interdum. Ut sed odio nec odio interdum luctus id eu ligula. Vivamus viverra dolor sed felis efficitur vulputate. Phasellus mollis tincidunt nisi. Proin sed libero ut felis tempor condimentum nec et elit. Phasellus vehicula massa mauris, sed dictum mi semper id. Suspendisse potenti. Donec cursus, nisl in elementum euismod, ipsum ligula consectetur arcu, vel eleifend arcu neque et lacus. Aenean blandit vulputate erat vel rutrum. Praesent aliquet accumsan ipsum ut bibendum. Sed egestas lorem vitae eros laoreet pellentesque.",
        tags: ["Chutiya", "Parth"],
        answers: [{
            author: "Shalin",
            text: "Oldest Answer",
            voteCount: 6,
            postedOn: 8 - 10 - 2000
        },
        {
            author: "Tanu",
            text: "Most voted answer2",
            voteCount: 116,
            postedOn: 9 - 10 - 2016
        },
        {
            author: "Shalin2",
            text: "Newest ANswer2",
            voteCount: 16,
            postedOn: 9 - 10 - 2021
        }],
        voteCount: 5

    }
    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await axios.get(`/api/question/61164591a63e62203a907834`);
            //setQuestion(data)
            console.log(data);
        }

        fetchQuestion();


    }, [])
    const sortByNewest = () => {
        setAnswersSortType('Newest');
    }
    const sortByOldest = () => {
        setAnswersSortType('Oldest');
    }
    const sortByVotes = () => {
        setAnswersSortType('Votes');
    }
    const answerSorting = () => {
        switch (answerSortType) {
            case 'Votes':
                return (a, b) => b.voteCount - a.voteCount
            case 'Newest':
                return (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
            case 'Oldest':
                return (a, b) => new Date(a.postedOn) - new Date(b.postedOn)
            default:
                break
        }
    }
    return <Fragment>
        {!question && <p>Loading ...</p>}
        {question &&

            (<div>
                <h1> {question.title} </h1>
                {question.author}
                <p> {question.text}</p>
                {question.tags.map((tag) => {
                    <h2> {tag}</h2>
                })}
            </div>)}
        {
            <div>
                <h1> Sort Answers by</h1>
                <button onClick={sortByOldest}> Oldest</button>
                <button onClick={sortByNewest}> Newest</button>
                <button onClick={sortByVotes}> Most Voted</button>
            </div>
        }
        {question && question.answers.length && (question.answers.sort(answerSorting()).map((answer) => (
            <div>
                <h1> {answer.author}</h1>
                <p>{answer.text}</p>
                <h2> {answer.voteCount}</h2>
            </div>
        ))

        )}




    </Fragment>;
}

export default QuestionDetail;