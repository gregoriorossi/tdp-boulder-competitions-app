import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { NotFoundPage } from './pages/NotFoundPage';
import { EditorsAllCompetitionsPage } from './pages/editors/EditorsAllCompetitionsPage';

const router = createBrowserRouter([
	{
		path: '/editors',
		element: <EditorsAllCompetitionsPage />
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
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router } />
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
)
