document.addEventListener('DOMContentLoaded', () => {
    const habitInput = document.getElementById('habit-input');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const habitList = document.getElementById('habit-list');
  
    // Load habits from local storage
    const loadHabits = () => {
      const habits = JSON.parse(localStorage.getItem('habits')) || [];
      habits.forEach(habit => createHabitElement(habit.text, habit.completed));
    };
  
    // Save habits to local storage
    const saveHabits = () => {
      const habits = [];
      document.querySelectorAll('.habit-item').forEach(item => {
        habits.push({
          text: item.querySelector('span').innerText,
          completed: item.querySelector('span').classList.contains('completed')
        });
      });
      localStorage.setItem('habits', JSON.stringify(habits));
    };
  
    // Create habit element
    const createHabitElement = (text, completed = false) => {
      const habitItem = document.createElement('li');
      habitItem.classList.add('habit-item');
  
      const habitText = document.createElement('span');
      habitText.innerText = text;
      if (completed) habitText.classList.add('completed');
      habitItem.appendChild(habitText);
  
      const buttons = document.createElement('div');
      buttons.classList.add('buttons');
  
      const completeBtn = document.createElement('button');
      completeBtn.innerText = 'Complete';
      completeBtn.classList.add('complete-btn');
      completeBtn.addEventListener('click', () => {
        habitText.classList.toggle('completed');
        saveHabits();
      });
      buttons.appendChild(completeBtn);
  
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        habitItem.remove();
        saveHabits();
      });
      buttons.appendChild(deleteBtn);
  
      habitItem.appendChild(buttons);
      habitList.appendChild(habitItem);
      saveHabits();
    };
  
    // Add habit on button click
    addHabitBtn.addEventListener('click', () => {
      const habitText = habitInput.value.trim();
      if (habitText) {
        createHabitElement(habitText);
        habitInput.value = '';
      }
    });
  
    // Load habits when the page loads
    loadHabits();
  });