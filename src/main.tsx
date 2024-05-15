import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<Helmet>
			<title>{import.meta.env.VITE_APP_TITLE}</title>
		</Helmet>
		<App />
	</>,
);
