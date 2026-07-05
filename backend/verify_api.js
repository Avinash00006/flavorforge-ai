/**
 * API Verification Script
 * 
 * This script runs a suite of automated checks on the FlavorForge AI Express API.
 * It uses the native Node.js 'http' module to verify:
 * 1. GET / (health check)
 * 2. GET /api/content (list items)
 * 3. POST /api/content (create item / simulate generation)
 * 4. GET /api/content/search (search items)
 * 5. GET /api/content/:id (fetch single item)
 * 6. PUT /api/content/:id (update item status/fields)
 * 7. DELETE /api/content/:id (delete item)
 * 8. GET /api/content/:id (expect 404 after deletion)
 * 
 * Usage:
 *   1. Start the server (e.g., node server.js)
 *   2. Run this script in another terminal: node verify_api.js
 */

const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

// Helper utility to make HTTP requests returning a promise
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

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

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Main testing sequence
async function runTests() {
  console.log("=========================================");
  console.log("🧪 Starting FlavorForge AI API Tests...");
  console.log(`📡 URL: ${BASE_URL}`);
  console.log("=========================================\n");

  let createdItemId = null;

  try {
    // 1. Health check
    console.log("Test 1: GET / (Health Check)");
    const health = await request('GET', '/');
    console.log(`👉 Status: ${health.statusCode}`);
    console.log(`👉 Message: ${health.body.message}\n`);
    if (health.statusCode !== 200) throw new Error("Health check failed");

    // 2. List initial items
    console.log("Test 2: GET /api/content (List items)");
    const list = await request('GET', '/api/content');
    console.log(`👉 Status: ${list.statusCode}`);
    console.log(`👉 Found items: ${list.body.count}`);
    console.log(`👉 First item title: "${list.body.data[0]?.title}"\n`);
    if (list.statusCode !== 200 || !Array.isArray(list.body.data)) throw new Error("List content failed");

    // 3. Create a new item
    console.log("Test 3: POST /api/content (Create item)");
    const payload = {
      title: "Gluten-Free Almond Bread",
      type: "description",
      description: "Low carb gluten-free almond flour bread.",
      ingredients: "Almond Flour, Eggs, Coconut Oil, Flaxseed Meal",
      tone: "Engaging",
      targetAudience: "Celiac patients & keto dieters"
    };
    const create = await request('POST', '/api/content', payload);
    console.log(`👉 Status: ${create.statusCode}`);
    console.log(`👉 Success: ${create.body.success}`);
    console.log(`👉 Created ID: ${create.body.data?.id || create.body.data?._id}`);
    console.log(`👉 Preview text: "${create.body.data?.generatedText?.substring(0, 80)}..."\n`);
    if (create.statusCode !== 201) throw new Error("Create content failed");
    createdItemId = create.body.data?.id || create.body.data?._id;

    // 4. Search items
    console.log("Test 4: GET /api/content/search?q=Almond (Search check)");
    const search = await request('GET', `/api/content/search?q=Almond`);
    console.log(`👉 Status: ${search.statusCode}`);
    console.log(`👉 Search matches: ${search.body.count}`);
    console.log(`👉 First match: "${search.body.data[0]?.title}"\n`);
    if (search.statusCode !== 200 || search.body.count === 0) throw new Error("Search content failed");

    // 5. Fetch single item
    console.log(`Test 5: GET /api/content/${createdItemId} (Get single item)`);
    const single = await request('GET', `/api/content/${createdItemId}`);
    console.log(`👉 Status: ${single.statusCode}`);
    console.log(`👉 Title retrieved: "${single.body.data?.title}"\n`);
    if (single.statusCode !== 200) throw new Error("Get single item failed");

    // 6. Update item status
    console.log(`Test 6: PUT /api/content/${createdItemId} (Update item status to 'published')`);
    const updatePayload = {
      status: "published",
      title: "Gluten-Free Premium Almond Bread" // edit title too
    };
    const update = await request('PUT', `/api/content/${createdItemId}`, updatePayload);
    console.log(`👉 Status: ${update.statusCode}`);
    console.log(`👉 New Status: "${update.body.data?.status}"`);
    console.log(`👉 New Title: "${update.body.data?.title}"\n`);
    if (update.statusCode !== 200 || update.body.data.status !== 'published') throw new Error("Update content failed");

    // 7. Delete item
    console.log(`Test 7: DELETE /api/content/${createdItemId} (Delete item)`);
    const del = await request('DELETE', `/api/content/${createdItemId}`);
    console.log(`👉 Status: ${del.statusCode} (Expected: 204 No Content)\n`);
    if (del.statusCode !== 204) throw new Error("Delete content failed");

    // 8. Expect 404 after deletion
    console.log(`Test 8: GET /api/content/${createdItemId} (Fetch deleted item -> Expect 404)`);
    const singleAfterDelete = await request('GET', `/api/content/${createdItemId}`);
    console.log(`👉 Status: ${singleAfterDelete.statusCode} (Expected: 404)`);
    console.log(`👉 Success: ${singleAfterDelete.body.success}`);
    console.log(`👉 Error message: "${singleAfterDelete.body.error?.message}"\n`);
    if (singleAfterDelete.statusCode !== 404) throw new Error("Verification after delete failed");

    console.log("=========================================");
    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! ✅");
    console.log("=========================================");

  } catch (error) {
    console.error("❌ Test Suite Failed:", error.message);
    process.exit(1);
  }
}

runTests();
