import {Component} from 'react'
import {v4} from 'uuid'
import Passwords from '../Passwords'

import './index.css'

const initialBackGroundColors = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPassword: false,
  }

  onClickShowPasswordCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  changeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  changePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  deletePasswordItem = id => {
    const {passwordsList} = this.state

    const filteredList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordsList: filteredList})
  }

  submitDetails = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialClassName = `initial-container ${
      initialBackGroundColors[
        Math.ceil(Math.random() * initialBackGroundColors.length - 1)
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassNameColor: initialClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  getFilteredList = () => {
    const {passwordsList, searchInput} = this.state

    return passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      showPassword,
      passwordsList,
    } = this.state

    const filteredList = this.getFilteredList()
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="input-types">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="small-password-manager"
          />
          <form className="input-passwords" onSubmit={this.submitDetails}>
            <h1 className="add-password">Add New Password</h1>
            <div className="website-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-images"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="inputs"
                value={websiteInput}
                onChange={this.changeWebsite}
              />
            </div>
            <div className="website-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-images"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="inputs"
                value={usernameInput}
                onChange={this.changeUsername}
              />
            </div>
            <div className="website-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-images"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="inputs"
                value={passwordInput}
                onChange={this.changePassword}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="large-password-manager"
          />
        </div>
        <div className="my-passwords">
          <div className="passwords-search">
            <div className="passwords-count">
              <h1 className="password">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-main-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                placeholder="search"
                className="search-input-container"
                value={searchInput}
                onChange={this.changeSearchInput}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-passwords">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              checked={showPassword}
              onChange={this.onClickShowPasswordCheckbox}
            />
            <label htmlFor="checkbox" className="show-password">
              Show Passwords
            </label>
          </div>
          <ul className="passwords-created-list-container">
            {filteredList.length !== 0 ? (
              filteredList.map(eachPassword => (
                <Passwords
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePasswordItem={this.deletePasswordItem}
                  showPasswordStatus={showPassword}
                />
              ))
            ) : (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                  className="password-manager-image"
                />
                <p className="no-password-heading">No Passwords</p>
              </>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
