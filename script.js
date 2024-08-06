document.addEventListener("DOMContentLoaded", function() {
  const scheduleContainer = document.querySelector('.hourly-schedule');
  const timelineContainer = document.querySelector('.timeline');
  const taskForm = document.getElementById('task-form');
  const deleteAllTasksButton = document.getElementById('delete-all-tasks');

  // Generate the timeline
  for (let i = 0; i < 24; i++) {
    const timeMarker = document.createElement('div');
    timeMarker.classList.add('time-marker');
    timeMarker.textContent = `${i}:00`;
    timeMarker.style.marginBottom = '10px'; // Add space between time markers
    timelineContainer.appendChild(timeMarker);
  }

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskColor = getRandomColor(); // Get a random color for the task

    // Create and append the task element
    const task = document.createElement('div');
    task.classList.add('task');
    task.textContent = `${startTime} - ${taskDescription}`;
    if (endTime) {
      task.textContent += ` (Ends at ${endTime})`;
    }
    task.style.backgroundColor = taskColor; // Apply random color to task

    // Set dynamic width based on text length
    const textLength = task.textContent.length;
    task.style.minWidth = `${Math.max(0, textLength * 8)}px`; // Adjust the multiplier to suit your needs

    // Add delete button to each task
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.classList.add('delete-task');
    task.appendChild(deleteButton);

    // Find the corresponding time marker for the task
    const startTimeParts = startTime.split(':');
    const startHour = parseInt(startTimeParts[0], 10);

    // Find the corresponding time marker element
    const timeMarkers = document.querySelectorAll('.time-marker');
    const targetMarker = timeMarkers[startHour];

    targetMarker.appendChild(task);

    // Remove time markers between start and end times
    const startMarkerIndex = parseInt(startTime.split(':')[0], 10);
    const endMarkerIndex = parseInt(endTime.split(':')[0], 10);
    for (let i = startMarkerIndex + 1; i < endMarkerIndex; i++) {
      const markerToRemove = timeMarkers[i];
      markerToRemove.remove();
    }

    // Clear the form fields after adding the task
    taskForm.reset();
  });

  // Function to generate a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Add event listener to delete individual tasks (using event delegation)
  scheduleContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-task')) {
      event.target.parentElement.remove();
    }
  });

  // Add event listener to delete all tasks
  deleteAllTasksButton.addEventListener('click', function() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => task.remove());
  });
});
