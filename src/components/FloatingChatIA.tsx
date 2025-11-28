import { useState, useEffect, useRef, useCallback, isValidElement, cloneElement, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import remarkGfm from 'remark-gfm'; 

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface ChatResponseData {
    response: string;
}

// Para tipar los children de ReactMarkdown correctamente
type MarkdownRendererProps = { children: ReactNode[] };

const ROLES = [
    { key: 'programacion', name: 'Programación' },
    { key: 'matematicas', name: 'Matemáticas' },
    { key: 'calculo', name: 'Cálculo' },
    { key: 'iot', name: 'IoT' },
    { key: 'networking', name: 'Networking' },
    { key: 'ciberseguridad', name: 'Ciberseguridad' },
];

// Componente para resaltar código con botón de copiar
const CodeBlock: React.FC<any> = ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeText = String(children).replace(/\n$/, '');
    
    return !inline && match ? (
      <div className="code-block-container">
        <div className="code-header">
          <span>{match[1].toUpperCase()}</span>
          <CopyToClipboard text={codeText}>
            <button className="copy-button">
              📋 Copiar Código
            </button>
          </CopyToClipboard>
        </div>
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

// Función para procesar LaTeX y texto plano
const processTextForLatex = (inputText: ReactNode[] | string | undefined): ReactNode => {
    const inputNodes = Array.isArray(inputText) ? inputText : [inputText];
    const outputNodes: ReactNode[] = [];

    inputNodes.forEach((node, nodeIndex) => {
        if (isValidElement(node)) {
            if (node.props.children) {
                const processedChildren = processTextForLatex(node.props.children);
                outputNodes.push(cloneElement(node, { key: `node-${nodeIndex}`, ...node.props }, processedChildren));
            } else {
                outputNodes.push(node);
            }
            return;
        }

        const textToProcess = (typeof node === 'string' || typeof node === 'number') ? String(node) : '';
        if (!textToProcess) return;

        const parts = textToProcess.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g);
        
        parts.forEach((part, index) => {
            const key = `part-${nodeIndex}-${index}`;

            if (part.startsWith('$$') && part.endsWith('$$')) {
                const content = String(part).slice(2, -2).trim(); 
                if (!content) return outputNodes.push(<></>); 
                outputNodes.push(<BlockMath key={key}>{content}</BlockMath>);
            } else if (part.startsWith('$') && part.endsWith('$')) {
                const content = String(part).slice(1, -1).trim();
                if (!content) return outputNodes.push(<></>); 
                outputNodes.push(<InlineMath key={key}>{content}</InlineMath>);
            } else {
                outputNodes.push(<span key={key}>{part}</span>);
            }
        });
    });

    return outputNodes;
};

// Función de renderizado principal con Markdown y LaTeX
const renderMessageContent = (text: string) => {
    return (
        <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm]}
            components={{
                code: CodeBlock,
                p: ({ children }: MarkdownRendererProps) => (<>{processTextForLatex(children)}</>),
                h1: ({ children }: MarkdownRendererProps) => (<h1>{processTextForLatex(children)}</h1>),
                h2: ({ children }: MarkdownRendererProps) => (<h2>{processTextForLatex(children)}</h2>),
                // li: ({ children }: MarkdownRendererProps) => (<li>{processTextForLatex(children)}</li>),
            }}
        />
    );
};


