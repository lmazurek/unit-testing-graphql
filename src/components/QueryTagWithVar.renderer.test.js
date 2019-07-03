// import React from "react"
// import renderer from "react-test-renderer"
// import { MockedProvider } from "react-apollo/test-utils"

// import { QueryTagWithVar, GET_GUIDE } from "./QueryTagWithVar"

// const mocks = [
//   {
//     request: {
//       query: GET_GUIDE,
//       variables: { id: "1" }
//     },
//     result: {
//       data: {
//         guide: { id: "1", name: "Buck" }
//       }
//     }
//   }
// ]

// it("should render without error", () => {
//   renderer.create(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <QueryTagWithVar />
//     </MockedProvider>
//   )
// })
