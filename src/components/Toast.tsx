import { useEffect, useState } from 'react';

interface Props {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export default function Toast({ message, type, duration = 4000 }: Props) {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const baseStyle = `
    fixed top-16 sm:top-25 right-0 z-50 w-[90%] sm:w-[320px] max-w-full
    transition-transform duration-300 ease-in-out
    ${animate ? 'translate-x-0' : 'translate-x-full'}
  `;

  const typeStyle = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
  };

  return (
    <div className={`${baseStyle}`}>
      <div className={`border-l-4 p-3 sm:p-4 rounded shadow-md relative ${typeStyle[type]}`}>
        <div className="font-medium text-sm sm:text-base">{message}</div>
      </div>
    </div>
  );
}
