'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { ProfileForm } from '@/components/account/ProfileForm';

export default function ProfilePage() {
    const { customer } = useAuth();

    if (!customer) return null;

    return (
        <div className="w-full space-y-8">
            <AccountPageHeader
                title="Profile"
                description="Update your personal information and contact details."
            />
            <ProfileForm customer={customer} />
        </div>
    );
}
