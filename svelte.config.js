import { vitePreprocess } from '@astrojs/svelte';
import breferPreprocess from "brefer";

export default {
	preprocess: [vitePreprocess({}), ...breferPreprocess()],
}
