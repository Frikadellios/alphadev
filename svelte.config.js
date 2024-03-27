import { vitePreprocess } from '@astrojs/svelte';
import breferPreprocess from "brefer";
import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: [vitePreprocess({}), sveltePreprocess(), ...breferPreprocess()],
	compilerOptions: {
		runes: false,
	},
}
