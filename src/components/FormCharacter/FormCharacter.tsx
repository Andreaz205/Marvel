import {useLocation} from "react-router-dom";
import {ComicsHeader} from "../Comics/Comics";

const FormCharacter = () => {
    const location:any = useLocation()
    const {charInfo} = location.state

    console.log(charInfo)

    return(
        <div className="container">
            <ComicsHeader />
            <div className="formCharter">
                <img
                    src={charInfo[0].thumbnail.path + '.' + charInfo[0].thumbnail.extension}
                    alt=""
                />
                <div className="formCharter__content">
                    <h2>{charInfo[0].name}</h2>
                    {!charInfo[0].description || charInfo[0].description === '' || charInfo[0].description ===' '
                    ? <div className='formCharter__descr'>No description for this charter</div>
                    : <div className='formCharter__descr'>{charInfo[0].description}</div>}
                </div>
            </div>
        </div>
    )
}

export default FormCharacter