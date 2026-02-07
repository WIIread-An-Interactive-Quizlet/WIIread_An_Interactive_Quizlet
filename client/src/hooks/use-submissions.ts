import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertQuizSubmission } from "@shared/schema";

export function useSubmissions() {
  return useQuery({
    queryKey: [api.submissions.list.path],
    queryFn: async () => {
      // Try local storage first for GitHub Pages compatibility
      const localData = localStorage.getItem('wiiread_submissions');
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch (e) {
          console.error("Failed to parse local submissions", e);
        }
      }

      const res = await fetch(api.submissions.list.path);
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return api.submissions.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertQuizSubmission) => {
      // Always save to local storage for GitHub Pages compatibility
      const localData = localStorage.getItem('wiiread_submissions') || '[]';
      try {
        const submissions = JSON.parse(localData);
        const newSubmission = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        submissions.push(newSubmission);
        localStorage.setItem('wiiread_submissions', JSON.stringify(submissions));
        
        // If we're on a platform with a backend, also try to save there
        try {
          const res = await fetch(api.submissions.create.path, {
            method: api.submissions.create.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          
          if (res.ok) {
            return api.submissions.create.responses[201].parse(await res.json());
          }
        } catch (e) {
          console.warn("Backend submission failed, using local storage only", e);
        }

        return newSubmission;
      } catch (e) {
        throw new Error("Failed to save data locally");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.submissions.list.path] });
    },
  });
}
