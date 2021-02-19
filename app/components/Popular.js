import React from 'react'
import PropTypes from 'prop-types'

// functional componets, deconstructed props
function LangaugesNav ({ selected, onUpdateLanguage }) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className='flex-center'>
          {languages.map((language) => (
            <li key={language}>
              <button
                className='btn-clear nav-link'
                style={language === selected ? { color: 'tomato' } : null}
                onClick={() => onUpdateLanguage(language)}>
                {language}
              </button>
            </li>
          ))}
        </ul>
      )
    }
    
    LangaugesNav.propTypes = {
      selected: PropTypes.string.isRequired,
      onUpdateLanguage: PropTypes.func.isRequired
    }
    
    export default class Popular extends React.Component {
      constructor(props) {
        super(props)
    
        this.state = {
          selectedLanguage: 'All'
        }
        //set ownership of function to 'this'. It will be understood that this function 
        // is the second parameter in the deconstructed props as onLanguageUpdate
        this.updateLanguage = this.updateLanguage.bind(this)
      }
      updateLanguage (selectedLanguage) {
          //function is invoked onClick. It will update the language in state
          // and force a rerender
        this.setState({
          selectedLanguage
        })
      }
      render() {
          //set value of variable that is called in the render component
        const { selectedLanguage } = this.state
    
        return (
          <React.Fragment>
            <LangaugesNav
              selected={selectedLanguage}
              onUpdateLanguage={this.updateLanguage}
            />
          </React.Fragment>
        )
      }
    }

    