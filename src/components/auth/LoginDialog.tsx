'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { setDoc, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type SignUpFormInputs = z.infer<typeof signUpSchema>;

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ isOpen, onOpenChange }: LoginDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpFormInputs>({ resolver: zodResolver(signUpSchema) });

  const onLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsSubmitting(true);
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onOpenChange(false);
      toast({ title: 'Signed in successfully!' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Sign-in failed', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignUp: SubmitHandler<SignUpFormInputs> = async (data) => {
    setIsSubmitting(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      if (firestore && user) {
        await setDoc(doc(firestore, "users", user.uid), {
          id: user.uid,
          email: user.email,
        });
      }
      
      onOpenChange(false);
      toast({ title: 'Account created successfully!' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Sign-up failed', description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (firestore && user) {
        await setDoc(doc(firestore, "users", user.uid), {
          id: user.uid,
          email: user.email,
          username: user.displayName,
        }, { merge: true });
      }

      onOpenChange(false);
      toast({ title: 'Signed in with Google!' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Google sign-in failed', description: error.message });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle>Welcome Back</DialogTitle>
              <DialogDescription>Sign in to access your shelf and contribute.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" {...registerLogin('email')} />
                {loginErrors.email && <p className="text-xs text-destructive">{loginErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" {...registerLogin('password')} />
                {loginErrors.password && <p className="text-xs text-destructive">{loginErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <DialogHeader>
              <DialogTitle>Join OtakuVerse</DialogTitle>
              <DialogDescription>Create an account to start your collection.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" {...registerSignUp('email')} />
                {signUpErrors.email && <p className="text-xs text-destructive">{signUpErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" {...registerSignUp('password')} />
                {signUpErrors.password && <p className="text-xs text-destructive">{signUpErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
