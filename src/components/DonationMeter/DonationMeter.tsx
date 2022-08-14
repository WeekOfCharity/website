export const DonationMeter = () => {
  return (
    <section className="mx-5 md:mx-10 relative">
      <div className="bg-opacity-50 flex flex-col items-center p-5 md:p-10">
        <div className="pb-10">
          <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-neutral-900 text-center transform-gpu uppercase">
            Aktueller
            <br />
            Spendenstand
          </div>
        </div>
        <div className="font-fat text-neutral-500 text-4xl md:text-8xl">
          <span>2.471,30</span>
        </div>
        <div className="font-round2 font-bold text-neutral-400">EURO</div>

        <div className="h-48 px-10 md:px-20 w-screen">
          <div className="bg-persian-500 h-10 w-full"></div>
        </div>
      </div>

      <div className="absolute bg-neutral-100 left-1/2 h-full max-w-xs min-w-[160px] top-0 transform-gpu -translate-x-1/2 w-1/3 -z-10"></div>
    </section>
  );
};
