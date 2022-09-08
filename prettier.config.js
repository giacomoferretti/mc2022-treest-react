module.exports = {
  plugins: [require("@trivago/prettier-plugin-sort-imports")],
  bracketSameLine: true,
  quoteProps: "consistent",
  importOrder: ["^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
