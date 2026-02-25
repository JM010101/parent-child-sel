import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';

export class AudioService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.isRecording = false;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      return { success: true };
    } catch (error) {
      console.error('Error starting recording:', error);
      return { success: false, error: error.message };
    }
  }

  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.isRecording) {
        resolve({ success: false, error: 'Not recording' });
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.isRecording = false;
        
        // Stop all tracks
        if (this.mediaRecorder.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        resolve({ success: true, audioBlob });
      };

      this.mediaRecorder.stop();
    });
  }

  async uploadAudio(userId, activityId, audioBlob) {
    try {
      const timestamp = Date.now();
      const audioRef = ref(storage, `reflections/${userId}/${activityId}/${timestamp}.webm`);
      await uploadBytes(audioRef, audioBlob);
      const downloadURL = await getDownloadURL(audioRef);
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error uploading audio:', error);
      return { success: false, error: error.message };
    }
  }

  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
