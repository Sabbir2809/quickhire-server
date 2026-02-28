import config from "../../config";
import { Admin } from "../../models/Admin.model";
import { AuthError, ConflictError } from "../../utils/appError";
import { generateJWT } from "../../utils/generateToken";

const registerAdmin = async (
  email: string,
  password: string,
  adminSecret: string
) => {
  if (adminSecret !== config.admin_secret) {
    throw new AuthError("Invalid admin secret key.");
  }

  const existing = await Admin.findOne({ email });
  if (existing)
    throw new ConflictError("Admin with this email already exists.");

  const admin = await Admin.create({ email, password });
  return admin;
};

const loginAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new AuthError("Invalid credentials.");

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) throw new AuthError("Invalid credentials.");

  const token = generateJWT(
    { id: admin._id, email: admin.email, role: "admin" },
    config.jwt_access_secret_key,
    "7d"
  );
  return {
    token,
    admin: { id: admin._id, email: admin.email, role: admin.role },
  };
};

export const authService = {
  registerAdmin,
  loginAdmin,
};
