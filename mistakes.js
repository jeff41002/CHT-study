// 錯題本只存題目 ID；題幹、選項與解析仍以 questions.js 為準。
window.MistakeBook = (() => {
  const key = "cht-study.mistakes.v1";

  function read() {
    const raw = localStorage.getItem(key);
    if (raw === null) return new Set();

    const ids = JSON.parse(raw);
    if (!Array.isArray(ids) || !ids.every(id => typeof id === "string")) {
      throw new Error("錯題紀錄格式不正確");
    }
    return new Set(ids);
  }

  function addMany(ids) {
    if (!ids.length) return;
    const saved = read();
    ids.forEach(id => saved.add(String(id)));
    localStorage.setItem(key, JSON.stringify([...saved]));
  }

  function remove(id) {
    const saved = read();
    saved.delete(String(id));
    localStorage.setItem(key, JSON.stringify([...saved]));
  }

  return { read, addMany, remove };
})();
