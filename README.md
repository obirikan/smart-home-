# Smart Home Project - ESP32 + Arduino

This project is a mobile app Smart Home System implemented using the ESP32 microcontroller and Arduino. It allows users to remotely monitor and control appliances in a home via Wi-Fi.

---

## Features

* Control appliances (e.g., lights, fan, AC) using mobile
* Monitor temperature, humidity, and motion
* User authentication with persistent login
* Real-time updates using Server-Sent Events (SSE)
* Local and cloud-based control

---

## Communication

The ESP32 communicates with the backend using:

* **HTTP (REST API)**: for commands and status updates
* **Server-Sent Events (SSE)**: for real-time updates to the frontend
* **Wi-Fi**: primary communication medium

---

### Hardware:

* ESP32
* Relay Module
* DHT11 or DHT22 (Temperature & Humidity Sensor)
* PIR Motion Sensor

### Software:

* Arduino IDE (ESP32 core)
* Node.js/Express backend
* Firebase Auth (with `@react-native-firebase/auth`)
* AsyncStorage for token persistence in Expo React Native


## Authentication
Implemented using Firebase Auth:

* Email/password login
* Persistent login via `AsyncStorage`
