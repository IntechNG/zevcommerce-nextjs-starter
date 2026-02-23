'use client';

import { Input } from '@/components/ui/Input';

interface AddressFormData {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
}

interface AddressFormProps {
    data: AddressFormData;
    onChange: (data: AddressFormData) => void;
    errors?: Partial<Record<keyof AddressFormData, string>>;
}

export function AddressForm({ data, onChange, errors }: AddressFormProps) {
    const update = (field: keyof AddressFormData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
                label="First Name"
                value={data.firstName}
                onChange={e => update('firstName', e.target.value)}
                error={errors?.firstName}
                required
            />
            <Input
                label="Last Name"
                value={data.lastName}
                onChange={e => update('lastName', e.target.value)}
                error={errors?.lastName}
                required
            />
            <div className="sm:col-span-2">
                <Input
                    label="Address"
                    value={data.address1}
                    onChange={e => update('address1', e.target.value)}
                    error={errors?.address1}
                    placeholder="Street address"
                    required
                />
            </div>
            <Input
                label="City"
                value={data.city}
                onChange={e => update('city', e.target.value)}
                error={errors?.city}
                required
            />
            <Input
                label="State / Province"
                value={data.state}
                onChange={e => update('state', e.target.value)}
                error={errors?.state}
                required
            />
            <Input
                label="Country"
                value={data.country}
                onChange={e => update('country', e.target.value)}
                error={errors?.country}
                placeholder="e.g. NG"
                required
            />
            <Input
                label="ZIP / Postal Code"
                value={data.zip}
                onChange={e => update('zip', e.target.value)}
                error={errors?.zip}
            />
            <div className="sm:col-span-2">
                <Input
                    label="Phone"
                    type="tel"
                    value={data.phone}
                    onChange={e => update('phone', e.target.value)}
                    error={errors?.phone}
                    placeholder="+234..."
                />
            </div>
        </div>
    );
}

export type { AddressFormData };
