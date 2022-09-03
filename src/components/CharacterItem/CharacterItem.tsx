import React, {FC, useEffect, useState} from "react";
import useApi from "../../api/api";
import Loading from "../Common/Loading/Loading";
import Error from "../Common/Error/Error";
import ViewCharacterItem from "../Characters/ViewCharacterItem/ViewCharacterItem";

type CharacterItemProps = {
    selectedId: number
}

const CharacterItem:FC<CharacterItemProps> = ({selectedId}) => {

    let [character, setCharacter] = useState<any>(null)
    let {getCharacter, process} = useApi()



    useEffect(() => {
        if (selectedId) {
            getCharacter(selectedId)
                .then(character => {
                    setCharacter(character);
                })
        }
    },[selectedId])


    return (
        <>
            {process === 'loading' ? <Loading /> : null}
            {process === "error" ? <Error/> : null}
            {!(process === "loading") && !(process === "error") && character
                ? <ViewCharacterItem character={character} />
                : null
            }
        </>
    )
}

export default CharacterItem