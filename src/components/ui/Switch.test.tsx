/**
 * Component tests for the shared switch. The form-field mode matters most:
 * profile-actions reads `formData.get(name) === 'on'`, so the switch has to
 * post exactly what a native checkbox would.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Switch, SwitchList, SwitchRow } from './Switch';

function formValue(form: HTMLFormElement, name: string) {
  return new FormData(form).get(name);
}

describe('Switch', () => {
  it('is a switch named by its row label and describes itself with the hint', () => {
    render(<SwitchRow label="Show accuracy" description="Other players see it" defaultChecked />);

    const toggle = screen.getByRole('switch', { name: 'Show accuracy' });
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveAccessibleDescription('Other players see it');
  });

  it('flips when the label text is clicked, not just the knob', () => {
    render(<SwitchRow label="Show accuracy" />);

    fireEvent.click(screen.getByText('Show accuracy'));
    expect(screen.getByRole('switch', { name: 'Show accuracy' })).toHaveAttribute('aria-checked', 'true');
  });

  it('posts name=on while on and nothing while off, like a checkbox', () => {
    const { container } = render(
      <form>
        <SwitchList>
          <SwitchRow name="showCountry" label="Show country" defaultChecked />
          <SwitchRow name="showAccuracy" label="Show accuracy" />
        </SwitchList>
      </form>,
    );
    const form = container.querySelector('form')!;

    expect(formValue(form, 'showCountry')).toBe('on');
    expect(formValue(form, 'showAccuracy')).toBeNull();

    fireEvent.click(screen.getByRole('switch', { name: 'Show country' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Show accuracy' }));

    expect(formValue(form, 'showCountry')).toBeNull();
    expect(formValue(form, 'showAccuracy')).toBe('on');
  });

  it('leaves state to the parent when controlled', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Sound" checked={false} onCheckedChange={onCheckedChange} />);

    const toggle = screen.getByRole('switch', { name: 'Sound' });
    fireEvent.click(toggle);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('does not submit the form it sits in', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Switch aria-label="Sound" />
      </form>,
    );

    fireEvent.click(screen.getByRole('switch', { name: 'Sound' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
