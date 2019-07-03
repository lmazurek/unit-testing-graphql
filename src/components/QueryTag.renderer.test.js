import React from "react"
import renderer from "react-test-renderer"
import { MockedProvider } from "react-apollo/test-utils"

import { QueryComponent, GET_GUIDES } from "./QueryTag"

const mocks = [
  {
    request: {
      query: GET_GUIDES,
      variables: {}
    },
    result: {
      data: {
        guides: [{ id: "1", name: "Buck" }]
      }
    }
  }
]

it("should render without error", () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <QueryComponent />
    </MockedProvider>
  )
})
