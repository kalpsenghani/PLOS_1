export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          type: string;
          status: string;
          deadline: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          type: string;
          status?: string;
          deadline?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          type?: string;
          status?: string;
          deadline?: string | null;
          created_at?: string;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: string;
          notes: string | null;
          ai_sentiment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mood: string;
          notes?: string | null;
          ai_sentiment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: string;
          notes?: string | null;
          ai_sentiment?: string | null;
          created_at?: string;
        };
      };
    };
  };
}