'use client';

import { useState, useEffect } from 'react';
import { differenceInDays, differenceInMonths } from 'date-fns';

const weddingDate = new Date(2026, 9, 10, 16, 0, 0); // Oct 10, 2026. Month is 0-indexed.

function formatCountdown() {
  const now = new Date();

  if (now >= weddingDate) {
    return 'O grande dia chegou!';
  }

  const totalDays = differenceInDays(weddingDate, now);

  if (totalDays === 0) {
    return 'É hoje!';
  }
  
  if (totalDays <= 7) {
    return `Falta${totalDays > 1 ? 'm' : ''} ${totalDays} dia${totalDays > 1 ? 's' : ''}!`;
  }
  
  if (totalDays <= 31) {
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    let text = `Falta${weeks > 1 ? 'm' : ''} ${weeks} semana${weeks > 1 ? 's' : ''}`;
    if (days > 0) {
      text += ` e ${days} dia${days > 1 ? 's' : ''}`;
    }
    return `${text}!`;
  }
  
  const months = differenceInMonths(weddingDate, now);
  const tempDate = new Date(now);
  tempDate.setMonth(tempDate.getMonth() + months);
  const days = differenceInDays(weddingDate, tempDate);

  let text = `Falta${months > 1 ? 'm' : ''} ${months} ${months > 1 ? 'meses' : 'mês'}`;
  if (days > 0 && days < 31) {
    text += ` e ${days} dia${days > 1 ? 's' : ''}`;
  }
  return `${text} para o tão esperado dia.`;
}

export function Countdown() {
    const [countdown, setCountdown] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // This effect runs only on the client, after the initial render.
      setIsClient(true);
      setCountdown(formatCountdown());

      const timer = setInterval(() => {
        setCountdown(formatCountdown());
      }, 1000 * 60); // Update every minute
      
      return () => clearInterval(timer);
    }, []);

    if (!isClient) {
        // On the server, and on the initial client render, render a placeholder.
        return <p className="mt-2 text-primary text-xl font-poppins font-semibold min-h-[28px]">&nbsp;</p>;
    }

    // After the component has mounted on the client, render the actual countdown.
    return (
        <p className="mt-2 text-primary text-xl font-poppins font-semibold min-h-[28px]">
            {countdown}
        </p>
    );
}
