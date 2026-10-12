import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Button } from '../src/components/ui/Button';
import { Badge } from '../src/components/ui/Badge';

describe('UI Primitives Rendering', () => {
  it('renders primary editorial button with 0px radius styling', () => {
    render(<Button variant="primary">Shop The Look</Button>);
    const btn = screen.getByRole('button', { name: /shop the look/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary');
    expect(btn.className).toContain('rounded-none');
  });

  it('renders secondary button with ghost border', () => {
    render(<Button variant="secondary">Discover More</Button>);
    const btn = screen.getByRole('button', { name: /discover more/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-transparent');
  });

  it('renders badge component with uppercase tracking', () => {
    render(<Badge>Limited Edition</Badge>);
    const badge = screen.getByText(/limited edition/i);
    expect(badge).toBeInTheDocument();
  });
});
