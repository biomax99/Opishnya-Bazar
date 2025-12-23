import antfu from "@antfu/eslint-config";

export default antfu({
  react: true,
  rules: {
    "ts/no-explicit-any": "error",
    "no-console": "warn",
  },
  ignores: ["**/migrations/meta/*.json", "**/migrations.json"],
});
