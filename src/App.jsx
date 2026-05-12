import React, { useState, useEffect, useRef } from 'react';
import { Ticket, User, Baby, Star, Users, CalendarDays, CreditCard, Smartphone, Printer, Mail, CheckCircle2, RotateCcw, ChevronRight, ChevronLeft, QrCode, X, AlertCircle, Store } from 'lucide-react';

const IDLE_TIMEOUT = 120000;
const LANGUAGES = [
  { code: 'es', name: 'Español', flagUrl: 'https://flagcdn.com/w320/es.png', shortName: 'ES' },
  { code: 'ca', name: 'Català', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg', shortName: 'CA' },
  { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/w320/gb.png', shortName: 'EN' },
  { code: 'fr', name: 'Français', flagUrl: 'https://flagcdn.com/w320/fr.png', shortName: 'FR' },
  { code: 'de', name: 'Deutsch', flagUrl: 'https://flagcdn.com/w320/de.png', shortName: 'DE' },
];

const PRODUCTS = [
  { id: 'adult', icon: User, price: 35.00, color: 'bg-blue-500' },
  { id: 'child', icon: Baby, price: 20.00, color: 'bg-green-500' },
  { id: 'senior', icon: User, price: 25.00, color: 'bg-teal-500' },
];

const DICTIONARY = {
  es: { welcome: '¡Bienvenido a ParkTickets!', touchToStart: 'Toca la pantalla para empezar', selectLanguage: 'Selecciona tu idioma', catalogTitle: 'Selecciona tus entradas para el ', selectDateTitle: 'Selecciona la fecha de visita', days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'], cartTitle: 'Tu Compra', emptyCart: 'Tu carrito está vacío', total: 'Total', continue: 'Continuar al Pago', back: 'Volver', paymentTitle: 'Selecciona un método de pago', payWithCard: 'Tarjeta Bancaria', payWithMobile: 'Pago Móvil / NFC', payAmount: 'Pagar', processing: 'Procesando pago...', doNotRemove: 'Por favor, no retires tu tarjeta/móvil', successTitle: '¡Pago Completado!', successTitleCounter: '¡Justificante Creado!', successSubtitle: 'Recoge tus entradas a continuación', refNumber: 'Número de Referencia', print: 'Imprimir Entradas', printReceipt: 'Imprimir Justificante', email: 'Enviar por Email', newSale: 'Finalizar Compra', emailModalTitle: 'Enviar entradas por Email', send: 'Enviar', cancel: 'Cancelar', printingMsg: 'Imprimiendo entradas... ¡Recógelas abajo!', emailSentMsg: 'Entradas enviadas con éxito', invalidEmail: 'Por favor, introduce un email válido', terminalInstructions: 'Sigue las instrucciones del terminal de pago', payAtCounter: 'Pagar en Mostrador', generateTicket: 'Generar Ticket', successSubtitleCounter: 'Presenta este recibo en taquilla para pagar', totalToPay: 'Total a Pagar', totalPaid: 'Total Pagado', downloadPurchase: 'Descargar compra', adult_name: 'Entrada General (Adulto)', adult_desc: 'De 12 a 64 años', child_name: 'Entrada Niño', child_desc: 'De 4 a 11 años', senior_name: 'Entrada Sénior', senior_desc: 'Mayores de 65 años', vip_name: 'Pase VIP Fast-Track', vip_desc: 'Acceso sin colas a todas las atracciones', family_name: 'Pack Familiar', family_desc: '2 Adultos + 2 Niños', season_name: 'Abono Temporada', season_desc: 'Acceso ilimitado todo el año' },
  ca: { welcome: 'Benvingut a ParkTickets!', touchToStart: 'Toca la pantalla per començar', selectLanguage: 'Selecciona el teu idioma', catalogTitle: 'Selecciona les teves entrades per al ', selectDateTitle: 'Selecciona la data de visita', days: ['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'], cartTitle: 'La teva Compra', emptyCart: 'El teu carretó està buit', total: 'Total', continue: 'Continuar al Pagament', back: 'Tornar', paymentTitle: 'Selecciona un mètode de pagament', payWithCard: 'Targeta Bancària', payWithMobile: 'Pagament Mòbil / NFC', payAmount: 'Pagar', processing: 'Processant pagament...', doNotRemove: 'Si us plau, no retiris la targeta/mòbil', successTitle: 'Pagament Completat!', successTitleCounter: 'Justificant Creat!', successSubtitle: 'Recull les teves entrades a continuació', refNumber: 'Número de Referència', print: 'Imprimir Entrades', printReceipt: 'Imprimir Justificant', email: 'Enviar per Email', newSale: 'Finalitzar Compra', emailModalTitle: 'Enviar entrades per Email', send: 'Enviar', cancel: 'Cancel·lar', emailSentMsg: 'Entradas enviades amb èxit', invalidEmail: 'Si us plau, introdueix un email vàlid', terminalInstructions: 'Segueix les instruccions del terminal de pagament', payAtCounter: 'Pagar a Taquilla', generateTicket: 'Generar Tiquet', successSubtitleCounter: 'Presenta aquest rebut a taquilla per pagar', totalToPay: 'Total a Pagar', totalPaid: 'Total Pagat', downloadPurchase: 'Descarregar compra', adult_name: 'Entrada General (Adult)', adult_desc: 'De 12 a 64 anys', child_name: 'Entrada Nen', child_desc: 'De 4 a 11 anys', senior_name: 'Entrada Sènior', senior_desc: 'Majors de 65 anys', vip_name: 'Passi VIP Fast-Track', vip_desc: 'Accés sense cues a totes les atraccions', family_name: 'Pack Familiar', family_desc: "2 Adults + 2 Nens", season_name: 'Abonament Temporada', season_desc: "Accés il·limitat tot l'any" },
  en: { welcome: 'Welcome to ParkTickets!', touchToStart: 'Touch the screen to start', selectLanguage: 'Select your language', catalogTitle: 'Select your tickets for ', selectDateTitle: 'Select visit date', days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], cartTitle: 'Your Cart', emptyCart: 'Your cart is empty', total: 'Total', continue: 'Continue to Payment', back: 'Back', paymentTitle: 'Select a payment method', payWithCard: 'Credit/Debit Card', payWithMobile: 'Mobile Pay / NFC', payAmount: 'Pay', processing: 'Processing payment...', doNotRemove: 'Please do not remove your card/phone', successTitle: 'Payment Successful!', successTitleCounter: 'Receipt Created!', successSubtitle: 'Collect your tickets below', refNumber: 'Reference Number', print: 'Print Tickets', printReceipt: 'Print Receipt', email: 'Send via Email', newSale: 'Finish Purchase', emailModalTitle: 'Send tickets via Email', send: 'Send', cancel: 'Cancel', printingMsg: 'Printing tickets... Collect them below!', emailSentMsg: 'Tickets successfully sent', invalidEmail: 'Please enter a valid email address', terminalInstructions: 'Follow the instructions on the payment terminal', payAtCounter: 'Pay at Counter', generateTicket: 'Generate Ticket', successSubtitleCounter: 'Present this receipt at the counter to pay', totalToPay: 'Total to Pay', totalPaid: 'Total Paid', downloadPurchase: 'Download purchase', adult_name: 'General Admission (Adult)', adult_desc: 'Ages 12 to 64', child_name: 'Child Ticket', child_desc: 'Ages 4 to 11', senior_name: 'Senior Ticket', senior_desc: 'Ages 65 and over', vip_name: 'VIP Fast-Track Pass', vip_desc: 'Skip-the-line access to all rides', family_name: 'Family Pack', family_desc: '2 Adults + 2 Children', season_name: 'Season Pass', season_desc: 'Unlimited access all year' },
  fr: { welcome: 'Bienvenue à ParkTickets !', touchToStart: "Touchez l'écran pour commencer", selectLanguage: 'Sélectionnez votre langue', catalogTitle: 'Sélectionnez vos billets pour le ', selectDateTitle: 'Sélectionnez la date de visite', days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], cartTitle: 'Votre Panier', emptyCart: 'Votre panier est vide', total: 'Total', continue: 'Passer au Paiement', back: 'Retour', paymentTitle: 'Sélectionnez un mode de paiement', payWithCard: 'Carte Bancaire', payWithMobile: 'Paiement Mobile / NFC', payAmount: 'Payer', processing: 'Traitement du paiement...', doNotRemove: 'Veuillez ne pas retirer votre carte/téléphone', successTitle: 'Paiement Réussi !', successTitleCounter: 'Reçu Créé !', successSubtitle: 'Récupérez vos billets ci-dessous', refNumber: 'Numéro de Référence', print: 'Imprimer les Billets', printReceipt: 'Imprimer le Reçu', email: 'Envoyer par Email', newSale: "Terminer l'achat", emailModalTitle: 'Envoyer les billets par Email', send: 'Envoyer', cancel: 'Annuler', printingMsg: 'Impression en cours... Récupérez-les en bas !', emailSentMsg: 'Billets envoyés avec succès', invalidEmail: 'Veuillez entrer une adresse email valide', terminalInstructions: 'Suivez les instructions sur le terminal de paiement', payAtCounter: 'Payer au Guichet', generateTicket: 'Générer le Ticket', successSubtitleCounter: 'Présentez ce reçu au guichet pour payer', totalToPay: 'Total à Payer', totalPaid: 'Total Payé', downloadPurchase: "Télécharger l'achat", adult_name: 'Billet Général (Adulte)', adult_desc: 'De 12 à 64 ans', child_name: 'Billet Enfant', child_desc: 'De 4 à 11 ans', senior_name: 'Billet Senior', senior_desc: '65 ans et plus', vip_name: 'Pass VIP Fast-Track', vip_desc: 'Accès coupe-file à toutes les attractions', family_name: 'Pack Famille', family_desc: '2 Adultes + 2 Enfants', season_name: 'Pass Saison', season_desc: "Accès illimité toute l'année" },
  de: { welcome: 'Willkommen bei ParkTickets!', touchToStart: 'Bildschirm berühren, um zu beginnen', selectLanguage: 'Wählen Sie Ihre Sprache', catalogTitle: 'Wählen Sie Ihre Tickets für den ', selectDateTitle: 'Besuchsdatum auswählen', days: ['M', 'D', 'M', 'D', 'F', 'S', 'S'], cartTitle: 'Ihr Warenkorb', emptyCart: 'Ihr Warenkorb ist leer', total: 'Gesamt', continue: 'Weiter zur Zahlung', back: 'Zurück', paymentTitle: 'Wählen Sie eine Zahlungsmethode', payWithCard: 'Bankkarte', payWithMobile: 'Mobiles Bezahlen / NFC', payAmount: 'Bezahlen', processing: 'Zahlung wird verarbeitet...', doNotRemove: 'Bitte Karte/Telefon nicht entfernen', successTitle: 'Zahlung Erfolgreich!', successTitleCounter: 'Beleg Erstellt!', successSubtitle: 'Entnehmen Sie Ihre Tickets unten', refNumber: 'Referenznummer', print: 'Tickets Drucken', printReceipt: 'Beleg Drucken', email: 'Per E-Mail Senden', newSale: 'Kauf abschließen', emailModalTitle: 'Tickets per E-Mail senden', send: 'Senden', cancel: 'Abbrechen', printingMsg: 'Tickets werden gedruckt... Bitte unten entnehmen!', emailSentMsg: 'Tickets erfolgreich gesendet', invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein', terminalInstructions: 'Folgen Sie den Anweisungen auf dem Zahlungsterminal', payAtCounter: 'An der Kasse bezahlen', generateTicket: 'Ticket Generieren', successSubtitleCounter: 'Legen Sie diesen Beleg an der Kasse vor, um zu bezahlen', totalToPay: 'Zu zahlender Betrag', totalPaid: 'Gesamtbetrag Bezahlt', downloadPurchase: 'Kauf herunterladen', adult_name: 'Allgemeiner Eintritt (Erwachsene)', adult_desc: '12 bis 64 Jahre', child_name: 'Kinderticket', child_desc: '4 bis 11 Jahre', senior_name: 'Seniorenticket', senior_desc: 'Ab 65 Jahren', vip_name: 'VIP Fast-Track Pass', vip_desc: 'Schnelleinlass zu allen Attraktionen', family_name: 'Familienpaket', family_desc: '2 Erwachsene + 2 Kinder', season_name: 'Saisonkarte', season_desc: 'Unbegrenzter Zugang das ganze Jahr' }
};

export default function App() {
  const [step, setStep] = useState('idle');
  const [lang, setLang] = useState('es');
  const [cart, setCart] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toasts, setToasts] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [orderRef, setOrderRef] = useState('');

  const t = DICTIONARY[lang];

  const openDatePicker = () => { setCalendarMonth(new Date(selectedDate)); setShowDatePicker(true); };
  const getFirstDayOfMonth = (date) => { const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); return firstDay === 0 ? 6 : firstDay - 1; };
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const isSameDay = (d1, d2) => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

  useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

  useEffect(() => {
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (step !== 'idle') {
        timeoutId = setTimeout(() => {
          setStep('idle'); setCart({}); setPaymentMethod(null); setShowEmailModal(false); setShowDatePicker(false); setSelectedDate(new Date()); addToast('Sesión cerrada por inactividad', 'info');
        }, IDLE_TIMEOUT);
      }
    };
    window.addEventListener('mousemove', resetTimer); window.addEventListener('touchstart', resetTimer); window.addEventListener('click', resetTimer); window.addEventListener('scroll', resetTimer);
    resetTimer();
    return () => { clearTimeout(timeoutId); window.removeEventListener('mousemove', resetTimer); window.removeEventListener('touchstart', resetTimer); window.removeEventListener('click', resetTimer); window.removeEventListener('scroll', resetTimer); };
  }, [step]);

  const addToast = (message, type = 'success') => {
    const id = Date.now(); setToasts(prev => [...prev, { id, message, type }]); setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== id)); }, 4000);
  };

  const addToCart = (productId) => setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  const removeFromCart = (productId) => setCart(prev => { const newCart = { ...prev }; if (newCart[productId] > 1) { newCart[productId]--; } else { delete newCart[productId]; } return newCart; });
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => total + (PRODUCTS.find(p => p.id === id).price * qty), 0);
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = () => { if (cartItemCount > 0) { setPaymentMethod(null); setStep('payment'); } };

  const handleProcessPayment = () => {
    if (!paymentMethod) return;
    if (paymentMethod === 'card') {
      setStep('terminal');
      setTimeout(() => { setStep('processing'); setTimeout(() => { finishPayment(); }, 2000); }, 4000);
    } else {
      finishPayment();
    }
  };

  const finishPayment = () => { setOrderRef('TK-' + Math.random().toString(36).substring(2, 8).toUpperCase()); setStep('success'); addToast(paymentMethod === 'counter' ? t.successTitleCounter : t.successTitle); };
  const handleReset = () => { setCart({}); setPaymentMethod(null); setShowEmailModal(false); setShowDatePicker(false); setSelectedDate(new Date()); setStep('idle'); };
  const handlePrint = () => addToast(t.printingMsg, 'info');
  const handleSendEmail = (e) => { if (e && e.preventDefault) e.preventDefault(); if (!emailInput.includes('@') || !emailInput.includes('.')) { addToast(t.invalidEmail, 'error'); return; } addToast(t.emailSentMsg, 'success'); setShowEmailModal(false); setEmailInput(''); };

  const renderAppContent = () => {
    if (step === 'idle') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col items-center justify-center cursor-pointer select-none z-50" onClick={() => setStep('catalog')}>
          <div className="absolute top-12 right-12 text-white/80 text-4xl font-mono tracking-wider font-semibold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-center animate-pulse mb-32 space-y-12"><Ticket className="w-64 h-64 text-white mx-auto drop-shadow-2xl mb-12" strokeWidth={1.5} /><h1 className="text-[100px] leading-tight font-extrabold text-white drop-shadow-lg tracking-tight px-12">{t.welcome}</h1><p className="text-6xl text-blue-100 font-medium tracking-wide">{t.touchToStart}</p></div>
          <div className="absolute bottom-24 w-full px-16" onClick={(e) => e.stopPropagation()}><p className="text-white/80 text-center text-4xl mb-12 font-medium">{t.selectLanguage}</p><div className="flex justify-center gap-10">{LANGUAGES.map(l => (<button key={l.code} onClick={() => { setLang(l.code); setStep('catalog'); }} className="rounded-full w-40 h-40 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-[6px] border-white/20 hover:border-white/50 active:scale-95 transition-all flex items-center justify-center"><img src={l.flagUrl} alt={l.name} className="w-full h-full object-cover" /></button>))}</div></div>
        </div>
      );
    }

    return (
      <>
        <header className="bg-white shadow-sm h-32 shrink-0 flex items-center justify-between px-12 border-b border-slate-200 z-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center cursor-pointer" onClick={handleReset}><div className="bg-indigo-600 p-5 rounded-2xl shadow-sm"><Ticket className="w-12 h-12 text-white" /></div></div>
            {step !== 'idle' && (<button onClick={openDatePicker} className="flex items-center gap-4 bg-white border-4 border-slate-100 p-4 px-8 rounded-[1.5rem] shadow-sm hover:border-indigo-200 active:scale-95 transition-all"><CalendarDays className="w-10 h-10 text-indigo-600" /><span className="text-3xl font-bold text-slate-700 capitalize">{selectedDate.toLocaleDateString(lang, { day: 'numeric', month: 'short' })}</span></button>)}
          </div>
          <div className="flex items-center gap-10">
            <div className="flex gap-4 bg-slate-100 p-3 rounded-full">{LANGUAGES.map(l => (<button key={l.code} onClick={() => setLang(l.code)} className={`w-16 h-16 rounded-full overflow-hidden transition-all ${lang === l.code ? 'ring-[6px] ring-indigo-600 scale-110 shadow-xl' : 'opacity-50 hover:opacity-100'}`}><img src={l.flagUrl} alt={l.name} className="w-full h-full object-cover" /></button>))}</div>
            <div className="text-4xl font-mono font-semibold text-slate-600 tracking-wider bg-slate-100 py-5 px-8 rounded-3xl">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {step === 'catalog' && (
            <div className="flex-1 relative flex flex-col h-full w-full overflow-hidden">
              <div className="flex-1 p-12 overflow-y-auto w-full no-scrollbar">
                <h2 className="text-5xl font-bold text-slate-800 mb-12">{t.catalogTitle} <span className="text-indigo-600 capitalize">{selectedDate.toLocaleDateString(lang, { day: 'numeric', month: 'long' })}</span></h2>
                <div className="grid grid-cols-1 gap-10 pb-64">
                  {PRODUCTS.map((product) => {
                    const Icon = product.icon; const qty = cart[product.id] || 0;
                    return (
                      <div key={product.id} className="bg-white rounded-[3rem] shadow-sm border border-slate-200 p-10 flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-8"><div className={`p-6 rounded-3xl text-white ${product.color}`}><Icon className="w-14 h-14" /></div><div className="text-5xl font-bold text-slate-800 pt-2">{product.price.toFixed(2)}€</div></div>
                        <div className="mb-12 flex-1"><h3 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">{t[`${product.id}_name`]}</h3><p className="text-2xl text-slate-500">{t[`${product.id}_desc`]}</p></div>
                        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[2rem] border border-slate-100 mt-auto"><button onClick={() => removeFromCart(product.id)} disabled={qty === 0} className="w-24 h-24 rounded-2xl bg-white border border-slate-200 text-slate-600 text-5xl font-medium flex items-center justify-center active:bg-slate-100 disabled:opacity-30 disabled:active:bg-white transition-colors">-</button><span className="text-6xl font-bold w-24 text-center text-slate-800">{qty}</span><button onClick={() => addToCart(product.id)} className="w-24 h-24 rounded-2xl bg-indigo-600 text-white text-5xl font-medium flex items-center justify-center active:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">+</button></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {cartItemCount > 0 && (
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-10 px-12 flex justify-between items-center z-20 animate-in slide-in-from-bottom-full duration-300">
                  <div className="flex items-center gap-10 relative"><div className="relative bg-indigo-100 text-indigo-700 w-28 h-28 rounded-full flex items-center justify-center shadow-inner"><Ticket className="w-14 h-14" /><div className="absolute -top-2 -right-2 bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">{cartItemCount}</div></div><div><p className="text-3xl text-slate-500 font-medium mb-2">{t.cartTitle}</p><p className="text-6xl font-black text-indigo-900">{cartTotal.toFixed(2)}€</p></div></div>
                  <button onClick={handleCheckout} className="h-32 px-16 text-4xl font-bold rounded-[2rem] flex items-center justify-center gap-6 bg-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all">{t.continue}<ChevronRight className="w-12 h-12" /></button>
                </div>
              )}
            </div>
          )}

          {step === 'payment' && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50 relative">
              <button onClick={() => setStep('catalog')} className="absolute top-12 left-12 min-h-[96px] px-10 bg-white border border-slate-200 text-slate-600 text-3xl font-bold rounded-3xl flex items-center gap-4 active:bg-slate-100 shadow-sm"><ChevronLeft className="w-10 h-10" />{t.back}</button>
              <h2 className="text-7xl font-bold text-slate-800 mb-24">{t.paymentTitle}</h2>
              <div className="flex justify-center gap-10 mb-24 w-full max-w-4xl">
                <button onClick={() => setPaymentMethod('card')} className={`flex-1 flex flex-col items-center justify-center p-16 rounded-[3rem] border-8 transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 shadow-2xl shadow-indigo-100' : 'border-slate-200 bg-white shadow-sm hover:border-indigo-300 opacity-70 hover:opacity-100'}`}><CreditCard className={`w-40 h-40 mb-10 ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-400'}`} /><span className={`text-4xl font-bold text-center ${paymentMethod === 'card' ? 'text-indigo-900' : 'text-slate-600'}`}>{t.payWithCard}</span></button>
                <button onClick={() => setPaymentMethod('counter')} className={`flex-1 flex flex-col items-center justify-center p-16 rounded-[3rem] border-8 transition-all ${paymentMethod === 'counter' ? 'border-indigo-600 bg-indigo-50 shadow-2xl shadow-indigo-100' : 'border-slate-200 bg-white shadow-sm hover:border-indigo-300 opacity-70 hover:opacity-100'}`}><Store className={`w-40 h-40 mb-10 ${paymentMethod === 'counter' ? 'text-indigo-600' : 'text-slate-400'}`} /><span className={`text-4xl font-bold text-center ${paymentMethod === 'counter' ? 'text-indigo-900' : 'text-slate-600'}`}>{t.payAtCounter}</span></button>
              </div>
              <button onClick={handleProcessPayment} disabled={!paymentMethod} className={`min-h-[140px] w-full max-w-4xl text-6xl font-black rounded-[3rem] flex items-center justify-center gap-6 transition-all ${paymentMethod ? 'bg-emerald-500 text-white shadow-2xl shadow-emerald-200 hover:bg-emerald-600 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>{paymentMethod === 'counter' ? t.generateTicket : t.payAmount} {cartTotal.toFixed(2)}€</button>
            </div>
          )}

          {step === 'terminal' && (<div className="flex-1 flex flex-col items-center justify-center bg-slate-50 relative z-50"><div className="flex flex-col items-center justify-center p-20 w-full max-w-4xl text-center"><CreditCard className="w-64 h-64 text-indigo-600 mb-16 animate-pulse" strokeWidth={1.5} /><h2 className="text-7xl font-bold text-slate-800 mb-8 leading-tight">{t.terminalInstructions}</h2></div></div>)}
          {step === 'processing' && (<div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-white relative z-50"><div className="relative mb-20"><div className="w-64 h-64 border-[16px] border-indigo-900 border-t-indigo-500 rounded-full animate-spin"></div><div className="absolute inset-0 flex items-center justify-center"><CreditCard className="w-24 h-24 text-indigo-400" /></div></div><h2 className="text-7xl font-bold mb-8">{t.processing}</h2><p className="text-4xl text-indigo-300 animate-pulse">{t.doNotRemove}</p></div>)}

          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center bg-slate-50 relative overflow-hidden w-full">
              <div className="w-full max-w-3xl p-10 pt-12 flex-none">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl w-full border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-[radial-gradient(circle,transparent_8px,#fff_8px)] bg-[length:32px_32px] -mt-3"></div>
                  <div className="text-center mb-8 border-b-4 border-dashed border-slate-200 pb-8"><div className="bg-emerald-100 text-emerald-600 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-16 h-16" /></div><h2 className="text-5xl font-black text-slate-800 mb-4">{paymentMethod === 'counter' ? t.successTitleCounter : t.successTitle}</h2><p className="text-2xl text-slate-500">{t.refNumber}: <span className="font-mono font-bold text-slate-700">{orderRef}</span></p></div>
                  <div className="space-y-4 mb-8">{Object.entries(cart).map(([id, qty]) => (<div key={id} className="flex justify-between text-3xl"><span className="text-slate-600">{qty}x {t[`${id}_name`]}</span><span className="font-bold text-slate-800">{(PRODUCTS.find(p=>p.id===id).price * qty).toFixed(2)}€</span></div>))}</div>
                  <div className="flex justify-between items-center bg-slate-50 p-8 rounded-[2rem]"><span className="text-3xl text-slate-600 font-medium">{paymentMethod === 'counter' ? t.totalToPay : t.totalPaid}</span><span className="text-5xl font-black text-indigo-900">{cartTotal.toFixed(2)}€</span></div>
                  {paymentMethod !== 'counter' && (<div className="mt-8 pt-8 border-t-4 border-dashed border-slate-200 flex flex-col items-center justify-center"><div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-4"><QrCode className="w-44 h-44 text-slate-800" strokeWidth={1.5} /></div><p className="text-2xl font-bold text-slate-500 uppercase tracking-widest">{t.downloadPurchase}</p></div>)}
                </div>
              </div>
              <div className="w-full max-w-3xl px-12 pb-12 flex flex-col justify-center space-y-6 flex-1 mt-2">
                <h3 className="text-3xl font-bold text-slate-800 mb-2 text-center leading-tight">{paymentMethod === 'counter' ? t.successSubtitleCounter : t.successSubtitle}</h3>
                <button onClick={handlePrint} className="w-full min-h-[110px] bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center gap-6 text-4xl font-bold shadow-xl shadow-indigo-200 active:scale-95 transition-all"><Printer className="w-10 h-10" />{paymentMethod === 'counter' ? t.printReceipt : t.print}</button>
                {paymentMethod !== 'counter' && (<button onClick={() => setShowEmailModal(true)} className="w-full min-h-[110px] bg-white border-4 border-indigo-100 text-indigo-700 rounded-[2.5rem] flex items-center justify-center gap-6 text-4xl font-bold hover:border-indigo-300 active:scale-95 transition-all"><Mail className="w-10 h-10" />{t.email}</button>)}
                <div className="h-1 bg-slate-200 w-full my-2 rounded-full"></div>
                <button onClick={handleReset} className="w-full min-h-[100px] bg-slate-800 text-white rounded-[2rem] flex items-center justify-center text-3xl font-bold shadow-lg shadow-slate-300 active:scale-95 transition-all">{t.newSale}</button>
              </div>
            </div>
          )}
        </main>

        {showDatePicker && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-12">
            <div className="bg-slate-100 w-full max-w-[980px] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-indigo-600 p-10 px-12 flex justify-between items-center text-white flex-none"><h3 className="text-5xl font-bold flex items-center gap-6"><CalendarDays className="w-12 h-12" />{t.selectDateTitle}</h3><button onClick={() => setShowDatePicker(false)} className="p-5 bg-white/20 rounded-full active:bg-white/40 transition-colors"><X className="w-10 h-10" /></button></div>
              <div className="p-12 bg-white flex-none flex flex-col items-center justify-center border-b border-slate-200">
                <div className="flex justify-between items-center w-full px-8 mb-12"><button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} className="p-6 bg-slate-100 rounded-3xl active:bg-slate-200 transition-colors"><ChevronLeft className="w-10 h-10 text-slate-700"/></button><h4 className="text-5xl font-bold text-slate-800 capitalize">{calendarMonth.toLocaleDateString(lang, { month: 'long', year: 'numeric' })}</h4><button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} className="p-6 bg-slate-100 rounded-3xl active:bg-slate-200 transition-colors"><ChevronRight className="w-10 h-10 text-slate-700"/></button></div>
                <div className="grid grid-cols-7 gap-6 w-full">
                  {t.days.map((d, i) => (<div key={i} className="text-center text-3xl font-bold text-slate-400 mb-4 uppercase">{d}</div>))}
                  {Array(getFirstDayOfMonth(calendarMonth)).fill(null).map((_, i) => (<div key={`empty-${i}`} className="h-28" />))}
                  {Array(getDaysInMonth(calendarMonth)).fill(null).map((_, i) => {
                    const day = i + 1; const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day); const isSelected = isSameDay(date, selectedDate); const today = new Date(); today.setHours(0,0,0,0); const isPast = date < today;
                    return (<button key={day} disabled={isPast} onClick={() => { setSelectedDate(date); setShowDatePicker(false); }} className={`h-28 rounded-[2rem] text-4xl font-bold flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105' : isPast ? 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50' : 'bg-white border-4 border-slate-100 text-slate-700 hover:border-indigo-200 active:bg-slate-100'}`}>{day}</button>);
                  })}
                </div>
              </div>
              <div className="p-8 px-12 bg-slate-50 flex-none"><button onClick={() => setShowDatePicker(false)} className="w-full min-h-[120px] text-4xl font-bold text-slate-600 bg-white border-4 border-slate-200 rounded-[2rem] active:bg-slate-100 transition-all flex items-center justify-center">{t.cancel}</button></div>
            </div>
          </div>
        )}

        {showEmailModal && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-12">
            <div className="bg-slate-100 w-full max-w-[980px] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-indigo-600 p-10 px-12 flex justify-between items-center text-white flex-none"><h3 className="text-5xl font-bold flex items-center gap-6"><Mail className="w-12 h-12" />{t.emailModalTitle}</h3><button onClick={() => setShowEmailModal(false)} className="p-5 bg-white/20 rounded-full active:bg-white/40 transition-colors"><X className="w-10 h-10" /></button></div>
              <div className="p-10 bg-white border-b border-slate-200 flex-none flex flex-col items-center justify-center"><div className="w-full text-6xl p-8 bg-slate-50 border-4 border-slate-200 rounded-[2rem] text-slate-800 font-medium min-h-[140px] flex items-center shadow-inner overflow-hidden">{emailInput || <span className="text-slate-400">ejemplo@correo.com</span>}<span className="w-2 h-14 bg-indigo-500 animate-pulse ml-4 shrink-0 rounded-full"></span></div></div>
              <div className="p-8 flex flex-col gap-4 bg-slate-200/80 flex-none">
                <div className="flex justify-center gap-4 w-full">{['1','2','3','4','5','6','7','8','9','0'].map(k => (<button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">{k}</button>))}</div>
                <div className="flex justify-center gap-4 w-full">{['q','w','e','r','t','y','u','i','o','p'].map(k => (<button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>))}</div>
                <div className="flex justify-center gap-4 w-full px-[5%]">{['a','s','d','f','g','h','j','k','l'].map(k => (<button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>))}</div>
                <div className="flex justify-center gap-4 w-full"><button onClick={() => setEmailInput(p=>p+'@')} style={{flex: 1.5}} className="h-24 bg-indigo-100 text-indigo-700 rounded-2xl text-4xl font-bold shadow-sm active:bg-indigo-300 active:scale-95 transition-all flex items-center justify-center">@</button>{['z','x','c','v','b','n','m'].map(k => (<button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>))}<button onClick={() => setEmailInput(p=>p.slice(0,-1))} style={{flex: 1.5}} className="h-24 bg-slate-300 text-slate-700 rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-400 active:scale-95 transition-all flex items-center justify-center">&#x232B;</button></div>
                <div className="flex justify-center gap-4 w-full"><button onClick={() => setEmailInput('')} style={{flex: 2}} className="h-24 bg-rose-100 text-rose-700 rounded-2xl text-3xl font-bold shadow-sm active:bg-rose-200 active:scale-95 transition-all flex items-center justify-center">Borrar</button><button onClick={() => setEmailInput(p=>p+'-')} style={{flex: 1}} className="h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">-</button><button onClick={() => setEmailInput(p=>p+'_')} style={{flex: 1}} className="h-24 bg-white rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">_</button><button onClick={() => setEmailInput(p=>p+'.')} style={{flex: 1}} className="h-24 bg-white rounded-2xl text-5xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center pb-2">.</button><button onClick={() => setEmailInput(p=>p+'.com')} style={{flex: 4}} className="h-24 bg-slate-300 text-slate-800 rounded-2xl text-4xl font-bold shadow-sm active:bg-slate-400 active:scale-95 transition-all flex items-center justify-center">.com</button></div>
              </div>
              <div className="p-8 px-12 bg-white border-t border-slate-200 flex gap-8 flex-none"><button type="button" onClick={() => setShowEmailModal(false)} className="flex-1 min-h-[120px] text-4xl font-bold text-slate-600 bg-slate-100 rounded-[2rem] active:bg-slate-200 transition-all flex items-center justify-center">{t.cancel}</button><button type="button" onClick={handleSendEmail} className="flex-[2] min-h-[120px] text-4xl font-bold text-white bg-indigo-600 rounded-[2rem] active:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center">{t.send}</button></div>
            </div>
          </div>
        )}

        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-[150] flex flex-col gap-4 pointer-events-none w-full max-w-3xl px-12">
          {toasts.map(toast => (<div key={toast.id} className={`flex items-center justify-center gap-6 p-8 rounded-full shadow-2xl shadow-black/20 text-3xl font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 w-full ${toast.type === 'error' ? 'bg-rose-500 text-white' : toast.type === 'info' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>{toast.type === 'error' ? <AlertCircle className="w-10 h-10 shrink-0" /> : <CheckCircle2 className="w-10 h-10 text-white shrink-0" />}<span className="truncate">{toast.message}</span></div>))}
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-neutral-900 flex items-center justify-center overflow-hidden font-sans">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div
        className="bg-slate-50 flex flex-col overflow-hidden select-none text-slate-800 shadow-2xl relative shrink-0"
        style={{
          width: '1080px',
          height: '1920px',
          transform: 'scale(calc(min(100vw / 1080, 100vh / 1920)))',
          transformOrigin: 'center center'
        }}
      >
        {renderAppContent()}
      </div>
    </div>
  );
}
