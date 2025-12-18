import videoBg from "../assets/807df81fad7c756b54ef204412fcc3e6.mp4"


export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-20 text-white">
        
        {/* Brand Name */}
        <h1 className="text-6xl md:text-[160px] font-light leading-none">
          ADIOS
        </h1>

        {/* Bottom row */}
        <div className="mt-6 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between">

          {/* Left Text */}
          <div>
            <p className="text-2xl md:text-4xl font-light leading-tight">
              Designed to Feel  <br /> Different!
            </p>
          </div>

          {/* Right Text + Button */}
          <div className="mt-6 md:mt-0 text-right">
            <button className="mt-6 px-8 py-3 rounded-full bg-white text-black text-lg font-medium hover:opacity-80">
              Shop Now
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

