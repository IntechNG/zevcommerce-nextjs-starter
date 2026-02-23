'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOtp, resetPassword } from '@/lib/api/auth';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';
import { Suspense } from 'react';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addToast } = useToast();
    const email = searchParams.get('email') || '';
    const [step, setStep] = useState<'otp' | 'reset'>('otp');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await verifyOtp(email, code);
            setStep('reset');
        } catch {
            addToast('Invalid code. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            addToast('Passwords do not match', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await resetPassword(email, code, newPassword);
            addToast('Password reset successfully!');
            router.push(ROUTES.LOGIN);
        } catch {
            addToast('Failed to reset password', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
                    {step === 'otp' ? 'Enter Reset Code' : 'Set New Password'}
                </h1>
                <p className="text-sm text-text-secondary text-center mb-8">
                    {step === 'otp'
                        ? `We sent a code to ${email}`
                        : 'Choose a new password for your account'}
                </p>

                {step === 'otp' ? (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <Input label="Reset Code" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter the code from your email" required />
                        <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                            Verify Code
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <Input label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        <Input label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                            Reset Password
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex-1 flex items-center justify-center"><p className="text-text-secondary">Loading...</p></div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
