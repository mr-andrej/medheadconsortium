import React from 'react'
import CreateHospital from './create'

describe('<CreateHospital />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateHospital />)
  })
})