import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PublicProfile } from '@/components/ui/PublicProfile';
import { toUserProfile } from '@/lib/profile';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error || !data) return <main className="min-h-screen bg-slate-950 p-8 text-white"><p>Your profile is being prepared. Apply the profile migration, then reload.</p></main>;
  return <main className="min-h-screen bg-slate-950 p-6 pt-20"><Link href="/profile/edit" className="absolute right-5 top-5 rounded-lg bg-indigo-500 px-4 py-2 font-bold text-white">Edit profile</Link><PublicProfile profile={toUserProfile(data)} /></main>;
}
