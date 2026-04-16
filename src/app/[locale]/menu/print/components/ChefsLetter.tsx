import React from 'react';
import PrintPage from './PrintPage';
import Quote from './Quote';

export default function ChefsLetter() {
  return (
    <PrintPage pageNum="I">
      <div style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center', paddingTop: '80px' }}>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '28px', letterSpacing: '8px', marginBottom: '40px', textTransform: 'uppercase' }}>Benvenuti</h2>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '42px', fontStyle: 'italic', marginBottom: '60px' }}>Ein Brief aus unserer Küche</h3>
        
        <p className="cv-intro" style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', textIndent: '30px' }}>
          Liebe Gäste, verehrte Freunde der italienischen Lebensart,
        </p>
        <p className="cv-intro" style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', textIndent: '30px' }}>
          es erfüllt uns mit großem Stolz, Sie in den Lindener Ratsstuben begrüßen zu dürfen. Für uns ist Kochen nicht nur ein Handwerk, sondern eine tief verwurzelte Leidenschaft, die in jedem Handgriff und in jeder Zutat zum Ausdruck kommt. 
        </p>
        <p className="cv-intro" style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', textIndent: '30px' }}>
          Unsere Philosophie basiert auf dem Respekt vor erstklassigen, regionalen und original italienischen Produkten. Wir glauben daran, dass die wahren Meisterwerke der Küche durch Schlichtheit, Authentizität und die bedingungslose Liebe zum Detail entstehen. Jede Pasta, die wir formen, und jede Sauce, die wir einkochen, trägt die Seele unserer Familie in sich.
        </p>
        <p className="cv-intro" style={{ textAlign: 'justify', fontSize: '16px', lineHeight: '1.8', marginBottom: '50px', textIndent: '30px' }}>
          Wir laden Sie ein, mit uns auf eine kulinarische Reise zu gehen – tauchen Sie ein in die Aromen Italiens und genießen Sie unvergessliche Momente in unserem Hause.
        </p>

        <div style={{ marginTop: '80px', textAlign: 'right', paddingRight: '40px' }}>
          <div style={{ fontFamily: 'var(--font-vibes)', fontSize: '56px', color: 'var(--ink)', position: 'relative', right: '-20px', top: '10px' }}>La Famiglia</div>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '12px', letterSpacing: '4px', color: 'var(--ink-soft)', textTransform: 'uppercase', marginTop: '10px' }}>Küchendirektion</div>
        </div>

        <Quote text="Il cibo è l'essenza della vita." marginTop="120px" />
      </div>
    </PrintPage>
  );
}
