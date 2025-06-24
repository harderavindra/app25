import { useState, useEffect } from 'react';
import axios from "../utils/axios";
import InputText from '../components/ui/InputText';
import SelectDropdown from '../components/ui/SelectDropdown';
import Button from '../components/ui/Button';
import FormPopup from '../components/ui/FormPopup';
import { FiBox, FiEdit, FiFolder, FiInbox, FiPackage, FiPlus, FiTrash } from 'react-icons/fi';
import CollectionPage from '../components/master/CollectionPage';

const typeOptions = [
    { label: 'Root', value: 'root' },
    { label: 'Category', value: 'category' },
    { label: 'Item', value: 'item' },
];

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [formCollectionData, setFormCollectionData] = useState({
        title: '',
        purpose: '',
        includeNotes: '',
        excludeNotes: '',
        managedBy: '',
        visibility: 'internal',
        allowedRoles: [],
    });

    const [formData, setFormData] = useState({
        name: '',
        categoryLabel: 'category',
        type: 'category',
        parent: '',
        description: '',
    });

    const [editId, setEditId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [allCollections, setAllCollections] = useState([]);

    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [editCollectionId, setEditCollectionId] = useState(null);
    const [collectionSuccess, setCollectionSuccess] = useState('');
    const [collectionError, setCollectionError] = useState('');

    const fetchCollections = async () => {
        const res = await axios.get('/collections');
        setAllCollections(res.data);
    };

    useEffect(() => {
        fetchCollections();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`/categories`);
            console.log(res.data)
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log(field, value)
    };

    const resetMessages = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        resetMessages();

        if (!formData.name || !formData.type) {
            setErrorMessage('Please fill all required fields');
            return;
        }

        if (formData.type === 'root' && formData.parent) {
            setErrorMessage('Root type should not have a parent');
            return;
        }

        if (formData.type !== 'root' && !formData.parent) {
            setErrorMessage(`${formData.type} must have a parent`);
            return;
        }

        try {
            if (editId) {
                await axios.put(`/categories/${editId}`, {
                    ...formData,
                    parent: formData.parent || null,
                });
                setSuccessMessage('Category updated');
            } else {
                await axios.post('/categories', {
                    ...formData,
                    parent: formData.parent || null,
                });
                setSuccessMessage('Category created');
            }

            setFormData({ name: '', type: 'category', categoryLabel: 'category', parent: '', description: '' });
            setEditId(null);
            fetchCategories();
        } catch (error) {
            console.error('Error submitting category:', error);
            setErrorMessage('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await axios.delete(`/categories/${id}`);
            setSuccessMessage('Category deleted');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            setErrorMessage('Delete failed');
        }
    };

    const openForm = ({ type, parentId = '', edit = false, node = null }) => {
        resetMessages();

        if (edit && node) {
            setFormData({
                name: node.name,
                type: node.type,
                parent: node.parent || '',
                description: node.description || '',
            });
            setEditId(node._id);
            setIsEdit(true);
        } else {
            setFormData({
                name: '',
                type,
                parent: parentId,
                description: '',
            });
            setEditId(null);
            setIsEdit(false);
        }

        setShowPopup(true);
    };
    const flattenTree = (nodes) => {
        if (!Array.isArray(nodes)) return [];

        return nodes.reduce((acc, node) => {
            return acc.concat(node, ...(node.children ? flattenTree(node.children) : []));
        }, []);
    };
    const handleCollectionAssign = async (categoryId, collectionId, checked) => {
        try {
            const flatCategories = flattenTree(categories);
            const category = flatCategories.find(c => c._id === categoryId);

            if (!category) {
                console.error('Category not found for ID:', categoryId);
                return;
            }

            let updatedCollections = [...(category.collections || [])];

            if (checked) {
                if (!updatedCollections.includes(collectionId)) {
                    updatedCollections.push(collectionId);
                }
            } else {
                updatedCollections = updatedCollections.filter(id => id !== collectionId);
            }

            await axios.put(`/categories/${categoryId}/collections`, {
                collectionIds: updatedCollections,
            });

            fetchCategories(); // refresh list
        } catch (err) {
            console.error('Error updating collections:', err);
        }
    };

    const handleCollectionChange = (key, value) => {
        setFormCollectionData((prev) => ({ ...prev, [key]: value }));
    };

    const handleCollectionSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editCollectionId) {
                await axios.put(`/collections/${editCollectionId}`, formCollectionData);
                setCollectionSuccess('Collection updated');
            } else {
                await axios.post('/collections', formCollectionData);
                setCollectionSuccess('Collection created');
            }

            setFormCollectionData({
                title: '',
                purpose: '',
                includeNotes: '',
                excludeNotes: '',
                managedBy: '',
                visibility: 'internal',
                allowedRoles: [],
            });
            setEditCollectionId(null);
            setShowCollectionForm(false);
            fetchCollections();
        } catch (err) {
            console.error('Create/update collection failed:', err);
            setCollectionError('Error saving collection');
        }
    };

    const renderTree = (nodes, level = 0) => (
        <ul className="pl-10 w-full py-2 capitalize ">
            {nodes.map((node) => (
                <li key={node._id} className={`${level === 0 ? 'border border-neutral-300 rounded-md p-5 mb-5' : ''} `}>
                    <div className="flex items-center gap-2 justify-between  border border-neutral-200  hover:border-neutral-200 hover:bg-neutral-50 px-3 py-2 rounded-lg group">
                        <div className='flex items-center gap-3'>
                            {node.type === 'root' ? <FiPackage /> : node.type === 'category' ? <FiBox /> : <FiInbox />} <strong>{node.name}</strong> ({node?.categoryLabel || node.type})
                        </div>
                        <div className='flex gap-2 opacity-10 group-hover:opacity-100 '>

                            <button
                                className="flex items-center group h-8 border border-neutral-400 rounded-md justify-center p-2 cursor-pointer"
                                onClick={() => handleDelete(node._id)}
                            >
                                <FiTrash />
                            </button>
                            <button
                                className="flex items-center group h-8 border border-neutral-400 rounded-md justify-center p-2 cursor-pointer"
                                onClick={() => openForm({ edit: true, node })}
                            >
                                <FiEdit />
                            </button>
                            {node.type !== 'item' && (
                                <button
                                    className="flex items-center  h-8 border border-neutral-400 rounded-md justify-center p-2 cursor-pointer"
                                    onClick={() =>
                                        openForm({
                                            type: node.type === 'root' ? 'category' : 'item',
                                            parentId: node._id,
                                        })
                                    }
                                >
                                    <FiPlus className="mr-1" />

                                </button>
                            )}


                        </div>
                    </div>

                    {node.type === 'item' && (
                        <div className="ml-5 mt-4 mb-8">
                            <div className="grid grid-cols-4 gap-8 text-sm">
                                {allCollections.map((col) => (
                                    <label key={col._id} className="flex items-center gap-2 border border-neutral-300 px-3 py-2 rounded-lg  ">
                                        <input
                                            type="checkbox"
                                            checked={node.collections?.includes(col._id)}
                                            onChange={(e) => handleCollectionAssign(node._id, col._id, e.target.checked)}
                                        />
                                        <FiFolder />
                                        {col.title}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {node.children && node.children.length > 0 &&
                        renderTree(node.children, level + 1)
                    }
                </li>
            ))}
        </ul>
    );

    return (

        <div className="p-6 mx-auto bg-white rounded-xl border border-neutral-200 flex gap-10">
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-bold mb-4">Product/Services Master </h1>
                    <Button variant="secondary" onClick={() => openForm({ type: 'root' })}><FiPlus /></Button>


                </div>



                <div>
                    {categories.length > 0 ? renderTree(categories) : <p>No categories found.</p>}
                </div>

                {showPopup && (
                    <FormPopup
                        isEdit={isEdit}
                        handleClose={() => setShowPopup(false)}
                        success={successMessage}
                        error={errorMessage}
                    >

                        <form
                            onSubmit={handleSubmit}
                            className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded mt-4 space-y-2 border"
                        >
                            <InputText
                                label="Name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                            <SelectDropdown
                                label="Type"
                                options={
                                    formData.parent
                                        ? typeOptions.filter((opt) => opt.value !== 'root')
                                        : typeOptions.filter((opt) => opt.value === 'root')
                                }
                                value={formData.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                            />
                            <InputText
                                label="Category Label"
                                value={formData.categoryLabel}
                                onChange={(e) => handleChange('categoryLabel', e.target.value)}
                            />
                            <InputText
                                label="Description"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />
                            <div className="flex gap-2">
                                <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                                <Button
                                    type="button"
                                    className="bg-gray-300 text-black"
                                    onClick={() => setShowPopup(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </FormPopup>
                )}
            </div>
            <div className='min-w-sm'>
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-bold mb-4">Collections </h1>
                    <Button variant="secondary" onClick={() => setShowCollectionForm(true)}><FiPlus /></Button>
                </div>
                <div className='flex flex-col gap-5'>
                    {allCollections.map((col) => (
                        <div key={col._id} className="flex items-center gap-2 border border-neutral-300 px-3 py-2 rounded-lg  ">

                            <FiFolder />
                            {col.title}

                            <Button
                                size="xs"
                                variant="secondary"
                                onClick={() => {
                                    setFormCollectionData(col); // preload values
                                    setEditCollectionId(col._id);
                                    setShowCollectionForm(true);
                                }}
                            >
                                <FiEdit />
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
            {showCollectionForm && (
                <FormPopup
                    isEdit={!!editCollectionId}
                    handleClose={() => setShowCollectionForm(false)}
                    success={collectionSuccess}
                    error={collectionError}
                >
                    <form
                        onSubmit={handleCollectionSubmit}
                        className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded mt-4 space-y-2 border"
                    >
                        <InputText
                            label="Title"
                            value={formCollectionData.title}
                            onChange={(e) => handleCollectionChange('title', e.target.value)}
                        />


                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Purpose</label>
                            <textarea
                                className="w-full p-2 border rounded bg-white dark:bg-zinc-800 dark:text-white"
                                rows={4}
                                value={formCollectionData.purpose}
                                onChange={(e) => handleCollectionChange('purpose', e.target.value)}
                                placeholder="Enter the purpose of this collection..."
                            ></textarea>
                        </div>
                        <InputText
                            label="Exclude Notes"
                            value={formCollectionData.excludeNotes}
                            onChange={(e) => handleCollectionChange('excludeNotes', e.target.value)}
                        />
                        <InputText
                            label="Managed By"
                            value={formCollectionData.managedBy}
                            onChange={(e) => handleCollectionChange('managedBy', e.target.value)}
                        />
                        <SelectDropdown
                            label="Visibility"
                            options={[
                                { label: 'Internal', value: 'internal' },
                                { label: 'Public', value: 'public' },
                            ]}
                            value={formCollectionData.visibility}
                            onChange={(e) => handleCollectionChange('visibility', e.target.value)}
                        />
                        <div className="flex gap-2">
                            <Button type="submit">{editCollectionId ? 'Update' : 'Create'}</Button>
                            <Button
                                type="button"
                                className="bg-gray-300 text-black"
                                onClick={() => setShowCollectionForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </FormPopup>
            )}
        </div>
    );
};

export default CategoryPage;
