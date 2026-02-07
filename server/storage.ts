import { quizSubmissions, type InsertQuizSubmission, type QuizSubmission } from "@shared/schema";

export interface IStorage {
  createSubmission(submission: InsertQuizSubmission): Promise<QuizSubmission>;
  getSubmissions(): Promise<QuizSubmission[]>;
}

export class MemStorage implements IStorage {
  private submissions: QuizSubmission[];
  private currentId: number;
  private storageKey = 'wiiread_submissions';

  constructor() {
    this.submissions = [];
    this.currentId = 1;
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(this.storageKey);
      if (saved) {
        try {
          this.submissions = JSON.parse(saved);
          this.currentId = this.submissions.length > 0 
            ? Math.max(...this.submissions.map(s => s.id)) + 1 
            : 1;
        } catch (e) {
          console.error("Failed to load from local storage", e);
        }
      }
    }
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(this.storageKey, JSON.stringify(this.submissions));
    }
  }

  async createSubmission(submission: InsertQuizSubmission): Promise<QuizSubmission> {
    const newSubmission: QuizSubmission = {
      ...submission,
      id: this.currentId++,
      createdAt: new Date(),
    };
    this.submissions.push(newSubmission);
    this.saveToLocalStorage();
    return newSubmission;
  }

  async getSubmissions(): Promise<QuizSubmission[]> {
    return [...this.submissions].sort((a, b) => {
      if (a.grade !== b.grade) {
        return a.grade - b.grade;
      }
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }
}

export const storage = new MemStorage();
