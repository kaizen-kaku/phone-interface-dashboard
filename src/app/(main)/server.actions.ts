import { sql } from "@vercel/postgres";

async function fetchData() {
  const result = await sql`SELECT * FROM phone_interface_data LIMIT 1`;
  return result.rows[0] || {};
}

export async function handleSubmit(formData: any) {

  const hours = formData.get('hours');
  const holidays = formData.get('holidays');
  const location = formData.get('location');
  const menuServices = formData.get('menuServices');
  const specials = formData.get('specials');
  const otherNotes = formData.get('otherNotes');

  try {
    await sql`
      INSERT INTO phone_interface_data (hours, holidays, location, menu_services, specials, other_notes)
      VALUES (${hours}, ${holidays}, ${location}, ${menuServices}, ${specials}, ${otherNotes})
      ON CONFLICT (id) DO UPDATE SET
        hours = EXCLUDED.hours,
        holidays = EXCLUDED.holidays,
        location = EXCLUDED.location,
        menu_services = EXCLUDED.menu_services,
        specials = EXCLUDED.specials,
        other_notes = EXCLUDED.other_notes
    `;
    // Fetch and return the updated data
    const updatedData = await fetchData();
    return { success: true, data: updatedData };
  } catch (error) {
    console.error('Error saving data:', error);
    return { success: false, error: error };
  }
}