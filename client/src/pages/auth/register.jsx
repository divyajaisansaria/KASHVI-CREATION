import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn"; // ✅ Import zxcvbn

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle password strength check
  function handlePasswordChange(event) {
    const password = event.target.value;
    setFormData({ ...formData, password });

    const strength = zxcvbn(password); // Check strength
    setPasswordStrength(strength);
  }

  function onSubmit(event) {
    event.preventDefault();

    // Prevent weak passwords (optional, but recommended)
    if (passwordStrength?.score < 2) {
      toast({
        title: "Password is too weak! Please use a stronger password.",
        variant: "destructive",
      });
      return;
    }

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title:"Registration Successful!",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <div>
        {/* Welcome message outside the form */}
        <div className="text-center mb-6">
          <h4 className="text-3xl font-bold tracking-tight text-[#0a373b]">
            Welcome to Kashvi Creation!
          </h4>
          <p className="text-[#0a373b] text-sm">It's quick and easy to set up an account</p>
        </div>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={onSubmit} className="space-y-2">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-[400px]  px-2  py-1 border border-[#b2966c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-[400px]  px-2  py-1 border border-[#b2966c]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-[400px]  px-2  py-1 border border-[#b2966c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a373b] transition"
              value={formData.password}
              onChange={handlePasswordChange} // Check password strength
              required
            />
            {/* Show Password Strength */}
            {passwordStrength && (
              <div className="mt-2 text-xs text-gray-500">
                <p className="font-medium">Strength: {["Weak", "Fair", "Good", "Strong", "Very Strong"][passwordStrength.score]}</p>
                <div className="h-2 w-full bg-gray-300 rounded-md">
                  <div
                    className={`h-2 ${["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"][passwordStrength.score]} rounded-md`}
                    style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0a373b] text-white py-3 rounded-md hover:bg-[#085b60] transition"
          >
            Sign Up
          </button>
        </form>
</div>
        {/* Login link outside the form */}
        <div className="text-center font:large mt-4">
          <p className="text-sm">
            Already have an account?{" "}<br/>
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
