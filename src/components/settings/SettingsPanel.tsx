'use client';

import { useGameSettings, type Theme } from '@/context/game-settings-context';

export function SettingsPanel() {
  const { globalTheme, setGlobalTheme, isMuted, toggleMute, volume, setVolume } = useGameSettings();
  return <section className="game-card mx-auto w-full max-w-2xl p-6">
    <h1 className="text-3xl font-black">Settings</h1>
    <p className="mt-2 text-muted">Choose an appearance and adjust sound for all games.</p>
    <div className="mt-7 space-y-6">
      <SettingRow title="Appearance" description="Applies across the dashboard and games.">
        <div className="flex gap-2">{(['light', 'dark'] as Theme[]).map((theme) => <button key={theme} type="button" onClick={() => setGlobalTheme(theme)} className={`rounded-lg border px-4 py-2 font-bold capitalize ${globalTheme === theme ? 'border-blue-500 bg-blue-500 text-white' : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--foreground)]'}`}>{theme}</button>)}</div>
      </SettingRow>
      <SettingRow title="Sound" description="Mute or set the master volume.">
        <div className="flex flex-wrap items-center gap-3"><button type="button" onClick={toggleMute} className="btn-ghost !px-4 !py-2">{isMuted ? 'Unmute' : 'Mute'}</button><input aria-label="Master volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></div>
      </SettingRow>
    </div>
  </section>;
}

function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4"><h2 className="text-xl font-black">{title}</h2><p className="mt-1 text-sm text-muted">{description}</p><div className="mt-4">{children}</div></div>;
}
