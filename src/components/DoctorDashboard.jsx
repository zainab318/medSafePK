import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Cpu
} from 'lucide-react';

function DoctorDashboard({ doctorName }) {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: 'Prescriptions Today',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Interactions Detected',
      value: '8',
      change: '-15%',
      icon: AlertTriangle,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      title: 'Patients Treated',
      value: '142',
      change: '+8%',
      icon: Users,
      color: 'bg-primary-500',
      lightColor: 'bg-primary-50',
      textColor: 'text-primary-600'
    },
    {
      title: 'Safety Score',
      value: '98%',
      change: '+2%',
      icon: CheckCircle,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const recentActivity = [
    { patient: 'Ahmed Khan', action: 'Prescription verified', time: '10 mins ago', status: 'success' },
    { patient: 'Fatima Ali', action: 'Interaction detected', time: '25 mins ago', status: 'warning' },
    { patient: 'Hassan Mahmood', action: 'Prescription approved', time: '1 hour ago', status: 'success' },
    { patient: 'Zainab Malik', action: 'New consultation', time: '2 hours ago', status: 'info' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', icon: FileText, path: '/doctor-dashboard', color: 'text-primary-600' },
    { name: 'Write Prescription', icon: FileText, path: '/prescription-checker', color: 'text-primary-600' },
    { name: 'Patient Records', icon: Users, path: '/patient-records', color: 'text-blue-600' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics', color: 'text-purple-600' },
    { name: 'System Architecture', icon: Cpu, path: '/architecture', color: 'text-indigo-600' },
    { name: 'Settings', icon: Settings, path: '/settings', color: 'text-gray-600' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard Menu</h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                <span className="text-gray-700 font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Action Button */}
        <div className="px-6 pb-6">
          <button
            onClick={() => navigate('/prescription-checker')}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            <Plus className="w-5 h-5" />
            <span>New Prescription</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {doctorName}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your prescriptions today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat) => (
              <div key={stat.title} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className={`w-4 h-4 ${stat.textColor}`} />
                      <span className={`text-sm font-medium ${stat.textColor}`}>
                        {stat.change} from yesterday
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.lightColor} p-3 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100' :
                        activity.status === 'warning' ? 'bg-amber-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {activity.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                        {activity.status === 'info' && <FileText className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.patient}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/prescription-checker')}
                  className="w-full flex items-center space-x-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
                >
                  <div className="bg-primary-600 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Check Prescription</span>
                </button>

                <button
                  onClick={() => navigate('/patient-records')}
                  className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">View Patients</span>
                </button>

                <button
                  onClick={() => navigate('/analytics')}
                  className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">View Analytics</span>
                </button>
              </div>

              {/* Safety Tips */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Safety Tip
                </h3>
                <p className="text-sm text-green-800">
                  Always verify patient allergies before prescribing NSAIDs or antibiotics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DoctorDashboard;
