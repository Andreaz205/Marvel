import useHttp from "../hooks/useHttp";

const useApi = () => {
    let {request, clearError, process, setProcess} = useHttp()

    const _baseURL = `https://gateway.marvel.com:443/v1/public/characters`
    const _apiKey = 'apikey=34f1a3219ea2ae0e4d07e8edc8e23bf5'

    const getAllCharacters = async (offset:any = 500) => {
        let res = await request(`${_baseURL}?limit=9&offset=${offset}&${_apiKey}`)

        return res

    }
    const getCharacter = async (id:any) => {
        let res = await request(`${_baseURL}/${id}?limit=9&offset=500&${_apiKey}`)
        return _transformData(res)
    }




    const getAllComics = async (offset=10000) => {
        let res = await request(`https://gateway.marvel.com:443/v1/public/comics?orderBy=-issueNumber&limit=8&offset=${offset}&apikey=34f1a3219ea2ae0e4d07e8edc8e23bf5`)
        return res
    }
    const getComicsItem = async (id:any) => {
        let res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=34f1a3219ea2ae0e4d07e8edc8e23bf5`)
        return _transformComicsItemObj(res)
    }

    const getCharacterByName = async (name:any) => {
        let res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=34f1a3219ea2ae0e4d07e8edc8e23bf5`)
        return res.data.results
    }

    const _transformData = (response:any) => {
        return {
            id: response.data.results[0].id,
            name: response.data.results[0].name,
            description: response.data.results[0].description,
            modified: response.data.results[0].modified,
            thumbnail: response.data.results[0].thumbnail,
            wiki: response.data.results[0].wiki,
            comics: response.data.results[0].comics,
        }
    }

    const _transformComicsItemObj = (response:any) => {
        return {
            id: response.data.results[0].id,
            title: response.data.results[0].title,
            description: response.data.results[0].description,
            price: response.data.results[0].price,
            pageCount: response.data.results[0].pageCount,
            thumbnail: response.data.results[0].thumbnail,
            language: response.data.results[0].language,
        }
    }

    return {getAllCharacters, getCharacter, getAllComics, getComicsItem, getCharacterByName, clearError, process, setProcess}
}

export default useApi