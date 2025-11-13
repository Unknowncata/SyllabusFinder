async function getMajor() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("major", (result) => {
      if (!result) {
        reject("Error fetching major from local chrome storage");
      }

      resolve(result["major"]);
    });
  });
}

export default getMajor;
