
// Full Name: at least 3 letters
export const validateName = (name: string) => {
  if (!name.trim()) return "Full name is required";
  if (!/^[a-zA-Z\s]{3,}$/.test(name)) return "Name must be at least 3 letters";
  return "";
};

// Email regex
export const validateEmail = (email: string) => {
  if (!email.trim()) return "Email is required";
  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
    return "Enter a valid email";
  return "";
};

// Password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
export const validatePassword = (password: string) => {
  if (!password.trim()) return "Password is required";
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    return "Password must be 8+ chars, include uppercase, number & special char";
  }
  return "";
};

// Confirm Password
export const validateConfirmPassword = (password: string, confirm: string) => {
  if (!confirm.trim()) return "Confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return "";
};
