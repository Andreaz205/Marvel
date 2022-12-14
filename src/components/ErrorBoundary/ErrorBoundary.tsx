import React from 'react'
import Error from '../Common/Error/Error'

type PropsType = {
    children?: React.ReactNode
}

class ErrorBoundary extends React.Component<PropsType, any, any> {
    constructor(props: PropsType) {
        // | Readonly<PropsType>
        super(props)
        this.state = {error: null, errorInfo: null}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>An Error Has Occured. Try again later</h2>
                    <Error/>
                </div>
            )
        }
        return this.props.children
    }
}export default ErrorBoundary