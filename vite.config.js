import { readFileSync } from "fs";
import { sveltekit } from '@sveltejs/kit/vite';
import path from "path";
import svg from "vite-plugin-svgstring";
import dsv from "@rollup/plugin-dsv";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));

const config = {
	define: {
		__VERSION__: JSON.stringify(version),
	},
	plugins: [
		sveltekit(),
		dsv(),
		svg()
	],
};

export default config;
