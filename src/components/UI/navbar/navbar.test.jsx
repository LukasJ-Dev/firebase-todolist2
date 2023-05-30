import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Navbar from './index';

describe('Navbar', () => {
  it('renders title', () => {
    render(<Navbar title="TEST TITLE" items={[
        {"name": "Home", "url": "/home"},
        {"name": "About", "url": "/about"},
        {"name": "Contact", "url": "/contact"}
      ]} />);

    expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<Navbar title="TEST TITLE" items={[
        {"name": "Home", "url": "/home"},
        {"name": "About", "url": "/about"},
        {"name": "Contact", "url": "/contact"}
      ]} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
  it('test links', () => {
    render(<Navbar title="TEST TITLE" items={[
        {"name": "Home", "url": "/home"},
        {"name": "About", "url": "/about"},
        {"name": "Contact", "url": "/contact"}
      ]} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});