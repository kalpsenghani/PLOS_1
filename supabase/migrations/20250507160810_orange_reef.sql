/*
  # Initial Schema Setup for PLOS

  1. Tables
    - users (handled by Supabase Auth)
    - journal_entries
    - goals
    - tasks
    - mood_entries
    - health_metrics
    - nutrition_logs
    - social_events
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Journal Entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  sentiment text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own journal entries"
  ON journal_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Goals
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  target_date date,
  progress integer DEFAULT 0,
  status text DEFAULT 'not-started',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own goals"
  ON goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES goals ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD tasks for their goals"
  ON tasks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM goals
      WHERE goals.id = tasks.goal_id
      AND goals.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM goals
      WHERE goals.id = tasks.goal_id
      AND goals.user_id = auth.uid()
    )
  );

-- Mood Entries
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  mood text NOT NULL,
  notes text,
  factors text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own mood entries"
  ON mood_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Health Metrics
CREATE TABLE IF NOT EXISTS health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date DEFAULT CURRENT_DATE,
  steps integer DEFAULT 0,
  heart_rate integer,
  sleep_hours numeric(3,1),
  calories integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own health metrics"
  ON health_metrics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Nutrition Logs
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date date DEFAULT CURRENT_DATE,
  meal_type text NOT NULL,
  food_items jsonb NOT NULL,
  calories integer,
  protein numeric(5,1),
  carbs numeric(5,1),
  fat numeric(5,1),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own nutrition logs"
  ON nutrition_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Social Events
CREATE TABLE IF NOT EXISTS social_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  location text,
  people text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE social_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD their own social events"
  ON social_events
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_social_events_updated_at
  BEFORE UPDATE ON social_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();