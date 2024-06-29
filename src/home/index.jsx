import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React, { useState, useEffect } from 'react'
import robot from '../assets/robo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Home() {
  const [step, setStep] = useState(0);
  const steps = [
    "Sign in",
    "Create your resume",
    "Customize it as you wish",
    "Download your resume"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div>
      <Header />
      <div className='relative h-screen'>
        <img src={robot} className='absolute inset-0 object-cover object-top w-full h-full' alt='Robot' />
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-white' >
          <h1 className='text-6xl font-bold mb-4'style={{ marginTop: '-280px' }}>AI Resume Builder</h1>
          <h2 className='text-2xl'>{steps[step]}</h2>
        </div>
        <div className='absolute inset-0 bg-black opacity-50'></div> {/* Optional: To add a dark overlay on the image */}
      </div>
      <footer className='bg-gray-900 text-white py-6'>
        <div className='container mx-auto text-center'>
          <p className='text-lg mb-4'>Invite your friends to use our AI Resume Builder</p>
          <div className='flex justify-center space-x-4'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='text-white'>
              <FontAwesomeIcon icon={faFacebook} size='2x' />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='text-white'>
              <FontAwesomeIcon icon={faTwitter} size='2x' />
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='text-white'>
              <FontAwesomeIcon icon={faLinkedin} size='2x' />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
