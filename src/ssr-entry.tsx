import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { GoogleProjectFormModal } from './components/GoogleProjectFormModal';
import { LegalModals } from './components/LegalModals';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SERVICES, PORTFOLIO_PROJECTS } from './data/content';

export function render() {
  const appHtml = renderToString(React.createElement(App));
  const googleFormModalHtml = renderToString(
    React.createElement(GoogleProjectFormModal, {
      isOpen: true,
      onClose: () => {},
    })
  );
  const privacyModalHtml = renderToString(
    React.createElement(LegalModals, {
      type: 'privacy',
      onClose: () => {},
    })
  );
  const termsModalHtml = renderToString(
    React.createElement(LegalModals, {
      type: 'terms',
      onClose: () => {},
    })
  );
  const serviceModalsHtml: Record<string, string> = {};
  for (const s of SERVICES) {
    serviceModalsHtml[s.id] = renderToString(
      React.createElement(ServiceDetailModal, {
        service: s,
        onClose: () => {},
        onStartProjectForService: () => {},
      })
    );
  }

  const projectModalsHtml: Record<string, string> = {};
  for (const p of PORTFOLIO_PROJECTS) {
    projectModalsHtml[p.id] = renderToString(
      React.createElement(ProjectDetailModal, {
        project: p,
        onClose: () => {},
        onStartProject: () => {},
      })
    );
  }

  return {
    appHtml,
    googleFormModalHtml,
    privacyModalHtml,
    termsModalHtml,
    serviceModalsHtml,
    projectModalsHtml,
  };
}

