export default function TestimonialStatic() {
  return (
    <section className="w-full py-20 bg-[#e7b574] text-center flex items-center justify-center px-4 relative overflow-hidden">
      <img
        src="/mnt/data/8f5b4a19-6d5a-494b-b3f7-e8ce60c6f65f.png"
        alt="decor"
        className="pointer-events-none absolute right-6 top-6 w-56 opacity-10 hidden md:block"
      />

      <div className="max-w-3xl">
        {/* Quote icon */}
        <div className="text-6xl mb-8 font-serif text-gray-900">❞</div>

        {/* Quote text */}
        <p className="text-2xl md:text-4xl font-light text-gray-900 leading-snug">
          "Don't just track the hours. Make the hours worth tracking"
        </p>

        {/* Name */}
        {/* <p className="mt-4 text-sm tracking-wide text-gray-900">AARON MATHEWS</p> */}

      </div>
    </section>
  );
}
