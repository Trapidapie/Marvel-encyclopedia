import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    // static getDerivedStateFromError(error) {
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo) {
        console.log(errorInfo, error);
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <>            
                    <ErrorMessage />
                    <div className="">try to reset</div>
                </>

            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;