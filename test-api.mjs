import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const apiUrl = "http://localhost:3000/api/templates";

try {
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(`\n=== API Response Check ===\n`);
  console.log(`Total templates returned: ${data.templates.length}`);
  console.log(`\nTemplates:`);

  const keys = {};
  data.templates.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.key} - ${t.name}`);
    keys[t.key] = (keys[t.key] || 0) + 1;
  });

  console.log(`\nKey distribution:`);
  Object.entries(keys).forEach(([key, count]) => {
    if (count > 1) {
      console.log(`  ⚠️  ${key}: ${count} times`);
    } else {
      console.log(`  ✓ ${key}: once`);
    }
  });

} catch (error) {
  console.error("Error fetching API:", error.message);
  console.log("\n(Make sure your Next.js server is running on port 3000)");
}
