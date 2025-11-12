// 題庫：每個字和對應的注音
const fullQuizBank = {
    '日': 'ㄖˋ', '光': 'ㄍㄨㄤ', '旦': 'ㄉㄢˋ', '天': 'ㄊㄧㄢ', '地': 'ㄉㄧˋ', 
    '水': 'ㄕㄨㄟˇ', '火': 'ㄏㄨㄛˇ', '山': 'ㄕㄢ', '土': 'ㄊㄨˇ', '石': 'ㄕˊ', 
    '穴': 'ㄒㄩㄝˋ', '木': 'ㄇㄨˋ', '林': 'ㄌㄧㄣˊ', '雨': 'ㄩˇ', '雲': 'ㄩㄣˊ', 
    '雷': 'ㄌㄟˊ', '電': 'ㄉㄧㄢˋ', '春': 'ㄔㄨㄣ', '夏': 'ㄒㄧㄚˋ', '秋': 'ㄑㄧㄡ', 
    '冬': 'ㄉㄨㄥ', '月': 'ㄩㄝˋ', '星': 'ㄒㄧㄥ', '目': 'ㄇㄨˋ', '眉': 'ㄇㄟˊ', 
    '看': 'ㄎㄢˋ', '見': 'ㄐㄧㄢˋ', '口': 'ㄎㄡˇ', '舌': 'ㄕㄜˊ', '牙': 'ㄧㄚˊ', 
    '齒': 'ㄔˇ', '手': 'ㄕㄡˇ', '足': 'ㄗㄨˊ', '掌': 'ㄓㄤˇ', '拿': 'ㄋㄚˊ'
};

// 將題庫的鍵 (字) 轉為陣列，用於隨機抽取
let remainingWords = Object.keys(fullQuizBank);

// 取得需要的 DOM 元素
const questionArea = document.getElementById('question-area');
const completedLog = document.getElementById('completed-log');
const completionMessage = document.getElementById('completion-message');

// 隨機抽取一個字並顯示為按鈕
function drawNewWord() {
    // 檢查是否還有剩餘的字
    if (remainingWords.length === 0) {
        // 如果沒有，顯示完成訊息並停止
        questionArea.innerHTML = ''; // 清空題目區
        completionMessage.classList.remove('hidden');
        return;
    }

    // 隨機選擇一個索引
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    // 取得選中的字
    const currentWord = remainingWords[randomIndex];
    
    // 清空舊按鈕
    questionArea.innerHTML = ''; 

    // 創建新的按鈕元素
    const button = document.createElement('button');
    button.className = 'word-button';
    button.textContent = currentWord;
    
    // 設定點擊事件
    button.onclick = () => handleButtonClick(currentWord, randomIndex);
    
    // 將新按鈕加入頁面
    questionArea.appendChild(button);
}

// 處理按鈕點擊事件
function handleButtonClick(word, indexInRemainingArray) {
    const pinyin = fullQuizBank[word];
    
    // 1. 在「已複習紀錄」中顯示此字和注音
    const logItem = document.createElement('span');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        ${word}
        <span class="pinyin">${pinyin}</span>
    `;
    
    // 將新紀錄加到紀錄區 (加在最前面)
    completedLog.appendChild(logItem);
    
    // 2. 將此字從剩餘題目中移除 (確保只出現一次)
    remainingWords.splice(indexInRemainingArray, 1);
    
    // 3. 抽取並顯示下一個字
    drawNewWord();
}

// 頁面載入時，執行第一次隨機抽題
document.addEventListener('DOMContentLoaded', drawNewWord);