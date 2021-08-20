import React, { useState, useEffect, useContext } from 'react';

const AllAnswerReplies = ({
    children
}) => {
    const [visibleReplies, setVisibleReplies] = useState(children.slice(0, 3))
    const [difference, setDifference] = useState(null)

    useEffect(() => {
        setVisibleReplies(children.slice(0, 3))
    }, [children])

    useEffect(() => {
        setDifference(children.length - visibleReplies.length)
    }, [visibleReplies])


    return (
        <div >
            {visibleReplies}

            {difference > 0 ? (
                <a
                    onClick={() => setVisibleReplies(children)}
                >
                    show <b>{difference}</b> more replies
                </a>
            ) : (
                <a
                    onClick={() => setVisibleReplies(children.slice(0, 3))}
                >
                    Hide replies
                </a>
            )}
        </div>
    )
}

export default AllAnswerReplies;