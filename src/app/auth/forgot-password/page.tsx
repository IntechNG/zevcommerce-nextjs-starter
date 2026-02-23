'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/lib/api/auth';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await forgotPassword(email);
            addToast('Reset code sent to your email');
            router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`);
        } catch {
            addToast('Failed to send reset code', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary text-center mb-2">Forgot Password</h1>
                <p className="text-sm text-text-secondary text-center mb-8">
                    Enter your email and we&apos;ll send you a reset code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                        Send Reset Code
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    <Link href={ROUTES.LOGIN} className="font-medium text-brand hover:underline">Back to Sign In</Link>
                </p>
            </div>
        </div>
    );
}
