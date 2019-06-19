export const indent = (strings: TemplateStringsArray, ...values) => strings.map(
  (string, index) => {
    const lines = string.split('\n');
    const minIndent = lines.reduce(
      (minIndent, line) => {
        const indent = line.search(/\S/);
        return (indent < 0)
          ? minIndent
          : (!minIndent ? indent : Math.min(minIndent, indent))
      }, 0);
    return `${lines.map(string => string.slice(minIndent)).join('\n')}${values[index] ? values[index] : ""}`;
  }
).join('').trim();

export const getKey = (title: string, index: number) => (
  `${index}_${typeof title === 'string' ? title.replace(/\s/g, "") : "wrong_title"}`
);
