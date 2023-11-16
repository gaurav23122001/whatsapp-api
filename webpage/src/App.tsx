import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './utils/const';
import Home from './views/pages/home';
import PaymentPage from './views/pages/payment';
import PricePage from './views/pages/pricing';
import PrivacyPage from './views/pages/privacy';
import Terms from './views/pages/terms';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPage />} />
					<Route path={ROUTES.TERMS_AND_CONDITIONS} element={<Terms />} />
					<Route path={ROUTES.PRICING} element={<PricePage />}>
						<Route path={ROUTES.PLANS} element={<PaymentPage />} />
					</Route>
					<Route path='*' element={<Navigate to={ROUTES.HOME} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
