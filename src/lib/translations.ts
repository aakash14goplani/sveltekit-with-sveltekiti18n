import i18n, { type Config } from 'sveltekit-i18n';

const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: '',
			loader: async () => (await import('./lang/en.json')).default
		},
		{
			locale: 'hi',
			key: '',
			loader: async () => (await import('./lang/hi.json')).default
		},
		{
			locale: 'fr',
			key: '',
			loader: async () => (await import('./lang/fr.json')).default
		}
	]
};

export const { t, loading, locales, locale, loadTranslations, initialized } = new i18n(config);
