import { gql } from 'graphql-tag'
// @ts-ignore
import { LocalScheme } from '~auth/runtime'

export const LOGIN_MUTATION = gql`
mutation LoginMutation($input: UsersPermissionsLoginInput!) {
  login(input: $input) {
    jwt
    user {
      id
      username
      email
      role {
        name
        type
      }
    }
  }
}
`
export const USER_DETAILS_QUERY = gql`
  query UserDetailsQuery {
    me {
      id
      username
      email
      role {
        id
        name
        description
        type
      }
    }
  }
`

export default class GraphQLScheme extends LocalScheme {
  // @ts-ignore
  async login (credentials, { reset = true } = {}) {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers
      // @ts-ignore
    } = this.$auth.ctx.app

    // Ditch any leftover local tokens before attempting to log in
    if (reset) {
      // @ts-ignore
      this.$auth.reset({ resetInterceptor: false })
    }
    // Make login request
    const response = await apolloClient
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials
      })
      // @ts-ignore
      .then(({ data }) => data && data.login)
    // Update our cookie token
    // @ts-ignore
    this.token.set(response.jwt)

    // Set our gql-token so subsequent gql request are authenticated
    await $apolloHelpers.onLogin(response.jwt)

    // Fetch user
    await this.fetchUser() // We will define this function next

    return response.token
  }

  fetchUser () {
    const {
      apolloProvider: { defaultClient: apolloClient }
      // @ts-ignore
    } = this.$auth.ctx.app

    // Token is required but not available
    // @ts-ignore
    if (!this.check().valid) {
      return
    }

    // Try to fetch user
    return apolloClient
      .query({
        query: USER_DETAILS_QUERY
      })
      // @ts-ignore
      .then(({ data }) => {
        if (!data.me) {
          const error = new Error('User Data response not resolved')
          return Promise.reject(error)
        }
        // Set the auth user
        // @ts-ignore
        this.$auth.setUser(data.me)

        return data.me
      })
      // @ts-ignore
      .catch((error) => {
        // @ts-ignore
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  // @ts-ignore
  async logout () {
    const {
      $apolloHelpers
      // @ts-ignore
    } = this.$auth.ctx.app

    // Reset regardless
    await $apolloHelpers.onLogout()
    // @ts-ignore
    return this.$auth.reset({ resetInterceptor: false })
  }

  initializeRequestInterceptor () {
    // Instead of initializing axios interceptors, Do nothing
    // Since we are not using axios
  }

  reset () {
    console.log('reset')
    // @ts-ignore
    this.$auth.setUser(false)
    // @ts-ignore
    this.token.reset()
  }
}
