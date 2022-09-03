import Loading from '../components/Common/Loading/Loading'
import Error from '../components/Common/Error/Error'



const componentContent = (processName: any, component: any) => {
    switch (processName) {
        case 'waiting':
            return <Loading/>
        case 'loaded':
            return (
                component
            )
        case 'error':
            return <Error/>
        default:
            return <Error/>
    }
}

export default componentContent
