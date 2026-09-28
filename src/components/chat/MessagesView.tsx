import React, { useState } from 'react';
import { Master, ChatMessage, ServiceItem } from '../../types';
import { Send, Calendar, Clock, ChevronRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { sound, triggerHaptic } from '../../utils/sound';
import { useTranslation } from '../../context/LanguageContext';

interface MessagesViewProps {
  masters: Master[];
  selectedMasterId?: string;
  onSelectMaster: (masterId: string) => void;
  onBookMaster: (master: Master, service?: ServiceItem) => void;
  onOpenMasterProfile: (masterId: string) => void;
  initialContextService?: ServiceItem | null;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  masters,
  selectedMasterId,
  onSelectMaster,
  onBookMaster,
  onOpenMasterProfile,
  initialContextService
}) => {
  const { t } = useTranslation();
  const currentMaster = masters.find((m) => m.id === selectedMasterId) || masters[0];
  
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'master-anna': [
      {
        id: 'msg-1',
        masterId: 'master-anna',
        sender: 'user',
        text: 'Hi Anna! I’d like to consult on airtouch coloring. My hair is natural dark blonde, chest length.',
        timestamp: '11:42'
      },
      {
        id: 'msg-2',
        masterId: 'master-anna',
        sender: 'master',
        text: 'Hello! That sounds like a wonderful base to work with. We can achieve a very soft luminous gradient that grows out seamlessly without banding. Here is the service details:',
        timestamp: '11:45',
        contextCard: {
          serviceId: 'serv-anna-2',
          serviceName: 'Airtouch / Lived-in Blonde',
          priceFrom: 11000,
          durationMinutes: 180
        }
      },
      {
        id: 'msg-3',
        masterId: 'master-anna',
        sender: 'master',
        text: 'I have open windows this Thursday at 14:00 or Friday at 12:00. You can tap the card above to pick your preferred time directly!',
        timestamp: '11:46'
      }
    ],
    'master-marcus': [
      {
        id: 'msg-m1',
        masterId: 'master-marcus',
        sender: 'user',
        text: 'Hey Marcus, do you do hot towel beard shaping before haircuts?',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg-m2',
        masterId: 'master-marcus',
        sender: 'master',
        text: 'Yes! Every session includes eucalyptus hot towel compression and Japanese feather blade alignment.',
        timestamp: 'Yesterday',
        contextCard: {
          serviceId: 'serv-marcus-2',
          serviceName: 'Beard Reconstruction & Hot Towel Shave',
          priceFrom: 2800,
          durationMinutes: 40
        }
      }
    ]
  });

  const [inputText, setInputText] = useState('');

  const currentChat = messages[currentMaster.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sound.message();
    triggerHaptic(10);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      masterId: currentMaster.id,
      sender: 'user',
      text: inputText.trim(),
      timestamp: timeStr
    };

    // Check if user is asking about a service (e.g. "haircut", "стрижка", "окрашивание", "cut", "manicure")
    let smartCard: ChatMessage['contextCard'] = undefined;
    const lower = inputText.toLowerCase();
    const matchingSvc = currentMaster.services.find((s) => 
      lower.includes(s.name.toLowerCase()) || 
      (lower.includes('cut') && s.name.toLowerCase().includes('cut')) ||
      (lower.includes('hair') && s.name.toLowerCase().includes('cut')) ||
      (lower.includes('стрижк') && s.name.toLowerCase().includes('cut')) ||
      (lower.includes('маник') && s.name.toLowerCase().includes('manicure')) ||
      (lower.includes('окраш') && s.name.toLowerCase().includes('airtouch'))
    ) || (initialContextService || undefined);

    if (matchingSvc) {
      smartCard = {
        serviceId: matchingSvc.id,
        serviceName: matchingSvc.name,
        priceFrom: matchingSvc.priceFrom,
        durationMinutes: matchingSvc.durationMinutes
      };
    }

    setMessages((prev) => ({
      ...prev,
      [currentMaster.id]: [...(prev[currentMaster.id] || []), userMsg]
    }));

    setInputText('');

    // Simulate instant polite master response with context card
    setTimeout(() => {
      sound.tap();
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        masterId: currentMaster.id,
        sender: 'master',
        text: smartCard 
          ? `I'd love to help you with that! Here is the service details with instant booking slots:`
          : `Thanks for reaching out! Let me know if you want to look at my schedule for this week.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextCard: smartCard
      };

      setMessages((prev) => ({
        ...prev,
        [currentMaster.id]: [...(prev[currentMaster.id] || []), replyMsg]
      }));
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20">
      <div className="bg-white rounded-3xl border border-[#E4E1DB] shadow-sm overflow-hidden flex flex-col md:flex-row h-[75vh] min-h-[500px]">
        
        {/* Left: Masters Conversations List */}
        <div className="w-full md:w-80 border-r border-[#EAE7E1] bg-[#FAF9F6] flex flex-col">
          <div className="p-4 border-b border-[#EAE7E1]">
            <h2 className="font-display font-semibold text-base text-[#161615]">
              {t.directMessages}
            </h2>
            <p className="text-[11px] text-[#787672]">
              {t.directMessagesSubtitle}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#F0EFEA]">
            {masters.map((m) => {
              const isSelected = m.id === currentMaster.id;
              const lastMsg = messages[m.id]?.slice(-1)[0];

              return (
                <div
                  key={m.id}
                  onClick={() => {
                    sound.tap();
                    onSelectMaster(m.id);
                  }}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors btn-press ${
                    isSelected ? 'bg-white shadow-xs' : 'hover:bg-[#F2EFE8]'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#EAE7E1]"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-semibold text-xs sm:text-sm text-[#161615] truncate">
                        {m.name}
                      </h4>
                      <span className="text-[10px] text-[#9A9894]">
                        {lastMsg ? lastMsg.timestamp : t.activeStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#706E6A] truncate">
                      {lastMsg ? lastMsg.text : m.specialization}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col justify-between bg-white min-w-0">
          
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-[#EAE7E1] bg-[#FAF9F6] flex items-center justify-between">
            <div 
              onClick={() => onOpenMasterProfile(currentMaster.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src={currentMaster.avatar}
                alt={currentMaster.name}
                className="w-9 h-9 rounded-full object-cover border border-[#EAE7E1]"
              />
              <div>
                <h3 className="font-display font-semibold text-sm text-[#161615] group-hover:underline">
                  {currentMaster.name}
                </h3>
                <p className="text-[11px] text-[#787672]">
                  {currentMaster.currentPlaceName} · {currentMaster.specialization}
                </p>
              </div>
            </div>

            <button
              onClick={() => onBookMaster(currentMaster)}
              className="px-3.5 py-1.5 bg-[#161615] hover:bg-black text-white text-xs font-semibold rounded-full transition-all btn-press shadow-xs flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>{t.btnBook}</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white">
            {currentChat.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#161615] text-white rounded-br-xs'
                        : 'bg-[#FAF8F5] text-[#161615] border border-[#EAE7E1] rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* SMART CONTEXT CARD (Section 33) */}
                    {msg.contextCard && (
                      <div className="mt-3 p-3 bg-white text-[#161615] rounded-xl border border-[#DDD9D0] shadow-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#888682]">
                            {t.serviceContext}
                          </span>
                          <span className="text-xs font-bold">
                            {t.fromPrice} ₽{msg.contextCard.priceFrom.toLocaleString()}
                          </span>
                        </div>

                        <h4 className="font-semibold text-xs sm:text-sm">
                          {msg.contextCard.serviceName}
                        </h4>
                        <p className="text-[11px] text-[#6A6864] flex items-center gap-1 mt-0.5">
                          <Clock size={11} />
                          {t.durationMinutes(msg.contextCard.durationMinutes)}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            const svc = currentMaster.services.find((s) => s.id === msg.contextCard?.serviceId);
                            onBookMaster(currentMaster, svc);
                          }}
                          className="mt-2.5 w-full py-2 bg-[#161615] hover:bg-black text-white text-xs font-semibold rounded-lg transition-all btn-press flex items-center justify-center gap-1.5"
                        >
                          <Calendar size={13} />
                          <span>{t.btnChooseTime}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-[#A09D98] px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-[#EAE7E1] bg-[#FAF9F6] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t.chatInputPlaceholder(currentMaster.name.split(' ')[0])}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white text-xs sm:text-sm text-[#161615] placeholder:text-[#9E9B96] rounded-xl border border-[#E2DFD8] focus:outline-none focus:border-[#161615]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-[#161615] disabled:bg-zinc-300 text-white flex items-center justify-center transition-all btn-press"
            >
              <Send size={15} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
