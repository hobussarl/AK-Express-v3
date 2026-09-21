import { supabase } from './supabase';
import { Vendor } from './types';

export async function createVendorRegistration(data: {
  name: string;
  phone: string;
  quarter: string;
  specialty: string;
  description: string;
  price_xaf: number;
}) {
  const { data: vendor, error } = await supabase
    .from('vendors')
    .insert([
      {
        name: data.name,
        phone: data.phone,
        quarter: data.quarter,
        dish_type: data.specialty === 'Achu' ? 'achu' : 'kati_kati',
        description: data.description,
        price_xaf: data.price_xaf,
        rating: 5.0,
        prep_minutes: 30,
        is_open: true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return vendor as Vendor;
}