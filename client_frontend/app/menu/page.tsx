import { getMenuPageData } from "@/lib/settings-server";
import { redirect } from 'next/navigation';

export const revalidate = 60;

export default async function MenuIndexPage() {
  const data = await getMenuPageData();

  if (data.menus && data.menus.length > 0) {
    redirect(`/menu/${data.menus[0].slug}`);
  }

  // Fallback if no menus exist
  redirect('/');
}
