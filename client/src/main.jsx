import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/Main.css'
import { BrowserRouter } from 'react-router-dom';
import AuthenticationContext from './context/AuthenticationContext.jsx';
createRoot(document.getElementById('root')).render(
    <AuthenticationContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthenticationContext>
)
