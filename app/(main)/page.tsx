'use client';

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Hero Section - Green */}
      <section 
        className="h-screen w-full bg-white flex items-center justify-center"
      >
        <h1 className="text-white text-7xl font-light">Welcome</h1>
      </section>
      
      {/* Projects Section -  */}
      <section 
        className="h-screen w-full bg-green-100 flex flex-col items-center justify-center p-20"
      >
        <h2 className="text-white text-6xl mb-12 font-light">Projects</h2>
        <div className="grid grid-cols-2 gap-8 w-full max-w-7xl">
          <div className="aspect-video bg-[#1A1A1A] rounded-lg"></div>
          <div className="aspect-video bg-[#1A1A1A] rounded-lg"></div>
          <div className="aspect-video bg-[#1A1A1A] rounded-lg"></div>
          <div className="aspect-video bg-[#1A1A1A] rounded-lg"></div>
        </div>
      </section>


      {/* Full-width Image Section */}
      <section className="h-screen w-full bg-[#1A1A1A] flex items-center justify-center">
        <div className="w-full max-w-7xl aspect-video bg-[#2B2B2B] rounded-lg"></div>
      </section>


      {/* Contact Section - Warm Gray */}
      <section className="h-screen w-full bg-[#2C2C2C] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-6xl mb-8 font-light">Get in Touch</h2>
          <p className="text-gray-400 text-xl mb-12">Let's create something amazing together</p>
          <button className="px-8 py-4 bg-white text-[#2C2C2C] rounded-full text-lg hover:bg-opacity-90 transition-all">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer Section - Black */}
      <section className="h-[50vh] w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-8xl font-light mb-8">SL</h2>
          <p className="text-gray-400">© 2024 All rights reserved</p>
        </div>
      </section>
    </main>
  );
}
