/**
 * Authentication and Security Verification Script
 * 
 * Programmatically tests:
 * 1. User Registration (Success & Duplicate error handling)
 * 2. User Login (Success & Token signature retrieval)
 * 3. Route Protection (Expect 401 Unauthorized without Bearer JWT)
 * 4. Scoped Retrieval (Access content with Bearer JWT)
 * 5. Rate Limiting (Expect 429 Too Many Requests after 5 successive logins)
 */

const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

// Helper utility to make HTTP requests returning a promise
function request(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsedData = null;
        if (data && res.headers['content-type'] && res.headers['content-type'].includes('application/json')) {
          try {
            parsedData = JSON.parse(data);
          } catch (e) {
            parsedData = data;
          }
        } else {
          parsedData = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: parsedData
        });
      });
    });

    req.on('error', (err) => { reject(err); });
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runAuthTests() {
  console.log("=========================================");
  console.log("🧪 Starting Week 6 Auth & Security Tests...");
  console.log(`📡 Target Server: ${BASE_URL}`);
  console.log("=========================================\n");

  const testUser = {
    name: "TBI Tester",
    email: `tester_${Date.now()}@flavorforge.com`, // Unique email for this test run
    password: "securepassword123"
  };

  let activeJwtToken = null;

  try {
    // 1. Register User
    console.log("Test 1: POST /api/auth/register (New User)");
    const register = await request('POST', '/api/auth/register', {}, testUser);
    console.log(`👉 Status: ${register.statusCode}`);
    console.log(`👉 Success: ${register.body.success}`);
    console.log(`👉 Message: "${register.body.message}"\n`);
    if (register.statusCode !== 201) throw new Error("Registration failed");

    // 2. Duplicate Registration Guard
    console.log("Test 2: POST /api/auth/register (Duplicate Email -> Expect 400)");
    const duplicate = await request('POST', '/api/auth/register', {}, testUser);
    console.log(`👉 Status: ${duplicate.statusCode}`);
    console.log(`👉 Error message: "${duplicate.body.error?.message || duplicate.body.message}"\n`);
    if (duplicate.statusCode !== 400) throw new Error("Duplicate registration protection failed");

    // 3. User Login
    console.log("Test 3: POST /api/auth/login (Success Credentials)");
    const login = await request('POST', '/api/auth/login', {}, {
      email: testUser.email,
      password: testUser.password
    });
    console.log(`👉 Status: ${login.statusCode}`);
    console.log(`👉 Token Returned: ${login.body.token ? "YES (JWT)" : "NO"}`);
    console.log(`👉 Message: "${login.body.message}"\n`);
    if (login.statusCode !== 200 || !login.body.token) throw new Error("Login failed");
    activeJwtToken = login.body.token;

    // 4. Access Protected Endpoint without Token
    console.log("Test 4: GET /api/content (Without JWT -> Expect 401)");
    const unauthorizedGet = await request('GET', '/api/content', {});
    console.log(`👉 Status: ${unauthorizedGet.statusCode} (Expected: 401)`);
    console.log(`👉 Error message: "${unauthorizedGet.body.error?.message}"\n`);
    if (unauthorizedGet.statusCode !== 401) throw new Error("Protected API endpoint did not block unauthenticated request");

    // 5. Access Protected Endpoint with Token
    console.log("Test 5: GET /api/content (With JWT Bearer Token -> Expect 200)");
    const authorizedGet = await request('GET', '/api/content', {
      'Authorization': `Bearer ${activeJwtToken}`
    });
    console.log(`👉 Status: ${authorizedGet.statusCode} (Expected: 200)`);
    console.log(`👉 Found user-scoped items: ${authorizedGet.body.count}\n`);
    if (authorizedGet.statusCode !== 200) throw new Error("Accessing content with valid JWT failed");

    // 6. Test Rate Limiter
    console.log("Test 6: Rate Limiting (Firing 10 rapid logins -> Expect 429 after 5 requests)");
    console.log("👉 Triggering...");
    let limitTriggered = false;
    for (let i = 0; i < 10; i++) {
      const response = await request('POST', '/api/auth/login', {}, {
        email: testUser.email,
        password: testUser.password
      });
      if (response.statusCode === 429) {
        console.log(`👉 Hit request ${i + 1} -> Status: 429 Too Many Requests (Limiter Active!)`);
        console.log(`👉 Limit message: "${response.body.error?.message || response.body.message}"\n`);
        limitTriggered = true;
        break;
      }
    }
    if (!limitTriggered) {
      throw new Error("Rate limiting did not trigger a 429 response on auth endpoints");
    }

    console.log("=========================================");
    console.log("🎉 ALL WEEK 6 AUTH TESTS PASSED! ✅");
    console.log("=========================================");

  } catch (error) {
    console.error("❌ Auth Test Suite Failed:", error.message);
    process.exit(1);
  }
}

runAuthTests();
