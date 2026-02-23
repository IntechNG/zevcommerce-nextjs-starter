import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const metadata = {
    title: 'Sign In | ZevCommerce',
    description: 'Log in to your account',
};

export default function LoginPage() {
    return (
        <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-brand">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                    Or{' '}
                    <Link href="/auth/register" className="font-medium text-brand hover:underline">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-surface px-4 py-8 shadow-sm ring-1 ring-border-light sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
                        <Input
                            label="Email address"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                        />

                        <Input
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-border-light text-brand focus:ring-brand"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/auth/forgot-password" className="font-medium text-brand hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <Button type="button" size="lg" className="w-full">
                                Sign in
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
