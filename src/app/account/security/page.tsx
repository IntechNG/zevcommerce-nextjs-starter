'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { changePassword } from '@/lib/api/customer';

export default function SecurityPage() {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.currentPassword || !form.newPassword) {
            addToast('Please fill in all fields', 'error');
            return;
        }
        if (form.newPassword.length < 8) {
            addToast('New password must be at least 8 characters', 'error');
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            addToast('Passwords do not match', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            addToast('Password changed successfully');
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch {
            addToast('Failed to change password', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Security</h2>
            <p className="text-sm text-text-secondary">Change your password.</p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <Input
                    label="Current Password"
                    type="password"
                    value={form.currentPassword}
                    onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
                    required
                />
                <Input
                    label="New Password"
                    type="password"
                    value={form.newPassword}
                    onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
                    required
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    required
                />
                <Button type="submit" variant="primary" isLoading={isLoading}>
                    Change Password
                </Button>
            </form>
        </div>
    );
}
