import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  type: 'Appartement' | 'Maison' | 'Hôtel Particulier' | 'Terrain';
  description: string;
  images: string[];
  features: string[];
  status: 'Disponible' | 'Vendu' | 'Sous Compromis';
  isExclusive: boolean;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Hôtel Particulier du XVIIIe Siècle',
    location: 'Paris VIIe - Saint-Germain-des-Prés',
    price: 12500000,
    surface: 450,
    rooms: 12,
    bedrooms: 6,
    type: 'Hôtel Particulier',
    description: 'Exceptionnel hôtel particulier entre cour et jardin, ayant conservé tous ses éléments d\'époque. Volumes majestueux et calme absolu.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Jardin privatif', 'Ascenseur', 'Cave à vin', 'Parking'],
    status: 'Disponible',
    isExclusive: true
  },
  {
    id: '2',
    title: 'Appartement de Maître avec Vue Seine',
    location: 'Paris IVe - Île Saint-Louis',
    price: 4800000,
    surface: 185,
    rooms: 5,
    bedrooms: 3,
    type: 'Appartement',
    description: 'Au cœur de l\'Île Saint-Louis, superbe appartement traversant offrant des vues imprenables sur la Seine et les monuments de Paris.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Balcon filant', 'Cheminées', 'Parquet Point de Hongrie'],
    status: 'Disponible',
    isExclusive: false
  },
  {
    id: '3',
    title: 'Villa Contemporaine d\'Architecte',
    location: 'Neuilly-sur-Seine',
    price: 8900000,
    surface: 320,
    rooms: 8,
    bedrooms: 4,
    type: 'Maison',
    description: 'Réalisation architecturale audacieuse offrant des espaces de vie fluides et baignés de lumière. Piscine intérieure et domotique de pointe.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200'
    ],
    features: ['Piscine', 'Salle de sport', 'Toit terrasse'],
    status: 'Vendu',
    isExclusive: true
  }
];
