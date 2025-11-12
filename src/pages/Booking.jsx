import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiUser, FiCheck, FiX } from 'react-icons/fi';
import bookingService from '../services/bookingService';
import tripService from '../services/tripService';

function Booking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tripLoading, setTripLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trip, setTrip] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    numTravelers: 1,
    travelers: [
      {
        id: 1,
        fullName: '',
        age: '',
        gender: 'Male',
        phone: user?.phone || '',
        email: user?.email || '',
        emergencyContact: '',
        dietaryRestrictions: 'None'
      }
    ],
    paymentMethod: 'card',
    termsAccepted: false,
  });

  // Mock trip data as fallback
  const mockTrips = {
    1: {
      id: 1,
      name: 'Winter Spiti Valley',
      destination: 'Spiti Valley',
      price: 21150,
      duration: 8,
      startDate: '2025-01-15',
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    2: {
      id: 2,
      name: 'Leh Ladakh Adventure',
      destination: 'Ladakh',
      price: 34650,
      duration: 7,
      startDate: '2025-02-20',
      image: 'https://images.pexels.com/photos/34555164/pexels-photo-34555164/free-photo-of-adventurer-resting-with-motorcycle-by-scenic-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  };

  // Fetch trip on mount
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setTripLoading(true);
        setError(null);

        // Try to fetch from backend
        const tripData = await tripService.getTripById(tripId);
        setTrip(tripData);
      } catch (err) {
        console.warn('Backend unavailable, using mock data:', err);
        // Use mock data as fallback
        const mockTrip = mockTrips[tripId];
        if (mockTrip) {
          setTrip(mockTrip);
        } else {
          setError('Trip not found');
        }
      } finally {
        setTripLoading(false);
      }
    };

    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  // Add traveler
  const addTraveler = () => {
    if (formData.travelers.length < 10) {
      const newTraveler = {
        id: formData.travelers.length + 1,
        fullName: '',
        age: '',
        gender: 'Male',
        phone: '',
        email: '',
        emergencyContact: '',
        dietaryRestrictions: 'None'
      };
      setFormData(prev => ({
        ...prev,
        travelers: [...prev.travelers, newTraveler],
        numTravelers: prev.numTravelers + 1
      }));
    }
  };

  // Remove traveler
  const removeTraveler = (id) => {
    if (formData.travelers.length > 1) {
      setFormData(prev => ({
        ...prev,
        travelers: prev.travelers.filter(t => t.id !== id),
        numTravelers: prev.numTravelers - 1
      }));
    }
  };

  // Update traveler info
  const updateTraveler = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      travelers: prev.travelers.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  // Validate step 1
  const validateStep1 = () => {
    const newErrors = {};
    formData.travelers.forEach((traveler, index) => {
      if (!traveler.fullName.trim()) {
        newErrors[`traveler${index}Name`] = 'Full name is required';
      }
      if (!traveler.age) {
        newErrors[`traveler${index}Age`] = 'Age is required';
      }
      if (!traveler.phone.trim()) {
        newErrors[`traveler${index}Phone`] = 'Phone number is required';
      }
      if (!traveler.email.trim()) {
        newErrors[`traveler${index}Email`] = 'Email is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) {
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.termsAccepted) {
        setErrors({ terms: 'Please accept terms and conditions' });
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const bookingData = {
        tripId: parseInt(tripId),
        travelers: formData.travelers,
        numTravelers: formData.numTravelers,
        totalPrice: calculateTotal(),
        paymentMethod: formData.paymentMethod,
        termsAccepted: formData.termsAccepted,
      };

      // Try to create booking via API
      const booking = await bookingService.createBooking(bookingData);
      navigate(`/booking-confirmation/${booking.id}`);
    } catch (err) {
      console.error('Booking error:', err);
      setErrors({ submit: err.message || 'Booking failed. Please try again.' });
      setLoading(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => trip ? trip.price * formData.numTravelers : 0;
  const calculateServiceFee = () => 500;
  const calculateGST = () => Math.round(calculateSubtotal() * 0.05);
  const calculateTotal = () => calculateSubtotal() + calculateServiceFee() + calculateGST();

  const subtotal = calculateSubtotal();
  const serviceFee = calculateServiceFee();
  const gst = calculateGST();
  const total = calculateTotal();

  // Loading state
  if (tripLoading) return <LoadingSpinner />;

  // Not logged in state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to login to book a trip.</p>
          <Button fullWidth onClick={() => navigate('/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  // Trip not found state
  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The trip you are trying to book does not exist.'}</p>
          <Button fullWidth onClick={() => navigate('/trips')}>Browse Trips</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Your Trip</h1>

        {/* Error notification */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > 1 ? <FiCheck size={20} /> : '1'}
                </div>
                <span className="ml-3 font-semibold text-gray-800">Travelers</span>
              </div>

              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > 2 ? <FiCheck size={20} /> : '2'}
                </div>
                <span className="ml-3 font-semibold text-gray-800">Details</span>
              </div>

              <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <span className="ml-3 font-semibold text-gray-800">Payment</span>
              </div>
            </div>

            {/* Step 1: Travelers */}
            {step === 1 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Travelers</h2>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.numTravelers}
                      disabled
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 w-20 cursor-not-allowed"
                    />
                    <span className="text-gray-600">travelers</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Use Add/Remove buttons below to change count</p>
                </div>

                <div className="space-y-8 mb-8 pb-8 border-b">
                  {formData.travelers.map((traveler, index) => (
                    <Card key={traveler.id} className="p-6 border-l-4 border-orange-500 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Traveler {index + 1}</h3>
                        {formData.travelers.length > 1 && (
                          <button
                            onClick={() => removeTraveler(traveler.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <FiX size={20} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={traveler.fullName}
                            onChange={(e) => updateTraveler(traveler.id, 'fullName', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500 ${
                              errors[`traveler${index}Name`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="John Doe"
                            required
                          />
                          {errors[`traveler${index}Name`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`traveler${index}Name`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Age *
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={traveler.age}
                            onChange={(e) => updateTraveler(traveler.id, 'age', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500 ${
                              errors[`traveler${index}Age`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="25"
                            required
                          />
                          {errors[`traveler${index}Age`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`traveler${index}Age`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                          </label>
                          <select
                            value={traveler.gender}
                            onChange={(e) => updateTraveler(traveler.id, 'gender', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={traveler.phone}
                            onChange={(e) => updateTraveler(traveler.id, 'phone', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500 ${
                              errors[`traveler${index}Phone`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="+91 98765 43210"
                            required
                          />
                          {errors[`traveler${index}Phone`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`traveler${index}Phone`]}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={traveler.email}
                            onChange={(e) => updateTraveler(traveler.id, 'email', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500 ${
                              errors[`traveler${index}Email`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="john@example.com"
                            required
                          />
                          {errors[`traveler${index}Email`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`traveler${index}Email`]}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Emergency Contact
                          </label>
                          <input
                            type="tel"
                            value={traveler.emergencyContact}
                            onChange={(e) => updateTraveler(traveler.id, 'emergencyContact', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Dietary Restrictions
                          </label>
                          <select
                            value={traveler.dietaryRestrictions}
                            onChange={(e) => updateTraveler(traveler.id, 'dietaryRestrictions', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          >
                            <option>None</option>
                            <option>Vegetarian</option>
                            <option>Vegan</option>
                            <option>Gluten Free</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {formData.travelers.length < 10 && (
                  <button
                    onClick={addTraveler}
                    className="text-orange-500 hover:text-orange-600 font-semibold mb-8 transition"
                  >
                    + Add Another Traveler
                  </button>
                )}

                <div className="flex gap-4">
                  <Button fullWidth variant="secondary" onClick={() => navigate(`/trips/${tripId}`)}>
                    Cancel
                  </Button>
                  <Button fullWidth onClick={handleNext}>
                    Continue to Details
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Details & Terms */}
            {step === 2 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Confirm</h2>

                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Trip:</span> {trip.name}</p>
                    <p><span className="font-semibold">Destination:</span> {trip.destination}</p>
                    <p><span className="font-semibold">Duration:</span> {trip.duration} days</p>
                    <p><span className="font-semibold">Date:</span> {trip.startDate}</p>
                    <p><span className="font-semibold">Travelers:</span> {formData.numTravelers}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Travelers</h3>
                  <div className="space-y-3">
                    {formData.travelers.map((traveler, index) => (
                      <div key={traveler.id} className="flex items-center">
                        <FiUser className="text-orange-500 mr-3" />
                        <span className="text-gray-700">{index + 1}. {traveler.fullName} ({traveler.age} years)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">Important Information</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Please reach 30 minutes before departure</li>
                    <li>✓ Carry valid ID proof</li>
                    <li>✓ Bring weather-appropriate clothing</li>
                    <li>✓ Travel insurance is included (up to ₹4.5 lakhs)</li>
                    <li>✓ Cancellation available up to 7 days before trip</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }));
                        if (errors.terms) {
                          setErrors(prev => ({ ...prev, terms: '' }));
                        }
                      }}
                      className="mt-1 mr-3 w-5 h-5 accent-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">I agree to Terms & Conditions</p>
                      <p className="text-sm text-gray-600">I understand the cancellation policy, safety guidelines, and have reviewed all trip details.</p>
                    </div>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-xs mt-2">{errors.terms}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button fullWidth variant="secondary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button fullWidth onClick={handleNext}>
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

                <div className="mb-8 space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="mr-3 w-4 h-4 accent-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">💳 Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="mr-3 w-4 h-4 accent-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">📱 UPI</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="mr-3 w-4 h-4 accent-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">🏦 Net Banking</p>
                      <p className="text-sm text-gray-600">All major banks supported</p>
                    </div>
                  </label>
                </div>

                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    <FiCheck className="inline mr-2" />
                    <span className="font-semibold">Secure Payment</span> - Your payment is encrypted and secure
                  </p>
                </div>

                <div className="flex gap-4 mb-8">
                  <Button fullWidth variant="secondary" onClick={handleBack} disabled={loading}>
                    Back
                  </Button>
                  <Button fullWidth onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>{trip.name}</span>
                  <span className="font-semibold">₹{trip.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>× {formData.numTravelers} traveler{formData.numTravelers > 1 ? 's' : ''}</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Service Fee</span>
                  <span className="font-semibold">₹{serviceFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600 text-sm">
                  <span>GST (5%)</span>
                  <span className="font-semibold">₹{gst.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 mb-8">
                <span>Total Amount</span>
                <span className="text-orange-500">₹{total.toLocaleString()}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <FiCheck className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-green-700"><span className="font-semibold">Free Insurance</span> - Up to ₹4.5 lakhs</span>
                </div>

                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-700"><span className="font-semibold">Certified Leader</span> - AMC/BMC qualified</span>
                </div>

                <div className="flex items-start p-3 bg-orange-50 rounded-lg">
                  <FiCheck className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-orange-700"><span className="font-semibold">Money-back Guarantee</span> - If unsatisfied</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 text-center">
                  By proceeding, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
