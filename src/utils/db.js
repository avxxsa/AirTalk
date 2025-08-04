const dbName = "AirTalkDB";
const dbVersion = 4; // 🔁 bump version to force upgrade

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }

      if (db.objectStoreNames.contains("messages")) {
        db.deleteObjectStore("messages"); // 🔁 force clean corrupted stores
      }
      const msgStore = db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
      msgStore.createIndex("roomId", "roomId", { unique: false });
      msgStore.createIndex("timestamp", "timestamp", { unique: false });

      if (db.objectStoreNames.contains("pending")) {
        db.deleteObjectStore("pending");
      }
      const pending = db.createObjectStore("pending", { keyPath: "id", autoIncrement: true });
      pending.createIndex("roomId", "roomId", { unique: false });
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
    console.error("❌ Failed to add user to IndexedDB:", error);
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
    console.error("❌ Failed to get user from IndexedDB:", error);
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
    console.error("❌ Failed to clear users from IndexedDB:", error);
  }
};

export const initDB = async () => {
  try {
    console.log("IndexedDB init triggered");
    await openDB();
    console.log("✅ IndexedDB initialized");
  } catch (err) {
    console.error("❌ Failed to initialize IndexedDB:", err);
  }
};

export const storeMessage = async ({ roomId, sender, content, timestamp }) => {
  try {
    const db = await openDB();
    const tx = db.transaction("messages", "readwrite");
    const store = tx.objectStore("messages");

    store.add({
      id: Date.now(), // 🔁 explicit id to avoid DataError
      roomId,
      sender,
      content,
      timestamp: timestamp || new Date().toISOString(),
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        console.log("💾 Message stored:", { roomId, sender, content });
        resolve(true);
      };
      tx.onerror = (e) => {
        console.error("❌ Failed to store message:", e.target.error);
        reject(e.target.error);
      };
    });
  } catch (err) {
    console.error("❌ Error in storeMessage:", err);
    return false;
  }
};

export const getMessagesByRoom = async (roomId) => {
  try {
    const db = await openDB();
    const tx = db.transaction("messages", "readonly");
    const store = tx.objectStore("messages");

    if (!store.indexNames.contains("roomId")) {
      console.error("❌ roomId index not found in messages store");
      return [];
    }

    const index = store.index("roomId");
    const request = index.getAll(IDBKeyRange.only(roomId));

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const messages = request.result.sort((a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
        );
        resolve(messages);
      };
      request.onerror = () => reject("Failed to get messages");
    });
  } catch (err) {
    console.error("❌ Error in getMessagesByRoom:", err);
    return [];
  }
};

export const queuePendingMessage = async ({ roomId, content }) => {
  const db = await openDB();
  const tx = db.transaction("pending", "readwrite");
  tx.objectStore("pending").add({
    id: Date.now(),
    roomId,
    content,
    timestamp: new Date().toISOString(),
  });
};

export const getPendingMessages = async (roomId) => {
  const db = await openDB();
  const tx = db.transaction("pending", "readonly");
  const store = tx.objectStore("pending");

  if (!store.indexNames.contains("roomId")) {
    console.error("❌ roomId index missing in pending store");
    return [];
  }

  const index = store.index("roomId");
  return new Promise((resolve, reject) => {
    const req = index.getAll(IDBKeyRange.only(roomId));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Failed to fetch pending messages");
  });
};

export const clearPendingMessages = async (roomId) => {
  const db = await openDB();
  const tx = db.transaction("pending", "readwrite");
  const store = tx.objectStore("pending");

  if (!store.indexNames.contains("roomId")) {
    console.warn("⚠️ No roomId index in pending store, skipping clear.");
    return;
  }

  const index = store.index("roomId");
  const cursorReq = index.openCursor(IDBKeyRange.only(roomId));
  cursorReq.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      cursor.delete();
      cursor.continue();
    }
  };
};
