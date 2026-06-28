import { JWT } from "google-auth-library";
const c = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
const a = new JWT({ email: c.client_email, key: c.private_key, scopes:["https://www.googleapis.com/auth/webmasters.readonly"] });
const r = await a.request({ url:"https://searchconsole.googleapis.com/webmasters/v3/sites" });
console.log("service account:", c.client_email);
console.log("accessible sites:");
for (const s of (r.data.siteEntry||[])) console.log(`  ${s.siteUrl}   [${s.permissionLevel}]`);
if (!(r.data.siteEntry||[]).length) console.log("  (none — account not added to any property)");
