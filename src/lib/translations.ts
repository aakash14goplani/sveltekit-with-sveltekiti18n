import { writable } from 'svelte/store';
import i18n, { type Config } from 'sveltekit-i18n';
// import i18n from 'sveltekit-i18n';
// import parser from '@sveltekit-i18n/parser-icu';
// import type { Config } from '@sveltekit-i18n/parser-icu';

interface Params {
	dateValue: number;
	value: number;
	download: number;
	award: number;
	val: Date;
}

const config: Config<Partial<Params>> = {
	initLocale: 'en',
	// parser: parser(),
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

export const { t, loading, locales, locale, initialized, translations, loadTranslations } =
	new i18n(config);

export const selectedLocale = writable<string>('en');

// Translations logs
/* loading.subscribe(async ($loading) => {
	if ($loading) {
		console.log('Loading translations...');

		await loading.toPromise();
		console.log('Updated translations', translations.get());
	}
}); */
