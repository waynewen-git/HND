export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      <section className="section-padding container-max py-16 md:py-24">
        <h1 className="font-bebas text-4xl md:text-6xl">
          About HND
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-hnd-gray-500">
          Musical Instruments — Live is Life
        </p>
      </section>

      <section className="bg-hnd-white dark:bg-transparent">
        <div className="section-padding container-max py-16 md:py-24">
          <div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-hnd-gray-500">
            <p>
              HND is a premium musical instrument brand specializing in electric
              guitars, professional amp heads, and diode Bluetooth speakers. Born
              from a passion for heavy rock, we engineer instruments and audio
              equipment that deliver uncompromising tone and stage-ready
              performance.
            </p>
            <p>
              Our design philosophy combines cold metal aesthetics with
              precision craftsmanship. Every product is built to withstand the
              rigors of touring while delivering the tonal clarity demanded in
              the studio.
            </p>
            <p>
              From six distinct electric guitar models to four professional amp
              heads and our flagship diode Bluetooth speaker, the HND lineup
              represents a complete ecosystem for the modern rock musician.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding container-max py-16 md:py-24">
        <h2 className="font-bebas text-3xl md:text-4xl">
          Our Values
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Precision",
              desc: "Every component is selected and tested for optimal performance and reliability.",
            },
            {
              title: "Passion",
              desc: "We live and breathe rock music. Our products are built by musicians, for musicians.",
            },
            {
              title: "Innovation",
              desc: "Diode amplifier technology and modern design push the boundaries of what instruments can be.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-sm border border-hnd-gray-300/20 p-8 dark:border-hnd-gray-700/50"
            >
              <h3 className="font-bebas text-xl">{v.title}</h3>
              <p className="mt-4 text-hnd-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
