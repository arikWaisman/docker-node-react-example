export const API_ROOT = '/api/v1';
export const USER_API = `${API_ROOT}/user`;
export const PATIENT_API = `${API_ROOT}/patient`;
export const DOCTOR_API = `${API_ROOT}/doctor`;

// get dashboard link for home url, user id only used for patients
export const getDashboardByUserType = (type, UserId = null) => {
  const redirects = {
    doctor: '/patients',
    patient: (UserId && `/patient/${UserId}/edit`) || null,
  };

  if (!redirects[type]) {
    return '/signin';
  }

  return redirects[type];
};
