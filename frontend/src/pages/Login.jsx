import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputText from "../components/ui/InputText";
import { FiCheck, FiEye, FiEyeOff, FiX } from "react-icons/fi";

const Login = () => {
  const { user, loading, error, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    if (!isFormValid) return;

    try {
      await login(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setTouched({ email: false, password: false });
    } catch {
      // Error is handled in AuthContext
    }
  };

  // Validation
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const showEmailError = touched.email && !isEmailValid;
  const showEmailValid = touched.email && isEmailValid;

  const showPasswordError = touched.password && !isPasswordValid;
  const showPasswordValid = touched.password && isPasswordValid;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-800 dark:text-white">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <InputText
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            autoComplete="email"
            required
            invalid={showEmailError}
          />
          {showEmailValid && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <FiCheck className="w-4 h-4 text-green-600" />
              Looks good
            </p>
          )}
          {showEmailError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <FiX className="w-4 h-4 text-red-600" />
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <InputText
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur("password")}
            autoComplete="current-password"
            required
            invalid={showPasswordError}
          />
          <button
            type="button"
            className="absolute top-2.5 right-3 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
          {showPasswordValid && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <FiCheck className="w-4 h-4 text-green-600" />
              Password is valid
            </p>
          )}
          {showPasswordError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 
                   0 0 5.373 0 12h4zm2 5.291A7.962 
                   7.962 0 014 12H0c0 3.042 
                   1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
