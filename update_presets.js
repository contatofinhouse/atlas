const fs = require('fs');
const path = require('path');
const file = path.join('frontend', 'src', 'app', 'components', 'tabular', 'columnPresets.ts');
let content = fs.readFileSync(file, 'utf8');

// Append translation instructions to individual column prompts
content = content.replace(/(prompt:\s*'.*?)',\n/g, (match, p1) => {
    if (p1.includes('IMPORTANTE: Responda sempre em português brasileiro.')) {
        return match;
    }
    return p1 + ' IMPORTANTE: Responda sempre em português brasileiro.\',\n';
});
content = content.replace(/(prompt:\s*".*?)",\n/g, (match, p1) => {
    if (p1.includes('IMPORTANTE: Responda sempre em português brasileiro.')) {
        return match;
    }
    return p1 + ' IMPORTANTE: Responda sempre em português brasileiro.",\n';
});

fs.writeFileSync(file, content);
console.log('Done');
