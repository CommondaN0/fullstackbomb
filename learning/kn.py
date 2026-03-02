import tkinter as tk
from tkinter import messagebox, simpledialog

# Для чего вообще сампо нужно?
# Я не думал, что ООП существует до этой программы 0_-
class TicTacToe:
    def __init__(self, root):
        self.root = root
        self.root.title("Крестики-нолики 🌟 for AFSO ver")
        self.root.geometry("500x600")
        self.root.minsize(350, 450)
        self.root.resizable(True, True)

        # Введите свои ники
        self.player_X_name = self.get_player_name("X", "Игрок X", "Инфобезник")
        self.player_O_name = self.get_player_name("O", "Игрок O", "Аналитик")

        # Темка
        self.dark_mode = False
        self.setup_colors()

        # Счётчики
        self.score_X = 0
        self.score_O = 0

        # Игровое состояние
        self.current_player = "X"
        self.board = [["" for _ in range(3)] for _ in range(3)]
        self.buttons = [[None for _ in range(3)] for _ in range(3)]
        self.game_over = False

        self.create_widgets()
        self.update_score_label()
        self.root.bind("<Configure>", self.on_resize)

    def get_player_name(self, symbol, title, default):
        name = simpledialog.askstring(
            title,
            f"Введите имя игрока {symbol}:",
            initialvalue=default,
            parent=self.root
        )
        if not name or name.strip() == "":
            return default
        return name.strip()

    def setup_colors(self):
        if self.dark_mode:
            self.bg_window = "#121212"
            self.bg_frame = "#1e1e1e"
            self.bg_button = "#2d2d2d"
            self.fg_text = "#ffffff"
            self.fg_score = "#e0e0e0"
            self.highlight_win = "#FFD700"
            self.reset_btn_bg = "#ff6666"
            self.reset_btn_fg = "#ffffff"
            self.theme_btn_bg = "#444444"
            self.theme_btn_fg = "#ffffff"
        else:
            self.bg_window = "#f5f5f5"
            self.bg_frame = "#ffffff"
            self.bg_button = "#ffffff"
            self.fg_text = "#000000"
            self.fg_score = "#333333"
            self.highlight_win = "#FFD700"
            self.reset_btn_bg = "#ff9999"
            self.reset_btn_fg = "#cc0000"
            self.theme_btn_bg = "#e0e0e0"
            self.theme_btn_fg = "#333333"

        self.root.configure(bg=self.bg_window)

    def create_widgets(self):
        # Контейнеры
        self.main_frame = tk.Frame(self.root, bg=self.bg_window)
        self.main_frame.pack(fill="both", expand=True, padx=10, pady=10)

        # Заголовок
        self.title_label = tk.Label(
            self.main_frame,
            text="КРЕСТИКИ-НОЛИКИ",
            font=("Arial", 20, "bold"),
            bg=self.bg_window,
            fg=self.fg_score
        )
        self.title_label.grid(row=0, column=0, columnspan=3, pady=(0, 10), sticky="nsew")

        # Счёт
        self.score_label = tk.Label(
            self.main_frame,
            text="",
            font=("Arial", 16, "bold"),
            bg=self.bg_window,
            fg=self.fg_score
        )
        self.score_label.grid(row=1, column=0, columnspan=3, pady=(0, 15), sticky="nsew")

        # Игровое поле
        self.board_frame = tk.Frame(self.main_frame, bg=self.bg_frame, relief="ridge", bd=2)
        self.board_frame.grid(row=2, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)

        # Настройка сетки для растягивания
        self.main_frame.columnconfigure(0, weight=1)
        self.main_frame.columnconfigure(1, weight=1)
        self.main_frame.columnconfigure(2, weight=1)
        self.main_frame.rowconfigure(2, weight=1)

        for i in range(3):
            self.board_frame.rowconfigure(i, weight=1)
            self.board_frame.columnconfigure(i, weight=1)
            for j in range(3):
                btn = tk.Button(
                    self.board_frame,
                    text="",
                    font=("Arial", 36, "bold"),
                    bg=self.bg_button,
                    fg=self.fg_text,
                    activebackground="#555555" if self.dark_mode else "#e0e0e0",
                    relief="flat",
                    command=lambda r=i, c=j: self.on_click(r, c)
                )
                btn.grid(row=i, column=j, sticky="nsew", padx=2, pady=2)
                self.buttons[i][j] = btn

        # Кнопки управления
        control_frame = tk.Frame(self.main_frame, bg=self.bg_window)
        control_frame.grid(row=3, column=0, columnspan=3, pady=10, sticky="nsew")

        self.reset_score_btn = tk.Button(
            control_frame,
            text="🗑️ Сбросить счёт",
            font=("Arial", 10, "bold"),
            bg=self.reset_btn_bg,
            fg=self.reset_btn_fg,
            command=self.reset_score
        )
        self.reset_score_btn.pack(side="left", expand=True, fill="x", padx=2)

        self.theme_btn = tk.Button(
            control_frame,
            text="🌙 Ночной режим",
            font=("Arial", 10, "bold"),
            bg=self.theme_btn_bg,
            fg=self.theme_btn_fg,
            command=self.toggle_theme
        )
        self.theme_btn.pack(side="left", expand=True, fill="x", padx=2)

    def on_resize(self, event=None):
        """ Ахуенный метод """
        if event and event.widget == self.root:
            width = self.root.winfo_width()
            height = self.root.winfo_height()

            # Базовый размер
            font_size_title = max(14, min(28, int(width / 25)))
            font_size_score = max(12, min(20, int(width / 30)))
            font_size_board = max(24, min(60, int(min(width, height) / 8)))
            font_size_btn = max(8, min(14, int(width / 50)))

            self.title_label.config(font=("Arial", font_size_title, "bold"))
            self.score_label.config(font=("Arial", font_size_score, "bold"))

            for i in range(3):
                for j in range(3):
                    self.buttons[i][j].config(font=("Arial", font_size_board, "bold"))

            self.reset_score_btn.config(font=("Arial", font_size_btn, "bold"))
            self.theme_btn.config(font=("Arial", font_size_btn, "bold"))

    def update_score_label(self):
        text = f"{self.player_X_name} (❌): {self.score_X}     {self.player_O_name} (⭕): {self.score_O}"
        self.score_label.config(
            text=text,
            bg=self.bg_window,
            fg=self.fg_score
        )

    def on_click(self, row, col):
        if self.board[row][col] == "" and not self.game_over:
            self.board[row][col] = self.current_player
            color = "#d32f2f" if self.current_player == "X" else "#1976d2"
            symbol = "❌" if self.current_player == "X" else "⭕"

            self.buttons[row][col].config(
                text=symbol,
                fg=color,
                state="disabled",
                disabledforeground=color
            )

            winning_line = self.get_winning_line()
            if winning_line:
                self.game_over = True
                if self.current_player == "X":
                    self.score_X += 1
                else:
                    self.score_O += 1
                self.update_score_label()
                self.animate_win(winning_line, 0)
            elif self.is_board_full():
                self.game_over = True
                messagebox.showinfo("🤝 Ничья!", "Ничья, так не интересно, го ещё!")
                self.reset_board()
            else:
                self.current_player = "O" if self.current_player == "X" else "X"

    def get_winning_line(self):
        lines = [
            [(0, 0), (0, 1), (0, 2)], [(1, 0), (1, 1), (1, 2)], [(2, 0), (2, 1), (2, 2)],
            [(0, 0), (1, 0), (2, 0)], [(0, 1), (1, 1), (2, 1)], [(0, 2), (1, 2), (2, 2)],
            [(0, 0), (1, 1), (2, 2)], [(0, 2), (1, 1), (2, 0)]
        ]
        for line in lines:
            a, b, c = line
            if (self.board[a[0]][a[1]] == self.board[b[0]][b[1]] == self.board[c[0]][c[1]] != ""):
                return line
        return None

    def is_board_full(self):
        return all(self.board[i][j] != "" for i in range(3) for j in range(3))

    def animate_win(self, line, count):
        if count >= 6:
            winner_name = self.player_X_name if self.current_player == "X" else self.player_O_name
            messagebox.showinfo("🎉 Победа!", f"{winner_name} выиграл(а)!")
            self.reset_board()
            return

        bg_color = self.highlight_win if count % 2 == 0 else self.bg_button
        for (r, c) in line:
            self.buttons[r][c].config(bg=bg_color)

        self.root.after(250, self.animate_win, line, count + 1)

    def reset_board(self):
        self.game_over = False
        self.current_player = "X"
        self.board = [["" for _ in range(3)] for _ in range(3)]
        for i in range(3):
            for j in range(3):
                self.buttons[i][j].config(
                    text="",
                    state="normal",
                    fg=self.fg_text,
                    bg=self.bg_button
                )

    def reset_score(self):
        self.score_X = 0
        self.score_O = 0
        self.update_score_label()
        self.reset_board()

    def toggle_theme(self):
        self.dark_mode = not self.dark_mode
        self.setup_colors()
        self.root.configure(bg=self.bg_window)

        # Обновлённые заголовок и счёт
        self.title_label.config(bg=self.bg_window, fg=self.fg_score)
        self.score_label.config(bg=self.bg_window, fg=self.fg_score)

        # Обновлённый фон игрового поля
        self.board_frame.config(bg=self.bg_frame)

        # Обновлённые кнопки игрового поля
        for i in range(3):
            for j in range(3):
                btn = self.buttons[i][j]
                btn.config(
                    bg=self.bg_button,
                    fg=self.fg_text,
                    activebackground="#555555" if self.dark_mode else "#e0e0e0"
                )

        # Обновлённые кнопки управления
        self.reset_score_btn.config(bg=self.reset_btn_bg, fg=self.reset_btn_fg)

        self.theme_btn.config(
            text="☀️ Дневной режим" if self.dark_mode else "🌙 Ночной режим",
            bg=self.theme_btn_bg,
            fg=self.theme_btn_fg
        )

        self.on_resize()


if __name__ == "__main__":
    root = tk.Tk()
    game = TicTacToe(root)
    root.mainloop()
