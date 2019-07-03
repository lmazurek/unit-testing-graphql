import React from "react"
import gql from "graphql-tag"
import ApolloClient from "apollo-boost"
import { Query, Mutation, ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
})

const CREATE_GUIDE = gql`
  mutation createGuide($name: String) {
    createGuide(input: { data: { name: $name } }) {
      guide {
        id
        name
      }
    }
  }
`

export const GET_GUIDES = gql`
  {
    guides {
      id
      name
    }
  }
`

const MutationTag = ({ onSubmitCallback }) => {
  let input
  return (
    <Mutation
      mutation={CREATE_GUIDE}
      refetchQueries={[
        {
          query: GET_GUIDES
        }
      ]}
    >
      {(createGuide, { data }) => {
        if (data) return <p>Created!</p>
        return (
          <div>
            <form
              data-testid="form"
              onSubmit={e => {
                e.preventDefault()
                createGuide({ variables: { name: input.value } })
                input.value = ""
                onSubmitCallback();
              }}
            >
              <h4>Mutation</h4>
              <div>
                <input
                  ref={node => {
                    input = node
                  }}
                  data-testid="guide_name_input"
                />
                <button type="submit">Create guide</button>
              </div>
            </form>
          </div>
        )
      }}
    </Mutation>
  )
}

const Guide = ({ guide: { name, id } }) => {
  return (
    <span key={id}>
      <mark>
        {name} <button>&times;</button>
      </mark>
      ,{` `}
    </span>
  )
}

const GuidesList = () => (
  <Query query={GET_GUIDES}>
    {({ loading, error, data: { guides } }) => {
      if (loading) return "Loading…"
      if (error) return `Error! ${error.message}`
      return (
        <div data-testid="list">
          <h4>Query tag + delete mutation</h4>
          {guides.map(guide => (
            <Guide guide={guide} key={guide.id} />
          ))}
        </div>
      )
    }}
  </Query>
)

const MutationTagExample = () => (
  <ApolloProvider client={client}>
    <MutationTag onSubmitCallback={() => alert('foo')} />
    <GuidesList />
  </ApolloProvider>
)

export { CREATE_GUIDE, MutationTag }
export default MutationTagExample
