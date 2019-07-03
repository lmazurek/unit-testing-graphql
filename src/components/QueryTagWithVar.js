import React from "react"
import gql from "graphql-tag"
import ApolloClient from "apollo-boost"
import { Query, ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
})

const GET_GUIDE = gql`
  query guide($id: ID!) {
    guide(id: $id) {
      id
      name
    }
  }
`

const QueryTagWithVar = () => (
  <Query query={GET_GUIDE} variables={{ id: 1 }}>
    {({ loading, error, data: { guide } }) => {
      if (loading) return "Loading…"
      if (error) return `Error! ${error.message}`
      return (
        <>
          <h4>Query tag with var</h4>
          <p>
            Guide id: {guide.id}, name: {guide.name}
          </p>
        </>
      )
    }}
  </Query>
)

const QueryTagWithVarExample = () => (
  <ApolloProvider client={client}>
    <QueryTagWithVar />
  </ApolloProvider>
)

export { QueryTagWithVar, GET_GUIDE }
export default QueryTagWithVarExample
