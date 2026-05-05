// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — Zusatzstoff-Codierungssystem
// Hauseigenes Schema gemäß LMIV / LMIDV
// ═══════════════════════════════════════════════════════════════

export type ZusatzstoffIdentifier = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';

export interface ZusatzstoffData {
  id: ZusatzstoffIdentifier;
  name: string;
}

export const ZUSATZSTOFFE: Record<ZusatzstoffIdentifier, ZusatzstoffData> = {
  '1':  { id: '1',  name: 'mit Farbstoff' },
  '2':  { id: '2',  name: 'mit Konservierungsstoff' },
  '3':  { id: '3',  name: 'mit Nitropökelsalz' },
  '4':  { id: '4',  name: 'mit Antioxidationsmittel' },
  '5':  { id: '5',  name: 'mit Geschmacksverstärker' },
  '6':  { id: '6',  name: 'geschwefelt' },
  '7':  { id: '7',  name: 'geschwärzt' },
  '8':  { id: '8',  name: 'mit Phosphat' },
  '9':  { id: '9',  name: 'mit Milcheiweiß' },
  '10': { id: '10', name: 'koffeinhaltig' },
  '11': { id: '11', name: 'mit Süßungsmittel' },
};
