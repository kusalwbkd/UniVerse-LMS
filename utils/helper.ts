export const cleanHTML = (html: string) => {
    return html
      .replace(/^"(.*)"$/, '$1') // Remove wrapping quotes
      .replace(/\\n/g, '<br/>')
      .replace(/\\(.)/g, '$1') // Unescape any character
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/<p>\s*<\/p>/g, '') // Remove empty <p> tags
      .replace(/<div>\s*<\/div>/g, '') // Remove empty <div> tags
      .replace(/(<br\s*\/?>\s*)+$/g, '') // Trim trailing <br>
      .replace(/^(<br\s*\/?>\s*)+/g, '') // Trim leading <br>
      .replace(/\s+$/, '') // Trailing whitespace
      .replace(/^\s+/, '') // Leading whitespace
      .trim();
  };
  