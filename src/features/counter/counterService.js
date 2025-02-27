const getCounterValue = async () => {
    // Симуляція API-запиту (можна замінити на fetch/axios)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ value: Math.floor(Math.random() * 100) });
      }, 1000);
    });
  };
  
  export default { getCounterValue };