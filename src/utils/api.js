import { supabase } from '../lib/supabase';

// Patient Authentication
export const registerPatient = async (data) => {
  try {
    const { data: patient, error } = await supabase
      .from('patients')
      .insert([{
        name: data.name,
        phone: data.phone,
        password: data.password // In production, hash this password
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...patient, type: 'patient' };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginPatient = async (phone, password) => {
  try {
    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('phone', phone)
      .eq('password', password) // In production, compare hashed passwords
      .single();

    if (error || !patient) {
      throw new Error('Invalid phone number or password');
    }

    return { ...patient, type: 'patient' };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Doctor Authentication
export const registerDoctor = async (data) => {
  try {
    const { data: doctor, error } = await supabase
      .from('doctors')
      .insert([{
        name: data.name,
        email: data.email,
        specialty: data.specialty,
        password: data.password // In production, hash this password
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...doctor, type: 'doctor' };
  } catch (error) {
    console.error('Doctor registration error:', error);
    throw error;
  }
};

export const loginDoctor = async (email, password) => {
  try {
    const { data: doctor, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('email', email)
      .eq('password', password) // In production, compare hashed passwords
      .single();

    if (error || !doctor) {
      throw new Error('Invalid email or password');
    }

    return { ...doctor, type: 'doctor' };
  } catch (error) {
    console.error('Doctor login error:', error);
    throw error;
  }
};

// Diseases
export const getDiseases = async () => {
  try {
    const { data: diseases, error } = await supabase
      .from('diseases')
      .select('*')
      .order('name');

    if (error) throw error;
    return diseases;
  } catch (error) {
    console.error('Error fetching diseases:', error);
    throw error;
  }
};

// Doctors
export const getDoctorsBySpecialty = async (specialty) => {
  try {
    const { data: doctors, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('specialty', specialty)
      .order('rating', { ascending: false });

    if (error) throw error;
    return doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Appointments
export const bookAppointment = async (appointmentData) => {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    if (error) throw error;
    return { success: true, appointment };
  } catch (error) {
    console.error('Booking error:', error);
    throw error;
  }
};

export const getAppointmentsByDoctor = async (doctorId) => {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name, phone),
        diseases(name)
      `)
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const getAppointmentsByPatient = async (patientId) => {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctors(name, specialty, image),
        diseases(name)
      `)
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return appointments;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', appointmentId)
      .select()
      .single();

    if (error) throw error;
    return appointment;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

// Medicine Schedules
export const addMedicineSchedule = async (scheduleData) => {
  try {
    const { data: schedule, error } = await supabase
      .from('medicine_schedules')
      .insert([scheduleData])
      .select()
      .single();

    if (error) throw error;
    return schedule;
  } catch (error) {
    console.error('Error adding medicine schedule:', error);
    throw error;
  }
};

// SMS Service (Mock implementation - replace with actual SMS service)
export const sendSMSReminder = async (phone, message) => {
  try {
    // Mock SMS sending - replace with actual SMS service like Twilio
    console.log(`SMS to ${phone}: ${message}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, integrate with SMS service:
    // const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: new URLSearchParams({
    //     From: 'YOUR_TWILIO_PHONE_NUMBER',
    //     To: phone,
    //     Body: message
    //   })
    // });
    
    return { success: true, message: 'SMS sent successfully (simulated)' };
  } catch (error) {
    console.error('SMS error:', error);
    throw error;
  }
};

// Payment Processing (Mock)
export const processPayment = async (amount, cardDetails) => {
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful payment
    return { 
      success: true, 
      transactionId: 'txn_' + Date.now(),
      amount: amount
    };
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

// Utility function to generate appointment ID
export const generateAppointmentId = (phoneNumber) => {
  const lastFourDigits = phoneNumber.slice(-4);
  const timestamp = Date.now().toString().slice(-6);
  return `${lastFourDigits}-APPT-${timestamp}`;
};