import {FC, useEffect, useState} from "react";
import tools from '../../assets/img/tools.png';
import useApi from "../../api/api";
import './RandomChar.scss';
import componentContent from "../../utils/utils";
import HomePageBtn from "../Common/HomePageBtn/HomePageBtn";
import WikiButton from "../Common/WikiButton/WikiButton";
import BgAsset from "../../assets/img/bg-asset.png";


const RandomCharacter = () => {
    let [character, setCharacter] = useState({})
    let {getCharacter, clearError, process, setProcess} = useApi()

    useEffect(() => {
        getRandomChar()
    }, [])

    const getRandomChar = () => {
        clearError()
        setProcess('waiting')
        const randomId = Math.floor(Math.random() * (1011400 - 1011000 + 1)) + 1011000
        getCharacter(randomId)
            .then(character => {
                setCharacter(character)
            })
            .then(() => setProcess('loaded'))
    }

    return (
        <div className='random__character'>
            <div className='container'>
                <div className='container__content'>
                    <div className='random__character__content'>
                        {componentContent(process, <View character={character}/>)}
                    </div>
                    <div className='random__info'>
                        <div className='random__info__content'>
                            <p>
                                Random character for today!
                                <br/>
                                Do you want to get to know him better?
                            </p>
                            <p>Or choose another one</p>
                            <a
                                onClick={getRandomChar}
                                href="#"
                                style={{background: '#9F0013'}}
                            >
                                TRY IT
                            </a>
                            <img
                                src={tools}
                                alt="tool"
                                className='random__info__content__img'
                            />
                            <div className='bg-img'>
                                <img src={BgAsset}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

type ViewPropsType = {
    character: any
}

const View:FC<ViewPropsType> = ({character}) => {
    let {name, description, thumbnail, wiki} = character

    try {
        if (description.length > 200) {
            let sliced = description.slice(0, 100) + '...'
            description = sliced
        } else if (description === '') {
            description = 'No information about this character. Please, click the "WIKI" button to get information'
        }
    } catch (e) {
        console.log(e)
    }

    console.log(`${thumbnail.path}.${thumbnail.extension}`)
    
    return <>

        <div className='random__character'>
            <div className='container'>
                <div className="container__content">
                    <div className="random__character__content__info">
                        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="Random Character"/>
                    </div>
                    <div className="random__character__content__descr">
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <div className="random__character__content__descr__btns">
                            <HomePageBtn />
                            <WikiButton wiki={wiki} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default RandomCharacter