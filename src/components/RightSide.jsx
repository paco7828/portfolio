import { useEffect } from "react";

const ICONS = {
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
};

function SocialIcon({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon-link">
      {ICONS[icon]}
    </a>
  );
}

function Study({ year, status, href, children }) {
  const isActive = status === "active";
  return (
    <div className={"study-item" + (isActive ? " study-active" : "")}>
      <div className="study-year">{year}</div>
      <div className="study-text">
        {href
          ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          : children}
      </div>
      {isActive && <div className="study-badge">Folyamatban</div>}
    </div>
  );
}

const RightSide = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.1 }
      );
      document.querySelectorAll(".study-item, .interest-item").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="cv-right-sidebar">
      <h2>Csapatom</h2>
      <p>
        A <strong><a href="https://canseat.hu/" target="_blank" rel="noopener noreferrer">S.E.A.T.</a></strong>{" "}
        egy 2024-ben alapított csapat, amelynek 2025 óta aktív tagja vagyok. Eddig két
        CanSat-et építettünk össze; a jövőben robotikával és LoRa-alapú rádiókommunikációs
        hálózatokkal tervezünk foglalkozni.
      </p>
      <p style={{ marginTop: "8px" }}>
        <strong>Szerepem:</strong> 2025-ben versenyzőként, 2026-ban mentorként vettem részt.
      </p>
      <p style={{ marginTop: "4px" }}>
        <strong>Szponzoraink:</strong>{" "}
        <br />
        <a href="https://hclinear.hu/" target="_blank" rel="noopener noreferrer">HC-Linear</a>
        {" "}(2026){" "}
        <br />
        <a href="https://mik.pte.hu/" target="_blank" rel="noopener noreferrer">PTE MIK</a>
        {" "}(2025)
      </p>
      <div className="social-icons-row">
        <SocialIcon href="https://canseat.hu/" icon="globe" />
        <SocialIcon href="https://www.facebook.com/CanSEAT" icon="facebook" />
        <SocialIcon href="https://www.instagram.com/canseathu" icon="instagram" />
        <SocialIcon href="https://www.tiktok.com/@canseat.hu" icon="tiktok" />
        <SocialIcon href="https://www.youtube.com/@CanSEAT" icon="youtube" />
      </div>

      <h2>Érdeklődési területek</h2>
      <div className="interest-item">Elektronika és áramkörtervezés</div>
      <div className="interest-item">Beágyazott rendszerek és mikrokontrollerek</div>
      <div className="interest-item">Űripar és műholdas technológiák</div>
      <div className="interest-item">3D tervezés és nyomtatás</div>
      <div className="interest-item">Járművek és mechanikai rendszerek</div>

      <h2>Tanulmányok</h2>
      <Study year="2025-" status="active" href="https://mik.pte.hu/">
        Pécsi Tudományegyetem Műszaki és Informatikai Kar - Mérnökinformatikus BSc
      </Study>
      <Study year="2020-2025" status="done" href="https://technikum.radnoti-pecs.hu/">
        Baranya Vármegyei SzC Radnóti Miklós Közgazdasági Technikum - Szoftverfejlesztő és -tesztelő
      </Study>
      <Study year="2012-2020" status="done" href="https://deak.pte.hu/">
        Deák Ferenc Gimnázium és Általános Iskola
      </Study>
    </aside>
  );
};

export default RightSide;
