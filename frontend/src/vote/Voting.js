import { useState, useEffect } from "react";
import ApiClass from "../db/ApiClass";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";

const Voting = ({id, votes}) => {
    const [voting, setVoiting] = useState(votes);

    const trigerVote = async directaion =>{
        const votes = await ApiClass.votingPost(id, directaion);
        setVoiting(votes);
    }

    const up = () =>{ trigerVote('up') }
    const down = () =>{ trigerVote('down') }
    
    return (
            <>
                <a onClick={down} className="processRef"><IoMdThumbsDown /></a>
                <a onClick={up} className="processRef"><IoMdThumbsUp /></a>
                <a className="processRef">{voting} voutes</a>
            </>
        );
}

export default Voting;