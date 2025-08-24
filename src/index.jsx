import React from 'react';
import { createRoot } from 'react-dom/client';

import DeadTech from './pages/DeadTech.js';
import '../main.css';

const root = document.getElementById('root');
createRoot(root).render(<React.StrictMode><DeadTech /></React.StrictMode>);
