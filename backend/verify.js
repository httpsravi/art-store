import http from "http";

const API_BASE = "http://localhost:5000";

const makeRequest = (url, options = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const req = http.request(requestOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, data: parsedData });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, rawData: data });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log("=== Monochrome Art Emporium API Tests ===");

  try {
    // 1. Health check
    console.log("\nTesting /health...");
    const health = await makeRequest(`${API_BASE}/health`);
    console.log(`Health Status: ${health.status}`, health.data);
    if (health.status !== 200) throw new Error("Health check failed");

    // 2. Public Artworks List
    console.log("\nTesting GET /api/artworks...");
    const artworks = await makeRequest(`${API_BASE}/api/artworks`);
    console.log(`Artworks Status: ${artworks.status}`);
    console.log(`Total Artworks in DB: ${artworks.data.total}`);
    console.log(`Seed Artworks returned: ${artworks.data.artworks.length}`);
    if (artworks.status !== 200 || !Array.isArray(artworks.data.artworks)) {
      throw new Error("Get artworks failed");
    }

    // 3. Admin login
    console.log("\nTesting POST /api/auth/login...");
    const loginRes = await makeRequest(`${API_BASE}/api/auth/login`, {
      method: "POST"
    }, {
      username: "ravitej",
      password: "ravitej"
    });
    console.log(`Login Status: ${loginRes.status}`);
    if (loginRes.status !== 200 || !loginRes.data.token) {
      throw new Error("Admin login failed");
    }
    const token = loginRes.data.token;
    console.log("Token retrieved successfully");

    // 4. Submit contact form (Inquiry)
    console.log("\nTesting POST /api/inquiries (Submit Inquiry)...");
    const inqSubmit = await makeRequest(`${API_BASE}/api/inquiries`, {
      method: "POST"
    }, {
      name: "John Doe",
      email: "johndoe@example.com",
      subject: "Inquiry on Silence I",
      message: "Hello Ravitej, I'm very interested in purchasing the Silence I charcoal drawing. Is it still available?"
    });
    console.log(`Inquiry Submit Status: ${inqSubmit.status}`, inqSubmit.data);
    if (inqSubmit.status !== 201) {
      throw new Error("Inquiry submission failed");
    }

    // 5. Get Inquiries (Protected)
    console.log("\nTesting GET /api/inquiries (Protected)...");
    const getInq = await makeRequest(`${API_BASE}/api/inquiries`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Get Inquiries Status: ${getInq.status}`);
    console.log(`Total Inquiries: ${getInq.data.total}`);
    console.log(`Unread Count: ${getInq.data.unreadCount}`);
    if (getInq.status !== 200 || !Array.isArray(getInq.data.inquiries)) {
      throw new Error("Failed to retrieve inquiries");
    }
    const createdInq = getInq.data.inquiries[0];
    console.log("Latest inquiry loaded:", {
      id: createdInq._id,
      name: createdInq.name,
      subject: createdInq.subject,
      read: createdInq.read
    });

    // 6. Mark Inquiry as Read (Protected)
    console.log(`\nTesting PATCH /api/inquiries/${createdInq._id}/read (Protected)...`);
    const readInq = await makeRequest(`${API_BASE}/api/inquiries/${createdInq._id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Read Status: ${readInq.status}`);
    console.log(`Inquiry Marked Read: ${readInq.data.read}`);
    if (readInq.status !== 200 || !readInq.data.read) {
      throw new Error("Failed to mark inquiry as read");
    }

    // 7. Delete Inquiry (Protected)
    console.log(`\nTesting DELETE /api/inquiries/${createdInq._id} (Protected)...`);
    const delInq = await makeRequest(`${API_BASE}/api/inquiries/${createdInq._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Delete Status: ${delInq.status}`, delInq.data);
    if (delInq.status !== 200) {
      throw new Error("Failed to delete inquiry");
    }

    console.log("\n=== ALL TESTS PASSED SUCCESSFULLY ===");
  } catch (error) {
    console.error("\nTest failed:", error.message);
    process.exit(1);
  }
};

runTests();
