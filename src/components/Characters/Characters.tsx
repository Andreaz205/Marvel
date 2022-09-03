import React, {FC, JSXElementConstructor, useCallback, useEffect, useRef, useState} from "react";
import useApi from "../../api/api";
import componentContent from "../../utils/utils";
import {EventType} from "@testing-library/react";
import './Characters.scss'

type PropsType = {

    getSelectedItem: (id:any) => void
    selectedId: any
}

const Characters:FC<PropsType> = (props) => {
    let [characters, setCharacters] = useState<any>([])
    let [offset, setOffset] = useState(509)
    let [newCharsPortion, setNewCharsPortion] = useState(false)
    let {getAllCharacters, process, setProcess} = useApi()

    useEffect(() => {
        getCharacters()
    },[])

    const getCharacters = useCallback(() => {
        setProcess('waiting')
        setNewCharsPortion(false)

        getAllCharacters()
            .then((res) => {
                setCharacters((characters: any) => [...characters, ...res.data.results])
            })
            .then(() => setProcess('loaded'))
    },[])

    const onLoadMoreBtn = () => {
        setNewCharsPortion(true)
        setOffset(offset + 9)

        getAllCharacters(offset)
            .then((res) => {
                setCharacters((characters: any) => [...characters, ...res.data.results])
                setNewCharsPortion(false)
            })
    }

    let refItems = useRef<any>([])

    let onFocus = (id: any) => {
        refItems.current.forEach((item:any) => {
            item.classList.remove('characters__item__active')
        })
        refItems.current.forEach((item:any) => item.classList.add('characters__item'))
        refItems.current[id].classList.add('characters__item__active')
        refItems.current[id].focus()
    }

    let handleKeyPress = (event:any) => {
        if (event.key === "Enter") {
            onFocus(event.currentTarget.dataset.number)
        }
    }

    const charactersArr = characters.map((item:any, i:any) => {
        return (
            <div
                tabIndex={0}
                data-number={i}
                ref={(element) => (refItems.current[i] = element)}
                onClick={() => {
                    props.getSelectedItem(item.id)
                    onFocus(i)
                }}
                onKeyPress={(e) => {
                    handleKeyPress(e)
                    props.getSelectedItem(item.id)
                }}
                className = {`${props.selectedId === item.id
                    ? 'characters__item__active'
                    : 'characters__item'
                }`}
                key={item.id}
            >
                <img
                    src={item.thumbnail.path + "." + item.thumbnail.extension}
                    alt={item.name}
                />
                <div className="characters__item__name">{item.name}</div>
            </div>
        )
    })

    return (
        <>
            {componentContent(process, <ViewCharacters
                    characters={charactersArr}
                    newCharsPortion={newCharsPortion}
                    onLoadMoreBtn={onLoadMoreBtn}
                    offset={offset}
                />)}
        </>
    )
}

type ViewCharactersPropsType = {
    characters: any
    onLoadMoreBtn: any
    newCharsPortion: any
    offset: any
}
const ViewCharacters:FC<ViewCharactersPropsType> = ({
    characters,
    onLoadMoreBtn,
    newCharsPortion,
    offset,
}) => {

    return (
        <div className="characters">
            <div className="characters__items">{characters}</div>
            <button
                style={{ display: `${offset > 1553 ? 'none' : 'block'}`}}
                disabled={newCharsPortion}
                onClick={onLoadMoreBtn}
            >
                LOAD MORE
            </button>
        </div>
    )
}

export default Characters