const fs = require('fs');
const path = require('path');

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
    // Prefer EmailJS when configured
    const emailjsService = env.EMAILJS_SERVICE_ID;
    const emailjsTemplate = env.EMAILJS_TEMPLATE_ID;
    const emailjsUser = env.EMAILJS_PUBLIC_KEY || env.EMAILJS_USER;

    if (emailjsService && emailjsTemplate && emailjsUser) {
        const payload = {
            service_id: emailjsService,
            template_id: emailjsTemplate,
            user_id: emailjsUser,
            template_params: {
                from_name: 'Local Test',
                from_email: env.TEST_FROM_EMAIL || env.SMTP_USER || 'no-reply@example.com',
                message: 'This is a test message sent via EmailJS REST API',
                to_email: env.CONTACT_TO || env.SMTP_USER || 'you@example.com',
            },
        };

        try {
            const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                console.log('EmailJS send OK');
            } else {
                const txt = await res.text();
                console.error('EmailJS send failed:', res.status, txt);
                process.exitCode = 3;
            }
        } catch (err) {
            console.error('EmailJS request failed:', err && err.message ? err.message : err);
            process.exitCode = 3;
        }

        return;
    }

    console.error('EmailJS configuration missing in .env.local (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)');
    process.exitCode = 2;
}

main();
