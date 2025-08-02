import React from "react";

export interface IconProps { 
  className?: string;
  size?: number;
}

export const UsersIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.33-.04-3.08S5.21 15.66 4.5 16.5Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BalanceIcon: React.FC<IconProps> = ({ className, size = 200 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 256 256"
  >
    <path 
      fill="currentColor" 
      d="M168 96H88a40 40 0 0 0-40 40v8a40 40 0 0 0 40 40h80a40 40 0 0 0 40-40v-8a40 40 0 0 0-40-40Zm24 48a24 24 0 0 1-24 24H88a24 24 0 0 1-24-24v-8a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24Zm16-112a32.06 32.06 0 0 0-31 24H79a32 32 0 0 0-63 8v80a72.08 72.08 0 0 0 72 72h80a72.08 72.08 0 0 0 72-72V64a32 32 0 0 0-32-32Zm16 112a56.06 56.06 0 0 1-56 56H88a56.06 56.06 0 0 1-56-56V64a16 16 0 0 1 32 0a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8a16 16 0 0 1 32 0Zm-120-4a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm72 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"
    />
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24"
  >
    <title>Telegram icon</title>
    <path 
      fill="currentColor" 
      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
    />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const OpenCollectiveIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <title>Open Collective icon</title>
    <path d="M21.86 5.17a11.94 11.94 0 0 1 0 13.66l-3.1-3.1a7.68 7.68 0 0 0 0-7.46l3.1-3.1zm-3.03-3.03l-3.1 3.1a7.71 7.71 0 1 0 0 13.51l3.1 3.11a12 12 0 1 1 0-19.73 M21.86 5.17a11.94 11.94 0 0 1 0 13.66l-3.1-3.1a7.68 7.68 0 0 0 0-7.46l3.1-3.1z"/>
  </svg>
);

export const SourceCodeIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 31.612 31.612"
    fill="currentColor"
  >
    <title>Source Code icon</title>
    <g>
        <g>
            <path d="M10.871,13.671l-4.058,4.057c-0.234,0.234-0.367,0.553-0.367,0.885c0,0.333,0.133,0.65,0.367,0.885l3.923,3.924
                c0.245,0.244,0.565,0.367,0.887,0.367c0.32,0,0.641-0.123,0.885-0.367c0.49-0.488,0.49-1.281,0-1.771L9.47,18.613l3.173-3.172
                c0.489-0.488,0.489-1.281,0-1.77C12.152,13.182,11.36,13.182,10.871,13.671z"/>
            <path d="M18.969,15.443l3.174,3.171l-3.039,3.038c-0.488,0.488-0.488,1.281,0,1.771c0.244,0.244,0.564,0.366,0.886,0.366
                s0.642-0.122,0.887-0.366l3.923-3.924c0.234-0.234,0.367-0.554,0.367-0.886c0-0.333-0.133-0.651-0.367-0.886l-4.058-4.056
                c-0.489-0.489-1.281-0.489-1.771,0C18.48,14.16,18.48,14.954,18.969,15.443z"/>
            <path d="M13.265,26.844c0.081,0.023,0.162,0.037,0.245,0.037c0.356,0,0.688-0.232,0.798-0.592l4.59-14.995
                c0.138-0.441-0.111-0.908-0.553-1.043c-0.443-0.135-0.906,0.113-1.043,0.554L12.71,25.799
                C12.576,26.241,12.823,26.707,13.265,26.844z"/>
            <path d="M11.216,0L3.029,8.643v22.969h25.554V0H11.216z M10.495,3.635v3.83H6.867L10.495,3.635z M26.605,29.637H5.005V9.441h7.465
                V1.975h14.135V29.637z"/>
        </g>
    </g>
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <title>GitHub icon</title>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export const TBankIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <title>T-Bank icon</title>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor">T</text>
  </svg>
);

export const APIIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <title>API icon</title>
    <path d="M5.93047 13.2107L6.66782 10.3728H6.73089L7.45854 13.2107H5.93047ZM8.17164 16H9.66089L7.56041 9H5.93047L3.82999 16H5.20767L5.65396 14.2876H7.73505L8.17164 16Z" fill="#121923"></path> 
    <path d="M10.5389 9V16H11.9166V13.7782H13.0323C14.541 13.7782 15.5015 12.8517 15.5015 11.3964C15.5015 9.92654 14.5701 9 13.1003 9H10.5389ZM11.9166 10.1303H12.751C13.6533 10.1303 14.1044 10.5475 14.1044 11.3867C14.1044 12.2308 13.6533 12.6431 12.751 12.6431H11.9166V10.1303Z" fill="#121923"></path> 
    <path d="M21.1675 16V14.8164H19.717V10.1836H21.1675V9H16.8889V10.1836H18.3393V14.8164H16.8889V16H21.1675Z" fill="#121923"></path>
  </svg>
);

export const TwitchIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <title>Twitch icon</title>
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <title>X icon</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);
