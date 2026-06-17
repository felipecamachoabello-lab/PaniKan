'use client';
import { useState } from 'react';
const services = ['Aire acondicionado','Plomería','Electricidad','Fumigación','Todero / Handyman','Limpieza'];
export default function Page(){
 const [form,setForm]=useState({name:'',phone:'',service:'Limpieza',description:''});
 const [status,setStatus]=useState('');
 const submit=async(e)=>{e.preventDefault(); setStatus('Enviando...');
  const res=await fetch('/api/requests',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
  if(res.ok){setStatus('Solicitud enviada. Te contactaremos pronto.'); setForm({name:'',phone:'',service:'Limpieza',description:''});}
  else{const data=await res.json().catch(()=>({})); setStatus(data.error || 'No se pudo enviar. Intenta de nuevo.');}
 };
 return <main>
  <section className="hero"><nav><b>Panikan</b><a href="#solicitar">Solicitar servicio</a></nav><div className="heroGrid"><div><p className="eyebrow">LEÓN, GUANAJUATO</p><h1>Servicios confiables para tu hogar, en un solo lugar.</h1><p>Conectamos clientes con técnicos verificados para resolver daños, instalaciones y mantenimientos de forma rápida, segura y sencilla.</p><div><a className="btn" href="#servicios">Ver servicios</a><a className="btn secondary" href="#solicitar">Pedir ahora</a></div></div><div className="card"><h3>¿Qué necesitas hoy?</h3><p>✓ Técnico verificado</p><p>✓ Precio claro</p><p>✓ Atención rápida</p><p>✓ Garantía del servicio</p></div></div></section>
  <section id="servicios"><p className="eyebrow">SERVICIOS PRINCIPALES</p><h2>Las 6 áreas esenciales de Panikan</h2><div className="services">{services.map(s=><div className="service" key={s}><h3>{s}</h3><p>Solicita un profesional confiable para este servicio.</p></div>)}</div></section>
  <section id="solicitar" className="formSec"><h2>Solicita tu servicio</h2><p>Déjanos tus datos y te contactamos para asignarte un técnico disponible.</p><form onSubmit={submit}><input required placeholder="Nombre completo" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Teléfono" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>{services.map(s=><option key={s}>{s}</option>)}</select><textarea required placeholder="Describe lo que necesitas" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><button>Enviar solicitud</button></form>{status&&<p className="status">{status}</p>}</section>
  <footer>© 2026 Panikan. Servicios para el hogar en León, Guanajuato.</footer>
 </main>;
}
