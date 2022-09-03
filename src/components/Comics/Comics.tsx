import AnimatePage from "../Common/AnimatePage/AnimatePage";
import componentContent from "../../utils/utils";
import {FC, useEffect, useRef, useState} from "react";
import useApi from "../../api/api";
import {Link} from "react-router-dom";
import avengersLogo from '../../assets/logo/avengers_logo.png';
import avengers from '../../assets/img/avengers.png';
import './Comics.scss'

const Comics = () => {

    const [comicsItems, setComicsItems] = useState<any>([])
    const [offset, setOffset] = useState(10008)
    const [newPortion, setNewPortion] = useState(false)
    const { getAllComics, process, setProcess } = useApi()
    const comicsRef = useRef<any>([])

    useEffect(() => {
        setProcess('waiting')
        getAllComics()
            .then(res => {
                console.log(res)
                setComicsItems((comicsItems:any) => [...comicsItems, ...res.data.results])
            })
            .then(() => setProcess('loaded'))

    }, [])

    const onLoadMoreClick = () => {
        setNewPortion(true)
        setOffset(offset+8)
        getAllComics(offset)
            .then(res => {
                setComicsItems((comicsItems: any) => [...comicsItems, ...res.data.results])
                setNewPortion(false)
            })
    }

    const onEnterItem = (i:any) => {
        comicsRef.current.forEach((el:any) => el.classList.remove('comics__item__active'))
        comicsRef.current[i].classList.add('comics__item__active')
        comicsRef.current[i].focus()
    }

    const onLeaveItem = (i:any) => {
        comicsRef.current.forEach((el:any) => el.classList.remove('comics__item__active'))
        comicsRef.current[i].classList.add('comics__item__active')//хз зачем непонятка
        comicsRef.current[i].blur()
    }

    const comicsList = comicsItems.map((item: any,i: any) => {
        const path = `/comics/${item.id}`

        return <Link
            to={path}
            ref={(element) => comicsRef.current.push(element)}
            onMouseEnter={() => onEnterItem(i)}
            onMouseLeave={() => onLeaveItem(i)}
            className='comics__item'
            key={i}
        >
            <img
                className='comics__item_img'
                src={item.thumbnail.path + '.' + item.thumbnail.extension}
                alt="item.title"
            />
            <div className="comics__item_title">
                {item.title}
            </div>
            <div className="comics__item_price">

                {item.prices[0].price}$
            </div>
        </Link>
    })

    return <AnimatePage>
        <div className='comics'>
            <div className='container'>
                <ComicsHeader/>
                {componentContent(process, <ViewComics comicsList={comicsList}/>)}
                <button
                    style={{ display: `${comicsItems.length < 8 ? 'none' : 'block'}` }}
                    disabled={newPortion}
                    onClick={onLoadMoreClick}
                >
                    LOAD MORE
                </button>
            </div>
        </div>
    </AnimatePage>
}

type ViewComicsPropsType = {
    comicsList:any
}

const ViewComics:FC<ViewComicsPropsType> = ({comicsList}) => {
    return <div className="comics__items">
        {comicsList}
    </div>
}

export const ComicsHeader = () => {
    return <div className='comics__header'>
        <img className='comics__header_avengers' src={avengers} alt="avengers"/>
        <div className='comics__header_title'>
            New comics every week!
            <br/>
            Stay  turned!
        </div>
        <img
            className='comics__header_avengers-logo'
            src={avengersLogo}
            alt="avengers logo"
        />
    </div>
}

export default Comics