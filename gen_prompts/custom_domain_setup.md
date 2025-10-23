# Custom Domain Setup for squarefeet.co.in

## Overview

This guide sets up `squarefeet.co.in` with:
- **Frontend**: `https://squarefeet.co.in` → CloudFront → S3
- **API**: `https://api.squarefeet.co.in` → App Runner

Both will have HTTPS/SSL and professional branding.

---

## Prerequisites

- ✅ Domain `squarefeet.co.in` registered and accessible
- ✅ Access to registrar's DNS settings (GoDaddy, Namecheap, etc.)
- ✅ S3 bucket `squarefeet-demo` with static site content
- ✅ App Runner service `squarefeet_api_runner` running
- ✅ AWS Account with `us-east-1` region selected

---

## Part 1: SSL Certificate (AWS Certificate Manager)

This creates an HTTPS certificate that works for both `squarefeet.co.in` and `api.squarefeet.co.in`.

### Step 1.1: Request Certificate

1. In AWS console, go to **AWS Certificate Manager → Request a certificate**.
2. Choose **Request a public certificate**.
3. **Domain names** section:
   - Add: `squarefeet.co.in`
   - Add: `www.squarefeet.co.in`
   - Add: `api.squarefeet.co.in`
   - Add: `*.squarefeet.co.in` (wildcard for any subdomain)
4. **Validation method**: Choose **DNS validation** (easier for automated setup).
5. Click **Request**.

### Step 1.2: Validate Certificate via DNS

1. Certificate appears in "Pending validation" state.
2. Click the certificate → expand domain list.
3. For each domain, you'll see a **CNAME name** and **CNAME value**.
4. Example:
   ```
   CNAME Name: _abc123.squarefeet.co.in
   CNAME Value: _def456.acm-validations.aws.
   ```

**Save these values** — you'll give them to the client for DNS setup.

5. Wait ~5-30 minutes for AWS to verify via DNS. Status changes to "Issued".

---

## Part 2: CloudFront Distribution (Frontend)

This puts your S3 site behind a CDN with HTTPS and a custom domain.

### Step 2.1: Create CloudFront Distribution

1. In AWS console, go to **CloudFront → Create distribution**.
2. **Origin**:
   - **Origin domain**: `squarefeet-demo.s3.amazonaws.com` (S3 bucket)
   - **Origin path**: leave blank
   - **S3 access**: Select "Yes use OAI (Origin Access Identity)" to restrict direct S3 access
3. **Default cache behavior**:
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP methods**: GET, HEAD, OPTIONS (read-only)
   - **Cache policy**: Managed-CachingOptimized (good default)
4. **Alternate domain names (CNAMEs)**:
   - Add: `squarefeet.co.in`
   - Add: `www.squarefeet.co.in`
5. **Custom SSL certificate**:
   - Select the certificate you created in Part 1
6. **Default root object**: `index.html`
7. **Compress objects automatically**: Yes
8. Click **Create distribution**.

**Wait 5-15 minutes** for the distribution to deploy (status shows "Deploying...").

### Step 2.2: Collect CloudFront Details

Once deployed:
1. Click the distribution ID to open details.
2. Note the **Domain name**: e.g., `d123abc456.cloudfront.net`
3. This is what you'll point DNS to for the frontend.

---

## Part 3: App Runner Custom Domain (API)

This maps `api.squarefeet.co.in` to your App Runner service.

### Step 3.1: Add Custom Domain to App Runner

1. In AWS console, go to **App Runner → squarefeet_api_runner**.
2. Click **Custom domains** tab.
3. Click **Add custom domain**.
4. **Domain name**: `api.squarefeet.co.in`
5. **Certificate**: Select the ACM certificate from Part 1
6. Click **Add custom domain**.

### Step 3.2: Verify DNS Ownership

1. App Runner displays DNS validation info:
   ```
   Domain: api.squarefeet.co.in
   Target domain: squarefeet_api_runner-xxx.apprunner.us-east-1.on.aws
   ```
2. Copy the **target domain** — this is what you'll point DNS to for the API.

---

## Part 4: DNS Configuration (Client to Perform at Registrar)

The client needs to add these records at their domain registrar (`squarefeet.co.in`).

### Step 4.1: SSL Certificate Validation Records

For each domain from Part 1.2, add a CNAME record:

```
Type: CNAME
Name: _abc123
Value: _def456.acm-validations.aws.
TTL: 300 or 3600
```

*Repeat for all domains (squarefeet.co.in, api.squarefeet.co.in, *.squarefeet.co.in, etc.)*

**Purpose**: Proves to AWS you own the domain.

### Step 4.2: Frontend Domain Pointing

Add this CNAME record:

```
Type: CNAME
Name: @  (or squarefeet.co.in, depending on registrar UI)
Value: d123abc456.cloudfront.net  (the CloudFront domain from Part 2.2)
TTL: 300 or 3600
```

This routes `squarefeet.co.in` → CloudFront → S3.

### Step 4.3: WWW Subdomain (Optional but Recommended)

```
Type: CNAME
Name: www
Value: d123abc456.cloudfront.net  (same CloudFront domain)
TTL: 300 or 3600
```

This routes `www.squarefeet.co.in` → CloudFront.

### Step 4.4: API Subdomain Pointing

Add this CNAME record:

```
Type: CNAME
Name: api
Value: squarefeet_api_runner-xxx.apprunner.us-east-1.on.aws  (from Part 3.2)
TTL: 300 or 3600
```

This routes `api.squarefeet.co.in` → App Runner.

---

## DNS Records Summary Table

Give the client this table to add at their registrar:

