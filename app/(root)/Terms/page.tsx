// pages/terms-and-conditions.tsx
import React from 'react';

const TermsAndConditions = () => {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'user-conduct', title: 'User Conduct' },
    { id: 'intellectual-property', title: 'Intellectual Property Rights' },
    { id: 'termination', title: 'Termination' },
    { id: 'disclaimer', title: 'Disclaimer of Warranties' },
    { id: 'limitation', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Information' },
  ];

  return (
    <div className="p-6 py-24 bg-bg-dark-1 dark:bg-dark-1 text-white dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <h2 className="text-2xl font-semibold mb-2">Table of Contents</h2>
      <ul className="list-decimal list-inside mb-6">
        {sections.map(section => (
          <li key={section.id} className="mb-2">
            <a href={`#${section.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {section.title}
            </a>
          </li>
        ))}
      </ul>

      {sections.map(section => (
        <div key={section.id} id={section.id} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
          <p className="mb-4">
            {/* Placeholder text for each section */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet, justo nec vestibulum interdum, neque risus vehicula augue, in viverra lacus magna ut libero.
          </p>
        </div>
      ))}

      <h2 id="acceptance" className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using our platform, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, you must not use our platform.
      </p>

      <h2 id="user-accounts" className="text-2xl font-semibold mb-2">2. User Accounts</h2>
      <p className="mb-4">
        To use certain features of our platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
      </p>

      <h2 id="user-conduct" className="text-2xl font-semibold mb-2">3. User Conduct</h2>
      <p className="mb-4">
        You agree to use our platform only for lawful purposes and in accordance with these terms. You agree not to use our platform:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
        <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
        <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
        <li>To impersonate or attempt to impersonate the company, an employee, another user, or any other person or entity.</li>
        <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of our platform, or which, as determined by us, may harm the company or users of the platform or expose them to liability.</li>
      </ul>

      <h2 id="intellectual-property" className="text-2xl font-semibold mb-2">4. Intellectual Property Rights</h2>
      <p className="mb-4">
        Our platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays,