// Componente para flotamiento del icono
const FloatingChatIA: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedRole, setSelectedRole] = useState('matematicas'); 
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Función para reiniciar el chat al estado de bienvenida
    const resetChat = useCallback(() => {
        setMessages([]);
        setInputValue('');
        setShowWelcome(true);
        setIsRoleMenuOpen(false);
    }, []);

    // Scroll automático
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Función de envío de mensaje
    const handleSendMessage = useCallback(async (messageText: string = inputValue) => {
        if (messageText.trim() === '') return;

        setShowWelcome(false);
        const messageToSend = messageText;
        setInputValue(''); // Limpia el input
        
        const newMessage: Message = { sender: 'user', text: messageToSend };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setLoading(true);

        try {
            const response: AxiosResponse<ChatResponseData> = await axios.post('http://localhost:9520/chat', {
                message: newMessage.text,
                role: selectedRole, 
            });
            
            const aiResponse: Message = { 
                sender: 'ai', 
                text: response.data.response || 'Lo siento, la IA no pudo generar una respuesta. Por favor, intenta reformular tu pregunta.',
            };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
            const errorMessage: Message = {
                sender: 'ai',
                text: 'Lo siento, hubo un error al comunicarse con el servidor.',
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setLoading(false);
        }
    }, [inputValue, selectedRole]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    };

    // Función para seleccionar el rol y cerrar el menú
    const selectRole = (key: string) => {
        setSelectedRole(key);
        setIsRoleMenuOpen(false);
        // Notificacion al usuario el cambio de rol
        if (messages.length === 0) {
             setMessages([{sender: 'ai', text: `✅ Rol cambiado a **${ROLES.find(r => r.key === key)?.name || key}**.`}]);
        }
    };
    
    return (
        <>
            {/* Botón Flotante (Toggle) */}
            <button 
                className="floating-chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✖' : '🤖'}
            </button>

            {/* Contenedor del Chat */}
            <div className={`floating-chat-container ${isOpen ? 'is-open' : ''}`}>
                <header className="app-header">
                    <div className="header-info">
                        <span className="ai-icon">🤖</span>
                        <h1>SumaqIA <span className="online-dot"></span><span className="online-text">Online</span></h1>
                    </div>
                    <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
                </header>
                
                {/* Menú de Selección de Rol (Overlay) */}
                <div className={`role-menu-overlay ${isRoleMenuOpen ? 'is-open' : ''}`}>
                    <div className="role-menu-header">
                        <h2>Seleccionar Agente</h2>
                        <button className="close-menu-button" onClick={() => setIsRoleMenuOpen(false)}>✖</button>
                    </div>
                    <p className="role-menu-description">
                        Elige el área de especialidad para tu conversación:
                    </p>
                    <div className="role-list">
                        {ROLES.map(role => (
                            <button
                                key={role.key}
                                className={`role-item ${selectedRole === role.key ? 'is-selected' : ''}`}
                                onClick={() => selectRole(role.key)}
                            >
                                {role.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="chat-box">
                    <div className="messages-container" ref={chatContainerRef}>
                        {showWelcome && messages.length === 0 ? (
                            <div className="welcome-screen">
                                <span className="ai-big-icon">🤖</span>
                                <p className="welcome-text">Hola, soy SumaqIA. ¿Tienes alguna duda? Cuéntame y yo lo resolveré!</p>
                                <p className="welcome-subtext">Agente actual: **{ROLES.find(r => r.key === selectedRole)?.name || 'Matemáticas'}**</p>
                                <button 
                                    className="suggested-question-button"
                                    onClick={() => handleSendMessage("¿Necesito alguna habilidad para estudiar STEM?")}
                                >
                                    ¿Necesito alguna habilidad para estudiar STEM?
                                </button>
                                <button 
                                    className="suggested-question-button"
                                    onClick={() => handleSendMessage("¿Cómo puedo mejorar en Matemáticas?")}
                                >
                                    ¿Cómo puedo mejorar en Matemáticas?
                                </button>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {renderMessageContent(msg.text)}
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="message ai loading">
                                <span>La IA está pensando...</span>
                                <div className="spinner"></div>
                            </div>
                        )}
                    </div>
                    
                    {/* Caja de entrada con íconos */}
                    <div className="input-container">
                        {/* Botón para Abrir Menú de Roles */}
                        <button className="icon-button" onClick={() => setIsRoleMenuOpen(true)} aria-label="Seleccionar Rol">
                            🤖
                        </button>
                        {/* Botón de Reinicio (Refresh) */}
                        <button className="icon-button" onClick={resetChat} aria-label="Reiniciar Chat">
                            🔄
                        </button>

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu duda..."
                            disabled={loading}
                        />
                        <button className="send-button" onClick={() => handleSendMessage()} disabled={loading} aria-label="Send Message">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FloatingChatIA;