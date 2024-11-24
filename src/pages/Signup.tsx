import { useForm } from "react-hook-form";
import { SignupFormInputs, SignupSchema } from "../validations/Signup";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../services/axiosInstance";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const Signup: React.FC = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignupFormInputs>({
      resolver: zodResolver(SignupSchema),
    });
    const { setBreadcrumb } = useBreadcrumb();

  
    const onSubmit = async (data: SignupFormInputs) => {
      try {
        await axiosInstance.post("/users", data);
        setBreadcrumb("Signup successful! You can now log in.", "success");
        window.location.href = "/login"; // Redirect to Login page
      } catch (error: any) {
        setBreadcrumb("Signup failed!", "error");
      }
    };
  
    return (
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
  
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              {...register("username")}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              {...register("role")}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="CLIENT">Client</option>
              <option value="CREATOR">Photographer</option>
            </select>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Signup
          </button>
        </form>
      </div>
    );
  };
  
  export default Signup;