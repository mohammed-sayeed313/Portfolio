import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, Loader2 } from 'lucide-react';
import { contactData } from '../../data/contactData';

// Inline SVGs for Github and Linkedin since lucide-react lacks them
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const iconMap = {
  Linkedin: LinkedinIcon,
  Github: GithubIcon
};

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`fixed top-6 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg border flex items-center gap-3 font-semibold text-[15px] ${
        type === 'success' 
          ? 'bg-white border-green-200 text-green-700' 
          : type === 'error'
          ? 'bg-white border-red-200 text-red-700'
          : 'bg-[#0a0a0a] border-white/10 text-white'
      }`}
    >
      {type === 'success' ? <Check size={18} /> : null}
      {message}
    </motion.div>
  );
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="ml-auto p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-100 relative group"
    >
      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
      
      {/* Tooltip */}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-bold px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </button>
  );
};

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setToast({ message: "Message sent successfully!", type: "success" });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section className="relative w-full py-[80px] md:py-[120px] px-6 bg-[#f5f5f7] overflow-hidden flex justify-center" id="contact">
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col">
        {/* Header Block */}
        <div className="relative w-full mb-16 md:mb-20">
          <span 
            className="absolute right-0 -top-8 md:-top-16 text-[72px] md:text-[120px] font-extrabold text-[#E8E8E8] leading-none select-none"
            aria-hidden="true"
          >
            09
          </span>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center text-center max-w-[700px] mx-auto"
          >
            <span className="text-[14px] font-bold tracking-[0.15em] uppercase text-[#6B6B6B] mb-2">
              GET IN TOUCH
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-[#0A0A0A] leading-tight mb-4">
              Let's Build Something Amazing
            </h2>
            <p className="text-[17px] text-[#555] leading-[1.7]">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column: Form */}
          <motion.div variants={itemFadeUp} className="w-full h-full">
            <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 h-full flex flex-col">
              <h3 className="text-[22px] font-bold text-[#0a0a0a] mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[14px] font-semibold text-[#333]">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#f5f5f7] rounded-xl px-4 py-3.5 text-[#0a0a0a] text-[15px] outline-none border border-transparent focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all placeholder:text-gray-400"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[14px] font-semibold text-[#333]">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#f5f5f7] rounded-xl px-4 py-3.5 text-[#0a0a0a] text-[15px] outline-none border border-transparent focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="message" className="text-[14px] font-semibold text-[#333]">Message</label>
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-[#f5f5f7] rounded-xl px-4 py-3.5 text-[#0a0a0a] text-[15px] outline-none border border-transparent focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all placeholder:text-gray-400 resize-none flex-1"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] hover:bg-[#1f1f1f] disabled:bg-[#333] text-white rounded-xl py-4 px-6 font-bold text-[16px] transition-colors flex items-center justify-center gap-3 mt-auto shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Info Cards */}
          <motion.div variants={containerVariants} className="w-full flex flex-col gap-4">
            
            {/* Email */}
            <motion.div variants={itemFadeUp} className="group bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-2xl flex items-center justify-center shrink-0">
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                  <Mail size={20} />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 font-medium">Email</span>
                <span className="text-[16px] font-bold text-[#0a0a0a]">{contactData.email}</span>
              </div>
              <CopyButton text={contactData.email} />
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemFadeUp} className="group bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-2xl flex items-center justify-center shrink-0">
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                  <Phone size={20} />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 font-medium">Phone</span>
                <span className="text-[16px] font-bold text-[#0a0a0a]">{contactData.phone}</span>
              </div>
              <CopyButton text={contactData.phone} />
            </motion.div>

            {/* Location */}
            <motion.div variants={itemFadeUp} className="group bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-2xl flex items-center justify-center shrink-0">
                <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-white">
                  <MapPin size={20} />
                </motion.div>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-gray-500 font-medium">Location</span>
                <span className="text-[16px] font-bold text-[#0a0a0a]">{contactData.location}</span>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={itemFadeUp} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <h4 className="text-[18px] font-bold text-[#0a0a0a]">Connect on Social Media</h4>
              <div className="flex flex-row gap-3">
                {contactData.socials.map((social, i) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a 
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="group flex-1 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-3 transition-colors"
                    >
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {Icon && <Icon size={18} />}
                      </motion.div>
                      <span className="font-bold text-[15px]">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Opportunities */}
            <motion.div variants={itemFadeUp} className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] rounded-[24px] p-8 shadow-lg border border-white/5 relative overflow-hidden mt-auto">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <h4 className="text-[20px] font-bold text-white">Open to Opportunities</h4>
                </div>
                <p className="text-gray-400 text-[15px] leading-[1.7]">
                  {contactData.availability}
                </p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
