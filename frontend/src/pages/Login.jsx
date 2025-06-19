import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputText from "../components/ui/InputText";
import { FiCheck, FiEye, FiEyeOff, FiRefreshCw, FiX } from "react-icons/fi";
import Button from "../components/ui/Button";
import logo from "../assets/app-work.svg"; // Adjust the path as necessary

const Login = () => {
  const { user, loading, error, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

  const passwordTimer = useRef(null);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

   // Validation
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;


  
  const showEmailError = touched.email && !isEmailValid;
  const showEmailValid = touched.email && isEmailValid;

  const showPasswordError = touched.password && !isPasswordValid;
  const showPasswordValid = touched.password && isPasswordValid;



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
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      await login(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setTouched({ email: false, password: false });
            setSubmitted(false);

    } catch {
      // Error is handled in AuthContext
    }
  };

 


  const togglePassword = () => {
   setShowPassword(true);
    if (passwordTimer.current) clearTimeout(passwordTimer.current);
    passwordTimer.current = setTimeout(() => setShowPassword(false), 5000);
  };

  const shouldDisable =
    submitted || touched.email || touched.password
      ? !isFormValid || loading
      : loading;

  return (
    <div className=" font-primary h-screen flex items-center justify-center   dark:bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5  w-full max-w-sm bg-white border border-neutral-300 dark:bg-zinc-800 p-8 rounded-xl  dark:border-zinc-700"
      >
        <h2 className='flex items-center justify-center gap-2 pb-2   text-3xl font-medium uppercase text-neutral-800'>
         <img src={logo} alt="Logo" className=" h-6 " /> 
         Appwork
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
            className="absolute top-2.5 right-3 cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white"
  onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>

        </div>

        <Button
          type="submit"
          disabled={shouldDisable}
          className="w-full"
          variant="secondary"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <FiRefreshCw />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
        {
          (showEmailValid || showEmailError || showPasswordValid || showPasswordError) && (
           
        
        <div className="flex flex-col bg-neutral-50/30  border border-neutral-200 rounded-md">
          {showEmailValid && (
            <p className="py-2 px-3 text-sm flex items-center gap-2 border-b border-neutral-200 text-green-600 dark:text-green-400">
              <FiCheck className=" w-4 h-4 rounded-full border-2 bg-green-600 border-green-600 text-white " />
              Email format is valid
            </p>
          )}
          {showEmailError && (
            <p className="py-2 px-3 text-sm flex items-center gap-2 border-b border-neutral-200 text-pink-500 ">
              <FiX className="w-4 h-4 rounded-full border-2 border-pink-500 bg-pink-500 text-white" />
              Please enter a valid email address
            </p>
          )}
          {showPasswordValid && (
            <p className="py-2 px-3 text-sm flex items-center gap-2 border-b border-neutral-200 text-green-600 dark:text-green-400">
              <FiCheck className=" w-4 h-4 rounded-full border-2 bg-green-600 border-green-600 text-white " />
              Password meets security requirements
            </p>
          )}
          {showPasswordError && (
            <p className="py-2 px-3 text-sm flex items-center gap-2 border-b border-neutral-200 text-pink-500 ">
              <FiX className="w-4 h-4 rounded-full border-2 border-pink-500 bg-pink-500 text-white" />
              Password must be at least 6 characters
            </p>
          )}
        </div>
        )}
      </form>
    </div>
  );
};

export default Login;
