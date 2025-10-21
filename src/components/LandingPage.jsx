import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Shield, 
  FileText, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Stethoscope,
  Users,
  Award,
  TrendingUp,
  Lock,
  Globe,
  Heart,
  AlertTriangle
} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const features = [
    {
      icon: Brain,
      title: 'AI Drug Interaction Alerts',
      description: 'Advanced AI analyzes prescriptions in real-time to detect dangerous drug interactions, banned medications, and dosage issues. Powered by DRAP-compliant databases.',
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: FileText,
      title: 'Smart Digital Prescriptions',
      description: 'Generate secure, QR-verified digital prescriptions with blockchain-ready technology. OCR support for handwritten prescriptions and digital signatures for authenticity.',
      color: 'from-primary-500 to-teal-500',
      bgColor: 'from-primary-50 to-teal-50',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600'
    },
    {
      icon: Shield,
      title: 'Pharmacy Verification & Patient Safety',
      description: 'Pharmacists verify prescriptions instantly with QR codes. Patients access their medical records securely. Complete audit trail for regulatory compliance.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ];

  const stats = [
    { icon: CheckCircle, value: '10,000+', label: 'Prescriptions Checked', color: 'text-green-600' },
    { icon: AlertTriangle, value: '673', label: 'Interactions Prevented', color: 'text-amber-600' },
    { icon: Building2, value: '158', label: 'Partner Hospitals', color: 'text-blue-600' },
    { icon: TrendingUp, value: '86%', label: 'Safety Score', color: 'text-purple-600' }
  ];

  const benefits = [
    { icon: Stethoscope, text: 'Doctor-friendly interface' },
    { icon: Lock, text: 'Encrypted & secure' },
    { icon: Globe, text: 'DRAP compliant' },
    { icon: Users, text: 'Multi-stakeholder platform' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">
                  MedSafe<span className="text-primary-600">PK</span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToAbout}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Logo & Title */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-primary-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                <Activity className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-navy-900">
                MedSafe<span className="text-primary-600">PK</span>
              </h1>
            </div>

            {/* Tagline */}
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI for Safer Prescriptions in Pakistan
            </h2>

            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Prevent drug interactions. Protect patients. Empower doctors.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Try Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToAbout}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-primary-200 hover:border-primary-300 transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Safety Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              MedSafePK combines cutting-edge AI with local healthcare standards to create the safest prescription ecosystem in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all border border-gray-200`}
              >
                <div className={`${feature.iconBg} p-4 rounded-xl inline-block mb-6`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <benefit.icon className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About MedSafePK
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-10 shadow-lg border border-gray-200">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-gray-900">MedSafePK</strong> is an AI-powered healthcare safety platform designed specifically for Pakistan's healthcare ecosystem. Our mission is to eliminate prescription errors, prevent dangerous drug interactions, and ensure patient safety through intelligent technology.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-primary-600" />
                    Our Mission
                  </h3>
                  <p>
                    To empower doctors, pharmacists, and patients with AI-driven prescription safety tools that are compliant with local regulations (DRAP), culturally appropriate, and accessible across Pakistan.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-red-500" />
                    Why We Built This
                  </h3>
                  <p>
                    Prescription errors cause thousands of preventable complications annually. MedSafePK leverages artificial intelligence to catch errors before they reach patients, saving lives and improving healthcare outcomes.
                  </p>
                </div>
              </div>

              <div className="bg-primary-100 border-l-4 border-primary-600 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-primary-900 mb-3">Key Highlights:</h3>
                <ul className="space-y-2 text-primary-900">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Real-time AI analysis</strong> of drug interactions and contraindications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>DRAP-compliant</strong> databases with local banned drugs and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Digital prescriptions</strong> with QR verification and blockchain readiness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Privacy-first</strong> with encrypted data and patient consent management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span><strong>Multi-language support</strong> (Urdu/English) for accessibility</span>
                  </li>
                </ul>
              </div>

              <p className="text-center text-lg font-semibold text-primary-700 mt-8">
                Join us in making healthcare safer for millions of Pakistanis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Safer Prescriptions?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Try our interactive demo and see how MedSafePK can transform your practice.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all text-lg flex items-center space-x-3 mx-auto"
          >
            <span>Start Demo Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="mt-6 text-blue-100 text-sm">
            No registration required • Full features available • Sample data included
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">
                MedSafe<span className="text-primary-400">PK</span>
              </span>
            </div>
            
            <div className="text-center text-sm">
              <p>© 2025 MedSafePK | Built for Pakistan's Healthcare System | Ethical AI Compliant</p>
            </div>

            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">DRAP Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

