import { ViewChild, Component } from '@angular/core';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import type { ElementRef, AfterViewInit } from '@angular/core';
import { MessageDto } from './models/messageDto';
import type { UsersList } from './models/usersList';

@Component({
  selector: 'body[root]',
  template: `
    <div class="content" role="main">
      <div
        *ngIf="!connected"
        class="chat login">
        <h1>Sign in to App</h1>

        <input
          #loginField
          [(ngModel)]="username"
          type="text"
          class="input"
          placeholder="Enter your username..."
          (keyup.enter)="connect()" />

        <button
          *ngIf="!connected"
          type="button"
          class="button"
          [disabled]="username.trim() === ''"
          (click)="connect()">
          Login
        </button>
      </div>

      <div
        *ngIf="connected"
        class="chat">
        <audio #audioOption class="audio">
          <source src='/assets/xat_notify.mp3' type="audio/mp3">
        </audio>

        <div class="wrapper">
          <div class="users">
            <div class="header">
              Users:
            </div>

            <div *ngFor="let item of users" class="user">
              {{ item.username }}
            </div>
          </div>

          <div class="messages">
            <div
              #scrollBlock
              class="scroll-section">
              <div class="message-list">
                <div
                  *ngFor="let item of messages"
                  [attr.self]="item.id === socket?.id ? true : null"
                  class="message">
                  <div class="message-header">
                    <span class="username">{{item.username}}</span>

                    <span class="time">{{item.time}}</span>
                  </div>

                  {{ item.message }}
                </div>
              </div>
            </div>

            <div class="typing-placeholder">
              <div *ngIf="usersTyping.length > 0 && usersTyping[0].id !== userID" class="typing-users">
                <span *ngFor="let item of usersTyping" class="usernames">
                  <span *ngIf="userID !== item.id">{{ item.username }}</span>
                </span>

                is typing...
              </div>
            </div>

            <div class="send-message">
              <textarea
                #messageField
                [(ngModel)]="message"
                autosize
                (keydown)="onKeyDown($event)"></textarea>

              <button
                *ngIf="message.trim() !== ''"
                type="button"
                (click)="sendMessage()">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4" stroke="#055074" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <static-socials></static-socials>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  @ViewChild('scrollBlock') private scrollBlock: ElementRef = {} as ElementRef;

  @ViewChild('loginField') private loginField: ElementRef = {} as ElementRef;

  @ViewChild('messageField') private messageField: ElementRef = {} as ElementRef;

  @ViewChild('audioOption') audioPlayerRef: ElementRef = {} as ElementRef;

  messages: MessageDto[] = [];

  users: UsersList[] = [];

  usersTyping: UsersList[] = [];

  isTyping = false;

  timeout: ReturnType<typeof setTimeout> | undefined = undefined;

  username = '';

  userID: string | undefined = undefined;

  message = '';

  connected = false;

  closed = false;

  socket?: Socket;

  ngAfterViewInit() {
    this.loginField.nativeElement.focus();
  }

  public connect() {
    if (this.username.trim() === '') {
      return;
    }

    this.socket = io('http://localhost:5000');
    //this.socket = io('http://2515588.socketio.web.hosting-test.net/');

    this.socket.on('connect', () => {
      this.connected = true;
      this.closed = false;
      this.userID = this.socket?.id;

      this.socket?.emit('newUser', { username: this.username, id: this.socket.id });
    });

    this.socket.on('messageResponse', data => {
      this.messages.push(data);

      if (data.id !== this.userID) {
        this.audioPlayerRef.nativeElement.play();
      }

      setTimeout(() => {
        this.scrollBottomTextarea();
      }, 10);
    });

    this.socket.on('newUserResponse', data => {
      this.users = data;
    });

    this.socket.on('typingResponse', data => {
      console.log(data);
      this.usersTyping = data.filter((user: UsersList) => user.id !== this.userID);
    });

    this.socket.on('disconnect', () => {
      this.connected = false;

      alert('No connection, please try again');
    });
  }

  public sendMessage() {
    this.messageField.nativeElement.focus();
    const isValid = this.message.trim() !== '';

    if (!isValid) {
      return;
    }

    const data = new MessageDto(this.socket?.id || '', this.username, this.message.trim());
    this.message = '';

    this.socket?.emit('message', data);
    this.scrollBottomTextarea();
  }

  public onKeyDown(e: KeyboardEvent) {
    const socket = this.socket;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      this.sendMessage();
      return;
    }

    socket?.emit('typing', { username: this.username, id: socket?.id });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      socket?.emit('stopTyping', { username: this.username, id: socket?.id });
    }, 1000);
  }

  public scrollBottomTextarea() {
    this.scrollBlock.nativeElement.scrollIntoView();
    document.getElementsByClassName('scroll-section')[0].scrollTo({ top: document.getElementsByClassName('scroll-section')[0].scrollHeight });
  }
}
