import React from 'react'
import EmergencyResponderList from './index'

describe('<EmergencyResponderList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EmergencyResponderList />)
  })
})