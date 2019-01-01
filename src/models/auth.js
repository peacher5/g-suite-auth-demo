import firebase from '../services/firebase'

const HOST_DOMAIN = 'ku.th'

export default {
  state: {
    user: null,
    authChecked: false,
    isAuthenticated: false,
    error: null
  },
  reducers: {
    setCredential(state, user = null) {
      return {
        ...state,
        user,
        authChecked: true,
        isAuthenticated: user !== null,
        error: null
      }
    },
    resetCredential(state) {
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    },
    setError(state, error) {
      return {
        ...state,
        authChecked: true,
        error
      }
    }
  },
  effects: {
    getAuthState() {
      firebase
        .auth()
        .getRedirectResult()
        .then(({ user, additionalUserInfo }) => {
          if (user) {
            if (additionalUserInfo.profile.hd === HOST_DOMAIN) {
              this.setCredential(user)
            } else {
              // In case user try to bypass hd checking
              this.signOut()
              this.setError({
                code: 'auth/not-ku-email',
                message: 'Please sign in with KU Google account.'
              })
            }
          } else {
            // Default auth state check
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
              unsubscribe()
              if (user) {
                this.setCredential(user)
              } else {
                this.setCredential()
              }
            })
          }
        })
        .catch(error => this.setError(error))
    },
    redirectToSignInPage() {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.setCustomParameters({
        hd: HOST_DOMAIN
      })
      firebase.auth().signInWithRedirect(provider)
    },
    signOut() {
      firebase.auth().signOut()
      this.resetCredential()
    }
  }
}
