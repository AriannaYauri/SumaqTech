import { useState, useEffect, useRef, useCallback, isValidElement, cloneElement, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios'; 
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- Importaciones para Markdown y Copiar ---
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import remarkGfm from 'remark-gfm'; 

// --- Definición de tipos para TypeScript ---
interface Message {
    sender: 'user' | 'ai';
    text: string;
}

interface ChatResponseData {
    response: string;
}

// Para tipar los children de ReactMarkdown correctamente
type MarkdownRendererProps = { children: ReactNode[] };

// -----------------------------------------------------------------
// --- COMPONENTES DE RENDERIZADO ---
// -----------------------------------------------------------------

// 1. Componente para resaltar código con botón de copiar
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

// FUNCIÓN AUXILIAR: Convierte cualquier nodo de React (incluyendo arrays y elementos) a una cadena de texto unificada.
const flattenChildrenToString = (children: React.ReactNode[]): string => {
    return children.map(child => {
        // Si el hijo es un elemento React (ej: <strong>), obtenemos su texto de forma recursiva
        if (React.isValidElement(child) && child.props.children) {
            return flattenChildrenToString(Array.isArray(child.props.children) ? child.props.children : [child.props.children]);
        }
        // Si es texto plano o un nodo básico, lo devolvemos como string
        return String(child || '');
    }).join('');
};

// 2. Función clave para procesar LaTeX y texto plano (VERSIÓN FINAL)
// 2. Función clave para procesar LaTeX y texto plano (Versión Final)
// 2. Función clave para procesar LaTeX y texto plano (Versión Final Definitiva)
const processTextForLatex = (inputText: ReactNode[] | string | undefined): ReactNode => {
    const inputNodes = Array.isArray(inputText) ? inputText : [inputText];
    const outputNodes: ReactNode[] = [];

    inputNodes.forEach((node, nodeIndex) => {
        // 1. Manejo de Elementos React Válidos (para recursión: ej. <strong>)
        if (isValidElement(node)) {
            if (node.props.children) {
                const processedChildren = processTextForLatex(node.props.children);
                outputNodes.push(cloneElement(node, { key: `node-${nodeIndex}`, ...node.props }, processedChildren));
            } else {
                outputNodes.push(node);
            }
            return;
        }

        // 2. Procesamiento de Texto Plano
        const textToProcess = (typeof node === 'string' || typeof node === 'number') ? String(node) : '';
        if (!textToProcess) return;

        const parts = textToProcess.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g);
        
        parts.forEach((part, index) => {
            const key = `part-${nodeIndex}-${index}`;

            if (part.startsWith('$$') && part.endsWith('$$')) {
                // Bloque Math
                const content = String(part).slice(2, -2).trim();
                // Si el contenido está vacío (ej: $$ $$), evitamos el error.
                if (!content) return outputNodes.push(<></>); 
                outputNodes.push(<BlockMath key={key}>{content}</BlockMath>);
            } else if (part.startsWith('$') && part.endsWith('$')) {
                // En línea Math
                const content = String(part).slice(1, -1).trim();
                 // Si el contenido está vacío (ej: $ $), evitamos el error.
                if (!content) return outputNodes.push(<></>); 
                outputNodes.push(<InlineMath key={key}>{content}</InlineMath>);
            } else {
                outputNodes.push(<span key={key}>{part}</span>);
            }
        });
    });

    return outputNodes;
};

// 3. Función de renderizado principal con Markdown y LaTeX
const renderMessageContent = (text: string) => {
    return (
        <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm]}
            components={{
                code: CodeBlock,
                // para que BlockMath (que es un div) no cause advertencias de anidamiento.
                p: ({ children }: MarkdownRendererProps) => (<>{processTextForLatex(children)}</>),
                
                // Los demás elementos siguen siendo válidos
                h1: ({ children }: MarkdownRendererProps) => (<h1>{processTextForLatex(children)}</h1>),
                h2: ({ children }: MarkdownRendererProps) => (<h2>{processTextForLatex(children)}</h2>),
                li: ({ children }: MarkdownRendererProps) => (<li>{processTextForLatex(children)}</li>),
            }}
        />
    );
};


// -----------------------------------------------------------------
// --- COMPONENTE PRINCIPAL FLOTANTE ---
// -----------------------------------------------------------------

// Usamos FC genérico ya que no podemos acceder a 'React.'
const FloatingChatIA: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedRole, setSelectedRole] = useState('matematicas'); 
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll automático
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Función de envío de mensaje (con useCallback y tipado corregido)
    const handleSendMessage = useCallback(async () => {
        if (inputValue.trim() === '') return;

        const newMessage: Message = { sender: 'user', text: inputValue };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue('');
        setLoading(true);

        try {
            const response: AxiosResponse<ChatResponseData> = await axios.post('http://localhost:9579/chat', {
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
    
    return (
        <>
            {/* Botón Flotante (Icono de Chat) */}
            <button 
                className="floating-chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✖' : '🤖'}
            </button>

            {/* Contenedor del Chat (Solo visible si isOpen es true) */}
            <div className={`floating-chat-container ${isOpen ? 'is-open' : ''}`}>
                <header className="app-header">
                    <h1>- SumaqIA -</h1>
                    {/* Botón de cerrar dentro del chat */}
                    <button className="close-button" onClick={() => setIsOpen(false)}>✖</button>
                </header>

                <div className="role-selector-container">
                    <label htmlFor="role-select">Selecciona el rol de la IA:</label>
                    <select
                        id="role-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="programacion">Programación</option>
                        <option value="matematicas">Matemáticas</option>
                        <option value="calculo">Cálculo</option>
                        <option value="iot">IoT</option>
                        <option value="ciberseguridad">Ciberseguridad</option>
                    </select>
                </div>

                <div className="chat-box">
                    <div className="messages-container" ref={chatContainerRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {renderMessageContent(msg.text)}
                            </div>
                        ))}
                        {loading && (
                            <div className="message ai loading">
                                <span>La IA está pensando...</span>
                                <div className="spinner"></div>
                            </div>
                        )}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu problema aquí..."
                            disabled={loading}
                        />
                        <button onClick={handleSendMessage} disabled={loading}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FloatingChatIA;