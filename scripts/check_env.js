// Simple script used by CI to ensure at least one email provider is configured.
const requiredSmtp = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'];

function hasSendGrid() {
    return !!process.env.SENDGRID_API_KEY;
}

function hasSmtp() {
    return requiredSmtp.every((k) => !!process.env[k]);
}

if (require.main === module) {
    if (hasSendGrid()) {
        console.log('OK: SENDGRID configured');
        process.exit(0);
    }

    if (hasSmtp()) {
        console.log('OK: SMTP configured');
        process.exit(0);
    }

    console.error('ERROR: No email provider configured. Set SENDGRID_API_KEY or SMTP_* + CONTACT_TO.');
    process.exit(1);
}

module.exports = { hasSendGrid, hasSmtp };
