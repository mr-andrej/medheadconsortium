import React from 'react'
import CreateResponder from './create'

describe('<CreateResponder />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateResponder />)
  })
})