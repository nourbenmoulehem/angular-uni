export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: 'infrastructure' | 'pédagogie' | 'cantine' | 'transport';
  date: Date;
  statut: 'En attente' | 'Validée' | 'Rejetée';
}
