const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');

function loadEnvFile(filePath) {
    try {
        const txt = fs.readFileSync(filePath, 'utf8');
        const lines = txt.split(/\r?\n/);
        const env = {};
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const idx = trimmed.indexOf('=');
            if (idx === -1) continue;
            const key = trimmed.slice(0, idx);
            const val = trimmed.slice(idx + 1);
            env[key] = val;
        }
        return env;
    } catch (err) {
        console.error('Failed to read .env.local:', err.message);
        return {};
    }
}

async function main() {
    const env = loadEnvFile(path.resolve(__dirname, '..', '.env.local'));
    const key = env.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY;
    const to = env.CONTACT_TO || process.env.CONTACT_TO;
    const from = env.SENDGRID_FROM || env.SMTP_USER || process.env.SMTP_USER;

    if (!key) {
        console.error('SENDGRID_API_KEY missing in .env.local');
        process.exitCode = 2;
        return;
    }
    if (!to) {
        console.error('CONTACT_TO missing in .env.local');
        process.exitCode = 2;
        return;
    }

    sgMail.setApiKey(key);

    try {
        const msg = {
            to,
            from: from || to,
            subject: 'Portfolio – SendGrid SMTP test',
            text: 'This is a test message sent via SendGrid API from local script.',
        };
        const res = await sgMail.send(msg);
        console.log('SendGrid response:', res && res[0] && res[0].statusCode ? res[0].statusCode : res);
    } catch (err) {
        console.error('Send failed:', err && err.message ? err.message : err);
        process.exitCode = 3;
    }
}

main();
