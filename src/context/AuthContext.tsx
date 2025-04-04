
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface UserData {
  role: UserRole;
  name: string | null;
  avatar: string | null;
  email: string | null;
}

interface AuthContextType {
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyPasswordResetCode: (email: string, code: string) => Promise<boolean>;
  userName: string | null;
  userAvatar: string | null;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  isAuthenticated: false,
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  resetPassword: async () => false,
  requestPasswordReset: async () => false,
  verifyPasswordResetCode: async () => false,
  userName: null,
  userAvatar: null,
  userEmail: null
});

export const useAuth = () => useContext(AuthContext);

// Helper to get cookie data
const getUserFromCookies = (): UserData | null => {
  const userDataStr = Cookies.get('userData');
  if (!userDataStr) return null;
  
  try {
    return JSON.parse(userDataStr);
  } catch (error) {
    console.error('Error parsing user data from cookies:', error);
    return null;
  }
}

// Helper to set cookie data
const setUserCookies = (userData: UserData) => {
  // Set cookies to expire in 7 days
  Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
}

// Helper to clear cookie data
const clearUserCookies = () => {
  Cookies.remove('userData');
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    return getUserFromCookies() || {
      role: null,
      name: null,
      avatar: null,
      email: null
    };
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getUserFromCookies();
  });
  
  const navigate = useNavigate();

  // Update cookies whenever user data changes
  useEffect(() => {
    if (isAuthenticated && userData.role) {
      setUserCookies(userData);
    }
  }, [userData, isAuthenticated]);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would validate credentials with a backend
    if (email && password) {
      // Check for minimum password length for security
      if (password.length < 8) {
        toast({
          title: "Invalid Password",
          description: "Password must be at least 8 characters long.",
          variant: "destructive"
        });
        return;
      }
      
      // Set mock user name based on role
      let name, avatar;
      
      if (role === 'admin') {
        name = 'Dr. Rajesh Mishra';
        avatar = 'https://i.pravatar.cc/150?u=admin';
      } else if (role === 'teacher') {
        name = 'Prof. Anjali Patel';
        avatar = 'https://i.pravatar.cc/150?u=teacher';
      } else {
        name = 'Amit Kumar';
        avatar = 'https://i.pravatar.cc/150?u=student';
      }
      
      const newUserData = {
        role,
        name,
        avatar,
        email
      };
      
      setUserData(newUserData);
      setIsAuthenticated(true);
      setUserCookies(newUserData);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${role === 'admin' ? 'Administrator' : role === 'teacher' ? 'Professor' : 'Student'}!`,
      });
      
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  const loginWithGoogle = () => {
    // Simulate Google auth success
    // In a real application, you would integrate with Google OAuth API
    
    // Generate random role for demo purposes
    const roles: UserRole[] = ['student', 'teacher', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)] as UserRole;
    
    // Mock Google user data
    const randomId = Math.floor(Math.random() * 1000);
    const newUserData = {
      role: randomRole,
      name: `Google User ${randomId}`,
      avatar: `https://i.pravatar.cc/150?u=google${randomId}`,
      email: `user${randomId}@gmail.com`
    };
    
    setUserData(newUserData);
    setIsAuthenticated(true);
    setUserCookies(newUserData);
    
    toast({
      title: "Google Sign-in Successful",
      description: `Welcome, ${newUserData.name}!`,
    });
    
    navigate('/');
  };

  const logout = () => {
    setUserData({
      role: null,
      name: null,
      avatar: null,
      email: null
    });
    setIsAuthenticated(false);
    clearUserCookies();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };
  
  // Mock function to request a password reset (would connect to backend API in real app)
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    // In a real app, this would call an API to send a password reset email
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Password Reset Requested",
          description: `If an account exists with ${email}, you will receive a reset code.`,
        });
        resolve(true);
      }, 2000);
    });
  };

  // Mock function to verify a password reset code (would connect to backend API in real app)
  const verifyPasswordResetCode = async (email: string, code: string): Promise<boolean> => {
    // In a real app, this would verify the code with a backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, consider any code valid
        resolve(true);
      }, 2000);
    });
  };

  // Mock function to reset a password (would connect to backend API in real app)
  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    // In a real app, this would update the password in a database
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated. You can now log in with your new password.",
        });
        resolve(true);
      }, 2000);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      userRole: userData.role, 
      isAuthenticated, 
      login, 
      loginWithGoogle,
      logout,
      resetPassword,
      requestPasswordReset,
      verifyPasswordResetCode,
      userName: userData.name,
      userAvatar: userData.avatar,
      userEmail: userData.email
    }}>
      {children}
    </AuthContext.Provider>
  );
};
