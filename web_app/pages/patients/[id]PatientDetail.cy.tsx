import React from 'react'
import PatientDetail from './[id]'

describe('<PatientDetail />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<PatientDetail/>)
    })
})