import { useState } from "react";
import axios from "../../utils/axios";
import InputText from "../ui/InputText";
import SelectDropdown from "../ui/SelectDropdown";
import Button from "../ui/Button";
import TimerProgressCircle from "../ui/TimerProgressCircle";
import { useAuth } from "../../context/AuthContext";
import { FiX } from "react-icons/fi";
import { roles, departments, regions, teams } from "../../utils/constants";

const NewUserForm = ({ handleClose }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    department: "",
    team: "",
    region: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(true);

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Only admins can create users.</p>;
  }

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.password.trim()) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!formData.role) errs.role = "Role is required";
    if (!formData.department) errs.department = "Department is required";
    if (!formData.team) errs.team = "Team is required";
    if (!formData.region) errs.region = "Region is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [name]: `${name[0].toUpperCase() + name.slice(1)} is required` }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      department: "",
      team: "",
      region: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setError("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/users", formData);
      setSuccess(res.data.message || "User created successfully.");
      setShowForm(false);
      resetForm();

      setTimeout(() => {
        setSuccess("");
        handleClose(); // parent close trigger
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showForm && (
        <>
          <div className="flex justify-between bg-neutral-800 py-3 px-3 rounded-t-lg">
            <h2 className="text-neutral-50 font-semibold">Create User</h2>
            <button className="text-neutral-50" onClick={handleClose}><FiX /></button>
          </div>

          <form onSubmit={handleSubmit} className="w-full p-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <InputText label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.firstName} disabled={loading} />
              <InputText label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.lastName} disabled={loading} />
              <InputText label="Email" type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.email} disabled={loading} />
              <InputText label="Password" type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.password} disabled={loading} />
              <SelectDropdown label="Role" id="role" name="role" options={roles} value={formData.role} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.role} disabled={loading} />
              <SelectDropdown label="Department" id="department" name="department" options={departments} value={formData.department} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.department} disabled={loading} />
              <SelectDropdown label="Team" id="team" name="team" options={teams} value={formData.team} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.team} disabled={loading} />
              <SelectDropdown label="Region" id="region" name="region" options={regions} value={formData.region} onChange={handleChange} onBlur={handleBlur} invalid={!!errors.region} disabled={loading} />
            </div>

            <div className="flex gap-8 mt-5">
              <Button type="button" variant="outline" className="w-full" onClick={handleClose} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="secondary" className="w-full" loading={loading}>Create User</Button>
            </div>
          </form>
        </>
      )}

      {success && (
        <div className="px-3 py-2 mx-5 mt-4 bg-green-50 border border-green-400 rounded-md text-green-600 flex items-center gap-3">
          <TimerProgressCircle size={24} duration={4000} />
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="px-3 py-2 mx-5 mt-4 bg-pink-50 border border-red-400 rounded-md text-red-600 flex items-center gap-3">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default NewUserForm;
