import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";

const quickQuestions = [
  {
    question: "How do I identify plant diseases?",
    emoji: "🔍",
    icon: "ri-search-line",
    gradient: "from-green-400/20 to-emerald-600/20",
    color: "green"
  },
  {
    question: "What's the best irrigation schedule?",
    emoji: "💧",
    icon: "ri-water-line",
    gradient: "from-blue-400/20 to-cyan-600/20",
    color: "blue"
  },
  {
    question: "When should I harvest my crops?",
    emoji: "⏰",
    icon: "ri-time-line",
    gradient: "from-yellow-400/20 to-orange-600/20",
    color: "yellow"
  },
  {
    question: "How to improve soil health?",
    emoji: "🌱",
    icon: "ri-plant-line",
    gradient: "from-brown-400/20 to-amber-600/20",
    color: "brown"
  },
  {
    question: "What are NDVI benefits?",
    emoji: "📊",
    icon: "ri-bar-chart-line",
    gradient: "from-purple-400/20 to-indigo-600/20",
    color: "purple"
  },
  {
    question: "Organic pest control methods?",
    emoji: "🐞",
    icon: "ri-bug-line",
    gradient: "from-red-400/20 to-pink-600/20",
    color: "red"
  }
];

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ FIX 1: Page top se open hoga
    const welcomeMessage = {
      role: "bot",
      content: "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, disease identification, weather planning, and general agricultural advice. You can type your questions. What would you like to know?",
      time: new Date().toLocaleTimeString(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (hasScrolled && messages.length > 2) { // ✅ FIX 2: Pehle message pe scroll nahi hoga
      scrollToBottom();
    }
  }, [messages, hasScrolled]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setHasScrolled(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const botReply = {
        role: "bot",
        content: data.response || data.reply,
        time: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestionClick = (question) => {
    setInput(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const SimpleBackground = () => {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-amber-50/70 to-lime-100/90"></div>
      </div>
    );
  };

  const InteractiveCard = ({ children, className = "", hoverGradient = "from-green-400/40 to-emerald-600/40" }) => {
    return (
      <div className={`relative group transition-all duration-500 ${className}`}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-sm border border-white/30 transition-all duration-500"></div>
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md`}></div>
        <div className="relative p-8 h-full">
          {children}
        </div>
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${hoverGradient} opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl -z-10`}></div>
      </div>
    );
  };

  const FeatureCard = ({ icon, title, description, gradient, index }) => {
    return (
      <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-green-200">
        <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
          <span className="text-3xl text-white">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    );
  };

  const QuickQuestionCard = ({ question, onClick, index, emoji, gradient, color }) => {
    const colorClasses = {
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-200' },
      brown: { bg: 'bg-amber-100', text: 'text-amber-600', hover: 'hover:bg-amber-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-200' }
    };

    const colorClass = colorClasses[color];

    return (
      <button
        onClick={onClick}
        className={`relative group text-left p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-white/50 overflow-hidden backdrop-blur-sm w-full`}
        onMouseEnter={() => setHoveredCard(`quick-${index}`)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/30 transition-all duration-500`}></div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150">
          <span className="text-2xl opacity-70">{emoji}</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${colorClass.bg} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 flex-shrink-0 relative`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                hoveredCard === `quick-${index}` ? `${colorClass.bg} scale-110 shadow-lg` : 'bg-white'
              }`}>
                <span className={`text-lg ${hoveredCard === `quick-${index}` ? 'text-white' : colorClass.text}`}>
                  {emoji}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium transition-colors duration-300 text-sm leading-relaxed ${
                hoveredCard === `quick-${index}` ? 'text-white' : 'text-gray-800'
              }`}>
                {question}
              </p>
              <div className="flex items-center mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className={`text-xs ${hoveredCard === `quick-${index}` ? 'text-white/80' : 'text-gray-500'}`}>
                  Click to ask
                </span>
                <span className={`ml-1 text-xs transform transition-transform duration-300 group-hover:translate-x-1 ${
                  hoveredCard === `quick-${index}` ? 'text-white' : 'text-green-600'
                }`}>
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient.replace('20', '40').replace('20', '40')} opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl -z-10`}></div>
      </button>
    );
  };

  return (
    <div className="relative font-['Inter'] min-h-screen">
      <SimpleBackground />

      {/* Hero Section */}
      <section className="relative py-12 border-b border-gray-200/50 mt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95"></div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            AI Farming Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Get instant expert advice on crop management, pest control, disease identification, and agricultural best practices. Type your questions and get expert answers.
          </p>
          <InteractiveCard className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-6 text-sm text-green-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">💬</span>
                </div>
                <span className="font-medium">Text Input</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">🔊</span>
                </div>
                <span className="font-medium">Voice Output</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">🌐</span>
                </div>
                <span className="font-medium">Multi-Language</span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="relative py-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95"></div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/80 border border-white/30 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20"></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">FarmBot Assistant</h3>
                  <p className="text-green-100 text-sm">Online • Ready to Help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/50"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm border ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 border-green-400/30"
                      : "bg-white/80 text-gray-800 shadow-lg shadow-gray-200/50 border-gray-200/50"
                  }`}>
                    <div className="flex items-start justify-between">
                      <p className="text-sm flex-1 leading-relaxed">{msg.content}</p>
                      <button
                        onClick={() => speakText(msg.content)}
                        className="ml-2 p-1 rounded-full hover:bg-white/20 transition-all duration-200"
                        title="Read message aloud"
                      >
                        <span className="text-xs">🔊</span>
                      </button>
                    </div>
                    <p className="text-xs mt-2 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white/80 text-gray-800 shadow-lg border border-gray-200/50">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                      <p className="text-sm">Bot is typing...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200/50 p-6 bg-white/50 backdrop-blur-sm">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-3 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 text-sm bg-white/80 backdrop-blur-sm transition-all duration-300"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => { if (e.key === "Enter") handleSend(); }}
                  autoFocus
                  style={{ caretColor: 'transparent' }}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="whitespace-nowrap font-medium rounded-xl transition-all duration-300 flex items-center justify-center px-6 py-3 text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg mr-2">📤</span>
                  Send
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-500 text-center">
                <span>💬 Type your question and click Send or press Enter • Click 🔊 on any message to hear it read aloud</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Questions */}
      <section className="relative py-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95"></div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <InteractiveCard>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                <span className="text-lg">💡</span>
              </div>
              Quick Questions
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Click on any question below to instantly ask the AI assistant
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickQuestions.map((q, idx) => (
                <QuickQuestionCard
                  key={idx}
                  question={q.question}
                  onClick={() => handleQuickQuestionClick(q.question)}
                  index={idx}
                  emoji={q.emoji}
                  gradient={q.gradient}
                  color={q.color}
                />
              ))}
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* What I Can Help You With */}
      <section className="relative py-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-amber-50/80 to-lime-100/95"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InteractiveCard>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What I Can Help You With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon="🌱"
                title="Crop Management"
                description="Planting, growing, and harvesting advice for various crops"
                gradient="from-green-400/20 to-emerald-600/20"
                index={1}
              />
              <FeatureCard
                icon="🐛"
                title="Pest & Disease Control"
                description="Identification and treatment of plant diseases and pests"
                gradient="from-red-400/20 to-orange-600/20"
                index={2}
              />
              <FeatureCard
                icon="💧"
                title="Irrigation & Water"
                description="Watering schedules, irrigation systems, and water management"
                gradient="from-blue-400/20 to-cyan-600/20"
                index={3}
              />
              <FeatureCard
                icon="☀️"
                title="Weather Planning"
                description="Weather-based farming decisions and seasonal planning"
                gradient="from-purple-400/20 to-indigo-600/20"
                index={4}
              />
            </div>
          </InteractiveCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chatbot;