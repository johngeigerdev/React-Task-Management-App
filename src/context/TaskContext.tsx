import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Task } from '../types/task';


interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: number) => void;
    toggleCompleted: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

//useTaskContext will be what the go-to import in all pages to bring in the app state from here, it holds all the state
export const useTaskContext = () => {   
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('tasks');
            if (!saved) return [];
      
            const parsed = JSON.parse(saved);  //this gives an array of objects
            return parsed.map((task: any) => ({
            ...task,
            date: task.date ? new Date(task.date) : undefined, // 'new Date' here converts the date from a string back to a date object
          }));
        } catch (error) {
          console.error('Error reading tasks from localStorage:', error);
          return [];
        }
    });

    //addTask spreads the existing tasks array and adds the new task in
    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

    //This updateTask function updates a task inside the tasks array in the app's state. it replaces the 
    //old task with the new one based on a matching id
    const updateTask = (updatedTask: Task) => {
        setTasks((prev) =>  //prev is the current tasks array before updating
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)) //if the task.id matches updatedTask.id, return the new updated task, if not, keep original task
        );
    };

    //if the task.id does no match the id of the deleted task, add it to the tasks array
    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));  
    };

    const toggleCompleted=(id: number) => {
        setTasks((prev) => 
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task  //mapping thru array of tasks and if the selected task's
                //  id matches the one we're toggling, it uses the spread operator to keep all existing properties and flips 'completed' to !task.completed
                //and if it's not completed, it keeps it as it originally was
            )
        );
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); //this turns the date object into a string
    }, [tasks]);

    return (
        //this is saying that whatever the child is, in this case the app.tsx component (ie everything) has any component in TaskContext available to it
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleCompleted }}>
        {children}
    </TaskContext.Provider>
    );
};