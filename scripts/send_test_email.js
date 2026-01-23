const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

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
    const host = env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(env.SMTP_PORT || 587);
    const user = env.SMTP_USER;
    const pass = (env.SMTP_PASS || '').replace(/[\s-]/g, '');
    const to = env.CONTACT_TO || user;

    if (!user || !pass) {
        console.error('SMTP_USER or SMTP_PASS missing in .env.local');
        process.exitCode = 2;
        return;
    }

    console.log('Using SMTP:', { host, port, user, to });

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Portfolio Test" <${user}>`,
            to,
            subject: 'Portfolio – SMTP test',
            text: 'This is a test message sent by the local SMTP test script.',
        });
        console.log('Message sent:', info.messageId || info.response);
        if (nodemailer.getTestMessageUrl) {
            const url = nodemailer.getTestMessageUrl(info);
            if (url) console.log('Preview URL:', url);
        }
    } catch (err) {
        console.error('Send failed:', err && err.message ? err.message : err);
        process.exitCode = 3;
    }
}

main();
