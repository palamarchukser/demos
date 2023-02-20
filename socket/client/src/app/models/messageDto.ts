export class MessageDto {
  id: string;

  message: string | null;

  time: string;

  username: string;

  event: string | null;

  constructor(id: string, username: string, message?: string | null, event?: string | null) {
    this.id = id;
    this.event = event || null;
    this.message = message || null;
    this.time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    this.username = username;
  }
}
