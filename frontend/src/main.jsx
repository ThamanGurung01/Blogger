
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'react-quill/dist/quill.snow.css';
import './styles/Main.css'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)
