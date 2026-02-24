'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth, type AuthCustomer } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { updateProfile } from '@/lib/api/customer';

export function ProfileForm({ customer }: { customer: AuthCustomer }) {
    const { updateCustomer } = useAuth();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        phone: customer.phone || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName.trim() || !form.lastName.trim()) {
            addToast('First and last name are required', 'error');
            return;
        }
        setIsLoading(true);
        try {
            await updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
            });
            updateCustomer({
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
            });
            addToast('Profile updated successfully');
        } catch {
            addToast('Failed to update profile', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
                label="Email"
                value={customer.email}
                disabled
                className="bg-surface-hover cursor-not-allowed"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    required
                />
                <Input
                    label="Last Name"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    required
                />
            </div>
            <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+234..."
            />
            <Button type="submit" variant="primary" isLoading={isLoading}>
                Save Changes
            </Button>
        </form>
    );
}
