// In-memory database of appointments for initialization
let appointments = [
  {
    id: '1',
    patientName: 'Sofía Rodríguez',
    email: 'sofia.rod@example.com',
    date: '2026-07-10',
    time: '09:00',
    service: 'Medicina General',
    notes: 'Chequeo anual de rutina.',
    status: 'scheduled'
  },
  {
    id: '2',
    patientName: 'Mateo González',
    email: 'mateo.gonzalez@example.com',
    date: '2026-07-10',
    time: '11:30',
    service: 'Odontología',
    notes: 'Limpieza dental semestral.',
    status: 'scheduled'
  },
  {
    id: '3',
    patientName: 'Valeria Benítez',
    email: 'valeria.b@example.com',
    date: '2026-07-11',
    time: '15:00',
    service: 'Pediatría',
    notes: 'Control de crecimiento de Lucas.',
    status: 'completed'
  }
];

// Get all appointments
const getAppointments = (req, res) => {
  try {
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas.', error: error.message });
  }
};

// Create appointment
const createAppointment = (req, res) => {
  try {
    const { patientName, email, date, time, service, notes } = req.body;

    if (!patientName || !email || !date || !time || !service) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse.' });
    }

    const newAppointment = {
      id: Date.now().toString(),
      patientName,
      email,
      date,
      time,
      service,
      notes: notes || '',
      status: 'scheduled'
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita.', error: error.message });
  }
};

// Delete appointment
const deleteAppointment = (req, res) => {
  try {
    const { id } = req.params;
    const initialLength = appointments.length;
    appointments = appointments.filter(appt => appt.id !== id);

    if (appointments.length === initialLength) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    res.json({ message: 'Cita eliminada correctamente.', id });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita.', error: error.message });
  }
};

// Update appointment status (e.g. reschedule or cancel)
const updateAppointmentStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Estado no válido.' });
    }

    const appt = appointments.find(a => a.id === id);
    if (!appt) {
      return res.status(404).json({ message: 'Cita no encontrada.' });
    }

    appt.status = status;
    res.json(appt);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la cita.', error: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus
};
