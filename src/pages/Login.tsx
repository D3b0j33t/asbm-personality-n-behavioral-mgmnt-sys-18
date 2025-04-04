
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, LogIn, Mail, ArrowLeft } from 'lucide-react';

// Define validation schemas for forms
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  // Forgot password flow states
  const [forgotPasswordFlow, setForgotPasswordFlow] = useState<'initial' | 'forgotPassword' | 'verifyOtp' | 'resetPassword'>('initial');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      loginSchema.parse({ email, password });
      
      setLoading(true);
      
      // Simulate network request
      setTimeout(() => {
        login(email, password, role);
        setLoading(false);
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    
    // Simulate network request for Google OAuth flow
    setTimeout(() => {
      loginWithGoogle();
      setGoogleLoading(false);
    }, 1500);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      forgotPasswordSchema.parse({ email: forgotPasswordEmail });
      setForgotPasswordLoading(true);
      
      // Simulate OTP sending process
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${forgotPasswordEmail}`,
        });
        setOtpSent(true);
        setForgotPasswordFlow('verifyOtp');
        setForgotPasswordLoading(false);
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setForgotPasswordLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      verifyOtpSchema.parse({ otp });
      setForgotPasswordLoading(true);
      
      // Simulate OTP verification process
      setTimeout(() => {
        // For demo, always succeed with code "123456"
        if (otp === "123456") {
          toast({
            title: "OTP Verified",
            description: "Your identity has been verified. Please set a new password.",
          });
          setForgotPasswordFlow('resetPassword');
        } else {
          toast({
            title: "Invalid OTP",
            description: "The code you entered is incorrect. Please try again.",
            variant: "destructive"
          });
        }
        setForgotPasswordLoading(false);
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setForgotPasswordLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      resetPasswordSchema.parse({ password: newPassword, confirmPassword });
      setForgotPasswordLoading(true);
      
      // Simulate password reset process
      setTimeout(() => {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been reset. You can now login with your new password.",
        });
        setForgotPasswordFlow('initial');
        setForgotPasswordLoading(false);
        // Set the new email in the login form
        setEmail(forgotPasswordEmail);
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setForgotPasswordLoading(false);
    }
  };

  const renderForgotPasswordFlow = () => {
    switch (forgotPasswordFlow) {
      case 'forgotPassword':
        return (
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl animate-scale-in">
            <CardHeader>
              <Button 
                variant="ghost" 
                className="w-fit p-0 absolute top-4 left-4" 
                onClick={() => setForgotPasswordFlow('initial')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <CardTitle className="text-xl text-center mt-4">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email to receive a verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="your.email@asbm.ac.in"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending verification code...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );
        
      case 'verifyOtp':
        return (
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl animate-scale-in">
            <CardHeader>
              <Button 
                variant="ghost" 
                className="w-fit p-0 absolute top-4 left-4" 
                onClick={() => setForgotPasswordFlow('forgotPassword')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <CardTitle className="text-xl text-center mt-4">Verify OTP</CardTitle>
              <CardDescription className="text-center">
                Enter the verification code sent to {forgotPasswordEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.otp ? "border-destructive" : ""
                    }`}
                    required
                  />
                  {errors.otp && (
                    <p className="text-sm text-destructive">{errors.otp}</p>
                  )}
                </div>

                <Alert>
                  <AlertDescription>
                    For demo purposes, use code: <strong>123456</strong>
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );
        
      case 'resetPassword':
        return (
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl animate-scale-in">
            <CardHeader>
              <Button 
                variant="ghost" 
                className="w-fit p-0 absolute top-4 left-4" 
                onClick={() => setForgotPasswordFlow('verifyOtp')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <CardTitle className="text-xl text-center mt-4">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Create a new password for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.password ? "border-destructive" : ""
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.confirmPassword ? "border-destructive" : ""
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Password must:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Be at least 8 characters long</li>
                    <li>Contain at least one uppercase letter</li>
                    <li>Contain at least one lowercase letter</li>
                    <li>Contain at least one number</li>
                    <li>Contain at least one special character</li>
                  </ul>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
                  disabled={forgotPasswordLoading}
                >
                  {forgotPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        );
        
      default:
        return (
          <Card className="w-full bg-white/95 backdrop-blur-md shadow-xl animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl text-center">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full mb-6" onValueChange={(value) => setRole(value as 'student' | 'teacher' | 'admin')}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger 
                    value="student" 
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Student
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teacher"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`${role}@asbm.ac.in`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="p-0 h-auto text-xs text-primary hover:text-primary/80"
                      onClick={() => setForgotPasswordFlow('forgotPassword')}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.password ? "border-destructive" : ""
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-md transform hover:-translate-y-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </>
                  )}
                </Button>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-4 transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-1"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting to Google...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Sign in with Google
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-6 bg-gray-50 p-3 rounded-md border border-gray-100">
                  <p className="font-semibold">Demo accounts (any password works):</p>
                  <div className="mt-1 space-y-1">
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('student@asbm.ac.in')}>student@asbm.ac.in</p>
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('teacher@asbm.ac.in')}>teacher@asbm.ac.in</p>
                    <p className="hover:text-primary transition-colors cursor-pointer" onClick={() => setEmail('admin@asbm.ac.in')}>admin@asbm.ac.in</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img 
          src="/lovable-uploads/7afce98d-f21c-40c0-a054-0b0431ca10c9.png" 
          alt="ASBM University Campus" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/e837c76a-f20c-4215-b385-a87dd3a9f7ee.png" 
              alt="ASBM University" 
              className="h-16 mb-4 animate-scale-in" 
            />
          </div>
          <p className="mt-1 text-white text-lg font-semibold">Student Behavior Analysis System</p>
        </div>
        
        {renderForgotPasswordFlow()}
      </div>
    </div>
  );
};

export default Login;
