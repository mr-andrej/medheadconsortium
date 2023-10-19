import React from 'react'
import MyChatComponent from './hospital'

describe('<MyChatComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyChatComponent />)
  })
})