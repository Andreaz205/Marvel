import {FC} from "react";
import './WikiButton.scss'

type PropsType = {
    wiki: any
}

const WikiButton:FC<PropsType> = ({wiki}) => {
    return (
        <>
            <a
                href={wiki}
                className="wiki__btn"
                style={{background: 'grey'}}
            >
                <span>WIKI</span>
            </a>
        </>
    )
}

export default WikiButton
