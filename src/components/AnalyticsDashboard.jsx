import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Shield,
  Activity,
  MapPin
} from 'lucide-react';
import { analyticsData } from '../data/sampleData';

function AnalyticsDashboard() {
  const navigate = useNavigate();

  const COLORS = ['#14b8a6', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const totalUnsafePrevented = analyticsData.unsafePrescriptionsPrevented.reduce((sum, item) => sum + item.count, 0);
  const currentMonthData = analyticsData.monthlyPrescriptions[analyticsData.monthlyPrescriptions.length - 1];

  const safetyScoreData = [
    { name: 'Safe', value: currentMonthData.safe, color: '#10b981' },
    { name: 'Flagged', value: currentMonthData.unsafe, color: '#f59e0b' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.month || payload[0].payload.pair}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-primary-600" />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">Track prescription safety metrics and trends</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium mb-1">Unsafe Prescriptions Prevented</p>
                <h3 className="text-4xl font-bold text-green-900 mb-2">{totalUnsafePrevented}</h3>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Last 6 months
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium mb-1">Total Prescriptions (Oct)</p>
                <h3 className="text-4xl font-bold text-blue-900 mb-2">{currentMonthData.total}</h3>
                <p className="text-xs text-blue-600 flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium mb-1">Interactions Detected</p>
                <h3 className="text-4xl font-bold text-amber-900 mb-2">{currentMonthData.unsafe}</h3>
                <p className="text-xs text-amber-600 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="bg-amber-600 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-primary-700 font-medium mb-1">Safety Score</p>
                <h3 className="text-4xl font-bold text-primary-900 mb-2">
                  {Math.round((currentMonthData.safe / currentMonthData.total) * 100)}%
                </h3>
                <p className="text-xs text-primary-600 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="bg-primary-600 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Line Chart - Unsafe Prescriptions Prevented */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Unsafe Prescriptions Prevented</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.unsafePrescriptionsPrevented}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#14b8a6" 
                  strokeWidth={3}
                  dot={{ fill: '#14b8a6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Prevented"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Safety Distribution */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Month Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={safetyScoreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {safetyScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Safe Prescriptions</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Flagged for Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Prescriptions Trend */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Prescription Trends</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analyticsData.monthlyPrescriptions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="safe" stackId="a" fill="#10b981" name="Safe" radius={[0, 0, 0, 0]} />
              <Bar dataKey="unsafe" stackId="a" fill="#f59e0b" name="Flagged" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risky Drug Pairs */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Most Common Risky Drug Pairs</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={analyticsData.riskyDrugPairs} 
              layout="vertical"
              margin={{ left: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category" 
                dataKey="pair" 
                stroke="#6b7280"
                style={{ fontSize: '11px' }}
                width={150}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#ef4444" name="Occurrences" radius={[0, 8, 8, 0]}>
                {analyticsData.riskyDrugPairs.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* City-Wise Safety Data */}
        <div className="card mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-primary-600" />
                Unsafe Prescriptions Prevented by City
              </h2>
              <p className="text-sm text-gray-600 mt-1">MedSafePK deployment across major Pakistani cities</p>
            </div>
            <div className="bg-primary-50 px-4 py-2 rounded-lg">
              <p className="text-xs text-primary-700 font-medium">Live Data</p>
            </div>
          </div>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analyticsData.cityWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="city" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="prevented" 
                fill="#10b981" 
                name="Unsafe Prescriptions Prevented" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* City Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {analyticsData.cityWiseData.map((city, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-primary-600" />
                      {city.city}
                    </h3>
                    <p className="text-xs text-gray-500">Population: {city.population}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    city.safetyScore >= 88 ? 'bg-green-100 text-green-800' :
                    city.safetyScore >= 85 ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {city.safetyScore}% Safe
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prevented:</span>
                    <span className="font-bold text-green-600">{city.prevented}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Checked:</span>
                    <span className="font-bold text-gray-900">{city.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hospitals:</span>
                    <span className="font-bold text-primary-600">{city.hospitals}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${city.safetyScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary-600">
                  {analyticsData.cityWiseData.reduce((sum, city) => sum + city.prevented, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Total Prevented</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {analyticsData.cityWiseData.reduce((sum, city) => sum + city.total, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Total Checked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {analyticsData.cityWiseData.reduce((sum, city) => sum + city.hospitals, 0)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Partner Hospitals</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(analyticsData.cityWiseData.reduce((sum, city) => sum + city.safetyScore, 0) / analyticsData.cityWiseData.length)}%
                </p>
                <p className="text-xs text-gray-600 mt-1">Avg Safety Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card bg-green-50 border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Improvement</h3>
                <p className="text-sm text-green-800">
                  Safety score improved by 2% compared to last month
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-amber-50 border border-amber-200">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Alert</h3>
                <p className="text-sm text-amber-800">
                  Ibuprofen + Lisinopril is the most flagged combination
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-blue-50 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Activity</h3>
                <p className="text-sm text-blue-800">
                  445 prescriptions processed this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;

