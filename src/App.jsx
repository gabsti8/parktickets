import React, { useState, useEffect, useRef } from 'react';
import { 
  Ticket, User, Baby, Star, Users, CalendarDays, 
  CreditCard, Smartphone, Printer, Mail, CheckCircle2, 
  RotateCcw, ChevronRight, ChevronLeft, QrCode, X, AlertCircle, Store
} from 'lucide-react';

// --- CONFIGURACIÓN Y DATOS ---

const IDLE_TIMEOUT = 120000; // 2 minutos en milisegundos

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
  { id: 'senior', icon: User, price: 25.00, color: 'bg-teal-500' }
];

const DICTIONARY = {
  es: {
    welcome: '¡Bienvenido a ParkTickets!',
    touchToStart: 'Toca la pantalla para empezar',
    selectLanguage: 'Selecciona tu idioma',
    catalogTitle: 'Selecciona tus entradas para el ',
    selectDateTitle: 'Selecciona la fecha de visita',
    days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    cartTitle: 'Tu Compra',
    emptyCart: 'Tu carrito está vacío',
    total: 'Total',
    continue: 'Continuar al Pago',
    back: 'Volver',
    paymentTitle: 'Selecciona un método de pago',
    payWithCard: 'Tarjeta Bancaria',
    payWithMobile: 'Pago Móvil / NFC',
    payAmount: 'Pagar',
    processing: 'Procesando pago...',
    doNotRemove: 'Por favor, no retires tu tarjeta/móvil',
    successTitle: '¡Pago Completado!',
    successTitleCounter: '¡Justificante Creado!',
    successSubtitle: 'Recoge tus entradas a continuación',
    refNumber: 'Número de Referencia',
    print: 'Imprimir Entradas',
    printReceipt: 'Imprimir Justificante',
    email: 'Enviar por Email',
    newSale: 'Finalizar Compra',
    emailModalTitle: 'Enviar entradas por Email',
    send: 'Enviar',
    cancel: 'Cancelar',
    printingMsg: 'Imprimiendo entradas... ¡Recógelas abajo!',
    printingReceiptMsg: 'Imprimiendo justificante...',
    emailSentMsg: 'Entradas enviadas con éxito',
    invalidEmail: 'Por favor, introduce un email válido',
    terminalInstructions: 'Sigue las instrucciones del terminal de pago',
    payAtCounter: 'Pagar en Mostrador',
    generateTicket: 'Generar Ticket',
    successSubtitleCounter: 'Presenta este recibo en taquilla para pagar',
    totalToPay: 'Total a Pagar',
    totalPaid: 'Total Pagado',
    downloadPurchase: 'Descargar compra',
    adult_name: 'Entrada General (Adulto)',
    adult_desc: 'De 12 a 64 años',
    child_name: 'Entrada Niño',
    child_desc: 'De 4 a 11 años',
    senior_name: 'Entrada Sénior',
    senior_desc: 'Mayores de 65 años',
    vip_name: 'Pase VIP Fast-Track',
    vip_desc: 'Acceso sin colas a todas las atracciones',
    family_name: 'Pack Familiar',
    family_desc: '2 Adultos + 2 Niños',
    season_name: 'Abono Temporada',
    season_desc: 'Acceso ilimitado todo el año'
  },
  ca: {
    welcome: 'Benvingut a ParkTickets!',
    touchToStart: 'Toca la pantalla per començar',
    selectLanguage: 'Selecciona el teu idioma',
    catalogTitle: 'Selecciona les teves entrades per al ',
    selectDateTitle: 'Selecciona la data de visita',
    days: ['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'],
    cartTitle: 'La teva Compra',
    emptyCart: 'El teu carretó està buit',
    total: 'Total',
    continue: 'Continuar al Pagament',
    back: 'Tornar',
    paymentTitle: 'Selecciona un mètode de pagament',
    payWithCard: 'Targeta Bancària',
    payWithMobile: 'Pagament Mòbil / NFC',
    payAmount: 'Pagar',
    processing: 'Processant pagament...',
    doNotRemove: 'Si us plau, no retiris la targeta/mòbil',
    successTitle: 'Pagament Completat!',
    successTitleCounter: 'Justificant Creat!',
    successSubtitle: 'Recull les teves entrades a continuació',
    refNumber: 'Número de Referència',
    print: 'Imprimir Entrades',
    printReceipt: 'Imprimir Justificant',
    email: 'Enviar per Email',
    newSale: 'Finalitzar Compra',
    emailModalTitle: 'Enviar entrades per Email',
    send: 'Enviar',
    cancel: 'Cancel·lar',
    emailSentMsg: 'Entradas enviades amb èxit',
    invalidEmail: 'Si us plau, introdueix un email vàlid',
    terminalInstructions: 'Segueix les instruccions del terminal de pagament',
    payAtCounter: 'Pagar a Taquilla',
    generateTicket: 'Generar Tiquet',
    successSubtitleCounter: 'Presenta aquest rebut a taquilla per pagar',
    totalToPay: 'Total a Pagar',
    totalPaid: 'Total Pagat',
    downloadPurchase: 'Descarregar compra',
    adult_name: 'Entrada General (Adult)',
    adult_desc: 'De 12 a 64 anys',
    child_name: 'Entrada Nen',
    child_desc: 'De 4 a 11 anys',
    senior_name: 'Entrada Sènior',
    senior_desc: 'Majors de 65 anys',
    vip_name: 'Passi VIP Fast-Track',
    vip_desc: 'Accés sense cues a totes les atraccions',
    family_name: 'Pack Familiar',
    family_desc: '2 Adults + 2 Nens',
    season_name: 'Abonament Temporada',
    season_desc: 'Accés il·limitat tot l\'any'
  },
  en: {
    welcome: 'Welcome to ParkTickets!',
    touchToStart: 'Touch the screen to start',
    selectLanguage: 'Select your language',
    catalogTitle: 'Select your tickets for ',
    selectDateTitle: 'Select visit date',
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    cartTitle: 'Your Cart',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    continue: 'Continue to Payment',
    back: 'Back',
    paymentTitle: 'Select a payment method',
    payWithCard: 'Credit/Debit Card',
    payWithMobile: 'Mobile Pay / NFC',
    payAmount: 'Pay',
    processing: 'Processing payment...',
    doNotRemove: 'Please do not remove your card/phone',
    successTitle: 'Payment Successful!',
    successTitleCounter: 'Receipt Created!',
    successSubtitle: 'Collect your tickets below',
    refNumber: 'Reference Number',
    print: 'Print Tickets',
    printReceipt: 'Print Receipt',
    email: 'Send via Email',
    newSale: 'Finish Purchase',
    emailModalTitle: 'Send tickets via Email',
    send: 'Send',
    cancel: 'Cancel',
    printingMsg: 'Printing tickets... Collect them below!',
    printingReceiptMsg: 'Printing receipt...',
    emailSentMsg: 'Tickets successfully sent',
    invalidEmail: 'Please enter a valid email address',
    terminalInstructions: 'Follow the instructions on the payment terminal',
    payAtCounter: 'Pay at Counter',
    generateTicket: 'Generate Ticket',
    successSubtitleCounter: 'Present this receipt at the counter to pay',
    totalToPay: 'Total to Pay',
    totalPaid: 'Total Paid',
    downloadPurchase: 'Download purchase',
    adult_name: 'General Admission (Adult)',
    adult_desc: 'Ages 12 to 64',
    child_name: 'Child Ticket',
    child_desc: 'Ages 4 to 11',
    senior_name: 'Senior Ticket',
    senior_desc: 'Ages 65 and over',
    vip_name: 'VIP Fast-Track Pass',
    vip_desc: 'Skip-the-line access to all rides',
    family_name: 'Family Pack',
    family_desc: '2 Adults + 2 Children',
    season_name: 'Season Pass',
    season_desc: 'Unlimited access all year'
  },
  fr: {
    welcome: 'Bienvenue à ParkTickets !',
    touchToStart: 'Touchez l\'écran pour commencer',
    selectLanguage: 'Sélectionnez votre langue',
    catalogTitle: 'Sélectionnez vos billets pour le ',
    selectDateTitle: 'Sélectionnez la date de visite',
    days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    cartTitle: 'Votre Panier',
    emptyCart: 'Votre panier est vide',
    total: 'Total',
    continue: 'Passer au Paiement',
    back: 'Retour',
    paymentTitle: 'Sélectionnez un mode de paiement',
    payWithCard: 'Carte Bancaire',
    payWithMobile: 'Paiement Mobile / NFC',
    payAmount: 'Payer',
    processing: 'Traitement du paiement...',
    doNotRemove: 'Veuillez ne pas retirer votre carte/téléphone',
    successTitle: 'Paiement Réussi !',
    successTitleCounter: 'Reçu Créé !',
    successSubtitle: 'Récupérez vos billets ci-dessous',
    refNumber: 'Numéro de Référence',
    print: 'Imprimer les Billets',
    printReceipt: 'Imprimer le Reçu',
    email: 'Envoyer par Email',
    newSale: 'Terminer l\'achat',
    emailModalTitle: 'Envoyer les billets par Email',
    send: 'Envoyer',
    cancel: 'Annuler',
    printingMsg: 'Impression en cours... Récupérez-les en bas !',
    printingReceiptMsg: 'Impression du reçu en cours...',
    emailSentMsg: 'Billets envoyés avec succès',
    invalidEmail: 'Veuillez entrer une adresse email valide',
    terminalInstructions: 'Suivez les instructions sur le terminal de paiement',
    payAtCounter: 'Payer au Guichet',
    generateTicket: 'Générer le Ticket',
    successSubtitleCounter: 'Présentez ce reçu au guichet pour payer',
    totalToPay: 'Total à Payer',
    totalPaid: 'Total Payé',
    downloadPurchase: 'Télécharger l\'achat',
    adult_name: 'Billet Général (Adulte)',
    adult_desc: 'De 12 à 64 ans',
    child_name: 'Billet Enfant',
    child_desc: 'De 4 à 11 ans',
    senior_name: 'Billet Senior',
    senior_desc: '65 ans et plus',
    vip_name: 'Pass VIP Fast-Track',
    vip_desc: 'Accès coupe-file à toutes les attractions',
    family_name: 'Pack Famille',
    family_desc: '2 Adultes + 2 Enfants',
    season_name: 'Pass Saison',
    season_desc: 'Accès illimité toute l\'année'
  },
  de: {
    welcome: 'Willkommen bei ParkTickets!',
    touchToStart: 'Bildschirm berühren, um zu beginnen',
    selectLanguage: 'Wählen Sie Ihre Sprache',
    catalogTitle: 'Wählen Sie Ihre Tickets für den ',
    selectDateTitle: 'Besuchsdatum auswählen',
    days: ['M', 'D', 'M', 'D', 'F', 'S', 'S'],
    cartTitle: 'Ihr Warenkorb',
    emptyCart: 'Ihr Warenkorb ist leer',
    total: 'Gesamt',
    continue: 'Weiter zur Zahlung',
    back: 'Zurück',
    paymentTitle: 'Wählen Sie eine Zahlungsmethode',
    payWithCard: 'Bankkarte',
    payWithMobile: 'Mobiles Bezahlen / NFC',
    payAmount: 'Bezahlen',
    processing: 'Zahlung wird verarbeitet...',
    doNotRemove: 'Bitte Karte/Telefon nicht entfernen',
    successTitle: 'Zahlung Erfolgreich!',
    successTitleCounter: 'Beleg Erstellt!',
    successSubtitle: 'Entnehmen Sie Ihre Tickets unten',
    refNumber: 'Referenznummer',
    print: 'Tickets Drucken',
    printReceipt: 'Beleg Drucken',
    email: 'Per E-Mail Senden',
    newSale: 'Kauf abschließen',
    emailModalTitle: 'Tickets per E-Mail senden',
    send: 'Senden',
    cancel: 'Abbrechen',
    printingMsg: 'Tickets werden gedruckt... Bitte unten entnehmen!',
    printingReceiptMsg: 'Beleg wird gedruckt...',
    emailSentMsg: 'Tickets erfolgreich gesendet',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    terminalInstructions: 'Folgen Sie den Anweisungen auf dem Zahlungsterminal',
    payAtCounter: 'An der Kasse bezahlen',
    generateTicket: 'Ticket Generieren',
    successSubtitleCounter: 'Legen Sie diesen Beleg an der Kasse vor, um zu bezahlen',
    totalToPay: 'Zu zahlender Betrag',
    totalPaid: 'Gesamtbetrag Bezahlt',
    downloadPurchase: 'Kauf herunterladen',
    adult_name: 'Allgemeiner Eintritt (Erwachsene)',
    adult_desc: '12 bis 64 Jahre',
    child_name: 'Kinderticket',
    child_desc: '4 bis 11 Jahre',
    senior_name: 'Seniorenticket',
    senior_desc: 'Ab 65 Jahren',
    vip_name: 'VIP Fast-Track Pass',
    vip_desc: 'Schnelleinlass zu allen Attraktionen',
    family_name: 'Familienpaket',
    family_desc: '2 Erwachsene + 2 Kinder',
    season_name: 'Saisonkarte',
    season_desc: 'Unbegrenzter Zugang das ganze Jahr'
  }
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  // Estados principales
  const [step, setStep] = useState('idle'); 
  const [lang, setLang] = useState('es');
  const [cart, setCart] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  // Estados de Fecha
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  
  // Estados de UI
  const [currentTime, setCurrentTime] = useState(new Date());
  const [toasts, setToasts] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [orderRef, setOrderRef] = useState('');

  const t = DICTIONARY[lang];

  // --- Helpers del Calendario ---
  const openDatePicker = () => {
    setCalendarMonth(new Date(selectedDate));
    setShowDatePicker(true);
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  };

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sistema de inactividad (Idle Timer)
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (step !== 'idle') {
        timeoutId = setTimeout(() => {
          setStep('idle');
          setCart({});
          setPaymentMethod(null);
          setShowEmailModal(false);
          setShowDatePicker(false);
          setSelectedDate(new Date());
          addToast('Sesión cerrada por inactividad', 'info');
        }, IDLE_TIMEOUT);
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [step]);

  // Sistema de Notificaciones (Toasts)
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Acciones del Carrito
  const addToCart = (productId) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return total + (product.price * qty);
  }, 0);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Flujo de compra
  const handleCheckout = () => {
    if (cartItemCount > 0) {
      setPaymentMethod(null);
      setStep('payment');
    }
  };

  const handleProcessPayment = () => {
    if (!paymentMethod) return;
    
    if (paymentMethod === 'card') {
      setStep('terminal'); 
      setTimeout(() => {
        setStep('processing'); 
        setTimeout(() => {
          finishPayment();
        }, 2000);
      }, 4000);
    } else {
      finishPayment();
    }
  };

  const finishPayment = () => {
    setOrderRef('TK-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    setStep('success');
    addToast(paymentMethod === 'counter' ? t.successTitleCounter : t.successTitle);
  };

  const handleReset = () => {
    setCart({});
    setPaymentMethod(null);
    setShowEmailModal(false);
    setShowDatePicker(false);
    setSelectedDate(new Date());
    setStep('idle');
  };

  const handlePrint = () => {
    addToast(paymentMethod === 'counter' ? (t.printingReceiptMsg || 'Imprimiendo justificante...') : t.printingMsg, 'info');
  };

  const handleSendEmail = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      addToast(t.invalidEmail, 'error');
      return;
    }
    addToast(t.emailSentMsg, 'success');
    setShowEmailModal(false);
    setEmailInput('');
  };

  // --- RENDERIZADO PRINCIPAL DE LA VISTA ---
  const renderAppContent = () => {
    // 1. Pantalla de Espera (Idle)
    if (step === 'idle') {
      return (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col items-center justify-center cursor-pointer select-none z-50 p-4"
          onClick={() => setStep('catalog')}
        >
          <div className="absolute top-6 right-6 md:top-12 md:right-12 text-white/80 text-lg md:text-4xl font-mono tracking-wider font-semibold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          <div className="text-center animate-pulse mb-16 md:mb-32 space-y-6 md:space-y-12 mt-10 md:mt-0">
            <Ticket className="w-24 h-24 md:w-64 md:h-64 text-white mx-auto drop-shadow-2xl mb-4 md:mb-12" strokeWidth={1.5} />
            <h1 className="text-4xl md:text-7xl lg:text-[100px] leading-tight font-extrabold text-white drop-shadow-lg tracking-tight px-4 md:px-12">
              {t.welcome}
            </h1>
            <p className="text-xl md:text-4xl lg:text-6xl text-blue-100 font-medium tracking-wide">
              {t.touchToStart}
            </p>
          </div>

          <div className="absolute bottom-8 md:bottom-24 w-full px-4 md:px-16" onClick={(e) => e.stopPropagation()}>
            <p className="text-white/80 text-center text-lg md:text-4xl mb-4 md:mb-12 font-medium">{t.selectLanguage}</p>
            <div className="flex justify-center gap-3 md:gap-10 flex-wrap">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setStep('catalog'); }}
                  className="rounded-full w-14 h-14 md:w-24 md:h-24 lg:w-40 lg:h-40 overflow-hidden shadow-lg border-[3px] lg:border-[6px] border-white/20 hover:border-white/50 active:scale-95 transition-all flex items-center justify-center shrink-0"
                >
                  <img src={l.flagUrl} alt={l.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 2. Estructura Principal (Header + Content)
    return (
      <>
        {/* HEADER */}
        <header className="bg-white shadow-sm h-20 md:h-24 lg:h-32 shrink-0 flex items-center justify-between px-4 md:px-8 lg:px-12 border-b border-slate-200 z-10">
          <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <div className="bg-indigo-600 p-3 md:p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-sm">
                <Ticket className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
            
            {/* BOTÓN SELECTOR DE FECHA */}
            {step !== 'idle' && (
              <button 
                onClick={openDatePicker}
                className="flex items-center gap-2 lg:gap-4 bg-white border-2 lg:border-4 border-slate-100 p-2 px-3 md:p-3 md:px-6 lg:p-4 lg:px-8 rounded-xl lg:rounded-[1.5rem] shadow-sm hover:border-indigo-200 active:scale-95 transition-all"
              >
                <CalendarDays className="w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10 text-indigo-600 shrink-0" />
                <span className="text-sm md:text-xl lg:text-3xl font-bold text-slate-700 capitalize">
                  {selectedDate.toLocaleDateString(lang, { day: 'numeric', month: 'short' })}
                </span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4 lg:gap-10">
            {/* Selector de idioma rápido (oculto en móviles muy pequeños para ahorrar espacio) */}
            <div className="hidden md:flex gap-2 lg:gap-4 bg-slate-100 p-2 lg:p-3 rounded-full">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`w-8 h-8 lg:w-16 lg:h-16 rounded-full overflow-hidden transition-all ${
                    lang === l.code ? 'ring-4 lg:ring-[6px] ring-indigo-600 scale-110 shadow-xl' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={l.flagUrl} alt={l.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <div className="text-base md:text-2xl lg:text-4xl font-mono font-semibold text-slate-600 tracking-wider bg-slate-100 py-2 px-4 lg:py-5 lg:px-8 rounded-xl lg:rounded-3xl">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-100">
          
          {/* PASO 1: CATÁLOGO */}
          {step === 'catalog' && (
            <div className="flex-1 relative flex flex-col h-full w-full overflow-hidden">
              <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full no-scrollbar pb-32 md:pb-48 lg:pb-64">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 lg:mb-12">
                  {t.catalogTitle} 
                  <span className="text-indigo-600 capitalize">
                    {selectedDate.toLocaleDateString(lang, { day: 'numeric', month: 'long' })}
                  </span>
                </h2>
                <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                  {PRODUCTS.map((product) => {
                    const Icon = product.icon;
                    const qty = cart[product.id] || 0;
                    return (
                      <div key={product.id} className="bg-white rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] shadow-sm border border-slate-200 p-4 lg:p-8 px-4 md:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        {/* Información del producto */}
                        <div className="flex items-center gap-4 lg:gap-10 w-full md:w-auto">
                          <div className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-xl lg:rounded-[2.5rem] flex items-center justify-center text-white shrink-0 ${product.color}`}>
                            <Icon className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                          </div>
                          <div className="flex flex-col justify-center flex-1">
                            <h3 className="text-xl md:text-3xl lg:text-5xl font-bold text-slate-800 mb-1 lg:mb-3">{t[`${product.id}_name`]}</h3>
                            <p className="text-sm md:text-xl lg:text-3xl text-slate-500">{t[`${product.id}_desc`]}</p>
                            <div className="text-2xl md:text-4xl lg:text-5xl font-black text-indigo-600 mt-2 lg:mt-5">
                              {product.price.toFixed(2)}€
                            </div>
                          </div>
                        </div>
                        
                        {/* Controles de cantidad */}
                        <div className="flex items-center justify-between w-full md:w-auto bg-slate-50 p-2 lg:p-4 rounded-xl lg:rounded-[2.5rem] border border-slate-100 shrink-0">
                          <button 
                            onClick={() => removeFromCart(product.id)}
                            disabled={qty === 0}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-lg md:rounded-full bg-white border border-slate-200 text-slate-600 text-3xl md:text-4xl lg:text-6xl font-medium flex items-center justify-center active:bg-slate-100 disabled:opacity-30 disabled:active:bg-white transition-colors shrink-0"
                          >
                            -
                          </button>
                          <span className="text-2xl md:text-4xl lg:text-6xl font-bold w-12 md:w-20 lg:w-32 text-center text-slate-800">{qty}</span>
                          <button 
                            onClick={() => addToCart(product.id)}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 rounded-lg md:rounded-full bg-indigo-600 text-white text-3xl md:text-4xl lg:text-6xl font-medium flex items-center justify-center active:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 shrink-0"
                          >
                            +
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BARRA FLOTANTE DEL CARRITO */}
              {cartItemCount > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 pb-6 md:p-8 lg:p-10 px-4 md:px-8 lg:px-12 flex justify-between items-center z-20 animate-in slide-in-from-bottom-full duration-300">
                  <div className="flex items-center gap-3 lg:gap-10 relative">
                    <div className="relative bg-indigo-100 text-indigo-700 w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center shadow-inner shrink-0">
                      <Ticket className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
                      <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-rose-500 text-white w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs md:text-base lg:text-2xl font-bold border-2 lg:border-4 border-white shadow-sm">
                        {cartItemCount}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm md:text-xl lg:text-3xl text-slate-500 font-medium mb-0 lg:mb-2">{t.cartTitle}</p>
                      <p className="text-xl md:text-4xl lg:text-6xl font-black text-indigo-900">{cartTotal.toFixed(2)}€</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="h-12 md:h-20 lg:h-32 px-6 md:px-10 lg:px-16 text-sm md:text-2xl lg:text-4xl font-bold rounded-xl lg:rounded-[2rem] flex items-center justify-center gap-2 lg:gap-6 bg-indigo-600 text-white shadow-xl lg:shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all shrink-0"
                  >
                    {t.continue}
                    <ChevronRight className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PASO 2: PAGO */}
          {step === 'payment' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 bg-slate-50 relative overflow-y-auto pb-8">
              <button 
                onClick={() => setStep('catalog')}
                className="absolute top-4 left-4 md:top-12 md:left-12 min-h-[40px] md:min-h-[70px] lg:min-h-[96px] px-4 md:px-8 lg:px-10 bg-white border border-slate-200 text-slate-600 text-sm md:text-xl lg:text-3xl font-bold rounded-xl lg:rounded-3xl flex items-center gap-2 lg:gap-4 active:bg-slate-100 shadow-sm z-10"
              >
                <ChevronLeft className="w-5 h-5 lg:w-10 lg:h-10 shrink-0" />
                {t.back}
              </button>

              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-800 mb-8 md:mb-16 lg:mb-24 mt-16 md:mt-0 text-center">{t.paymentTitle}</h2>

              <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-10 mb-8 md:mb-16 lg:mb-24 w-full max-w-4xl px-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 lg:p-16 rounded-2xl lg:rounded-[3rem] border-4 lg:border-8 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50 shadow-xl lg:shadow-2xl shadow-indigo-100'
                      : 'border-slate-200 bg-white shadow-sm hover:border-indigo-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <CreditCard className={`w-10 h-10 sm:w-20 sm:h-20 lg:w-40 lg:h-40 mr-4 sm:mr-0 sm:mb-6 lg:mb-10 shrink-0 ${paymentMethod === 'card' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className={`text-lg sm:text-2xl lg:text-4xl font-bold text-center ${paymentMethod === 'card' ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {t.payWithCard}
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod('counter')}
                  className={`flex-1 flex flex-row sm:flex-col items-center justify-start sm:justify-center p-6 lg:p-16 rounded-2xl lg:rounded-[3rem] border-4 lg:border-8 transition-all ${
                    paymentMethod === 'counter'
                      ? 'border-indigo-600 bg-indigo-50 shadow-xl lg:shadow-2xl shadow-indigo-100'
                      : 'border-slate-200 bg-white shadow-sm hover:border-indigo-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <Store className={`w-10 h-10 sm:w-20 sm:h-20 lg:w-40 lg:h-40 mr-4 sm:mr-0 sm:mb-6 lg:mb-10 shrink-0 ${paymentMethod === 'counter' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className={`text-lg sm:text-2xl lg:text-4xl font-bold text-center ${paymentMethod === 'counter' ? 'text-indigo-900' : 'text-slate-600'}`}>
                    {t.payAtCounter}
                  </span>
                </button>
              </div>

              <div className="w-full max-w-4xl px-4">
                <button
                  onClick={handleProcessPayment}
                  disabled={!paymentMethod}
                  className={`min-h-[60px] md:min-h-[100px] lg:min-h-[140px] w-full text-xl md:text-4xl lg:text-6xl font-black rounded-2xl lg:rounded-[3rem] flex items-center justify-center gap-2 lg:gap-6 transition-all ${
                    paymentMethod 
                    ? 'bg-emerald-500 text-white shadow-xl lg:shadow-2xl shadow-emerald-200 hover:bg-emerald-600 active:scale-[0.98]' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {paymentMethod === 'counter' ? t.generateTicket : t.payAmount} {cartTotal.toFixed(2)}€
                </button>
              </div>
            </div>
          )}

          {/* PASO 2.2: INSTRUCCIONES DEL TERMINAL FÍSICO */}
          {step === 'terminal' && (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 relative z-50 p-4">
              <div className="flex flex-col items-center justify-center p-6 md:p-20 w-full max-w-4xl text-center">
                <CreditCard className="w-32 h-32 md:w-64 md:h-64 text-indigo-600 mb-8 md:mb-16 animate-pulse" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-800 mb-4 md:mb-8 leading-tight">{t.terminalInstructions}</h2>
              </div>
            </div>
          )}

          {/* PASO 2.5: PROCESANDO */}
          {step === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-white relative z-50 p-4">
              <div className="relative mb-10 md:mb-20">
                <div className="w-32 h-32 md:w-64 md:h-64 border-[8px] md:border-[16px] border-indigo-900 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CreditCard className="w-12 h-12 md:w-24 md:h-24 text-indigo-400" />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-8 text-center">{t.processing}</h2>
              <p className="text-lg md:text-3xl lg:text-4xl text-indigo-300 animate-pulse text-center">{t.doNotRemove}</p>
            </div>
          )}

          {/* PASO 3: ÉXITO / TICKET */}
          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-start md:justify-center bg-slate-50 relative overflow-y-auto w-full">
              
              {/* Parte superior: Ticket Visual */}
              <div className="w-full max-w-3xl p-4 md:p-10 pt-6 md:pt-12 flex-none">
                <div className="bg-white p-6 md:p-12 rounded-3xl lg:rounded-[3rem] shadow-xl w-full border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-[radial-gradient(circle,transparent_4px,#fff_4px)] md:bg-[radial-gradient(circle,transparent_8px,#fff_8px)] bg-[length:16px_16px] md:bg-[length:32px_32px] -mt-2 md:-mt-3"></div>
                  
                  <div className="text-center mb-6 md:mb-8 border-b-2 md:border-b-4 border-dashed border-slate-200 pb-6 md:pb-8">
                    <div className="bg-emerald-100 text-emerald-600 w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <CheckCircle2 className="w-8 h-8 md:w-16 md:h-16" />
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-2 md:mb-4">
                      {paymentMethod === 'counter' ? t.successTitleCounter : t.successTitle}
                    </h2>
                    <p className="text-sm md:text-xl lg:text-2xl text-slate-500">{t.refNumber}: <span className="font-mono font-bold text-slate-700">{orderRef}</span></p>
                  </div>

                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {Object.entries(cart).map(([id, qty]) => (
                      <div key={id} className="flex justify-between text-sm md:text-2xl lg:text-3xl">
                        <span className="text-slate-600">{qty}x {t[`${id}_name`]}</span>
                        <span className="font-bold text-slate-800">{(PRODUCTS.find(p=>p.id===id).price * qty).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-4 md:p-8 rounded-xl lg:rounded-[2rem]">
                    <span className="text-base md:text-2xl lg:text-3xl text-slate-600 font-medium">{paymentMethod === 'counter' ? t.totalToPay : t.totalPaid}</span>
                    <span className="text-2xl md:text-4xl lg:text-5xl font-black text-indigo-900">{cartTotal.toFixed(2)}€</span>
                  </div>

                  {/* QR Code para Descargar (SOLO EN PAGO CON TARJETA) */}
                  {paymentMethod !== 'counter' && (
                    <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t-2 md:border-t-4 border-dashed border-slate-200 flex flex-col items-center justify-center">
                      <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-3xl shadow-sm border border-slate-100 mb-3 md:mb-4">
                        <QrCode className="w-24 h-24 md:w-44 md:h-44 text-slate-800" strokeWidth={1.5} />
                      </div>
                      <p className="text-xs md:text-xl lg:text-2xl font-bold text-slate-500 uppercase tracking-widest">{t.downloadPurchase}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Parte inferior: Acciones */}
              <div className="w-full max-w-3xl px-4 md:px-12 pb-8 md:pb-12 flex flex-col justify-center space-y-3 md:space-y-6 flex-none md:flex-1 mt-0 md:mt-2">
                <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 text-center leading-tight">
                  {paymentMethod === 'counter' ? t.successSubtitleCounter : t.successSubtitle}
                </h3>

                <button 
                  onClick={handlePrint}
                  className="w-full min-h-[50px] md:min-h-[80px] lg:min-h-[110px] bg-indigo-600 text-white rounded-xl md:rounded-[2.5rem] flex items-center justify-center gap-3 lg:gap-6 text-lg md:text-2xl lg:text-4xl font-bold shadow-lg md:shadow-xl shadow-indigo-200 active:scale-95 transition-all"
                >
                  <Printer className="w-5 h-5 lg:w-10 lg:h-10 shrink-0" />
                  {paymentMethod === 'counter' ? t.printReceipt : t.print}
                </button>

                {/* BOTÓN EMAIL (SOLO EN PAGO CON TARJETA) */}
                {paymentMethod !== 'counter' && (
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="w-full min-h-[50px] md:min-h-[80px] lg:min-h-[110px] bg-white border-2 lg:border-4 border-indigo-100 text-indigo-700 rounded-xl md:rounded-[2.5rem] flex items-center justify-center gap-3 lg:gap-6 text-lg md:text-2xl lg:text-4xl font-bold hover:border-indigo-300 active:scale-95 transition-all"
                  >
                    <Mail className="w-5 h-5 lg:w-10 lg:h-10 shrink-0" />
                    {t.email}
                  </button>
                )}

                <div className="h-[2px] md:h-1 bg-slate-200 w-full my-2 rounded-full"></div>

                <button 
                  onClick={handleReset}
                  className="w-full min-h-[50px] md:min-h-[80px] lg:min-h-[100px] bg-slate-800 text-white rounded-xl lg:rounded-[2rem] flex items-center justify-center text-base md:text-xl lg:text-3xl font-bold shadow-md md:shadow-lg shadow-slate-300 active:scale-95 transition-all"
                >
                  {t.newSale}
                </button>
              </div>
            </div>
          )}
        </main>

        {/* MODAL CALENDARIO */}
        {showDatePicker && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 md:p-12">
            <div className="bg-slate-100 w-full max-w-[980px] rounded-2xl md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] md:max-h-full">
              
              {/* Header */}
              <div className="bg-indigo-600 p-4 md:p-10 md:px-12 flex justify-between items-center text-white flex-none">
                <h3 className="text-lg md:text-3xl lg:text-5xl font-bold flex items-center gap-3 md:gap-6">
                  <CalendarDays className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0" />
                  {t.selectDateTitle}
                </h3>
                <button onClick={() => setShowDatePicker(false)} className="p-2 md:p-5 bg-white/20 rounded-full active:bg-white/40 transition-colors shrink-0">
                  <X className="w-5 h-5 lg:w-10 lg:h-10" />
                </button>
              </div>

              {/* Calendario */}
              <div className="p-4 md:p-12 bg-white flex-none flex flex-col items-center justify-center border-b border-slate-200 overflow-y-auto">
                <div className="flex justify-between items-center w-full px-2 md:px-8 mb-4 md:mb-12">
                  <button 
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} 
                    className="p-3 md:p-6 bg-slate-100 rounded-lg md:rounded-3xl active:bg-slate-200 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 lg:w-10 lg:h-10 text-slate-700"/>
                  </button>
                  <h4 className="text-base md:text-3xl lg:text-5xl font-bold text-slate-800 capitalize">
                    {calendarMonth.toLocaleDateString(lang, { month: 'long', year: 'numeric' })}
                  </h4>
                  <button 
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} 
                    className="p-3 md:p-6 bg-slate-100 rounded-lg md:rounded-3xl active:bg-slate-200 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 lg:w-10 lg:h-10 text-slate-700"/>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-4 lg:gap-6 w-full">
                  {t.days.map((d, i) => (
                    <div key={i} className="text-center text-xs md:text-xl lg:text-3xl font-bold text-slate-400 mb-1 md:mb-4 uppercase">{d}</div>
                  ))}
                  
                  {Array(getFirstDayOfMonth(calendarMonth)).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10 md:h-20 lg:h-28" />
                  ))}
                  
                  {Array(getDaysInMonth(calendarMonth)).fill(null).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                    const isSelected = isSameDay(date, selectedDate);
                    
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    const isPast = date < today;
                    
                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => { 
                          setSelectedDate(date); 
                          setShowDatePicker(false); 
                        }}
                        className={`h-10 sm:h-12 md:h-20 lg:h-28 rounded-lg lg:rounded-[2rem] text-sm md:text-2xl lg:text-4xl font-bold flex items-center justify-center transition-all ${
                          isSelected ? 'bg-indigo-600 text-white shadow-md lg:shadow-xl shadow-indigo-200 scale-105' : 
                          isPast ? 'bg-slate-50 text-slate-300 cursor-not-allowed opacity-50' : 
                          'bg-white border-2 lg:border-4 border-slate-100 text-slate-700 hover:border-indigo-200 active:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Acción Inferior */}
              <div className="p-4 md:p-8 lg:px-12 bg-slate-50 flex-none">
                 <button 
                  onClick={() => setShowDatePicker(false)}
                  className="w-full min-h-[50px] md:min-h-[80px] lg:min-h-[120px] text-base md:text-2xl lg:text-4xl font-bold text-slate-600 bg-white border-2 lg:border-4 border-slate-200 rounded-xl lg:rounded-[2rem] active:bg-slate-100 transition-all flex items-center justify-center"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Email con Teclado Integrado */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-2 md:p-12">
            <div className="bg-slate-100 w-full max-w-[980px] rounded-2xl md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[98vh] md:max-h-full h-full md:h-auto">
              
              {/* Header */}
              <div className="bg-indigo-600 p-4 md:p-10 md:px-12 flex justify-between items-center text-white flex-none">
                <h3 className="text-lg md:text-3xl lg:text-5xl font-bold flex items-center gap-3 md:gap-6">
                  <Mail className="w-6 h-6 lg:w-12 lg:h-12 shrink-0" />
                  {t.emailModalTitle}
                </h3>
                <button onClick={() => setShowEmailModal(false)} className="p-2 md:p-5 bg-white/20 rounded-full active:bg-white/40 transition-colors shrink-0">
                  <X className="w-5 h-5 lg:w-10 lg:h-10" />
                </button>
              </div>

              {/* Falso Input (Muestra el texto y un cursor animado) */}
              <div className="p-4 md:p-10 bg-white border-b border-slate-200 flex-none flex flex-col items-center justify-center">
                <div className="w-full text-xl md:text-4xl lg:text-6xl p-3 md:p-8 bg-slate-50 border-2 lg:border-4 border-slate-200 rounded-xl lg:rounded-[2rem] text-slate-800 font-medium min-h-[50px] md:min-h-[100px] lg:min-h-[140px] flex items-center shadow-inner overflow-hidden">
                  {emailInput || <span className="text-slate-400">ejemplo@correo.com</span>}
                  <span className="w-1 md:w-2 h-6 md:h-10 lg:h-14 bg-indigo-500 animate-pulse ml-2 md:ml-4 shrink-0 rounded-full"></span>
                </div>
              </div>

              {/* Teclado Virtual (Modal Centrado sin deformar, fluido en móvil) */}
              <div className="p-2 md:p-8 flex flex-col gap-1 sm:gap-2 md:gap-4 bg-slate-200/80 flex-1 justify-center overflow-y-auto">
                <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 w-full">
                  {['1','2','3','4','5','6','7','8','9','0'].map(k => (
                    <button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">{k}</button>
                  ))}
                </div>
                <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 w-full">
                  {['q','w','e','r','t','y','u','i','o','p'].map(k => (
                    <button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>
                  ))}
                </div>
                <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 w-full px-[2%]">
                  {['a','s','d','f','g','h','j','k','l'].map(k => (
                    <button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>
                  ))}
                </div>
                <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 w-full">
                  <button onClick={() => setEmailInput(p=>p+'@')} style={{flex: 1.5}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-indigo-100 text-indigo-700 rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-indigo-300 active:scale-95 transition-all flex items-center justify-center">@</button>
                  {['z','x','c','v','b','n','m'].map(k => (
                    <button key={k} onClick={() => setEmailInput(p=>p+k)} className="flex-1 h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center uppercase">{k}</button>
                  ))}
                  <button onClick={() => setEmailInput(p=>p.slice(0,-1))} style={{flex: 1.5}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-slate-300 text-slate-700 rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-400 active:scale-95 transition-all flex items-center justify-center">⌫</button>
                </div>
                <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 w-full">
                  <button onClick={() => setEmailInput('')} style={{flex: 2}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-rose-100 text-rose-700 rounded-md md:rounded-2xl text-sm sm:text-base md:text-xl lg:text-3xl font-bold shadow-sm active:bg-rose-200 active:scale-95 transition-all flex items-center justify-center">Borrar</button>
                  <button onClick={() => setEmailInput(p=>p+'-')} style={{flex: 1}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">-</button>
                  <button onClick={() => setEmailInput(p=>p+'_')} style={{flex: 1}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center">_</button>
                  <button onClick={() => setEmailInput(p=>p+'.')} style={{flex: 1}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-white rounded-md md:rounded-2xl text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold shadow-sm active:bg-slate-300 active:scale-95 transition-all text-slate-800 flex items-center justify-center pb-1 md:pb-2">.</button>
                  <button onClick={() => setEmailInput(p=>p+'.com')} style={{flex: 4}} className="h-10 sm:h-12 md:h-16 lg:h-24 bg-slate-300 text-slate-800 rounded-md md:rounded-2xl text-base sm:text-lg md:text-2xl lg:text-4xl font-bold shadow-sm active:bg-slate-400 active:scale-95 transition-all flex items-center justify-center">.com</button>
                </div>
              </div>

              {/* Botones de acción inferiores */}
              <div className="p-4 md:p-8 md:px-12 bg-white border-t border-slate-200 flex gap-4 md:gap-8 flex-none">
                <button 
                  type="button" 
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 min-h-[50px] md:min-h-[80px] lg:min-h-[120px] text-base md:text-2xl lg:text-4xl font-bold text-slate-600 bg-slate-100 rounded-xl lg:rounded-[2rem] active:bg-slate-200 transition-all flex items-center justify-center"
                >
                  {t.cancel}
                </button>
                <button 
                  type="button"
                  onClick={handleSendEmail}
                  className="flex-[2] min-h-[50px] md:min-h-[80px] lg:min-h-[120px] text-base md:text-2xl lg:text-4xl font-bold text-white bg-indigo-600 rounded-xl lg:rounded-[2rem] active:bg-indigo-700 shadow-lg md:shadow-xl shadow-indigo-200 transition-all flex items-center justify-center"
                >
                  {t.send}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contenedor de Notificaciones (Toasts) */}
        <div className="absolute bottom-6 md:bottom-20 lg:bottom-40 left-1/2 -translate-x-1/2 z-[150] flex flex-col gap-2 md:gap-4 pointer-events-none w-full max-w-3xl px-4 md:px-12">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`flex items-center justify-center gap-3 md:gap-6 p-4 md:p-6 lg:p-8 rounded-full shadow-xl md:shadow-2xl shadow-black/20 text-sm md:text-xl lg:text-3xl font-bold animate-in slide-in-from-bottom-5 fade-in duration-300 w-full ${
                toast.type === 'error' ? 'bg-rose-500 text-white' :
                toast.type === 'info' ? 'bg-blue-600 text-white' :
                'bg-emerald-500 text-white'
              }`}
            >
              {toast.type === 'error' ? <AlertCircle className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 shrink-0" /> : <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 text-emerald-400 shrink-0" />}
              <span className="truncate">{toast.message}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  // --- WRAPPER PRINCIPAL RESPONSIVE ---
  // Ahora es completamente nativo y fluido, ocupando el 100% de la pantalla
  // ya sea en un iPhone o en un Tótem gigante.
  return (
    <div className="min-h-[100dvh] w-full bg-slate-50 flex flex-col font-sans text-slate-800 relative overflow-hidden">
      <style>{`
        /* Ocultar scrollbar en Chrome, Safari y Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Ocultar scrollbar en IE, Edge y Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Contenedor fluido, se centra si la pantalla es ultra-ancha */}
      <div className="flex flex-col flex-1 w-full max-w-[1920px] mx-auto relative shadow-2xl bg-slate-50 overflow-hidden">
        {renderAppContent()}
      </div>
    </div>
  );
}