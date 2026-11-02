import { act, fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';

vi.mock('./components/HeroScene', () => ({ default: () => null }));

test('renders portfolio sections, projects, and editable empty states', async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/hi, i'm\s*art anass/i);
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  expect(screen.getByRole('heading', { name: "Let's talk." })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /email anassrhezali209@gmail\.com/i })).toHaveAttribute(
    'href',
    'mailto:anassrhezali209@gmail.com',
  );
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/rhezalianasse-rgb',
  );
  expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
    'href',
    'https://wa.me/212654811996',
  );
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/anasse-rhezali-9552aa27b',
  );
  expect(screen.getByRole('navigation', { name: /main navigation/i }).querySelector('.nav-cta')).toHaveAttribute(
    'href',
    'mailto:anassrhezali209@gmail.com',
  );
  expect(screen.getByRole('link', { name: /download my cv/i })).toHaveAttribute(
    'href',
    '/CV_Rhezali_Anass.pdf',
  );
  expect(screen.getByRole('link', { name: /download my cv/i })).toHaveAttribute(
    'download',
    'CV_Rhezali_Anass.pdf',
  );
  expect(screen.getByRole('heading', { name: /more than just the code/i })).toBeInTheDocument();
  for (const skill of ['React', 'PHP', 'Laravel', 'JavaScript', 'Databases']) {
    expect(screen.getByText(skill, { selector: '.skill-chip' })).toBeInTheDocument();
  }
  expect(screen.getByRole('heading', { name: /ideas made real/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'DEV1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'DEV1' })).toHaveAttribute(
    'href',
    'https://github.com/rhezalianasse-rgb/DEV1',
  );
  expect(screen.getByRole('link', { name: 'DEV1 on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/rhezalianasse-rgb/DEV1',
  );
  expect(screen.getByRole('heading', { name: 'DEV2' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'DEV2' })).toHaveAttribute(
    'href',
    'https://github.com/rhezalianasse-rgb/DEV2',
  );
  expect(screen.getByRole('link', { name: 'DEV2 on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/rhezalianasse-rgb/DEV2',
  );
  expect(screen.queryByRole('textbox', { name: /your name/i })).not.toBeInTheDocument();

  const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
  fireEvent.click(menuButton);
  expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
});
