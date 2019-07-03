import React from "react"
import wait from 'waait'
import "jest-dom/extend-expect"
import "@testing-library/react/cleanup-after-each"
import { render, fireEvent } from "@testing-library/react"
import { MockedProvider } from "react-apollo/test-utils"
import { CREATE_GUIDE, MutationTag, GET_GUIDES } from "./MutationTag"

const createGuide = jest.fn()

const mocks = [
  {
    request: {
      query: CREATE_GUIDE,
      variables: { name: "guide guide" }
    },
    result: {
      data: {
        createGuide: {
          guide: { id: "1", name: "guide guide" }
        }
      }
    }
  },
  {
    request: {
      query: GET_GUIDES,
      variables: {}
    },
    result: {
      data: {
        guides: { id: "1", name: "guide guide" }
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

it("should call a mutation after submitting name", async () => {
  const { getByTestId, getByText, debug } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MutationTag />
    </MockedProvider>
  )

  fireEvent.change(getByTestId("guide_name_input"), {
    target: { value: "guide guide" }
  })

  fireEvent.submit(getByTestId("form"))

  await wait(0)

  expect(getByText(/created!/i)).toBeInTheDocument()
})
