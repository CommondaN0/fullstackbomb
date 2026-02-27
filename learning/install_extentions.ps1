$extensions = @(
    "esbenp.prettier-vscode",      # Prettier - форматирование кода
    "formulahendry.code-runner",   # Code Runner - запуск кода
    "ritwickdey.liveserver",       # Live Server - живой сервер для HTML/CSS/JS
    "xabikos.JavaScriptSnippets"   # JavaScript (ES6) code snippets
)

foreach ($extension in $extensions) {
    Write-Host "Установка: $extension"
    code --install-extension $extension
}
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Y