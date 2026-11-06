// Получаем элементы страницы, с которыми будет работать программа.
const siteTitle = document.getElementById("siteTitle");
const siteText = document.getElementById("siteText");
const bgColor = document.getElementById("bgColor");
const preview = document.getElementById("preview");
const previewTitle = document.getElementById("previewTitle");
const previewText = document.getElementById("previewText");
const blockText = document.getElementById("blockText");
const blocks = document.getElementById("blocks");
const message = document.getElementById("message");

// Обновляем предварительный просмотр сайта.
function updatePreview() {
    previewTitle.textContent = siteTitle.value;
    previewText.textContent = siteText.value;
    preview.style.backgroundColor = bgColor.value;
}

// Обновление по кнопке.
document.getElementById("updateButton").addEventListener("click", function () {
    updatePreview();
    message.textContent = "Предварительный просмотр обновлён.";
});

// Добавление нового текстового блока.
document.getElementById("addButton").addEventListener("click", function () {
    const text = blockText.value.trim();

    if (text === "") {
        message.textContent = "Сначала введите текст блока.";
        return;
    }

    const block = document.createElement("div");
    block.className = "content-block";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Удалить блок";

    deleteButton.addEventListener("click", function () {
        block.remove();
    });

    block.appendChild(paragraph);
    block.appendChild(deleteButton);
    blocks.appendChild(block);

    blockText.value = "";
    message.textContent = "Блок добавлен.";
});

// Сохраняем простые настройки в памяти браузера.
document.getElementById("saveButton").addEventListener("click", function () {
    const settings = {
        title: siteTitle.value,
        text: siteText.value,
        color: bgColor.value
    };

    localStorage.setItem("siteSettings", JSON.stringify(settings));
    message.textContent = "Настройки сохранены в браузере.";
});

// Загружаем сохранённые настройки при открытии страницы.
const savedSettings = localStorage.getItem("siteSettings");

if (savedSettings !== null) {
    const settings = JSON.parse(savedSettings);
    siteTitle.value = settings.title;
    siteText.value = settings.text;
    bgColor.value = settings.color;
}

updatePreview();
