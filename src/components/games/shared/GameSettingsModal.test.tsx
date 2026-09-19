// src/components/games/shared/GameSettingsModal.test.tsx
//
// The Account section only. The rest of this modal predates the section and is
// covered by the game page flow tests.
//
// The distinction that matters here is *which variant*: the popover in the site
// header gets the account links, the in-game modal does not. A profile link
// inside a game navigates away mid-run and silently discards it, which is the
// kind of thing that is obvious in a component test and invisible in a browser
// until someone loses a game they were winning.

import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import GameSettingsModal from './GameSettingsModal';
import { renderWithProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/en',
}));

const accountHeading = () => screen.queryByText(en.settings.account);

describe('GameSettingsModal — Account section', () => {
  it('shows both profile links in the popover when signed in', () => {
    renderWithProviders(
      <GameSettingsModal isOpen onClose={vi.fn()} variant="popover" isAuthenticated />
    );

    expect(accountHeading()).toBeInTheDocument();
    expect(screen.getByRole('link', { name: en.nav.profile })).toHaveAttribute(
      'href',
      '/en/profile'
    );
    expect(screen.getByRole('link', { name: en.profile.edit })).toHaveAttribute(
      'href',
      '/en/profile/edit'
    );
  });

  it('shows the way in, not an absence, when signed out', () => {
    renderWithProviders(
      <GameSettingsModal
        isOpen
        onClose={vi.fn()}
        variant="popover"
        isAuthenticated={false}
      />
    );

    expect(accountHeading()).toBeInTheDocument();
    expect(screen.getByRole('link', { name: en.nav.login })).toHaveAttribute(
      'href',
      '/en/auth'
    );
    expect(screen.queryByRole('link', { name: en.profile.edit })).not.toBeInTheDocument();
  });

  it('renders no Account section in the in-game modal', () => {
    // Even if someone threads the prop through by mistake, the variant wins.
    renderWithProviders(
      <GameSettingsModal
        isOpen
        onClose={vi.fn()}
        variant="modal"
        gameId="neutralise"
        isAuthenticated
      />
    );

    expect(accountHeading()).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: en.nav.profile })).not.toBeInTheDocument();
  });

  it('renders no Account section when nobody said whether anyone is signed in', () => {
    renderWithProviders(<GameSettingsModal isOpen onClose={vi.fn()} variant="popover" />);

    expect(accountHeading()).not.toBeInTheDocument();
  });

  it('closes the popover when an account link is followed', () => {
    // Navigating with the popover still open leaves it sitting over the page
    // the reader just asked for.
    const onClose = vi.fn();
    renderWithProviders(
      <GameSettingsModal isOpen onClose={onClose} variant="popover" isAuthenticated />
    );

    fireEvent.click(screen.getByRole('link', { name: en.nav.profile }));

    expect(onClose).toHaveBeenCalled();
  });
});
