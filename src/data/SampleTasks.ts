import type { Task } from '../types/task';

const sampleTasks: Task[] = [
    {
        id: 1,
        title: 'Finish Typescript project',
        description: 'Complete the task management app exercise',
        completed: false,
        date: new Date('2025-05-12')
    },
    {
        id: 2,
        title: 'Take a break',
        description: 'Stretch, grab coffee, vibe to music',
        completed: false,
        date: new Date('2025-05-13')
      }
];

export default sampleTasks;


