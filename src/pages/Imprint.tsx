import { Brush4 } from "../components/Brushes/Brush4";

export const Imprint = () => {
  return (
    <main className="text-neutral-800 woc-accent-neutral">
      <header className="px-5 py-20 relative text-center">
        <div className="font-pally font-bold max-w-screen-md mx-auto text-accent-500 text-4xl md:text-7xl w-4/5">
          Impressum
        </div>

        <Brush4 className="absolute h-64 left-1/2 mt-4 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5 space-y-2 text-justify">
        <div className="font-round2 font-bold uppercase">
          Angaben gemäß § 5 TMG
        </div>
        <p>
          Sven Gohlke
          <br />
          Rosenallee 26
          <br />
          52249 Eschweiler
        </p>
        <p>E-Mail-Adresse: svengo16@outlook.com</p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Haftungsausschluss:
        </div>

        <div className="font-round2 font-bold uppercase">
          Haftung für Inhalte
        </div>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>

        <div className="font-round2 font-bold uppercase">Haftung für Links</div>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
      </section>
    </main>
  );
};
