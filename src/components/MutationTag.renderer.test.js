import React from "react"
import "jest-dom/extend-expect"
import "@testing-library/react/cleanup-after-each"
import { render, fireEvent, wait } from "@testing-library/react"
import { MockedProvider } from "react-apollo/test-utils"
import { CREATE_GUIDE, MutationTag, GET_GUIDES } from "./MutationTag"

const createGuide = jest.fn()
const onSubmitCallback = jest.fn()

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
let component;

beforeEach(() => {
  component = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MutationTag onSubmitCallback={onSubmitCallback} />
    </MockedProvider>
  )
})


it("should render without error", () => {
  const { container } = component
  expect(container).toBeInTheDocument()
})

it("should call a mutation after submitting name", async () => {
  const { getByTestId, getByText, debug } = component

  fireEvent.change(getByTestId("guide_name_input"), {
    target: { value: "guide guide" }
  })

  fireEvent.submit(getByTestId("form"))

  expect(onSubmitCallback).toHaveBeenCalledTimes(1)

  await wait(() => expect(getByText(/created!/i)).toBeInTheDocument())
})

it("should call onSubmitCallback on submit", async () => {
  const { getByTestId, getByText, debug } = component

  fireEvent.change(getByTestId("guide_name_input"), {
    target: { value: "guide guide" }
  })

  fireEvent.submit(getByTestId("form"))

  expect(onSubmitCallback).toHaveBeenCalledTimes(2)
})
