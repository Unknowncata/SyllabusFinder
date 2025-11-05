function scrapeClassInfo(courseCard, dayLabel) {
  const periodTermText = courseCard.querySelector(".courseCardInfo")?.textContent.trim() || "";
  const [period, term] = periodTermText.split(/\s+/);

  const lectureName = courseCard.querySelector(".courseCardName")?.textContent.trim() || "";
  const lecturerRaw = courseCard.querySelector(".courseCardUser");
  const lecturer = [...lecturerRaw.childNodes][0].textContent || "";

  return {
    lectureName,
    lecturer: lecturer.replace(/["ほか"]/g, "").trim(),
    day: dayLabel,
    period: period === "オンライン" ? "オンライン" : period || "",
    term: term || "",
    isOnline: period === "オンライン",
  };
}

// could possiblly be optimized if this ran only once after installation
(async () => {
  const { classInfo: storedClassInfo } = (await chrome.storage.local.get("classInfo")) || {};

  if (Object.keys(storedClassInfo || {}).length > 0) {
    console.log("classInfo already stored, skipping scraping");
    return;
  }

  const dayBoxes = document.querySelectorAll(".weeklyCourseArea .dayBox");
  const classInfo = {};
  const dayTasks = [];

  for (const dayBox of dayBoxes) {
    const dayLabel = dayBox.querySelector(".cpLabel.orange")?.textContent.trim() || "";

    if (dayLabel === "その他" || dayLabel === "") {
      continue;
    }

    const courseCards = dayBox.querySelectorAll(".courseCard");
    const courseTasks = [...courseCards].map((courseCard) => scrapeClassInfo(courseCard, dayLabel));
    const dayTask = Promise.all(courseTasks).then((dailyClasses) => {
      classInfo[dayLabel] = dailyClasses;
    });

    dayTasks.push(dayTask);
  }

  await Promise.all(dayTasks);
  await chrome.storage.local.set({ classInfo });
})();
