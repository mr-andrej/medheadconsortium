import React from 'react'
import CreatePatient from './create'

describe('<CreatePatient />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<CreatePatient/>)
    })
})