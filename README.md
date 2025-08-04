# AIRTALK 

Airtalk is a real-time peer-to-peer (P2P) chat platform built for students at Kathmandu University. It runs over the university's WiFi and works without internet, allowing students to send direct messages and participate in group chats securely and locally.

## Features

- Real-time LAN chat (DMs + Chatrooms)
- Peer-to-peer messaging (no central server)
- Local storage for chat history
- Clean UI with React + Tailwind CSS

## Relevance

This project directly applies concepts from:
- Communication & Networking (P2P, sockets)
- Database Management Systems (IndexedDB, local storage

## Tech Stack

- React.js 
- Tailwind CSS 
-  WebRTC 
- WebSockets
- IndexedDB 
- GitHub for version control

## 🎯 Objectives

- Enable **offline communication📳** 
- Develop **decentralized messaging** without server dependency
- Store messages **locally** using IndexedDB with privacy focus

---


## 📦 Installation Guide

### Prerequisites

- Node.js ≥ 18
- Modern browser (Chrome, Firefox, Edge)

### Setup Steps


- Clone the repository
```git clone https://github.com/your-username/airtalk.git ```
```cd airtalk```

- Install dependencies
```npm install```

- Run in dev mode
```npm run dev```

```bash
git clone https://github.com/avxxsa/AirTalk.git
cd AirTalk
npm install
npm run build
node server.cjs

Open browser and visit http://{your router's ip}:3000
