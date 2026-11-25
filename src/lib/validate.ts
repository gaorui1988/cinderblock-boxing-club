export type Experience = '' | 'never' | 'few' | 'competed'

export type TrialValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  sessionId: string
  experience: Experience
  notes: string
  ageConfirm: boolean
}

export type TrialField = keyof TrialValues

export const FIELD_ORDER: TrialField[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'sessionId',
  'experience',
  'notes',
  'ageConfirm',
]

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateTrial(values: TrialValues): Partial<Record<TrialField, string>> {
  const errors: Partial<Record<TrialField, string>> = {}
  if (!values.firstName.trim()) errors.firstName = 'Tell us what to call you.'
  if (!values.lastName.trim()) errors.lastName = 'Add your last name.'
  if (!EMAIL.test(values.email.trim())) errors.email = 'Enter an email like name@example.com.'
  const digits = values.phone.replace(/\D/g, '')
  if (values.phone.trim() && digits.length < 10) {
    errors.phone = 'Add a number with at least 10 digits, or leave it empty.'
  }
  if (!values.sessionId) errors.sessionId = 'Pick a class for your trial.'
  if (!values.experience) errors.experience = 'Choose the closest one.'
  if (values.notes.length > 300) errors.notes = 'Keep it under 300 characters.'
  if (!values.ageConfirm) errors.ageConfirm = 'Please confirm to continue.'
  return errors
}

export function emptyTrial(): TrialValues {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sessionId: '',
    experience: '',
    notes: '',
    ageConfirm: false,
  }
}
