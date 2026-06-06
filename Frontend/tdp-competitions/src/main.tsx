import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { NotFoundPage } from './pages/NotFoundPage';
import { EditorsAllCompetitionsPage } from './pages/editors/EditorsAllCompetitionsPage/EditorsAllCompetitionsPage';
import classNames from './App.module.scss';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { EditorsCompetitionPage } from './pages/editors/EditorsCompetitionPage';
import { RegistrationPage } from './pages/competitors/RegistrationPage/RegistrationPage';
import { itIT } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/it';

const router = createBrowserRouter([
	{
		path: '/editors',
		element: <EditorsAllCompetitionsPage />
	},
	{
		path: '/editors/competition/:id',
		element: <EditorsCompetitionPage />
	},
	{
		path: '/registrati/:slug',
		element: <RegistrationPage />
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
]);

const theme = createTheme({
	palette: {
		primary: {
			main: "#ff8f00"
		},
		secondary: {
			main: '#ffcc80'
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<div className={classNames.layout}>
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<LocalizationProvider
						dateAdapter={AdapterDayjs}
						adapterLocale="it"
						localeText={itIT.components.MuiLocalizationProvider.defaultProps.localeText}>
						<RouterProvider router={router} />
					</LocalizationProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</StrictMode>
	</div>,
)
