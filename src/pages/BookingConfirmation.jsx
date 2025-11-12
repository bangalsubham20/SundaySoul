import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FiCheck, FiDownload, FiShare2 } from 'react-icons/fi';

function BookingConfirmation() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const bookingId = 'BK' + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Message */}
        <Card className="p-12 text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <FiCheck size={40} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600 text-lg mb-2">Your trip booking has been successfully confirmed.</p>
          <p className="text-gray-500">A confirmation email has been sent to your registered email address.</p>
        </Card>

        {/* Booking Details */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>

          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking ID</p>
              <p className="text-lg font-bold text-gray-800">{bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking Date</p>
              <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Trip</p>
              <p className="text-lg font-bold text-gray-800">{tripId === '1' ? 'Winter Spiti Valley' : 'Leh Ladakh'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Trip Date</p>
              <p className="text-lg font-bold text-gray-800">{tripId === '1' ? 'Jan 15-22, 2025' : 'Feb 20-26, 2025'}</p>
            </div>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <FiCheck className="text-green-500 mr-3" />
              <span>Payment received and confirmed</span>
            </div>
            <div className="flex items-center">
              <FiCheck className="text-green-500 mr-3" />
              <span>Travel insurance activated</span>
            </div>
            <div className="flex items-center">
              <FiCheck className="text-green-500 mr-3" />
              <span>Trip leader assigned</span>
            </div>
            <div className="flex items-center">
              <FiCheck className="text-green-500 mr-3" />
              <span>Pre-trip briefing scheduled</span>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-8 mb-8 bg-blue-50 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>

          <div className="space-y-4">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 mr-4">1</div>
              <div>
                <p className="font-bold text-gray-800">Download your booking confirmation</p>
                <p className="text-sm text-gray-600">Check your email for the PDF with all details</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 mr-4">2</div>
              <div>
                <p className="font-bold text-gray-800">Join the community group</p>
                <p className="text-sm text-gray-600">You'll receive a WhatsApp group link to connect with other travelers</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 mr-4">3</div>
              <div>
                <p className="font-bold text-gray-800">Attend the pre-trip briefing</p>
                <p className="text-sm text-gray-600">Scheduled 3 days before your trip (video call)</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 mr-4">4</div>
              <div>
                <p className="font-bold text-gray-800">Pack and prepare!</p>
                <p className="text-sm text-gray-600">Follow the packing list sent to your email</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button fullWidth variant="outline" onClick={() => window.print()}>
            <FiDownload className="inline mr-2" />
            Download Confirmation
          </Button>
          <Button fullWidth variant="outline" onClick={() => window.open('https://wa.me/', '_blank')}>
            <FiShare2 className="inline mr-2" />
            Share with Friends
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button fullWidth variant="secondary" onClick={() => navigate('/profile')}>
            View My Bookings
          </Button>
          <Button fullWidth onClick={() => navigate('/trips')}>
            Explore More Trips
          </Button>
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-8 bg-gray-50 text-center">
          <p className="text-gray-600 mb-4">Need help? Contact us anytime</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:+919797972175" className="text-orange-500 font-bold hover:underline">
              +91 97 97 97 21 75
            </a>
            <span className="text-gray-300 hidden md:block">|</span>
            <a href="mailto:support@wravelcommunity.com" className="text-orange-500 font-bold hover:underline">
              support@wravelcommunity.com
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookingConfirmation;
