function cleanDescription(html) {
    let text = html;

    // Decode basic HTML entities
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&amp;/g, '&');

    //Cut description starting from "Example 1:"
    const exampleIdx = text.indexOf('Example 1:');
    if (exampleIdx !== -1) {
        text = text.slice(0, exampleIdx).trim();
    }

    //Strip all HTML tags (no formatting in Discord preview)
    text = text.replace(/<[^>]+>/g, '');

    //Normalize whitespace and line breaks
    text = text.replace(/\r?\n|\r/g, ' ') // replace all newlines with space
               .replace(/\s+/g, ' ')      // collapse multiple spaces
               .trim();

    //400 char limit
    if (text.length > 400) {
        text = text.slice(0, 400) + "...";
    }

    return text;
}

module.exports = { cleanDescription };


