'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { register } from '@/lib/api/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/lib/constants';

export default function RegisterPage() {
    const router = useRouter();
    const { setAuth } = useAuth();
    const { addToast } = useToast();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await register(form.email, form.password, form.firstName, form.lastName, form.phone || undefined);
            setAuth(result.accessToken, result.customer);
            addToast('Account created! Welcome.');
            router.push(ROUTES.ACCOUNT);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-text-primary text-center mb-2">Create Account</h1>
                <p className="text-sm text-text-secondary text-center mb-8">
                    Join us to track orders and save your preferences.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 rounded-md bg-red-50 text-sm text-red-700">{error}</div>}
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="First Name" value={form.firstName} onChange={e => update('firstName', e.target.value)} required />
                        <Input label="Last Name" value={form.lastName} onChange={e => update('lastName', e.target.value)} required />
                    </div>
                    <Input label="Email" type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                    <Input label="Phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+234..." />
                    <Input label="Password" type="password" value={form.password} onChange={e => update('password', e.target.value)} required />
                    <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                        Create Account
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link href={ROUTES.LOGIN} className="font-medium text-brand hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
