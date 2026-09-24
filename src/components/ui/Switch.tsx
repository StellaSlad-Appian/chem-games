'use client';

// The one on/off switch for the whole site. Use it instead of hand-rolling a
// `role="switch"` button or a styled checkbox.
//
// Two ways to drive it:
//   - Controlled: pass `checked` and `onCheckedChange` (settings held in context).
//   - Form field: pass `name` (and optionally `defaultChecked`). A hidden input
//     posts `name=on` while the switch is on and nothing while it is off, which
//     is exactly what a native checkbox would send, so server actions reading
//     `formData.get(name) === 'on'` keep working unchanged.
//
// Off is drawn as an outline with a small knob in `--muted`; on is a filled
// `--action` track with a white knob. Both states clear 3:1 against the
// surface (WCAG 1.4.11) in light and dark, and the knob's position and size
// carry the state as well as the colour.
//
// The knob only slides under `motion-safe`, per docs/ACCESSIBILITY.md §4.

import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'type' | 'role' | 'onChange' | 'value' | 'defaultChecked' | 'aria-checked'
>;

export interface SwitchProps extends NativeButtonProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Form field name. When set, the switch submits `name=on` while on. */
  name?: string;
}

export function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  name,
  disabled,
  className,
  onClick,
  ...buttonProps
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : uncontrolled;

  return (
    <>
      <button
        {...buttonProps}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          const next = !checked;
          if (!isControlled) setUncontrolled(next);
          onCheckedChange?.(next);
        }}
        className={[
          'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)',
          'motion-safe:transition-colors motion-safe:duration-150',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked
            ? 'border-(--action) bg-(--action) hover:border-(--action-hover) hover:bg-(--action-hover)'
            : 'border-(--muted) bg-transparent hover:bg-(--surface-2)',
          className ?? '',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full',
            'motion-safe:transition-all motion-safe:duration-150',
            checked
              ? 'left-[calc(100%-1.375rem)] h-5 w-5 bg-white shadow-sm'
              : 'left-1 h-3.5 w-3.5 bg-(--muted)',
          ].join(' ')}
        />
      </button>
      {name && checked && <input type="hidden" name={name} value="on" />}
    </>
  );
}

export interface SwitchRowProps extends Omit<SwitchProps, 'id' | 'aria-label' | 'aria-labelledby'> {
  label: ReactNode;
  /** Optional hint shown under the label and announced as the switch's description. */
  description?: ReactNode;
}

/**
 * A labelled switch laid out as a settings row: label (and optional hint) on
 * the left, switch on the right. The label is a real `<label>`, so clicking
 * the text flips the switch too, which gives a far bigger target than the knob.
 */
export function SwitchRow({ label, description, ...switchProps }: SwitchRowProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className="flex min-h-11 items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block cursor-pointer text-sm font-semibold text-(--foreground) select-none">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="mt-0.5 text-xs leading-relaxed text-(--muted)">
            {description}
          </p>
        )}
      </div>
      <Switch id={id} aria-describedby={descriptionId} {...switchProps} />
    </div>
  );
}

/** A stack of `SwitchRow`s separated by thin dividers. */
export function SwitchList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['flex flex-col divide-y divide-(--border)', className ?? ''].join(' ')}>{children}</div>;
}
