
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
    const store = tx.objectStore("users");
    store.put(user);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.log("✅ User added to IndexedDB:", user);
        resolve(true);
      };
      tx.onerror = (event) => {
        console.error("❌ Failed to add user:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Failed to add user to IndexedDB:", error);
  }
};


export const getUserFromIDB = async (email) => {
  try {
    const db = await openDB();
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.get(email);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Failed to get user");
    });
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
    console.log("IndexedDB init triggered");
    await openDB();
    console.log("IndexedDB initialized");
  } catch (err) {
    console.error("Failed to initialize IndexedDB:", err);
  }
};

