import React from 'react'
import ReactDOM from 'react-dom' // React can be used on many platforms like mobile, or xbox
                                // we use react-dom to render to the DOM/Browser
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'

// Component
// State
// Lifecycle
// UI

class App extends React.Component{
    render(){
        return (
        <div className='container'>
           <Battle />
        </div>
        )
    }
}

ReactDOM.render(
    // Takes two arguments
    // React Element,
    <App />,
    // Where to render to the Element to
    document.getElementById('app')
)