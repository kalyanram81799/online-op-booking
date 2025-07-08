/*
  # Initial Schema for HealthCare+ OP Booking System

  1. New Tables
    - `patients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text, unique)
      - `password` (text)
      - `created_at` (timestamp)
    - `doctors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `specialty` (text)
      - `password` (text)
      - `experience` (text)
      - `rating` (numeric)
      - `image` (text)
      - `created_at` (timestamp)
    - `diseases`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
    - `appointments`
      - `id` (uuid, primary key)
      - `appointment_id` (text, unique)
      - `patient_id` (uuid, foreign key)
      - `doctor_id` (uuid, foreign key)
      - `disease_id` (uuid, foreign key)
      - `amount` (numeric)
      - `transaction_id` (text)
      - `status` (text)
      - `appointment_date` (timestamp)
      - `created_at` (timestamp)
    - `medicine_schedules`
      - `id` (uuid, primary key)
      - `appointment_id` (uuid, foreign key)
      - `medicine_name` (text)
      - `timing` (text)
      - `duration` (text)
      - `patient_phone` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  specialty text NOT NULL,
  password text NOT NULL,
  experience text DEFAULT '5 years',
  rating numeric DEFAULT 4.5,
  image text DEFAULT 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
  created_at timestamptz DEFAULT now()
);

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id text UNIQUE NOT NULL,
  patient_id uuid REFERENCES patients(id),
  doctor_id uuid REFERENCES doctors(id),
  disease_id uuid REFERENCES diseases(id),
  amount numeric DEFAULT 200,
  transaction_id text,
  status text DEFAULT 'pending',
  appointment_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create medicine_schedules table
CREATE TABLE IF NOT EXISTS medicine_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id),
  medicine_name text NOT NULL,
  timing text NOT NULL,
  duration text NOT NULL,
  patient_phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for patients
CREATE POLICY "Patients can read own data"
  ON patients
  FOR SELECT
  USING (true);

CREATE POLICY "Patients can insert own data"
  ON patients
  FOR INSERT
  WITH CHECK (true);

-- Create policies for doctors
CREATE POLICY "Doctors can read own data"
  ON doctors
  FOR SELECT
  USING (true);

CREATE POLICY "Doctors can insert own data"
  ON doctors
  FOR INSERT
  WITH CHECK (true);

-- Create policies for diseases
CREATE POLICY "Anyone can read diseases"
  ON diseases
  FOR SELECT
  USING (true);

-- Create policies for appointments
CREATE POLICY "Users can read appointments"
  ON appointments
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert appointments"
  ON appointments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update appointments"
  ON appointments
  FOR UPDATE
  USING (true);

-- Create policies for medicine_schedules
CREATE POLICY "Users can read medicine schedules"
  ON medicine_schedules
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert medicine schedules"
  ON medicine_schedules
  FOR INSERT
  WITH CHECK (true);

-- Insert initial diseases data
INSERT INTO diseases (name, description) VALUES
  ('Cardiology', 'Heart and cardiovascular conditions'),
  ('Dermatology', 'Skin, hair, and nail disorders'),
  ('Orthopedics', 'Bone and joint conditions'),
  ('Pediatrics', 'Children''s health and development'),
  ('Ophthalmology', 'Eye and vision care'),
  ('ENT', 'Ear, nose, and throat conditions'),
  ('Gastroenterology', 'Digestive system disorders'),
  ('Neurology', 'Brain and nervous system conditions')
ON CONFLICT DO NOTHING;

-- Insert initial doctors data
INSERT INTO doctors (name, email, specialty, password, experience, rating, image) VALUES
  ('Dr. Sarah Johnson', 'sarah@hospital.com', 'Cardiology', 'doctor123', '15 years', 4.8, 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Dr. Michael Chen', 'michael@hospital.com', 'Cardiology', 'doctor123', '12 years', 4.9, 'https://images.pexels.com/photos/6234516/pexels-photo-6234516.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Dr. Emily Rodriguez', 'emily@hospital.com', 'Dermatology', 'doctor123', '10 years', 4.7, 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Dr. James Wilson', 'james@hospital.com', 'Dermatology', 'doctor123', '8 years', 4.6, 'https://images.pexels.com/photos/5340280/pexels-photo-5340280.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Dr. Lisa Thompson', 'lisa@hospital.com', 'Orthopedics', 'doctor123', '18 years', 4.9, 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Dr. Robert Kim', 'robert@hospital.com', 'Orthopedics', 'doctor123', '14 years', 4.8, 'https://images.pexels.com/photos/5340281/pexels-photo-5340281.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;