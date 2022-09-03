import '../../App.scss'

import Characters from "../Characters/Characters";
import CharacterItem from "../CharacterItem/CharacterItem";
import {FC} from "react";
import AnimatePage from "../Common/AnimatePage/AnimatePage";
import RandomCharacter from "../RandomChar/RandomChar";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import NotSelected from "../NotSelected/NotSelected";
import BgAsset from '../../assets/img/bg-asset.png'
import './CharactersBlock.scss'

type CharactersBlockPropsType = {
    getSelectedItem: (item: any) => void
    selectedId: any
}

const CharactersBlock:FC<CharactersBlockPropsType> = ({getSelectedItem, selectedId}) => {
    return(
        <AnimatePage>
            <RandomCharacter />
            <div className="charactersBlock">
                <div className="container">
                    <div className="charactersBlock__content">
                        <ErrorBoundary>
                            <Characters getSelectedItem={getSelectedItem} selectedId={selectedId}/>
                        </ErrorBoundary>

                        {!selectedId
                            ? <NotSelected/>
                            : <ErrorBoundary>
                                <CharacterItem selectedId={selectedId}/>
                            </ErrorBoundary>
                        }
                    </div>
                </div>
            </div>
        </AnimatePage>

    )
}
export default CharactersBlock