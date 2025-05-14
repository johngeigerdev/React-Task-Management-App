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
    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

    const updateTask = (updatedTask: Task) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleCompleted=(id: number) => {
        setTasks((prev) => 
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); //this turns the date object into a string
    }, [tasks]);

    return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleCompleted }}>
        {children}
    </TaskContext.Provider>
    );
};