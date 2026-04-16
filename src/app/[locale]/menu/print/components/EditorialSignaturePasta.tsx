import React from 'react';
import PrintPage from './PrintPage';
import DishItem from './DishItem';
import Quote from './Quote';

export default function EditorialSignaturePasta({ pageNum }: { pageNum: string }) {
  return (
    <PrintPage pageNum={pageNum}>
      <div style={{ maxWidth: '90%', margin: '0 auto', paddingTop: '40px', position: 'relative' }}>
        
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '20px', letterSpacing: '8px', marginBottom: '10px', textTransform: 'uppercase' }}>Fatto In Casa</h2>
          <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '48px', fontStyle: 'italic', margin: '0', lineHeight: '1.2' }}>Signature Pastas</h3>
          <div style={{ margin: '20px auto 0', width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
        </div>

        <p className="cv-intro" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.7', marginBottom: '60px', padding: '0 20px' }}>
          Jede Pasta in dieser Selektion wird täglich frisch von Hand in unserer Manufaktur gefertigt. Zarter Hartweizengrieß, frische Landeier und eine große Prise Leidenschaft.
        </p>

        {/* Highlighted Layout for Pastas */}
        <div style={{ borderLeft: '1px solid var(--gold)', borderRight: '1px solid var(--gold)', padding: '0 20px', marginBottom: '40px' }}>
          <DishItem id="50" name="GNOCCHI POMODORO" price="10,00 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Hausgemachte Kartoffelklößchen mit frischem Rucola und gehobeltem Parmesan in einer leichten San Marzano Tomatensoße" marginBottom="24px" />
          
          <DishItem id="51" name="GNOCCHI AL GORGONZOLA" price="11,00 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Samtige Kartoffelklößchen in einer fein-würzigen Soße aus cremigem Gorgonzola dolce DOP" marginBottom="24px" />
          
          <DishItem id="52" name="RAVIOLI BURRO E SALVIA" price="12,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Frische, handgeschlagene Teigtaschen, gefüllt mit cremigem Ricotta und Spinat, geschwenkt in feinster Buttersoße mit knusprigem, frischem Salbei" marginBottom="24px" />

          <DishItem id="53" name="RAVIOLI TARTUFO" price="14,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Eine Symphonie des Nordens: Trüffel-Teigtaschen in einer seidigen, leichten Trüffel-Sahnesoße, vollendet mit frisch geriebenem Parmesan" marginBottom="24px" />

          <DishItem id="54" name="PANZEROTTI FUNGHI" price="13,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Elegante Halbmond-Teigtaschen, generös gefüllt mit wilden Steinpilzen in einer cremigen Crème Fraîche Infusion" marginBottom="0" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Quote text="Il vero lusso è la semplicità." marginTop="40px" />
        </div>
        
      </div>
    </PrintPage>
  );
}
