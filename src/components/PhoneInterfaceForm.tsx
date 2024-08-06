// components/PhoneInterfaceForm.js
'use client';

import { handleSubmit } from '@/app/(main)/server.actions';
import { Button, Card, Textarea } from '@tremor/react';
import { useState } from 'react';

export function PhoneInterfaceForm({ initialData }: any) {
  const [formData, setFormData] = useState({
    hours: initialData.hours || '',
    holidays: initialData.holidays || '',
    location: initialData.location || '',
    menuServices: initialData.menu_services || '',
    specials: initialData.specials || '',
    otherNotes: initialData.other_notes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataToSubmit = new FormData(e.currentTarget);
    const result = await handleSubmit(formDataToSubmit);
    setIsSubmitting(false);

    if (result.success) {
      if (result.data) {
        // Update the form data with the new data from the server
        setFormData({
          hours: result.data.hours || '',
          holidays: result.data.holidays || '',
          location: result.data.location || '',
          menuServices: result.data.menu_services || '',
          specials: result.data.specials || '',
          otherNotes: result.data.other_notes || '',
        });
        alert('Data saved successfully!');
      } else {
        alert('No data received from the server.');
      }
    } else {
      alert(`Error saving data: ${result.error}`);
    }
  };


  const resetForm = () => {
    setFormData({
      hours: initialData.hours || '',
      holidays: initialData.holidays || '',
      location: initialData.location || '',
      menuServices: initialData.menu_services || '',
      specials: initialData.specials || '',
      otherNotes: initialData.other_notes || '',
    });
  };

  return (
    <Card className="mx-auto max-w-3xl">
      <form onSubmit={onSubmit} className="space-y-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-2">
            <label htmlFor={key} className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <Textarea
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
              rows={4}
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={resetForm}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
}