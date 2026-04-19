export interface TrustScore {
    socialProof: number; // 25%: Bewertungsdurchschnitt, Anzahl, Qualität
    authority: number;   // 20%: Zertifizierungen, Jahre Erfahrung, Qualifikationen
    transparency: number;// 20%: Preisklarheit, Prozess-Sichtbarkeit, echte Gesichter
    consistency: number; // 15%: Design-System einheitlich, Tonalität, Performance
    userExperience: number; // 10%: Ladezeit, Formular, Navigation
    security: number;    // 10%: HTTPS, Datenschutz, Impressum
}

export const CURRENT_TRUST_SCORE: TrustScore = {
    socialProof: 9.0, // Google Reviews are high, Testimonials are present
    authority: 9.5,   // Certificate / Experience present
    transparency: 9.5,// Prices are digital, faces available in Philosophy
    consistency: 9.5, // Strict UI guidelines implemented
    userExperience: 9.5, // Performance optimization passed
    security: 10.0    // DSGVO standard passed
};
