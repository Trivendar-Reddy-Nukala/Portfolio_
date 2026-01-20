
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import './Chatbot.css';

// Using a high-quality placeholder avatar (3D style)
const AVATAR_URL = "https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-6299534-5187866.png";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-greeting logic
    useEffect(() => {
        if (isOpen && !hasOpened) {
            setHasOpened(true);
            // Small delay for natural feel
            setTimeout(() => {
                setMessages([
                    {
                        id: 1,
                        text: "Hi 👋 I’m Trivendar’s AI Assistant. I can answer questions about his Resume, Projects, and Skills!",
                        sender: 'bot',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        isGreeting: true
                    }
                ]);
            }, 500);
        }
    }, [isOpen, hasOpened]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            text,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Use relative path for Vercel deployment
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();

            if (response.ok) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.reply,
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to the brain 🧠. Please try again later!",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const quickActions = [
        { label: "Top Projects 🚀", query: "What are your best projects?" },
        { label: "Skills ⚡", query: "What are your technical skills?" },
        { label: "Resume Summary 📝", query: "Summarize your resume" },
        { label: "Contact 📩", query: "How can I contact you?" }
    ];

    // Component to render message content safely
    const MessageContent = ({ text, isGreeting }) => {
        // If it's a structured response (contains formatting markers), parse it visually
        // Simple parser for demonstration:
        if (!isGreeting && (text.includes('Short Answer:') || text.includes('Key Points:'))) {
            return (
                <div className="structured-response">
                    {text.split('\n').map((line, i) => {
                        if (line.includes('Short Answer:')) return null; // Skip label
                        if (line.includes('Key Points:')) return <span key={i} className="bot-answer-title"><br />Key Highlights</span>;
                        if (line.includes('Tech Stack')) return <div key={i} className="bot-footer-info"><b>Tech Stack:</b> {line.split(':')[1]}</div>;
                        if (line.includes('Related Project')) return <div key={i} className="bot-footer-info"><b>Link:</b> {line.split(':')[1]}</div>;
                        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                            return <div key={i} className="bot-key-points"><li>{line.replace(/^[•-]\s*/, '')}</li></div>;
                        }
                        return <div key={i} className="bot-text-content">{line}</div>;
                    })}
                </div>
            );
        }
        return <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>;
    };

    return (
        <div className="chatbot-wrapper">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, scale: 0.9, y: 50, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="header-info">
                                <img src={AVATAR_URL} alt="Bot" className="header-avatar" />
                                <div className="header-text">
                                    <h3>Trivendar's AI</h3>
                                    <span>Online & Ready</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message-row ${msg.sender}`}>
                                    {msg.sender === 'bot' && <img src={AVATAR_URL} className="bot-avatar-small" alt="bot" />}
                                    <motion.div
                                        className="message-bubble"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <MessageContent text={msg.text} isGreeting={msg.isGreeting} />

                                        {/* Show chips only on greeting message */}
                                        {msg.isGreeting && (
                                            <div className="quick-actions-grid">
                                                {quickActions.map((action, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        className="quick-btn"
                                                        onClick={() => handleSend(action.query)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {action.label}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="message-row bot">
                                    <img src={AVATAR_URL} className="bot-avatar-small" alt="bot" />
                                    <div className="thinking-container">
                                        <div className="typing-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                        <span className="thinking-text">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chat-input-area">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Ask about my skills, projects..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isTyping}
                            />
                            <button
                                className="send-btn"
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            {!isOpen && (
                <div className="avatar-button-container" onClick={() => setIsOpen(true)}>
                    <div className="avatar-tooltip">Hey! Ask me about Trivendar 👋</div>
                    <img src={AVATAR_URL} alt="Chat" className="avatar-image" />
                    <div className="avatar-status-dot"></div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
