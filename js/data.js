// Constants for AirTable API
const BASE_ID = "appnsFgnlCfcgfek1";
const TABLE = "Projects";
const TOKEN =
  "patpEOf7IvM7kNzlp.a62985958d240f1a5272ec69667a228fc66d57689bf4bc002674c1a95b47a1bd";
const PROJECT_IMAGE_FALLBACK = "./assets/imgs/projects_banner_img.png";

// Loads projects from AirTable API
async function loadProjects() {
  // Fetch from link given (projects DB)
  const response = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    },
  );
  return await response.json();
}