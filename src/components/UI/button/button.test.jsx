import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './index';

describe('Button', () => {
  it('text', () => {
    const onClick = vi.fn();
    const text = "test button";
    render(<Button onClick={onClick}>{text}</Button>);

    expect(screen.getByText(text)).toBeInTheDocument();
    // check if App components renders headline
  });
  it('onclick', () => {
    const onClick = vi.fn();
    const text = "test button";
    render(<Button onClick={onClick}>{text}</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
    // check if App components renders headline
  });
});