// app/phone-interface/page.js
'use server';

import { PhoneInterfaceForm } from '@/components/PhoneInterfaceForm';
import { sql } from '@vercel/postgres';

async function fetchData() {
  const result = await sql`SELECT * FROM phone_interface_data LIMIT 1`;
  return result.rows[0] || {};
}
export default async function PhoneInterfacePage() {
  const initialData = await fetchData();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-6">
        Phone Interface
      </h1>
      <PhoneInterfaceForm initialData={initialData} />
    </div>
  );
}

