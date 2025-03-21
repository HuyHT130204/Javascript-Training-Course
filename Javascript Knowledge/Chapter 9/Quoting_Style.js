function fixQuotes(text) {
    // Replace quotes that are at word boundaries or between other quotes
    // but not quotes used in contractions like isn't or don't
    return text.replace(/(^|\s)'|'(\s|$|[,.!?])/g, '$1"$2');
}

// Alternative solution using lookbehind and lookahead (better but not supported in all browsers)
function fixQuotesAdvanced(text) {
    // Match a quote that either:
    // - Has a space or start of string before it (?<=^|\s)
    // - Has a space, punctuation or end of string after it (?=\s|$|[,.!?])
    return text.replace(/(?<=^|\s)'|'(?=\s|$|[,.!?])/g, '"');
}

// Test
let text = "'I'm not sure,' he said, 'but I think it's a good idea.'";
console.log(fixQuotes(text));
// → "I'm not sure," he said, "but I think it's a good idea."
