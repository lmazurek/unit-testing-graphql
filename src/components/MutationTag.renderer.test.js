import React from "react"
import "jest-dom/extend-expect"
import "@testing-library/react/cleanup-after-each"
import { render, fireEvent } from "@testing-library/react"
import { MockedProvider } from "react-apollo/test-utils"
import { CREATE_GUIDE, MutationTag } from "./MutationTag"

const mocks = [
  {
    request: {
      query: CREATE_GUIDE,
      variables: { name: "guide guide" }
    },
    result: {
      data: {
        guide: { id: "1", name: "guide guide" }
      }
    }
  }
]

it("should render without error", () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MutationTag />
    </MockedProvider>
  )
  expect(container).toBeInTheDocument()
})

it("should call a mutation after submitting name", () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MutationTag />
    </MockedProvider>
  )

  fireEvent.change(getByTestId("guide_name_input"), {
    target: { value: "guide guide" }
  })

  fireEvent.click(getByTestId("create_guide_submit"))
})
