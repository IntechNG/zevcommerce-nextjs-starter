'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ProfileForm } from '@/components/account/ProfileForm';

export default function ProfilePage() {
    const { customer } = useAuth();

    if (!customer) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Profile</h2>
            <p className="text-sm text-text-secondary">Update your personal information.</p>
            <ProfileForm customer={customer} />
        </div>
    );
}
