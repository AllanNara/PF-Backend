import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
		languageOptions: {
			globals: globals.node,
			sourceType: "module"
		},
		rules: {
			eqeqeq: ["error", "always"],
			"no-empty-function": "error",
			"no-implicit-coercion": "error",
			"no-duplicate-imports": "error",
			"no-console": ["error", { allow: ["warn", "error", "info"] }],
			"no-undefined": "warn",
			"sort-imports": "warn"
		}
	},
	eslintPluginPrettierRecommended,
	pluginJs.configs.recommended
];
