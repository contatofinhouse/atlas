const fs = require('fs');
const path = require('path');
const file = path.join('frontend', 'src', 'app', 'components', 'workflows', 'builtinWorkflows.ts');
let content = fs.readFileSync(file, 'utf8');

// Replace titles
content = content.replace(/title: "Generate CP Checklist"/g, 'title: "Gerar Checklist de Condições Precedentes"');
content = content.replace(/title: "Change of Control Review"/g, 'title: "Revisão de Mudança de Controle"');
content = content.replace(/title: "Credit Agreement Summary"/g, 'title: "Resumo de Contrato de Crédito"');
content = content.replace(/title: "Commercial Agreement Review"/g, 'title: "Revisão de Contrato Comercial"');
content = content.replace(/title: "Credit Agreement Review"/g, 'title: "Revisão de Contrato de Crédito"');
content = content.replace(/title: "E-Discovery Review"/g, 'title: "Revisão de E-Discovery"');
content = content.replace(/title: "Supply Agreement Review"/g, 'title: "Revisão de Contrato de Fornecimento"');
content = content.replace(/title: "SPA Review"/g, 'title: "Revisão de SPA"');
content = content.replace(/title: "NDA Review"/g, 'title: "Revisão de NDA"');
content = content.replace(/title: "Commercial Lease Review"/g, 'title: "Revisão de Contrato de Locação Comercial"');
content = content.replace(/title: "Limited Partnership Agreement Review"/g, 'title: "Revisão de Contrato de Sociedade Limitada (LPA)"');
content = content.replace(/title: "Shareholder Agreement Summary"/g, 'title: "Resumo de Acordo de Acionistas"');
content = content.replace(/title: "Shareholder Agreement Review"/g, 'title: "Revisão de Acordo de Acionistas"');
content = content.replace(/title: "Employment Agreement Review"/g, 'title: "Revisão de Contrato de Trabalho"');

// Replace practices
content = content.replace(/practice: "General Transactions"/g, 'practice: "Transações Gerais"');
content = content.replace(/practice: "Corporate"/g, 'practice: "Societário"');
content = content.replace(/practice: "Finance"/g, 'practice: "Financeiro"');
content = content.replace(/practice: "Litigation"/g, 'practice: "Contencioso"');
content = content.replace(/practice: "Real Estate"/g, 'practice: "Imobiliário"');
content = content.replace(/practice: "Private Equity"/g, 'practice: "Private Equity"');
content = content.replace(/practice: "Employment"/g, 'practice: "Trabalhista"');

// Append translation instructions to prompt_md (but only if it's not already appended to avoid double appending)
// We look for a prompt_md string that doesn't already contain our appended text.
content = content.replace(/(prompt_md:\s*"[\s\S]*?)",\r?\n/g, (match, p1) => {
    if (p1.includes('IMPORTANTE: Responda sempre em português brasileiro.')) {
        return match;
    }
    return p1 + '\\n\\nIMPORTANTE: Responda sempre em português brasileiro.",\n';
});

// Append translation instructions to individual column prompts
content = content.replace(/(prompt:\s*".*?)",\r?\n/g, (match, p1) => {
    if (p1.includes('IMPORTANTE: Responda sempre em português brasileiro.')) {
        return match;
    }
    return p1 + ' IMPORTANTE: Responda sempre em português brasileiro.",\n';
});

// Write it back
fs.writeFileSync(file, content);
console.log('Done');
