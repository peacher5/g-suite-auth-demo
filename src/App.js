import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button, Heading, Pane, toaster, Spinner } from 'evergreen-ui'

import Profile from './components/Profile'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #234361;
  justify-content: center;
  align-items: center;
`

const DemoPane = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 268px;
  background-color: white;
  margin-bottom: 80px;
  padding: 30px;
  box-sizing: border-box;

  @media only screen and (max-width: 380px) {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
`

const Line = styled.div`
  width: 100%;
  border: 0.5px solid #e3e8ed;
  margin-top: 12px;
`

class App extends Component {
  state = {
    isLoggingin: false
  }

  signIn = () => {
    this.setState({
      isLoggingin: true
    })
    this.props.redirectToSignInPage()
  }

  signOut = () => {
    this.props.signOut()
    toaster.success('Sign out successfully.')
  }

  componentDidMount() {
    this.props.getAuthState()
  }

  componentDidUpdate() {
    const { authChecked, error } = this.props
    if (!this.state.isLoggingin && authChecked && error && error.code === 'auth/not-ku-email') {
      toaster.danger(error.message)
    }
  }

  render() {
    const { authChecked, isAuthenticated, user } = this.props
    let content
    if (authChecked) {
      if (isAuthenticated) {
        content = (
          <Fragment>
            <Profile user={user} width="100%" maxWidth={256} marginX="auto" />
            <Button iconBefore="log-out" marginTop={40} onClick={this.signOut}>
              Sign out
            </Button>
          </Fragment>
        )
      } else {
        const { isLoggingin } = this.state
        content = (
          <Button iconBefore="log-in" disabled={isLoggingin} onClick={this.signIn}>
            {isLoggingin ? 'Redirecting...' : 'Sign in with Google'}
          </Button>
        )
      }
    } else {
      content = <Spinner />
    }

    return (
      <Wrapper>
        <DemoPane>
          <Heading size={600} textAlign="center">
            KU Google Sign-In
          </Heading>
          <Heading size={100} textAlign="center" marginTop={4}>
            Demo
          </Heading>
          <Line />
          <Pane display="flex" flexDirection="column" alignItems="center" marginTop={30}>
            {content}
          </Pane>
        </DemoPane>
      </Wrapper>
    )
  }
}

const mapState = ({ auth }) => ({ ...auth })

const mapDispatch = ({ auth }) => {
  const { getAuthState, redirectToSignInPage, signOut } = auth
  return { getAuthState, redirectToSignInPage, signOut }
}

export default connect(
  mapState,
  mapDispatch
)(App)
