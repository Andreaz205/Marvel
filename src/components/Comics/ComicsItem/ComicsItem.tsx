import './ComicsItem.scss'
import parse from 'html-react-parser'
import {Link, useParams} from "react-router-dom";
import useApi from "../../../api/api";
import {useEffect, useState} from "react";
import AnimatePage from "../../Common/AnimatePage/AnimatePage";
import {ComicsHeader} from "../Comics";

const ComicsItem = () => {

    const params = useParams()

    const {getComicsItem} = useApi()

    const [item, setItem] = useState<any>({})

    useEffect(() => {


        if (params.id) {

            getComicsItem(params.id)

                .then(res => {
                    console.log(res)
                    setItem(res)
                })
        }
    }, [])

    return <AnimatePage>
        <div className="comicsItem">
            <div className="container">
                <ComicsHeader/>
                <div className="comicsItem__content">
                    {!!item.thumbnail &&
                        <img
                                className='comicsItem__content_img'
                                src={item.thumbnail.path + '.' + item.thumbnail.extension}
                                alt={item.title}
                        />
                    }
                    <div className="comicsItem__content_info">
                        <h2 className='comicsItem__content_info_name'>{item.title}</h2>
                        {item.description ?
                            parse(`<div class='comicsItem__content_info_descr'>${item.description}</div>`) : 'No info for this comic'
                        }
                        {item.pageCount ?
                            <div className='comicsItem__content_info_pageCount'>${item.pageCount} pages</div>
                            : null
                        }
                        {item.language ?
                            <div className='comicsItem__content_info_language'>${item.language}</div>
                            : null
                        }
                        {item.price ?
                            <div className='comicsItem__content_info_price'>${item.price}</div>
                            : null
                        }
                    </div>
                    <Link to='/comics'>Back to all</Link>
                </div>
            </div>
        </div>
    </AnimatePage>
}

export default ComicsItem