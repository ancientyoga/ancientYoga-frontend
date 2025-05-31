// src/pages/Home.js
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import SampleVideoCard from '../components/SampleVideoCard';
import SubscribeSection from '../components/SubscribeSection';
import AboutSection from '../components/AboutSection';
import MissionSection from '../components/MissionSection';
import ContactSection from '../components/ContactSection';
import SampleVideosSection from '../components/SampleVideosSection';

const Home = () => {
  // These would be dynamically fetched or from context/auth in a real app
  const [isLoggedIn, setIsLoggedIn] = useState(true);        // set false for guest
  const [hasPurchased, setHasPurchased] = useState(false);   // true if course is purchased
  const [subscriberCount, setSubscriberCount] = useState(128); // total subscribers

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
    <>
      <HeroSection />
      <SampleVideoCard />
      <SampleVideosSection />
      <SubscribeSection
        isLoggedIn={isLoggedIn}
        hasPurchased={hasPurchased}
        subscriberCount={subscriberCount}
        onSubscribeClick={handleSubscribeClick}
      />
      
      <AboutSection />
      <MissionSection />
      <ContactSection />
      
    </>
  );
};

export default Home;
