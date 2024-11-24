import { useForm } from "react-hook-form";
import { LoginFormInputs, LoginSchema } from "../validations/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const Login: React.FC = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<LoginFormInputs>({
      resolver: zodResolver(LoginSchema),
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const { setBreadcrumb } = useBreadcrumb();
  
    const onSubmit = async (data: LoginFormInputs) => {
      try {
        const response = await axiosInstance.post("/users/login", data);
        login(response.data.token)
        setBreadcrumb("Login successful!", "success");
        navigate("/home"); // Redirect to Home
      } catch (error: any) {
        setBreadcrumb("Login failed!", "error");
      }
    };
  
    return (
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-6 rounded shadow-md w-80"
        >
          <div className="flex align-middle w-full justify-center">
            <img src="/logo_1.svg" alt="aparat_logo" className="w-7"/>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  };

export default Login