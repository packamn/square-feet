# DNS Configuration for squarefeet.co.in

## Instructions for Client

Please add these DNS records in your Squarespace DNS settings:

---

## Records to Add

### 1. Root Domain (Main Website)
```
Type: ALIAS
Host: @
Data: d1exfryf8i5ecr.cloudfront.net
TTL: 1 hour
```

**Purpose:** Points squarefeet.co.in to the main website

---

### 2. WWW Subdomain (Main Website)
```
Type: CNAME
Host: www
Data: d1exfryf8i5ecr.cloudfront.net
TTL: 1 hour
```

**Purpose:** Points www.squarefeet.co.in to the main website

---

### 3. API Subdomain (Backend)
```
Type: CNAME
Host: api
Data: hr3hgvamzk.us-east-1.awsapprunner.com
TTL: 1 hour
```

**Purpose:** Points api.squarefeet.co.in to the backend API

---

## How to Add in Squarespace

1. Log into Squarespace
2. Go to **Domains** → `squarefeet.co.in`
3. Click **DNS Settings**
4. Scroll to **Custom Records** section
5. Click **Add Record** for each entry above
6. Fill in exactly as shown
7. Click **Save** after each record

---

## Important Notes

- ✅ **Keep all existing records** (MX records for email, TXT records, etc.)
- ✅ **Add** these three new records alongside existing ones
- ✅ Leave Priority field blank for CNAME/ALIAS records
- ⏰ DNS changes take 15-30 minutes to propagate (sometimes up to a few hours)

---

## After Adding Records

Once all three records are added:

1. **Wait 30 minutes** for DNS to propagate
2. **Test the domains**:
   - Visit: https://squarefeet.co.in
   - Visit: https://www.squarefeet.co.in
   - Visit: https://api.squarefeet.co.in/api/health

3. All should show **HTTPS lock icon** (🔒) and load successfully

---

## Quick Reference Table

| Type | Host | Data | TTL |
|------|------|------|-----|
| ALIAS | @ | d1exfryf8i5ecr.cloudfront.net | 1 hour |
| CNAME | www | d1exfryf8i5ecr.cloudfront.net | 1 hour |
| CNAME | api | hr3hgvamzk.us-east-1.awsapprunner.com | 1 hour |

---

## If You Get Stuck

**Issue**: "Can't add ALIAS at root"
- **Solution**: Some registrars call it ANAME or Virtual CNAME - use that instead

**Issue**: "CNAME conflicts with existing records"
- **For www and api**: This shouldn't happen - they're new subdomains
- **For @**: Use ALIAS specifically to avoid this

**Issue**: "Don't see ALIAS option"
- **Contact Squarespace support** - they should have this feature for domains with MX records

---

## Timeline

- **Add records**: 5-10 minutes
- **DNS propagation**: 15-30 minutes (up to 2 hours)
- **CloudFront activation**: Already deploying (5-15 minutes)
- **Total time to live site**: 30-60 minutes after adding records

---

**Questions?** Contact us for clarification on any step.
