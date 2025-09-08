function cleanDescription(html) {
    // 1. cut HTML tags
    let text = html.replace(/<[^>]*>/g, '');

    // 2. Cuts from "Example 1:"
    const idx = text.indexOf("Example 1:");
    if (idx !== -1) {
        text = text.slice(0, idx);
    }

    text = text.trim();

    if (text.length > 400) {
        text = text.slice(0, 400) + "...";
    }

    return text;
}

module.exports = {cleanDescription}; 
