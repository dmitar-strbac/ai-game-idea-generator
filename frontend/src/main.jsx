// Copyright (c) 2025 Dmitar Strbac
// Licensed under the Apache License, Version 2.0. See LICENSE file in the project root for full license information.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
