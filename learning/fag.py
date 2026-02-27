# chat_client_gui.py
import tkinter as tk
from tkinter import simpledialog, scrolledtext, messagebox
import socket
import threading
import re

# DPI Awareness для Windows
try:
    from ctypes import windll
    windll.shcore.SetProcessDpiAwareness(1)
except:
    pass


class ChatClient:
    def __init__(self, master):
        self.master = master
        self.master.title("Локальный чат")
        self.master.geometry("600x520")
        self.master.protocol("WM_DELETE_WINDOW", self.on_closing)

        self.username = None
        self.client_socket = None
        self.connected = False
        self.server_ip = None
        self.user_colors = {}
        self.is_currently_typing = False  # флаг: я сам печатаю?

        # === Основное окно — создаём и показываем сразу ===
        self.master.update()

        # Поле чата
        self.chat_area = scrolledtext.ScrolledText(
            master, state='disabled', wrap=tk.WORD, font=("Arial", 10)
        )
        self.chat_area.pack(padx=10, pady=(10, 5), fill=tk.BOTH, expand=True)

        # === Метка для уведомлений о наборе текста (НОВОЕ) ===
        self.typing_label = tk.Label(
            master, text="", fg="gray", font=("Arial", 9), height=1
        )
        self.typing_label.pack(padx=10, pady=0, fill=tk.X)

        # Панель ввода
        bottom_frame = tk.Frame(master)
        bottom_frame.pack(padx=10, pady=(5, 10), fill=tk.X)

        self.msg_entry = tk.Entry(bottom_frame, font=("Arial", 10))
        self.msg_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 5))
        self.msg_entry.bind("<Return>", self.send_message)
        self.msg_entry.bind("<KeyRelease>", self.on_key_release)

        self.send_button = tk.Button(bottom_frame, text="Отправить", command=self.send_message)
        self.send_button.pack(side=tk.RIGHT)

        # Строка состояния
        self.status_label = tk.Label(master, text="Подключение...", bd=1, relief=tk.SUNKEN, anchor=tk.W)
        self.status_label.pack(side=tk.BOTTOM, fill=tk.X)

        self.connect_to_server()

    def connect_to_server(self):
        self.server_ip = simpledialog.askstring(
            "Сервер", "Введите IP-адрес сервера:", parent=self.master
        )
        if not self.server_ip:
            messagebox.showerror("Ошибка", "IP не указан. Выход.", parent=self.master)
            self.master.quit()
            return

        self.username = simpledialog.askstring(
            "Имя", "Введите ваше имя:", parent=self.master
        ) or "Аноним"

        try:
            self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.client_socket.connect((self.server_ip, 12345))
            self.client_socket.send(self.username.encode('utf-8'))
            self.connected = True
            self.update_status(f"Подключено к {self.server_ip}")
            threading.Thread(target=self.receive_messages, daemon=True).start()
            self.add_message("✅ Добро пожаловать в чат!", system=True)
        except Exception as e:
            messagebox.showerror(
                "Ошибка подключения",
                f"Не удалось подключиться: {e}",
                parent=self.master
            )
            self.master.quit()

    def receive_messages(self):
        while self.connected:
            try:
                raw = self.client_socket.recv(1024).decode('utf-8')
                if not raw:
                    break

                if raw.startswith("[history]"):
                    self.add_message(raw[10:], system=True)
                elif raw.startswith("[error]"):
                    self.add_message(raw[8:], system=True, error=True)
                elif raw.startswith("[private]"):
                    self.add_message(raw[10:], private=True)
                elif raw.startswith("[typing]"):
                    parts = raw[9:].split("|")
                    if len(parts) == 2:
                        username, is_typing = parts[0], parts[1] == "True"
                        self.handle_typing_notification(username, is_typing)
                else:
                    self.add_message(raw)
            except:
                break
        self.disconnect()

    def send_message(self, event=None):
        if not self.connected:
            return
        msg = self.msg_entry.get().strip()
        if not msg:
            return

        # Отправляем и очищаем
        try:
            self.client_socket.send(msg.encode('utf-8'))
            self.add_message(f"{self.username}: {msg}")
            self.msg_entry.delete(0, tk.END)

            # Сбрасываем статус "я печатаю"
            if self.is_currently_typing:
                self.send_typing_status(False)
                self.is_currently_typing = False
        except:
            self.disconnect()

    def on_key_release(self, event=None):
        if not self.connected:
            return

        current_text = self.msg_entry.get()
        if current_text.strip():
            # Пользователь начал печатать непустой текст
            if not self.is_currently_typing:
                self.send_typing_status(True)
                self.is_currently_typing = True
        else:
            # Поле пустое — перестаём "печатать"
            if self.is_currently_typing:
                self.send_typing_status(False)
                self.is_currently_typing = False

    def send_typing_status(self, is_typing):
        if not self.connected:
            return
        try:
            self.client_socket.send(f"[typing]|{is_typing}".encode('utf-8'))
        except:
            pass

    def handle_typing_notification(self, username, is_typing):
        if username == self.username:
            return  # не показываем своё уведомление

        if is_typing:
            current = self.typing_label.cget("text")
            names = [name for name in current.split(", ") if name and name != f"{username} печатает..."]
            names.append(f"{username} печатает...")
            self.typing_label.config(text=", ".join(names))
        else:
            current = self.typing_label.cget("text")
            new_text = ", ".join(
                part for part in current.split(", ")
                if not part.startswith(f"{username} ")
            )
            self.typing_label.config(text=new_text if new_text else "")

    def add_message(self, text, system=False, error=False, private=False):
        self.chat_area.config(state='normal')
        self.chat_area.insert(tk.END, text + "\n")

        if system:
            self.chat_area.tag_add("sys", "end-2c linestart", "end-1c")
            self.chat_area.tag_config("sys", foreground="gray")
        elif error:
            self.chat_area.tag_add("err", "end-2c linestart", "end-1c")
            self.chat_area.tag_config("err", foreground="red")
        elif private:
            self.chat_area.tag_add("priv", "end-2c linestart", "end-1c")
            self.chat_area.tag_config("priv", foreground="purple")
        else:
            match = re.match(r"^([^:]+):", text)
            if match:
                name = match.group(1)
                start = "end-2c linestart"
                end_name = f"{start} + {len(name)} chars"
                tag = f"name_{name}"
                self.chat_area.tag_add(tag, start, end_name)
                if name not in self.user_colors:
                    hash_val = sum(ord(c) for c in name) % 0xFFFFFF
                    self.user_colors[name] = f"#{hash_val:06X}"
                self.chat_area.tag_config(tag, foreground=self.user_colors[name])

        self.chat_area.yview(tk.END)
        self.chat_area.config(state='disabled')

    def update_status(self, text):
        self.status_label.config(text=text)

    def disconnect(self):
        self.connected = False
        if self.client_socket:
            self.client_socket.close()
        self.update_status("Отключено")
        self.msg_entry.config(state='disabled')
        self.send_button.config(state='disabled')
        self.typing_label.config(text="")

    def on_closing(self):
        if self.connected:
            self.disconnect()
        self.master.destroy()


if __name__ == "__main__":
    root = tk.Tk()
    app = ChatClient(root)
    root.mainloop()