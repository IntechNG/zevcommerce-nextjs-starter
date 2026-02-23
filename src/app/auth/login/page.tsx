'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { login } from '@/lib/api/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

export default function LoginPage() {
    const router = useRouter();
    const { setAuth } = useAuth();
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await login(email, password);
            setAuth(result.accessToken, result.customer);
            addToast('Welcome back!');
            router.push(ROUTES.ACCOUNT);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary text-center mb-2">Sign In</h1>
                <p className="text-sm text-text-secondary text-center mb-8">
                    Welcome back. Enter your credentials to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-md bg-red-50 text-sm text-red-700">{error}</div>
                    )}
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                    <div className="text-right">
                        <Link href={ROUTES.FORGOT_PASSWORD} className="text-xs text-text-secondary hover:text-text-primary transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    Don&apos;t have an account?{' '}
                    <Link href={ROUTES.REGISTER} className="font-medium text-brand hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
