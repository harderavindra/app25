import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import InputText from '../ui/InputText';
import Button from '../ui/Button';

const visibilityOptions = ['public', 'internal', 'restricted'];

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    includeNotes: '',
    excludeNotes: '',
    managedBy: '',
    visibility: 'internal',
    allowedRoles: [],
  });

  const fetchCollections = async () => {
    const res = await axios.get('/collections');
    setCollections(res.data);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/collections', formData);
      setFormData({
        title: '',
        purpose: '',
        includeNotes: '',
        excludeNotes: '',
        managedBy: '',
        visibility: 'internal',
        allowedRoles: [],
      });
      fetchCollections();
    } catch (err) {
      console.error('Create collection failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Create New Collection</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <InputText label="Title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
        <InputText label="Managed By" value={formData.managedBy} onChange={(e) => handleChange('managedBy', e.target.value)} />
        <InputText label="Purpose" value={formData.purpose} onChange={(e) => handleChange('purpose', e.target.value)} />
        <InputText label="Include Notes" value={formData.includeNotes} onChange={(e) => handleChange('includeNotes', e.target.value)} />
        <InputText label="Exclude Notes" value={formData.excludeNotes} onChange={(e) => handleChange('excludeNotes', e.target.value)} />
        <select
          value={formData.visibility}
          onChange={(e) => handleChange('visibility', e.target.value)}
          className="col-span-2 p-2 border rounded"
        >
          {visibilityOptions.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <Button type="submit" className="col-span-2">Create</Button>
      </form>

      <h2 className="text-lg font-bold mb-2">All Collections</h2>
      <ul className="space-y-2">
        {collections.map((col) => (
          <li key={col._id} className="p-3 border rounded-md bg-gray-50">
            <strong>{col.title}</strong> - {col.purpose} ({col.visibility})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionPage;
