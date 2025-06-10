import React, { useState, createContext, useContext } from 'react';
import { Sun, Moon, Car, Calendar, Clock, User, Phone, Mail, Settings, CheckCircle } from 'lucide-react';

// Theme Context
const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: false,
  toggleTheme: () => {},
});

// Header Component
const Header: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                PEUGEOT
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Yetkili Servis
              </p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

// Success Modal Component
const SuccessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { isDark } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full transform transition-all duration-300`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Randevunuz Oluşturuldu!
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AppContent: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    carModel: '',
    engineName: '',
    modelYear: '',
    transmission: '',
    hasLPG: false,
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // Reset form
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      carModel: '',
      engineName: '',
      modelYear: '',
      transmission: '',
      hasLPG: false,
      appointmentDate: '',
      appointmentTime: '',
      serviceType: '',
      notes: ''
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i).reverse();

  // Generate time slots from 9:00 to 18:00
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Servis Randevusu
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Peugeot aracınız için profesyonel servis hizmeti alın. 
            Randevunuzu kolayca oluşturun ve uzman ekibimizle buluşun.
          </p>
        </div>

        {/* Appointment Form */}
        <div className={`rounded-xl p-8 shadow-lg max-w-4xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Randevu Bilgileri
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <User className="w-4 h-4 inline mr-2" />
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="Adınızı ve soyadınızı girin"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="0555 123 45 67"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Mail className="w-4 h-4 inline mr-2" />
                E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                placeholder="ornek@email.com"
              />
            </div>

            {/* Vehicle Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Aracın Modeli *
                </label>
                <input
                  type="text"
                  required
                  value={formData.carModel}
                  onChange={(e) => setFormData(prev => ({ ...prev, carModel: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="Örn: Peugeot 308"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Motor Adı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.engineName}
                  onChange={(e) => setFormData(prev => ({ ...prev, engineName: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="Örn: 1.6 BlueHDi"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Model Yılı *
                </label>
                <select
                  required
                  value={formData.modelYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, modelYear: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                >
                  <option value="">Yıl Seçin</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vites Türü *
                </label>
                <select
                  required
                  value={formData.transmission}
                  onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                >
                  <option value="">Vites Türü Seçin</option>
                  <option value="Manuel">Manuel</option>
                  <option value="Otomatik">Otomatik</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Settings className="w-4 h-4 inline mr-2" />
                  Servis Türü *
                </label>
                <input
                  type="text"
                  required
                  value={formData.serviceType}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                  placeholder="Örn: Periyodik Bakım, Motor Arızası, Fren Sistemi"
                />
              </div>

              <div></div> {/* Empty div for grid spacing */}
            </div>

            {/* LPG Option */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="lpg"
                checked={formData.hasLPG}
                onChange={(e) => setFormData(prev => ({ ...prev, hasLPG: e.target.checked }))}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
              />
              <div>
                <label htmlFor="lpg" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Aracımda LPG sistemi bulunuyor
                </label>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  LPG sistemi bulunmuyorsa işaretlemeyin
                </p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Randevu Tarihi *
                </label>
                <input
                  type="date"
                  required
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Randevu Saati *
                </label>
                <select
                  required
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointmentTime: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                >
                  <option value="">Saat Seçin</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Ek Notlar
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                placeholder="Varsa özel taleplerinizi buraya yazabilirsiniz..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Randevu Oluştur
            </button>
          </form>
        </div>
      </main>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
};

// Main App with Theme Provider
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AppContent />
    </ThemeContext.Provider>
  );
};

export default App;