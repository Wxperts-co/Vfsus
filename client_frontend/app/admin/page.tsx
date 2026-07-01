import { getAdminFromSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminRootPage() {
  const admin = await getAdminFromSession();

  if (admin) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
