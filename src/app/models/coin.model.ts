export interface Coin {
  id: string;
  name: string;
  image: string;
  country: string;   // matches PO filter id: 'pt', 'br', 'es', etc.
  type: 'comum' | 'comemorativa' | 'prova';
  era: 'antiga' | 'moderna' | 'contemporanea';
  qualities: string[];
}
