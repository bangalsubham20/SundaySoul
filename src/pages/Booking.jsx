import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiUsers, FiCalendar, FiCreditCard, FiCheck, FiX, FiAlertCircle, FiShield } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import tripService from '../services/tripService';
import bookingService from '../services/bookingService';

function Booking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [bookingData, setBookingData] = useState({
    // Traveler Details
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: '',
    gender: '',
    emergencyContact: '',
    emergencyName: '',
    
    // Trip Details
    numberOfTravelers: 1,
    specialRequirements: '',
    dietaryRestrictions: '',
    
    // Payment
    paymentMethod: 'full',
    promoCode: '',
    
    // T&C
    agreeTerms: false,
    agreeCancellation: false
  });

  const [offers, setOffers] = useState([
    {
      id: 1,
      code: 'FIRST10',
      discount: 10,
      type: 'percentage',
      description: 'Get 10% off on your first booking',
      active: true,
      minAmount: 10000
    },
    {
      id: 2,
      code: 'EARLY15',
      discount: 15,
      type: 'percentage',
      description: '15% off for early bird bookings',
      active: true,
      minAmount: 20000
    },
    {
      id: 3,
      code: 'SAVE2000',
      discount: 2000,
      type: 'fixed',
      description: 'Flat ₹2000 discount',
      active: true,
      minAmount: 15000
    }
  ]);

  const [appliedOffer, setAppliedOffer] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Mock trip data
  const mockTrips = {
    1: {
      id: 1,
      name: 'Winter Spiti Valley',
      destination: 'Spiti Valley',
      price: 21150,
      duration: 8,
      startDate: '2025-01-15',
      availableSeats: 4,
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    2: {
      id: 2,
      name: 'Leh Ladakh Adventure',
      destination: 'Ladakh',
      price: 34650,
      duration: 7,
      startDate: '2025-02-20',
      availableSeats: 6,
      image: 'https://images.pexels.com/photos/34555164/pexels-photo-34555164.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        const tripData = await tripService.getTripById(tripId);
        setTrip(tripData);
      } catch (err) {
        console.warn('Using mock data:', err);
        setTrip(mockTrips[tripId]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const applyPromoCode = () => {
    const offer = offers.find(
      o => o.code.toUpperCase() === bookingData.promoCode.toUpperCase() && o.active
    );

    if (!offer) {
      setError('Invalid promo code');
      return;
    }

    const subtotal = trip.price * bookingData.numberOfTravelers;
    
    if (subtotal < offer.minAmount) {
      setError(`Minimum booking amount ₹${offer.minAmount} required for this offer`);
      return;
    }

    const discount = offer.type === 'percentage' 
      ? (subtotal * offer.discount) / 100 
      : offer.discount;

    setAppliedOffer(offer);
    setDiscountAmount(discount);
    setError(null);
  };

  const removePromoCode = () => {
    setAppliedOffer(null);
    setDiscountAmount(0);
    setBookingData(prev => ({ ...prev, promoCode: '' }));
  };

  const calculateTotal = () => {
    const subtotal = trip.price * bookingData.numberOfTravelers;
    const gst = subtotal * 0.05; // 5% GST
    const total = subtotal + gst - discountAmount;
    
    return {
      subtotal,
      gst,
      discount: discountAmount,
      total: Math.max(total, 0)
    };
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!bookingData.fullName || !bookingData.email || !bookingData.phone || !bookingData.age || !bookingData.gender) {
          setError('Please fill all required fields');
          return false;
        }
        if (!bookingData.emergencyContact || !bookingData.emergencyName) {
          setError('Please provide emergency contact details');
          return false;
        }
        break;
      case 2:
        if (bookingData.numberOfTravelers < 1 || bookingData.numberOfTravelers > trip.availableSeats) {
          setError(`Number of travelers must be between 1 and ${trip.availableSeats}`);
          return false;
        }
        break;
      case 3:
        if (!bookingData.agreeTerms || !bookingData.agreeCancellation) {
          setError('Please agree to terms and conditions');
          return false;
        }
        break;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      setProcessing(true);
      
      const pricing = calculateTotal();
      const bookingPayload = {
        tripId: trip.id,
        userId: user.id,
        ...bookingData,
        pricing,
        appliedOffer: appliedOffer?.code || null,
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };

      // Submit to backend
      const response = await bookingService.createBooking(bookingPayload);
      
      // Redirect to confirmation
      navigate(`/booking-confirmation/${response.bookingId || tripId}`);
    } catch (err) {
      console.error('Booking error:', err);
      setError('Booking failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!trip) return <div className="text-center text-white py-12">Trip not found</div>;

  const pricing = calculateTotal();

  const steps = [
    { number: 1, title: 'Personal Details', icon: FiUser },
    { number: 2, title: 'Trip Details', icon: FiUsers },
    { number: 3, title: 'Payment', icon: FiCreditCard }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white py-12">
      {/* Background Effects */}
      <motion.div className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/20 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0] }} transition={{ duration: 12, repeat: Infinity }} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center ${isActive ? 'scale-110' : ''}`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted ? 'bg-green-500 border-green-500'
                      : isActive ? 'bg-purple-500 border-purple-500'
                      : 'bg-white/5 border-white/20'
                    }`}>
                      {isCompleted ? <FiCheck size={24} /> : <Icon size={24} />}
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <div className={`h-0.5 w-24 ${isCompleted ? 'bg-green-500' : 'bg-white/20'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated" className="p-8">
              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg flex items-start gap-3"
                  >
                    <FiAlertCircle className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Personal Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={bookingData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={bookingData.age}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Your age"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={bookingData.gender}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h3 className="text-lg font-bold mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Contact Name *
                          </label>
                          <input
                            type="text"
                            name="emergencyName"
                            value={bookingData.emergencyName}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Emergency contact name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Contact Number *
                          </label>
                          <input
                            type="tel"
                            name="emergencyContact"
                            value={bookingData.emergencyContact}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="+91 XXXXX XXXXX"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Trip Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Trip Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Number of Travelers *
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="secondary"
                          onClick={() => setBookingData(prev => ({
                            ...prev,
                            numberOfTravelers: Math.max(1, prev.numberOfTravelers - 1)
                          }))}
                          disabled={bookingData.numberOfTravelers <= 1}
                        >
                          -
                        </Button>
                        <span className="text-2xl font-bold px-6">{bookingData.numberOfTravelers}</span>
                        <Button
                          variant="secondary"
                          onClick={() => setBookingData(prev => ({
                            ...prev,
                            numberOfTravelers: Math.min(trip.availableSeats, prev.numberOfTravelers + 1)
                          }))}
                          disabled={bookingData.numberOfTravelers >= trip.availableSeats}
                        >
                          +
                        </Button>
                        <span className="text-sm text-slate-400 ml-4">
                          Max {trip.availableSeats} seats available
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Dietary Restrictions (Optional)
                      </label>
                      <input
                        type="text"
                        name="dietaryRestrictions"
                        value={bookingData.dietaryRestrictions}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Vegetarian, Vegan, Allergies"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Special Requirements (Optional)
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={bookingData.specialRequirements}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Payment & Confirmation</h2>

                    {/* Promo Code */}
                    <Card variant="gradient" className="p-6">
                      <h3 className="font-bold mb-4">Have a Promo Code?</h3>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="promoCode"
                          value={bookingData.promoCode}
                          onChange={handleInputChange}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter promo code"
                          disabled={appliedOffer}
                        />
                        {!appliedOffer ? (
                          <Button onClick={applyPromoCode} variant="secondary">
                            Apply
                          </Button>
                        ) : (
                          <Button onClick={removePromoCode} variant="danger">
                            Remove
                          </Button>
                        )}
                      </div>
                      {appliedOffer && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-300"
                        >
                          <FiCheck />
                          <span className="text-sm font-semibold">{appliedOffer.description}</span>
                        </motion.div>
                      )}
                    </Card>

                    {/* Available Offers */}
                    <div>
                      <h3 className="font-bold mb-4">Available Offers</h3>
                      <div className="space-y-3">
                        {offers.filter(o => o.active).map(offer => (
                          <Card key={offer.id} variant="elevated" className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-bold text-purple-400">{offer.code}</p>
                                <p className="text-sm text-slate-400">{offer.description}</p>
                                <p className="text-xs text-slate-500 mt-1">Min. ₹{offer.minAmount}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setBookingData(prev => ({ ...prev, promoCode: offer.code }));
                                  applyPromoCode();
                                }}
                                disabled={appliedOffer?.code === offer.code}
                              >
                                {appliedOffer?.code === offer.code ? 'Applied' : 'Apply'}
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-bold mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        {[
                          { value: 'full', label: 'Pay Full Amount', desc: 'Pay complete amount now' },
                          { value: 'partial', label: 'Pay 50% Now', desc: 'Remaining before 7 days of trip' }
                        ].map(method => (
                          <label
                            key={method.value}
                            className={`block p-4 border rounded-lg cursor-pointer transition ${
                              bookingData.paymentMethod === method.value
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.value}
                                checked={bookingData.paymentMethod === method.value}
                                onChange={handleInputChange}
                                className="w-4 h-4 accent-purple-500"
                              />
                              <div>
                                <p className="font-semibold text-white">{method.label}</p>
                                <p className="text-sm text-slate-400">{method.desc}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={bookingData.agreeTerms}
                          onChange={handleInputChange}
                          className="w-5 h-5 accent-purple-500 mt-0.5"
                        />
                        <span className="text-sm text-slate-300">
                          I agree to the <a href="#" className="text-purple-400 hover:underline">Terms and Conditions</a>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeCancellation"
                          checked={bookingData.agreeCancellation}
                          onChange={handleInputChange}
                          className="w-5 h-5 accent-purple-500 mt-0.5"
                        />
                        <span className="text-sm text-slate-300">
                          I understand the <a href="#" className="text-purple-400 hover:underline">Cancellation Policy</a>
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={processing}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    fullWidth={currentStep === 1}
                    onClick={handleNext}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    isLoading={processing}
                    disabled={!bookingData.agreeTerms || !bookingData.agreeCancellation}
                  >
                    {processing ? 'Processing...' : `Pay ₹${pricing.total.toLocaleString()}`}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card variant="elevated" className="p-6">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

                {/* Trip Image & Name */}
                <div className="mb-4">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-bold text-white">{trip.name}</h4>
                  <p className="text-sm text-slate-400">{trip.destination}</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-y border-white/10">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Price (×{bookingData.numberOfTravelers})</span>
                    <span>₹{pricing.subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({appliedOffer?.code})</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-slate-300">
                    <span>GST (5%)</span>
                    <span>₹{pricing.gst.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-purple-400">₹{pricing.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-300">
                    <FiShield size={16} />
                    <span>Travel Insurance (₹4.5L)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-300">
                    <FiCheck size={16} />
                    <span>Certified Trek Leader</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <FiCheck size={16} />
                    <span>Free Cancellation (7 days)</span>
                  </div>
                </div>
              </Card>

              {/* Security Badge */}
              <Card variant="gradient" className="p-6 text-center">
                <FiShield className="mx-auto mb-3 text-green-400" size={32} />
                <p className="text-sm font-semibold text-white mb-2">Secure Payment</p>
                <p className="text-xs text-slate-400">Your payment is 100% secure and encrypted</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
