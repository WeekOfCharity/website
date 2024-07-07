import { Link } from "react-router-dom";
import { Brush4 } from "../components/Brushes/Brush4";
import { useTitle } from "../hooks/useTitle";
import { useTranslation } from "react-i18next";

export const Privacy = () => {
  const { t } = useTranslation();
  useTitle(t("subNav.dataPrivacy"));

  return (
    <main className="text-neutral-800 woc-accent-neutral">
      <header className="px-5 py-20 relative text-center">
        <h1 className="font-pally font-bold max-w-screen-md mx-auto text-accent-500 text-4xl md:text-7xl w-full md:w-4/5">
          Datenschutzerklärung
        </h1>

        <Brush4 className="absolute h-64 left-1/2 mt-4 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5 space-y-2 text-justify">
        <div className="font-round2 font-bold text-xl">Einleitung</div>
        <p>
          Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
          aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend
          auch kurz als "Daten“ bezeichnet) wir zu welchen Zwecken und in
          welchem Umfang im Rahmen der Bereitstellung unserer Applikation
          verarbeiten.
        </p>
        <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
        <p>Stand: 18. September 2022</p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Inhaltsübersicht
        </div>
        <ul className="list-inside list-disc">
          <li>Einleitung</li>
          <li>Verantwortlicher</li>
          <li>Übersicht der Verarbeitungen</li>
          <li>Maßgebliche Rechtsgrundlagen</li>
          <li>Sicherheitsmaßnahmen</li>
          <li>Löschung von Daten</li>
          <li>
            Einsatz von Online-Plattformen zu Angebots- und Vertriebszwecken
          </li>
          <li>Zahlungsverfahren</li>
          <li>Bereitstellung des Onlineangebotes und Webhosting</li>
          <li>Präsenzen in sozialen Netzwerken (Social Media)</li>
          <li>Plugins und eingebettete Funktionen sowie Inhalte</li>
          <li>Änderung und Aktualisierung der Datenschutzerklärung</li>
          <li>Rechte der betroffenen Personen</li>
          <li>Begriffsdefinitionen</li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-xl">
          Verantwortlicher
        </div>
        <p>
          Sven Gohlke
          <br />
          Rosenallee 26
          <br />
          52249 Eschweiler
        </p>
        <p>E-Mail-Adresse: svengo16@outlook.com</p>
        <p>
          Impressum:{" "}
          <Link to="/impressum">https://weekofcharity.de/impressum</Link>
        </p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Übersicht der Verarbeitungen
        </div>
        <p>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und
          die Zwecke ihrer Verarbeitung zusammen und verweist auf die
          betroffenen Personen.
        </p>

        <div className="font-round2 font-bold pt-4 uppercase">
          Arten der verarbeiteten Daten
        </div>
        <ul className="list-inside list-disc">
          <li>Bestandsdaten</li>
          <li>Zahlungsdaten</li>
          <li>Kontaktdaten</li>
          <li>Inhaltsdaten</li>
          <li>Vertragsdaten</li>
          <li>Nutzungsdaten</li>
          <li>Meta-/Kommunikationsdaten</li>
        </ul>

        <div className="font-round2 font-bold pt-4 uppercase">
          Kategorien betroffener Personen
        </div>
        <ul className="list-inside list-disc">
          <li>Kunden</li>
          <li>Interessenten</li>
          <li>Nutzer</li>
        </ul>

        <div className="font-round2 font-bold pt-4 uppercase">
          Zwecke der Verarbeitung
        </div>
        <ul className="list-inside list-disc">
          <li>Erbringung vertraglicher Leistungen und Kundenservice</li>
          <li>Kontaktanfragen und Kommunikation</li>
          <li>Sicherheitsmaßnahmen</li>
          <li>Feedback</li>
          <li>Marketing</li>
          <li>
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit
          </li>
          <li>Informationstechnische Infrastruktur</li>
        </ul>

        <div className="font-round2 font-bold pt-4 uppercase">
          Maßgebliche Rechtsgrundlagen
        </div>
        <p>
          Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der
          DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte
          nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale
          Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten
          können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen
          maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung
          mit.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1
              lit. b) DSGVO)
            </span>{" "}
            - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen
            Vertragspartei die betroffene Person ist, oder zur Durchführung
            vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der
            betroffenen Person erfolgen.
          </li>
          <li>
            <span className="font-semibold">
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)
            </span>{" "}
            - Die Verarbeitung ist zur Wahrung der berechtigten Interessen des
            Verantwortlichen oder eines Dritten erforderlich, sofern nicht die
            Interessen oder Grundrechte und Grundfreiheiten der betroffenen
            Person, die den Schutz personenbezogener Daten erfordern,
            überwiegen.
          </li>
        </ul>

        <p>
          Zusätzlich zu den Datenschutzregelungen der
          Datenschutz-Grundverordnung gelten nationale Regelungen zum
          Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum
          Schutz vor Missbrauch personenbezogener Daten bei der
          Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält
          insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf
          Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer
          Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke
          und zur Übermittlung sowie automatisierten Entscheidungsfindung im
          Einzelfall einschließlich Profiling. Des Weiteren regelt es die
          Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses (§ 26
          BDSG), insbesondere im Hinblick auf die Begründung, Durchführung oder
          Beendigung von Beschäftigungsverhältnissen sowie die Einwilligung von
          Beschäftigten. Ferner können Landesdatenschutzgesetze der einzelnen
          Bundesländer zur Anwendung gelangen.
        </p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Sicherheitsmaßnahmen
        </div>
        <p>
          Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
          Berücksichtigung des Stands der Technik, der Implementierungskosten
          und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
          sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des
          Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen
          geeignete technische und organisatorische Maßnahmen, um ein dem Risiko
          angemessenes Schutzniveau zu gewährleisten.
        </p>
        <p>
          Zu den Maßnahmen gehören insbesondere die Sicherung der
          Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch
          Kontrolle des physischen und elektronischen Zugangs zu den Daten als
          auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der
          Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir
          Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten,
          die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
          gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener
          Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software
          sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
          Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
        </p>
        <p>
          Kürzung der IP-Adresse: Sofern IP-Adressen von uns oder von den
          eingesetzten Dienstleistern und Technologien verarbeitet werden und
          die Verarbeitung einer vollständigen IP-Adresse nicht erforderlich
          ist, wird die IP-Adresse gekürzt (auch als "IP-Masking" bezeichnet).
          Hierbei werden die letzten beiden Ziffern, bzw. der letzte Teil der
          IP-Adresse nach einem Punkt entfernt, bzw. durch Platzhalter ersetzt.
          Mit der Kürzung der IP-Adresse soll die Identifizierung einer Person
          anhand ihrer IP-Adresse verhindert oder wesentlich erschwert werden.
        </p>
        <p>
          TLS-Verschlüsselung (https): Um Ihre via unserem Online-Angebot
          übermittelten Daten zu schützen, nutzen wir eine TLS-Verschlüsselung.
          Sie erkennen derart verschlüsselte Verbindungen an dem Präfix https://
          in der Adresszeile Ihres Browsers.
        </p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Löschung von Daten
        </div>
        <p>
          Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen
          Vorgaben gelöscht, sobald deren zur Verarbeitung erlaubten
          Einwilligungen widerrufen werden oder sonstige Erlaubnisse entfallen
          (z.B. wenn der Zweck der Verarbeitung dieser Daten entfallen ist oder
          sie für den Zweck nicht erforderlich sind). Sofern die Daten nicht
          gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke
          erforderlich sind, wird deren Verarbeitung auf diese Zwecke
          beschränkt. D.h., die Daten werden gesperrt und nicht für andere
          Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder
          steuerrechtlichen Gründen aufbewahrt werden müssen oder deren
          Speicherung zur Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen
          oder juristischen Person erforderlich ist.
        </p>
        <p>
          Unsere Datenschutzhinweise können ferner weitere Angaben zu der
          Aufbewahrung und Löschung von Daten beinhalten, die für die jeweiligen
          Verarbeitungen vorrangig gelten.
        </p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Einsatz von Online-Plattformen zu Angebots- und Vertriebszwecken
        </div>
        <p>
          Wir bieten unsere Leistungen auf Online-Plattformen, die von anderen
          Dienstanbietern betrieben werden, an. In diesem Zusammenhang gelten
          zusätzlich zu unseren Datenschutzhinweisen die Datenschutzhinweise der
          jeweiligen Plattformen. Dies gilt insbesondere im Hinblick auf die
          Durchführung des Zahlungsvorgangs und der auf den Plattformen
          eingesetzten Verfahren zur Reichweitemessung und zum
          interessensbezogenen Marketing.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Verarbeitete Datenarten:</span>{" "}
            Bestandsdaten (z.B. Namen, Adressen); Zahlungsdaten (z.B.
            Bankverbindungen, Rechnungen, Zahlungshistorie); Kontaktdaten (z.B.
            E-Mail, Telefonnummern); Vertragsdaten (z.B. Vertragsgegenstand,
            Laufzeit, Kundenkategorie); Nutzungsdaten (z.B. besuchte Webseiten,
            Interesse an Inhalten, Zugriffszeiten); Meta-/Kommunikationsdaten
            (z.B. Geräte-Informationen, IP-Adressen)
          </li>
          <li>
            <span className="font-semibold">Betroffene Personen:</span> Kunden
          </li>
          <li>
            <span className="font-semibold">Zwecke der Verarbeitung:</span>{" "}
            Erbringung vertraglicher Leistungen und Kundenservice; Marketing
          </li>
          <li>
            <span className="font-semibold">Rechtsgrundlagen:</span>{" "}
            Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1
            lit. b) DSGVO)
          </li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-xl">
          Zahlungsverfahren
        </div>
        <p>
          Im Rahmen von Vertrags- und sonstigen Rechtsbeziehungen, aufgrund
          gesetzlicher Pflichten oder sonst auf Grundlage unserer berechtigten
          Interessen bieten wir den betroffenen Personen effiziente und sichere
          Zahlungsmöglichkeiten an und setzen hierzu neben Banken und
          Kreditinstituten weitere Dienstleister ein (zusammenfassend
          "Zahlungsdienstleister").
        </p>
        <p>
          Zu den durch die Zahlungsdienstleister verarbeiteten Daten gehören
          Bestandsdaten, wie z.B. der Name und die Adresse, Bankdaten, wie z.B.
          Kontonummern oder Kreditkartennummern, Passwörter, TANs und Prüfsummen
          sowie die Vertrags-, Summen- und empfängerbezogenen Angaben. Die
          Angaben sind erforderlich, um die Transaktionen durchzuführen. Die
          eingegebenen Daten werden jedoch nur durch die Zahlungsdienstleister
          verarbeitet und bei diesen gespeichert. D.h., wir erhalten keine
          konto- oder kreditkartenbezogenen Informationen, sondern lediglich
          Informationen mit Bestätigung oder Negativbeauskunftung der Zahlung.
          Unter Umständen werden die Daten seitens der Zahlungsdienstleister an
          Wirtschaftsauskunfteien übermittelt. Diese Übermittlung bezweckt die
          Identitäts- und Bonitätsprüfung. Hierzu verweisen wir auf die AGB und
          die Datenschutzhinweise der Zahlungsdienstleister.
        </p>
        <p>
          Für die Zahlungsgeschäfte gelten die Geschäftsbedingungen und die
          Datenschutzhinweise der jeweiligen Zahlungsdienstleister, welche
          innerhalb der jeweiligen Webseiten bzw. Transaktionsapplikationen
          abrufbar sind. Wir verweisen auf diese ebenfalls zwecks weiterer
          Informationen und Geltendmachung von Widerrufs-, Auskunfts- und
          anderen Betroffenenrechten.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Verarbeitete Datenarten:</span>{" "}
            Bestandsdaten (z.B. Namen, Adressen); Zahlungsdaten (z.B.
            Bankverbindungen, Rechnungen, Zahlungshistorie); Vertragsdaten (z.B.
            Vertragsgegenstand, Laufzeit, Kundenkategorie); Nutzungsdaten (z.B.
            besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten);
            Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)
          </li>
          <li>
            <span className="font-semibold">Betroffene Personen:</span> Kunden;
            Interessenten
          </li>
          <li>
            <span className="font-semibold">Zwecke der Verarbeitung:</span>{" "}
            Erbringung vertraglicher Leistungen und Kundenservice
          </li>
          <li>
            <span className="font-semibold">Rechtsgrundlagen:</span>{" "}
            Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1
            lit. b) DSGVO)
          </li>
        </ul>

        <p>
          <span className="font-semibold">
            Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
          </span>
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">PayPal: </span>
            Zahlungsdienstleistungen (technische Anbindung von
            Online-Bezahlmethoden) (z.B. PayPal, PayPal Plus, Braintree);{" "}
            <span className="font-semibold">Dienstanbieter:</span> PayPal
            (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449
            Luxembourg; <span className="font-semibold">Rechtsgrundlagen:</span>{" "}
            Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1
            lit. b) DSGVO); <span className="font-semibold">Website:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.paypal.com/de"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.paypal.com/de
            </a>
            ; <span className="font-semibold">Datenschutzerklärung: </span>
            <a
              className="text-persian-500 underline"
              href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.paypal.com/de/webapps/mpp/ua/privacy-full
            </a>
            .
          </li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-lg">
          Bereitstellung des Onlineangebotes und Webhosting
        </div>
        <p>
          Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste
          zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die
          IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und
          Funktionen unserer Online-Dienste an den Browser oder das Endgerät der
          Nutzer zu übermitteln.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Verarbeitete Datenarten:</span>{" "}
            Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten,
            Zugriffszeiten); Meta-/Kommunikationsdaten (z.B.
            Geräte-Informationen, IP-Adressen)
          </li>
          <li>
            <span className="font-semibold">Betroffene Personen:</span> Nutzer
            (z.B. Webseitenbesucher, Nutzer von Onlinediensten)
          </li>
          <li>
            <span className="font-semibold">Zwecke der Verarbeitung:</span>{" "}
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit;
            Informationstechnische Infrastruktur (Betrieb und Bereitstellung von
            Informationssystemen und technischen Geräten (Computer, Server
            etc.).); Sicherheitsmaßnahmen
          </li>
          <li>
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)
          </li>
        </ul>

        <p>
          <span className="font-semibold">
            Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
          </span>
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">
              Bereitstellung Onlineangebot auf gemietetem Speicherplatz:{" "}
            </span>
            Für die Bereitstellung unseres Onlineangebotes nutzen wir
            Speicherplatz, Rechenkapazität und Software, die wir von einem
            entsprechenden Serveranbieter (auch "Webhoster" genannt) mieten oder
            anderweitig beziehen;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
          </li>
          <li>
            <span className="font-semibold">
              Erhebung von Zugriffsdaten und Logfiles:{" "}
            </span>
            Der Zugriff auf unser Onlineangebot wird in Form von so genannten
            "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die
            Adresse und Name der abgerufenen Webseiten und Dateien, Datum und
            Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über
            erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem
            des Nutzers, Referrer URL (die zuvor besuchte Seite) und im
            Regelfall IP-Adressen und der anfragende Provider gehören. Die
            Serverlogfiles können zum einen zu Zwecken der Sicherheit eingesetzt
            werden, z.B., um eine Überlastung der Server zu vermeiden
            (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten
            DDoS-Attacken) und zum anderen, um die Auslastung der Server und
            ihre Stabilität sicherzustellen;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Löschung von Daten:</span>{" "}
            Logfile-Informationen werden für die Dauer von maximal 30 Tagen
            gespeichert und danach gelöscht oder anonymisiert. Daten, deren
            weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur
            endgültigen Klärung des jeweiligen Vorfalls von der Löschung
            ausgenommen.
          </li>
          <li>
            <span className="font-semibold">Netcup: </span>Leistungen auf dem
            Gebiet der Bereitstellung von informationstechnischer Infrastruktur
            und verbundenen Dienstleistungen (z.B. Speicherplatz und/oder
            Rechenkapazitäten);{" "}
            <span className="font-semibold">Dienstanbieter:</span> netcup GmbH,
            Daimlerstraße 25, 76185 Karlsruhe, Deutschland;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Website:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.netcup.de"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.netcup.de
            </a>
            ; <span className="font-semibold">Datenschutzerklärung:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.netcup.de/kontakt/datenschutzerklaerung.php"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.netcup.de/kontakt/datenschutzerklaerung.php
            </a>
            ;{" "}
            <span className="font-semibold">Auftragsverarbeitungsvertrag:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://helpcenter.netcup.com/de/wiki/general/avv"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://helpcenter.netcup.com/de/wiki/general/avv
            </a>
            .
          </li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-xl">
          Präsenzen in sozialen Netzwerken (Social Media)
        </div>
        <p>
          Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und
          verarbeiten in diesem Rahmen Daten der Nutzer, um mit den dort aktiven
          Nutzern zu kommunizieren oder um Informationen über uns anzubieten.
        </p>
        <p>
          Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des
          Raumes der Europäischen Union verarbeitet werden können. Hierdurch
          können sich für die Nutzer Risiken ergeben, weil so z.B. die
          Durchsetzung der Rechte der Nutzer erschwert werden könnte.
        </p>
        <p>
          Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im
          Regelfall für Marktforschungs- und Werbezwecke verarbeitet. So können
          z.B. anhand des Nutzungsverhaltens und sich daraus ergebender
          Interessen der Nutzer Nutzungsprofile erstellt werden. Die
          Nutzungsprofile können wiederum verwendet werden, um z.B.
          Werbeanzeigen innerhalb und außerhalb der Netzwerke zu schalten, die
          mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen Zwecken
          werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert,
          in denen das Nutzungsverhalten und die Interessen der Nutzer
          gespeichert werden. Ferner können in den Nutzungsprofilen auch Daten
          unabhängig der von den Nutzern verwendeten Geräte gespeichert werden
          (insbesondere, wenn die Nutzer Mitglieder der jeweiligen Plattformen
          sind und bei diesen eingeloggt sind).
        </p>
        <p>
          Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen
          und der Widerspruchsmöglichkeiten (Opt-Out) verweisen wir auf die
          Datenschutzerklärungen und Angaben der Betreiber der jeweiligen
          Netzwerke.
        </p>
        <p>
          Auch im Fall von Auskunftsanfragen und der Geltendmachung von
          Betroffenenrechten weisen wir darauf hin, dass diese am effektivsten
          bei den Anbietern geltend gemacht werden können. Nur die Anbieter
          haben jeweils Zugriff auf die Daten der Nutzer und können direkt
          entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie
          dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Verarbeitete Datenarten:</span>{" "}
            Kontaktdaten (z.B. E-Mail, Telefonnummern); Inhaltsdaten (z.B.
            Eingaben in Onlineformularen); Nutzungsdaten (z.B. besuchte
            Webseiten, Interesse an Inhalten, Zugriffszeiten);
            Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)
          </li>
          <li>
            <span className="font-semibold">Betroffene Personen:</span> Nutzer
            (z.B. Webseitenbesucher, Nutzer von Onlinediensten)
          </li>
          <li>
            <span className="font-semibold">Zwecke der Verarbeitung:</span>{" "}
            Kontaktanfragen und Kommunikation; Feedback (z.B. Sammeln von
            Feedback via Online-Formular); Marketing
          </li>
          <li>
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)
          </li>
        </ul>

        <p>
          <span className="font-semibold">
            Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
          </span>
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">TikTok: </span>Soziales Netzwerk /
            Video-Plattform;{" "}
            <span className="font-semibold">Dienstanbieter:</span> TikTok
            Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Website:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.tiktok.com"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.tiktok.com
            </a>
            ; <span className="font-semibold">Datenschutzerklärung:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.tiktok.com/de/privacy-policy"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.tiktok.com/de/privacy-policy
            </a>
            .
          </li>
          <li>
            <span className="font-semibold">Twitter: </span>Soziales Netzwerk;{" "}
            <span className="font-semibold">Dienstanbieter:</span> Twitter
            International Company, One Cumberland Place, Fenian Street, Dublin 2
            D02 AX07, Irland, Mutterunternehmen: Twitter Inc., 1355 Market
            Street, Suite 900, San Francisco, CA 94103, USA;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Datenschutzerklärung:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://twitter.com/privacy"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://twitter.com/privacy
            </a>
            , (Settings:{" "}
            <a
              className="text-persian-500 underline"
              href="https://twitter.com/personalization"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://twitter.com/personalization
            </a>
            ).
          </li>
          <li>
            <span className="font-semibold">YouTube: </span>Soziales Netzwerk
            und Videoplattform;{" "}
            <span className="font-semibold">Dienstanbieter:</span> Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Datenschutzerklärung:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://policies.google.com/privacy"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://policies.google.com/privacy
            </a>
            ;{" "}
            <span className="font-semibold">
              Widerspruchsmöglichkeit (Opt-Out):
            </span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://adssettings.google.com/authenticated"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://adssettings.google.com/authenticated
            </a>
            .
          </li>
          <li>
            <span className="font-semibold">Twitch: </span>Streaming- und
            Videoplattform;{" "}
            <span className="font-semibold">Dienstanbieter:</span> Twitch
            Interactive, Inc. 350 Bush Street, 2nd Floor, San Francisco, CA
            94104 Vereinigte Staaten von Amerika;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);{" "}
            <span className="font-semibold">Datenschutzerklärung:</span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.twitch.tv/p/de-de/legal/privacy-notice"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.twitch.tv/p/de-de/legal/privacy-notice
            </a>
            ;{" "}
            <span className="font-semibold">
              Widerspruchsmöglichkeit (Opt-Out):
            </span>{" "}
            <a
              className="text-persian-500 underline"
              href="https://www.twitch.tv/p/de-de/legal/eu-eea-uk-right-of-withdrawal"
              rel="nofollow noreferrer"
              target="_blank"
            >
              https://www.twitch.tv/p/de-de/legal/eu-eea-uk-right-of-withdrawal
            </a>
            .
          </li>
        </ul>
        <h2 id="m328">Plugins und eingebettete Funktionen sowie Inhalte</h2>
        <p>
          Wir binden in unser Onlineangebot Funktions- und Inhaltselemente ein,
          die von den Servern ihrer jeweiligen Anbieter (nachfolgend bezeichnet
          als "Drittanbieter”) bezogen werden. Dabei kann es sich zum Beispiel
          um Grafiken, Videos oder Stadtpläne handeln (nachfolgend einheitlich
          bezeichnet als "Inhalte”).
        </p>
        <p>
          Die Einbindung setzt immer voraus, dass die Drittanbieter dieser
          Inhalte die IP-Adresse der Nutzer verarbeiten, da sie ohne die
          IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die
          IP-Adresse ist damit für die Darstellung dieser Inhalte oder
          Funktionen erforderlich. Wir bemühen uns, nur solche Inhalte zu
          verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur
          Auslieferung der Inhalte verwenden. Drittanbieter können ferner
          sogenannte Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons"
          bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die
          "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den
          Seiten dieser Webseite, ausgewertet werden. Die pseudonymen
          Informationen können ferner in Cookies auf dem Gerät der Nutzer
          gespeichert werden und unter anderem technische Informationen zum
          Browser und zum Betriebssystem, zu verweisenden Webseiten, zur
          Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes
          enthalten als auch mit solchen Informationen aus anderen Quellen
          verbunden werden.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Verarbeitete Datenarten:</span>{" "}
            Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten,
            Zugriffszeiten); Meta-/Kommunikationsdaten (z.B.
            Geräte-Informationen, IP-Adressen).
          </li>
          <li>
            <span className="font-semibold">Betroffene Personen:</span> Nutzer
            (z.B. Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <span className="font-semibold">Zwecke der Verarbeitung:</span>{" "}
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
          </li>
          <li>
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
          </li>
        </ul>
        <p>
          <span className="font-semibold">
            Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
          </span>
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">
              Google Fonts (Bereitstellung auf eigenem Server):{" "}
            </span>
            Schriftarten ("Google Fonts") zwecks einer nutzerfreundlichen
            Darstellung unseres Onlineangebotes;{" "}
            <span className="font-semibold">Dienstanbieter:</span> Die Google
            Fonts werden auf unserem Server gehostet, es werden keine Daten an
            Google übermittelt;{" "}
            <span className="font-semibold">Rechtsgrundlagen:</span> Berechtigte
            Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
          </li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-xl">
          Änderung und Aktualisierung der Datenschutzerklärung
        </div>
        <p>
          Wir bitten Sie, sich regelmäßig über den Inhalt unserer
          Datenschutzerklärung zu informieren. Wir passen die
          Datenschutzerklärung an, sobald die Änderungen der von uns
          durchgeführten Datenverarbeitungen dies erforderlich machen. Wir
          informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung
          Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle
          Benachrichtigung erforderlich wird.
        </p>
        <p>
          Sofern wir in dieser Datenschutzerklärung Adressen und
          Kontaktinformationen von Unternehmen und Organisationen angeben,
          bitten wir zu beachten, dass die Adressen sich über die Zeit ändern
          können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
        </p>

        <div className="font-round2 font-bold pt-6 text-xl">
          Rechte der betroffenen Personen
        </div>
        <p>
          Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die
          sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">
              Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus
              Ihrer besonderen Situation ergeben, jederzeit gegen die
              Verarbeitung der Sie betreffenden personenbezogenen Daten, die
              aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
              Widerspruch einzulegen; dies gilt auch für ein auf diese
              Bestimmungen gestütztes Profiling. Werden die Sie betreffenden
              personenbezogenen Daten verarbeitet, um Direktwerbung zu
              betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
              Verarbeitung der Sie betreffenden personenbezogenen Daten zum
              Zwecke derartiger Werbung einzulegen; dies gilt auch für das
              Profiling, soweit es mit solcher Direktwerbung in Verbindung
              steht.
            </span>
          </li>
          <li>
            <span className="font-semibold">
              Widerrufsrecht bei Einwilligungen:
            </span>{" "}
            Sie haben das Recht, erteilte Einwilligungen jederzeit zu
            widerrufen.
          </li>
          <li>
            <span className="font-semibold">Auskunftsrecht:</span> Sie haben das
            Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten
            verarbeitet werden und auf Auskunft über diese Daten sowie auf
            weitere Informationen und Kopie der Daten entsprechend den
            gesetzlichen Vorgaben.
          </li>
          <li>
            <span className="font-semibold">Recht auf Berichtigung:</span> Sie
            haben entsprechend den gesetzlichen Vorgaben das Recht, die
            Vervollständigung der Sie betreffenden Daten oder die Berichtigung
            der Sie betreffenden unrichtigen Daten zu verlangen.
          </li>
          <li>
            <span className="font-semibold">
              Recht auf Löschung und Einschränkung der Verarbeitung:
            </span>{" "}
            Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu
            verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden,
            bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine
            Einschränkung der Verarbeitung der Daten zu verlangen.
          </li>
          <li>
            <span className="font-semibold">
              Recht auf Datenübertragbarkeit:
            </span>{" "}
            Sie haben das Recht, Sie betreffende Daten, die Sie uns
            bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in
            einem strukturierten, gängigen und maschinenlesbaren Format zu
            erhalten oder deren Übermittlung an einen anderen Verantwortlichen
            zu fordern.
          </li>
          <li>
            <span className="font-semibold">
              Beschwerde bei Aufsichtsbehörde:
            </span>{" "}
            Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen
            oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
            Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres
            gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des
            mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die
            Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die
            Vorgaben der DSGVO verstößt.
          </li>
        </ul>

        <div className="font-round2 font-bold pt-6 text-xl">
          Begriffsdefinitionen
        </div>
        <p>
          In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser
          Datenschutzerklärung verwendeten Begrifflichkeiten. Viele der Begriffe
          sind dem Gesetz entnommen und vor allem im Art. 4 DSGVO definiert. Die
          gesetzlichen Definitionen sind verbindlich. Die nachfolgenden
          Erläuterungen sollen dagegen vor allem dem Verständnis dienen. Die
          Begriffe sind alphabetisch sortiert.
        </p>

        <ul className="list-inside list-disc">
          <li>
            <span className="font-semibold">Personenbezogene Daten:</span>{" "}
            "Personenbezogene Daten“ sind alle Informationen, die sich auf eine
            identifizierte oder identifizierbare natürliche Person (im Folgenden
            "betroffene Person“) beziehen; als identifizierbar wird eine
            natürliche Person angesehen, die direkt oder indirekt, insbesondere
            mittels Zuordnung zu einer Kennung wie einem Namen, zu einer
            Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie)
            oder zu einem oder mehreren besonderen Merkmalen identifiziert
            werden kann, die Ausdruck der physischen, physiologischen,
            genetischen, psychischen, wirtschaftlichen, kulturellen oder
            sozialen Identität dieser natürlichen Person sind.
          </li>
          <li>
            <span className="font-semibold">Verantwortlicher:</span> Als
            "Verantwortlicher“ wird die natürliche oder juristische Person,
            Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam
            mit anderen über die Zwecke und Mittel der Verarbeitung von
            personenbezogenen Daten entscheidet, bezeichnet.
          </li>
          <li>
            <span className="font-semibold">Verarbeitung:</span> "Verarbeitung"
            ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte
            Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
            personenbezogenen Daten. Der Begriff reicht weit und umfasst
            praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten,
            das Speichern, das Übermitteln oder das Löschen.
          </li>
        </ul>
      </section>
    </main>
  );
};
