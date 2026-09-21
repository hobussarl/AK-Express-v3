import { supabase } from './supabase';
import { Order } from './types';

export async function createOrder(data: {
  vendor_id: string;
  customer_name: string;
  customer_phone: string;
  delivery_quarter: string;
  delivery_address: string;
  total_price_xaf: number;
  payment_method: string;
}) {
  // Generate a random 4-digit escrow pickup PIN
  const pickup_pin = Math.floor(1000 + Math.random() * 9000).toString();

  const { data: order, error } = await supabase
    .from('orders')
    .insert([
      {
        ...data,
        pickup_pin,
        status: 'pending',
        payment_status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return order as Order;
}

export async function verifyOrderPin(orderId: string, inputPin: string) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error || !order) throw new Error('Order not found');

  if (order.pickup_pin === inputPin) {
    const { data: updated, error: updateError } = await supabase
      .from('orders')
      .update({ status: 'delivered', payment_status: 'completed' })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) throw updateError;
    return { success: true, order: updated };
  } else {
    return { success: false, message: 'Invalid 4-digit PIN' };
  }
}