import React from 'react';
import { X, Globe, Volume2, VolumeX, Smartphone, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { Language } from '../../i18n/translations';
import { sound, triggerHaptic } from '../../utils/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound
}) => {
  const { lang, setLang, t } = useTranslation();

  if (!isOpen) return null;

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
  };

  const handleClose = () => {
    sound.tap();
    triggerHaptic(8);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm transition-all duration-200"
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E4E1DB] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EAE7E1] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#161615] text-white flex items-center justify-center">
              <Globe size={16} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-[#161615]">
                {t.settingsTitle}
              </h3>
              <p className="text-[11px] text-[#787672]">
                {t.settingsVersionTag}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6E6C68] hover:bg-[#EFECE6] transition-colors btn-press"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* 1. Language Selection (Section: Язык интерфейса) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#787672] flex items-center gap-1.5">
                <Globe size={13} />
                <span>{t.settingsLanguage}</span>
              </label>
              <span className="text-[11px] font-bold text-[#161615] bg-[#EFECE6] px-2 py-0.5 rounded-md uppercase">
                {lang.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-[#706E6A] mb-3">
              {t.settingsLanguageDesc}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Russian Option */}
              <button
                type="button"
                id="settings-lang-ru"
                onClick={() => handleLanguageSelect('ru')}
                className={`p-3.5 rounded-2xl border text-left transition-all btn-press flex items-center justify-between ${
                  lang === 'ru'
                    ? 'border-[#161615] bg-[#FAF9F6] shadow-xs ring-1 ring-[#161615]'
                    : 'border-[#EAE7E1] hover:border-[#161615] bg-white'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#161615]">
                    Русский
                  </p>
                  <p className="text-[11px] text-[#7A7874] mt-0.5">
                    По умолчанию
                  </p>
                </div>
                {lang === 'ru' && (
                  <div className="w-5 h-5 rounded-full bg-[#161615] text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>

              {/* English Option */}
              <button
                type="button"
                id="settings-lang-en"
                onClick={() => handleLanguageSelect('en')}
                className={`p-3.5 rounded-2xl border text-left transition-all btn-press flex items-center justify-between ${
                  lang === 'en'
                    ? 'border-[#161615] bg-[#FAF9F6] shadow-xs ring-1 ring-[#161615]'
                    : 'border-[#EAE7E1] hover:border-[#161615] bg-white'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#161615]">
                    English
                  </p>
                  <p className="text-[11px] text-[#7A7874] mt-0.5">
                    International
                  </p>
                </div>
                {lang === 'en' && (
                  <div className="w-5 h-5 rounded-full bg-[#161615] text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 2. Sound Effects Toggle */}
          <div className="pt-4 border-t border-[#F0EFEA]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#161615] flex items-center gap-1.5">
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{t.settingsSound}</span>
                </h4>
                <p className="text-xs text-[#7A7874] mt-0.5 max-w-xs leading-relaxed">
                  {t.settingsSoundDesc}
                </p>
              </div>

              <button
                type="button"
                id="settings-sound-toggle"
                onClick={onToggleSound}
                className={`w-12 h-7 rounded-full transition-colors relative p-0.5 btn-press ${
                  soundEnabled ? 'bg-[#161615]' : 'bg-[#DDD9D0]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-xs transition-transform transform ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 3. Physical Haptic Info */}
          <div className="pt-4 border-t border-[#F0EFEA]">
            <div className="flex items-start gap-3 p-3 bg-[#FAF9F6] rounded-2xl border border-[#EAE7E1]">
              <Smartphone size={18} className="text-[#161615] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#161615]">
                  {t.settingsHaptics}
                </h4>
                <p className="text-[11px] text-[#7A7874] mt-0.5 leading-snug">
                  {t.settingsHapticsDesc}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE7E1] bg-[#FAF9F6] flex items-center justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 px-4 bg-[#161615] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-all btn-press shadow-xs"
          >
            {t.btnSaveSettings}
          </button>
        </div>

      </div>
    </div>
  );
};
