
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AirTalkDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addUserToIDB = async (user) => {
  try {
    const db = await openDB();
    const tx = db.transaction("users", "readwrite");
    tx.objectStore("users").put(user);
    await tx.done;
  } catch (error) {
    console.error("Failed to add user to IndexedDB:", error);
  }
};

export const getUserFromIDB = async (email) => {
  try {
    const db = await openDB();
    const tx = db.transaction("users", "readonly");
    const user = await tx.objectStore("users").get(email);
    return user;
  } catch (error) {
    console.error("Failed to get user from IndexedDB:", error);
    return null;
  }
};

export const clearUsersFromIDB = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction("users", "readwrite");
    await tx.objectStore("users").clear();
    await tx.done;
  } catch (error) {
    console.error("Failed to clear users from IndexedDB:", error);
  }
};

export const initDB = async () => {
  try {
    await openDB();
    console.log("IndexedDB initialized");
  } catch (err) {
    console.error("Failed to initialize IndexedDB:", err);
  }
};

