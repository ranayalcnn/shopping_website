import React from 'react';

const SiteIcon = ({ className, ...props }) => {
    return (
        <svg 
            className={className}
            // Genişlik 180 birim
            viewBox="0 0 180 120" 
            xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props} 
        >
            
            {/* ------------ KLASİK ALIŞVERİŞ SEPETİ İKONU ------------ */}
            
            <path 
                d="M 30 40 L 90 40 L 85 100 L 35 100 Z" 
                opacity="0.9"
            />
            <path 
                d="M 40 40 V 30 C 40 20, 80 20, 80 30 V 40" 
                strokeWidth="6" 
                opacity="0.7" 
            />
            <rect 
                x="45" 
                y="55" 
                width="30" 
                height="30" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
                opacity="0.4" 
            />

            {/* ------------ TEMİZ VE OKUNAKLI "RY" METNİ (Boyut Küçüldü) ------------ */}
            <text
                x="95" 
                y="75"  // Yüksekliği 80'den 75'e çekildi
                fontFamily="'Open Sans', 'Arial', sans-serif" 
                fontSize="50" // KRİTİK DEĞİŞİKLİK: 60'tan 50'ye düşürüldü
                fontWeight="900" 
                fontStyle="normal" 
                fill="currentColor" 
                stroke="none" 
            >
                RY
            </text>

        </svg>
    );
};

export default SiteIcon;