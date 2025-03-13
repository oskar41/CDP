// Імпорт додаткових скриптів
importScripts('helper.js'); // якщо потрібно

// Глобальний стан воркера
let isProcessing = false;
let cache = new Map();

// Обробка повідомлень
self.onmessage = async function(e) {
  const { type, data, options } = e.data;

  try {
    switch (type) {
      case 'process_data':
        if (isProcessing) {
          throw new Error('Already processing');
        }
        
        isProcessing = true;
        
        // Перевірка кешу
        if (cache.has(data.id)) {
          self.postMessage({
            type: 'result',
            data: cache.get(data.id),
            fromCache: true
          });
          return;
        }

        // Обробка даних
        const result = await processData(data);
        
        // Кешування
        cache.set(data.id, result);
        
        // Відправка результату
        self.postMessage({
          type: 'result',
          data: result,
          fromCache: false
        });
        break;

      case 'fetch_api':
        const response = await fetch(data.url);
        const json = await response.json();
        self.postMessage({
          type: 'api_result',
          data: json
        });
        break;

      case 'heavy_computation':
        // Періодично відправляємо прогрес
        for (let i = 0; i < data.iterations; i++) {
          if (i % 1000 === 0) {
            self.postMessage({
              type: 'progress',
              progress: (i / data.iterations) * 100
            });
          }
          // Важкі обчислення
        }
        break;

      case 'clear_cache':
        cache.clear();
        self.postMessage({ type: 'cache_cleared' });
        break;

      default:
        throw new Error('Unknown command type');
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message
    });
  } finally {
    isProcessing = false;
  }
};

// Обробка помилок
self.onerror = function(error) {
  self.postMessage({
    type: 'error',
    error: error.message
  });
};

// Допоміжні функції
async function processData(data) {
  // Симуляція складної обробки
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data;
}

// Очистка при зупинці
self.onclose = function() {
  cache.clear();
}; 