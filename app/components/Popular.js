import * as React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function LangaugesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  
  return (
    
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
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

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className= 'repo bg-light'>
            <h4 className= 'header-lg center-text'>
              #{index + 1}
            </h4>
            <img
            className= 'avatar'
            src={avatar_url}
            //backticks for Template literals
            alt={`Avatar for ${login}`}
            />
            <h2 className= 'center-text'>
              <a className= 'link' href={html_url}>{login}</a>
            </h2>
            <ul className= 'card-list'>              
              <li>
                <FaUser color= 'rgb(255, 191, 116)' size={22} />
                <a href ={`https:??github.com/${login}`}>
                  {login}
                  </a>
              </li>

              <li>
                <FaStar color= 'rgb(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
              </li>

              <li>
                <FaCodeBranch color= 'rgb(129, 195, 245)' size={22} />
                {forks.toLocaleString()} stars
                  {login}                  
              </li>

              <li>
                <FaExclamationTriangle color= 'rgb(241, 138, 147)' size={22} />
                {open_issues.toLocaleString()} open issues
              </li>

            </ul>
          </li>
        )
      })}
    </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      // If state of repos and error is null, it means that those items are loading
      //{} is for caching
      repos: {},
      error: null,
    }
    //set ownership of function to 'this'. It will be understood that this function 
        // is the second parameter in the deconstructed props as onLanguageUpdate
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }
  //componet lifecycle hook
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage (selectedLanguage) {
              //function is invoked onClick. It will update the language in state
          // and force a rerender
    this.setState({
      selectedLanguage,
      error: null,
    })

    // if selectedLanguage is false or undifened
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          //decontructed repos
          this.setState(({ repos }) => ({
            repos: {
              //spread to merge and not replace data in rpos
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch((error) => {
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }
  isLoading() {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }
  render() {
    //set value of variable that is called in the render component
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p className='cebter-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    )
  }
}