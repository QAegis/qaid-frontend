'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layouts/MainLayout';

export default function DashboardPage() {
    const { loading } = useProtectedRoute();
    const { user } = useAuth();

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-2">Welcome, {user?.name}!</h2>
                    <p className="text-gray-700">
                        This is your personal dashboard. You can manage your account and access all features here.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Dashboard cards/widgets would go here */}
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="font-medium text-lg mb-2">Quick Stats</h3>
                        <p className="text-gray-600">View your activity stats and metrics</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="font-medium text-lg mb-2">Recent Activity</h3>
                        <p className="text-gray-600">See your recent platform activity</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 className="font-medium text-lg mb-2">Account Settings</h3>
                        <p className="text-gray-600">Manage your profile and preferences</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}