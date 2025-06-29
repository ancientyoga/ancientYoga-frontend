import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SubscribeSection from '../components/SubscribeSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import VideoLearning from '../components/VideoLearning';
import PricingSection from '../components/PricingSection';

const Home = () => {
  // In a real app, these would come from your auth/user context
  const isLoggedIn = true;        // Set to false for guests
  const hasPurchased = false;     // True if the course is purchased
  const [subscriberCount, setSubscriberCount] = useState(128); 

  const handleSubscribeClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to subscribe.");
    } else if (!hasPurchased) {
      alert("Please purchase the course to subscribe.");
    } else {
      alert("Thank you for subscribing!");
      setSubscriberCount(prev => prev + 1);
    }
  };

  return (
    <div className="home-page">
      <HeroSection />
      <VideoLearning />
      <AboutSection />
      <PricingSection />
      <ContactSection />
      <SubscribeSection
        isLoggedIn={isLoggedIn}
        hasPurchased={hasPurchased}
        subscriberCount={subscriberCount}
        onSubscribeClick={handleSubscribeClick}
      />
    </div>
  );
};

export default Home;
