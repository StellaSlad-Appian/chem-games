import Link from 'next/link';
import { redirect } from 'next/navigation';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error || !data) return <main className="min-h-screen bg-slate-950 p-8 text-white"><p>Your profile could not be loaded. Apply the Supabase profile migration first.</p></main>;
  return <main className="min-h-screen bg-slate-950 p-4 pt-20"><Link href="/profile" className="absolute left-5 top-5 text-sm font-bold text-slate-300 hover:text-white">← Profile</Link><EditProfileForm initialData={toUserProfile(data)} /></main>;
}
