import { useState } from 'react';

export default function useHandleFormData() {
  const [formData, setFormData] = useState<object>({});

  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleFormData };
}