| Type | Name | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| CNAME | _abc123 | _def456.acm-validations.aws. | 300 | ACM validation |
| CNAME | @ (or blank) | d123abc456.cloudfront.net | 300 | Frontend main domain |
| CNAME | www | d123abc456.cloudfront.net | 300 | Frontend www subdomain |
| CNAME | api | squarefeet_api_runner-xxx.apprunner.us-east-1.on.aws | 300 | API subdomain |

**Note**: Values marked with "xxx" or placeholder should be replaced with actual values from steps above.

---

## Part 5: Frontend Environment Update

Once DNS is propagated, update the frontend to use the new domain.

### Step 5.1: Create/Update Environment File

**File**: `frontend/.env.production`

```
VITE_API_URL=https://api.squarefeet.co.in/api
```

### Step 5.2: Rebuild and Redeploy Frontend

```bash
cd /Users/packman/Desktop/square-feet/frontend
npm run build
aws s3 sync dist s3://squarefeet-demo --delete
```

### Step 5.3: Invalidate CloudFront Cache

After uploading to S3, invalidate CloudFront so visitors get the new version:

```bash
aws cloudfront create-invalidation \
  --distribution-id d123abc456 \
  --paths "/*"
```

(Replace `d123abc456` with your CloudFront distribution ID from Part 2.2)

---

## Part 6: Verification

### Step 6.1: Wait for DNS Propagation

DNS changes take 15 minutes to 24 hours (usually 30 minutes).

Check propagation:
```bash
nslookup squarefeet.co.in
nslookup api.squarefeet.co.in
```

Should resolve to the CloudFront and App Runner domains respectively.

### Step 6.2: Test Frontend

Visit `https://squarefeet.co.in` in a browser:
- ✅ HTTPS lock appears (SSL working)
- ✅ Site loads without errors
- ✅ Hard refresh (Cmd+Shift+R) to clear cache
- ✅ Properties display Hyderabad data

### Step 6.3: Test API

In a new browser tab:
```
https://api.squarefeet.co.in/api/health
```

Should return:
```json
{ "status": "ok", "timestamp": "2025-10-28T..." }
```

### Step 6.4: Test API Integration

Visit `https://squarefeet.co.in`, open DevTools → Network tab:
- Watch for API calls to `https://api.squarefeet.co.in/api/properties`
- Should get 200 responses with Hyderabad property data

---

## Troubleshooting

### "DNS not found" or "Can't reach domain"
- **Cause**: DNS hasn't propagated yet or records are incorrect
- **Fix**: Wait 30 min, then recheck with `nslookup`. Verify all CNAME records are entered exactly.

### "Certificate error" or "NET::ERR_CERT_AUTHORITY_INVALID"
- **Cause**: SSL certificate not fully issued or ACM validation failed
- **Fix**: Check ACM certificate status. Ensure all domain CNAME validation records exist at registrar.

### "API calls return 403 Forbidden"
- **Cause**: App Runner CORS settings or custom domain not active
- **Fix**: Verify App Runner shows custom domain status as "Active". Check CORS_ORIGIN in App Runner env vars.

### "S3 bucket access denied" or "403 errors"
- **Cause**: S3 bucket policy or OAI (Origin Access Identity) misconfigured
- **Fix**: Ensure CloudFront OAI has S3 read permission. Verify bucket is not blocking CloudFront.

### "CloudFront shows "Access Denied""
- **Cause**: S3 bucket blocking public access or missing OAI policy
- **Fix**: Go to CloudFront distribution → Origins → verify OAI is attached and has S3 permissions.

---

## Rollback (If Needed)

If something breaks:

1. **Revert DNS**: Point domain back to old hosting/IP
2. **S3 Static Site**: Enable S3 static website hosting directly (use old S3 URL)
3. **App Runner**: Keep running; it's not affected by DNS changes

---

## Final Checklist

- [ ] ACM certificate requested and validated
- [ ] CloudFront distribution created with custom domain
- [ ] App Runner custom domain added
- [ ] Client added all DNS records at registrar
- [ ] DNS propagation confirmed (nslookup works)
- [ ] Frontend environment updated with new API URL
- [ ] Frontend rebuilt and synced to S3
- [ ] CloudFront cache invalidated
- [ ] `https://squarefeet.co.in` loads with HTTPS
- [ ] `https://api.squarefeet.co.in/api/health` returns 200
- [ ] Properties page shows Hyderabad data via new domain

---

## Reference: Actual Values to Collect

Fill this in as you go through setup:

```
Certificate ARN: arn:aws:acm:us-east-1:...
CloudFront Domain: d123abc456.cloudfront.net
CloudFront Distribution ID: d123abc456
App Runner Target Domain: squarefeet_api_runner-xxx.apprunner.us-east-1.on.aws
Client Domain: squarefeet.co.in
Client Registrar: [GoDaddy / Namecheap / Route53 / etc]
```

---

## Summary

**For the Client:**

Provide them this info to configure at their registrar:

1. **ACM Validation CNAME** (from Part 1.2)
2. **Frontend CNAME**: `@` → CloudFront domain (Part 2.2)
3. **WWW CNAME**: `www` → CloudFront domain
4. **API CNAME**: `api` → App Runner target domain (Part 3.2)

They add these records at their registrar, wait 30 min for DNS propagation, and you're done!

---

## Next Steps After Custom Domain

Once live on `squarefeet.co.in`:
1. Monitor CloudFront and App Runner metrics
2. Set up CloudWatch alarms for downtime
3. Plan Phase 2: Authentication + Email workflows
4. Consider adding Google Analytics for tracking
