import React from "react"
import gql from "graphql-tag"
import ApolloClient from "apollo-boost"
import { Query, ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
})

export const GET_GUIDES = gql`
  {
    guides {
      id
      name
    }
  }
`

const QueryComponent = () => (
  <Query query={GET_GUIDES}>
    {({ loading, error, data: { guides } }) => {
      if (loading) return "Loading…"
      if (error) return `Error! ${error.message}`
      return (
        <>
          <h4>Query tag</h4>
          {guides.map(({ name }) => name).join(", ")}
        </>
      )
    }}
  </Query>
)

const QueryTagExample = () => (
  <ApolloProvider client={client}>
    <QueryComponent />
  </ApolloProvider>
)

export { QueryComponent }
export default QueryTagExample
