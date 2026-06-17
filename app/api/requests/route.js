import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request){
 try{
  const body = await request.json();
  const {name, phone, service, description} = body;
  if(!name || !phone || !service || !description){return NextResponse.json({error:'Faltan datos obligatorios.'},{status:400});}

  if(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY){
   const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
   const {error} = await supabase.from('requests').insert([{name,phone,service,description,created_at:new Date().toISOString()}]);
   if(error) throw error;
  }

  if(process.env.RESEND_API_KEY){
   const resend = new Resend(process.env.RESEND_API_KEY);
   await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Panikan <onboarding@resend.dev>',
    to: process.env.NOTIFICATION_EMAIL,
    subject: `Nueva solicitud Panikan: ${service}`,
    html: `<h2>Nueva solicitud Panikan</h2><p><b>Nombre:</b> ${name}</p><p><b>Teléfono:</b> ${phone}</p><p><b>Servicio:</b> ${service}</p><p><b>Descripción:</b> ${description}</p>`
   });
  }

  return NextResponse.json({ok:true});
 }catch(e){
  return NextResponse.json({error:'Error enviando solicitud. Revisa variables de entorno.'},{status:500});
 }
}
