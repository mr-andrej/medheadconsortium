import React from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import {mount} from "cypress/react18";
import PatientDetail from "@/pages/patients/[id]";

describe('<PatientDetail />', () => {
  it('renders', () => {
    // Mock the Next.js router
    const mockRouter = {
      basePath: '',
      pathname: '/',
      route: '/',
      asPath: '/',
      query: {},
      push: cy.stub().as('push'),
      replace: cy.stub().as('replace'),
      reload: cy.stub().as('reload'),
      back: cy.stub().as('back'),
      prefetch: cy.stub().as('prefetch'),
      beforePopState: cy.stub().as('beforePopState'),
      events: {
        on: cy.stub().as('on'),
        off: cy.stub().as('off'),
        emit: cy.stub().as('emit'),
      },
      isFallback: false,
    };

    // Mount the component with the mocked router
    mount(
        <RouterContext.Provider value={mockRouter as any}>
          <PatientDetail />
        </RouterContext.Provider>
    );
  });
});