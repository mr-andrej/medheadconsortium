import React from 'react'
import EmergencyResponderDetail from './[id]'

describe('<EmergencyResponderDetail />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EmergencyResponderDetail />)
  })
})