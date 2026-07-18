'use client';

import { useActionState } from 'react';
import { updateProfileAction, type ProfileActionState } from '@/app/profile/edit/actions';
import { BlockToggle } from '@/components/ui/BlockToggle';
import type { UserProfile } from '@/core-engine/types/general';

interface EditProfileFormProps {
  initialData: UserProfile;
}

const initialState: ProfileActionState = null;

export function EditProfileForm({ initialData }: EditProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="w-full max-w-2xl mx-auto p-6 bg-amber-50 border-4 border-slate-900 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col gap-6">
      <div className="border-b-4 border-slate-900 pb-4 mb-2"><h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Configure Equipment</h2></div>
      <div className="flex flex-col gap-3 p-4 bg-white border-4 border-slate-200 rounded-2xl">
        <label htmlFor="labNotes" className="text-lg font-black text-slate-900 uppercase">Lab Notes (Bio)</label>
        <textarea id="labNotes" name="labNotes" defaultValue={initialData.labNotes} rows={3} maxLength={500} className="p-4 text-base font-bold text-slate-900 bg-slate-50 border-4 border-slate-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] resize-none" />
        <div className="mt-2"><BlockToggle name="showLabNotes" label="Make Lab Notes Public" defaultChecked={initialData.privacy.showLabNotes} /></div>
      </div>
      <div className="flex flex-col gap-3 p-4 bg-white border-4 border-slate-200 rounded-2xl"><h3 className="text-lg font-black text-slate-900 uppercase">Game Stats</h3><BlockToggle name="showTotalSyntheses" label="Show Total Syntheses Count" defaultChecked={initialData.privacy.showTotalSyntheses} /></div>
      {state?.message && <p role="status" className={`rounded-xl p-3 font-bold ${state.status === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>{state.message}</p>}
      <button type="submit" disabled={isPending} className="mt-4 p-5 text-xl font-black text-white bg-indigo-500 border-4 border-slate-900 rounded-xl hover:bg-indigo-400 active:translate-x-[4px] active:translate-y-[4px] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:shadow-none transition-all uppercase tracking-widest disabled:opacity-60">{isPending ? 'Saving...' : 'Save Configuration'}</button>
    </form>
  );
}
